import React, { useState } from 'react';
import { ArrowLeft, Download, Info, Share2 } from 'lucide-react';
import CostComparisonChart from './CostComparisonChart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from 'recharts';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { type CalculatorFormData, type CalculationResult } from '@shared/schema';

interface FullProjectionProps {
  result: CalculationResult;
  formData: CalculatorFormData;
  onBack: () => void;
}

const FullProjection: React.FC<FullProjectionProps> = ({ result, formData, onBack }) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatCurrencyDecimal = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  // Percentage formatter
  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  // Convert chart data
  const chartData = result.yearlyBreakdown.map((year) => ({
    name: `Year ${year.year}`,
    ownership: year.customerOwnershipPercentage,
    payment: year.weeklyPayment,
    rent: year.rentComponent,
    acquisition: year.shareComponent,
    remaining: year.remainingProviderShare,
  }));

  // Calculate cumulative costs
  const cumulativeData = chartData.map((entry, index) => {
    const cumulativeRent = chartData
      .slice(0, index + 1)
      .reduce((sum, item) => sum + item.rent * 52, 0);
    const cumulativeAcquisition = chartData
      .slice(0, index + 1)
      .reduce((sum, item) => sum + item.acquisition * 52, 0);
    return {
      name: entry.name,
      rent: cumulativeRent,
      acquisition: cumulativeAcquisition,
      total: cumulativeRent + cumulativeAcquisition,
    };
  });

  // Calculate conventional mortgage for comparison
  const conventionalMortgageData = chartData.map((entry, index) => {
    // Assuming 5% interest rate on conventional mortgage
    const principal = formData.propertyPrice - formData.depositAmount;
    const interestRate = 0.05;
    const monthlyRate = interestRate / 12;
    const numPayments = formData.term * 12;
    const monthlyPayment = (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -numPayments));
    
    const yearlyPayment = monthlyPayment * 12;
    const cumulativePayment = yearlyPayment * (index + 1);
    
    // Calculate how much would be interest vs principal at this point
    let remainingPrincipal = principal;
    let totalInterest = 0;
    let totalPrincipal = 0;
    
    for (let i = 0; i < (index + 1) * 12; i++) {
      const interestPayment = remainingPrincipal * monthlyRate;
      const principalPayment = monthlyPayment - interestPayment;
      
      totalInterest += interestPayment;
      totalPrincipal += principalPayment;
      remainingPrincipal -= principalPayment;
      
      if (remainingPrincipal <= 0) break;
    }
    
    return {
      name: entry.name,
      totalPayment: cumulativePayment,
      principal: totalPrincipal,
      interest: totalInterest,
      remaining: Math.max(0, remainingPrincipal),
    };
  });

  // Prepare comparison data
  const comparisonData = chartData.map((entry, index) => {
    const musharakaTotal = cumulativeData[index].total;
    const conventionalTotal = conventionalMortgageData[index].totalPayment;
    
    return {
      name: entry.name,
      musharaka: musharakaTotal,
      conventional: conventionalTotal,
      savings: conventionalTotal - musharakaTotal,
    };
  });

  // Download PDF report (mock function for now)
  const downloadReport = () => {
    alert('Download report functionality would be implemented here');
  };

  // Share results (mock function for now)
  const shareResults = () => {
    alert('Share results functionality would be implemented here');
  };

  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div>
          <Button 
            variant="ghost" 
            onClick={onBack}
            className="mb-4 md:mb-0 -ml-4 text-gray-600"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calculator
          </Button>
        </div>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            className="text-emerald-700 border-emerald-700 hover:bg-emerald-50"
            onClick={shareResults}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button 
            variant="default" 
            className="bg-emerald-700 hover:bg-emerald-800"
            onClick={downloadReport}
          >
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Your Diminishing Musharaka Projection
        </h1>
        <p className="text-gray-600">
          Detailed breakdown of your Shariah-compliant home financing journey over {formData.term} years.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Monthly Payment</p>
            <p className="text-2xl font-bold text-emerald-700">{formatCurrency(result.monthlyPayment)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Initial Ownership</p>
            <p className="text-2xl font-bold text-emerald-700">{formatPercent(result.initialOwnershipPercentage)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Full Ownership</p>
            <p className="text-2xl font-bold text-emerald-700">{result.fullOwnershipYears} years</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-gray-500">Total Cost</p>
            <p className="text-2xl font-bold text-emerald-700">{formatCurrency(result.totalRentPaid + result.totalSharesPurchased)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs defaultValue="dashboard" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="comparison">Cost Comparison</TabsTrigger>
          <TabsTrigger value="table">Detailed Breakdown</TabsTrigger>
        </TabsList>

        {/* Dashboard Tab */}
        <TabsContent value="dashboard" className="space-y-8">
          {/* Ownership Progress Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Ownership Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" label={{ value: 'Ownership %', angle: -90, position: 'insideLeft' }} />
                    <YAxis yAxisId="right" orientation="right" label={{ value: 'Weekly Payment ($)', angle: 90, position: 'insideRight' }} />
                    <Tooltip formatter={(value, name) => {
                      if (name === 'ownership') return [formatPercent(value as number), 'Ownership'];
                      return [formatCurrencyDecimal(value as number), name === 'payment' ? 'Weekly Payment' : name];
                    }} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="ownership"
                      name="Ownership %"
                      stroke="#10B981"
                      activeDot={{ r: 8 }}
                      strokeWidth={2}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="payment"
                      name="Weekly Payment"
                      stroke="#6366F1"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Ownership Milestones */}
              <div className="mt-6">
                <h4 className="font-medium mb-4">Ownership Milestones</h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">25% Ownership</span>
                      <span className="text-sm font-medium">
                        {chartData.find(d => d.ownership >= 25)?.name || 'N/A'}
                      </span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">50% Ownership</span>
                      <span className="text-sm font-medium">
                        {chartData.find(d => d.ownership >= 50)?.name || 'N/A'}
                      </span>
                    </div>
                    <Progress value={50} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">75% Ownership</span>
                      <span className="text-sm font-medium">
                        {chartData.find(d => d.ownership >= 75)?.name || 'N/A'}
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">100% Ownership</span>
                      <span className="text-sm font-medium">
                        {chartData.find(d => d.ownership >= 99.9)?.name || 'N/A'}
                      </span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Composition */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Composition</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis 
                      tickFormatter={(value) => formatCurrency(value * 52)} 
                      label={{ value: 'Annual Payment', angle: -90, position: 'insideLeft' }} 
                    />
                    <Tooltip 
                      formatter={(value, name) => {
                        if (name === 'rent') return [formatCurrency((value as number) * 52), 'Annual Rent'];
                        if (name === 'acquisition') return [formatCurrency((value as number) * 52), 'Annual Acquisition'];
                        return [value, name];
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="rent" 
                      name="Rent Component" 
                      stackId="a" 
                      fill="#10B981" 
                    />
                    <Bar 
                      dataKey="acquisition" 
                      name="Acquisition Component" 
                      stackId="a" 
                      fill="#6366F1" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Rent Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-700">{formatCurrency(result.totalRentPaid)}</p>
                <p className="text-sm text-gray-600 mt-2">
                  This is the total amount you'll pay in rent over the financing term.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Shares Purchased</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-700">{formatCurrency(result.totalSharesPurchased)}</p>
                <p className="text-sm text-gray-600 mt-2">
                  This is the total amount you'll pay to acquire Vrtu's share of the property.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Total Cost</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-700">{formatCurrency(result.totalRentPaid + result.totalSharesPurchased)}</p>
                <p className="text-sm text-gray-600 mt-2">
                  Combined cost including both rent and share purchases over the term.
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Comparison Tab */}
        <TabsContent value="comparison" className="space-y-8">
          {/* Comparison with Conventional Mortgage */}
          <Card>
            <CardHeader>
              <CardTitle>Cumulative Cost Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={comparisonData}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number)]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="musharaka"
                      name="Diminishing Musharaka"
                      stroke="#10B981"
                      strokeWidth={2}
                    />
                    <Line
                      type="monotone"
                      dataKey="conventional"
                      name="Conventional Mortgage"
                      stroke="#EF4444"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-8 p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-medium text-emerald-800 mb-2">Cost Savings with Diminishing Musharaka</h4>
                <p className="text-emerald-700">
                  Over {formData.term} years, you could save approximately {formatCurrency(comparisonData[comparisonData.length - 1]?.savings || 0)} compared to a conventional mortgage at current interest rates.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Interest vs Rent Comparison */}
          <Card>
            <CardHeader>
              <CardTitle>Interest vs. Rent + Markup Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conventionalMortgageData.filter((_, i) => i % 5 === 0 || i === conventionalMortgageData.length - 1)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(value) => formatCurrency(value)} />
                    <Tooltip 
                      formatter={(value) => [formatCurrency(value as number)]}
                    />
                    <Legend />
                    <Bar 
                      dataKey="interest" 
                      name="Interest (Conventional)" 
                      fill="#EF4444" 
                    />
                    <Bar 
                      dataKey="principal" 
                      name="Principal (Conventional)" 
                      fill="#F59E0B" 
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Key Differences</h4>
                <ul className="space-y-2 ml-5 list-disc text-sm text-gray-700">
                  <li>With conventional mortgages, early payments are mostly interest rather than building equity</li>
                  <li>Diminishing Musharaka gives you real ownership from day one, with each payment increasing your share</li>
                  <li>Interest payments are replaced with rent (which decreases as your ownership increases) and a markup on Vrtu's share</li>
                  <li>The markup is a fixed amount, not compound interest that grows over time</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Table Tab */}
        <TabsContent value="table">
          <Card>
            <CardHeader>
              <CardTitle>Year-by-Year Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Ownership %</TableHead>
                      <TableHead>Weekly Payment</TableHead>
                      <TableHead>Rent Component</TableHead>
                      <TableHead>Acquisition Component</TableHead>
                      <TableHead>Remaining Provider Share</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.yearlyBreakdown.map((year) => (
                      <TableRow key={year.year}>
                        <TableCell>{year.year}</TableCell>
                        <TableCell>{formatPercent(year.customerOwnershipPercentage)}</TableCell>
                        <TableCell>{formatCurrencyDecimal(year.weeklyPayment)}</TableCell>
                        <TableCell>{formatCurrencyDecimal(year.rentComponent)}</TableCell>
                        <TableCell>{formatCurrencyDecimal(year.shareComponent)}</TableCell>
                        <TableCell>{formatCurrency(year.remainingProviderShare)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Educational Section */}
      <div className="mt-12 bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Diminishing Musharaka</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-medium text-gray-800 mb-2">How It Works</h3>
            <p className="text-gray-600 text-sm">
              Diminishing Musharaka is a Shariah-compliant home financing method based on a partnership between you and Vrtu. You both purchase the property together, with your initial contribution determining your starting ownership percentage. Over time, you buy Vrtu's share while paying rent for the portion you don't yet own.
            </p>
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-1">Key Components:</h4>
              <ul className="space-y-1 ml-5 list-disc text-sm text-gray-600">
                <li><span className="font-medium">Initial Contribution:</span> Your deposit that determines your starting ownership</li>
                <li><span className="font-medium">Rent Payment:</span> Payment for using Vrtu's share of the property</li>
                <li><span className="font-medium">Acquisition Payment:</span> Amount paid to gradually purchase Vrtu's share</li>
                <li><span className="font-medium">Ownership Increase:</span> Your ownership percentage grows with each payment</li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-800 mb-2">Shariah Compliance</h3>
            <p className="text-gray-600 text-sm">
              Unlike conventional interest-based mortgages (which involve riba/interest), Diminishing Musharaka is based on a real partnership structure. The arrangement has been approved by respected Shariah scholars as it:
            </p>
            <ul className="space-y-1 mt-2 ml-5 list-disc text-sm text-gray-600">
              <li>Creates a genuine co-ownership arrangement</li>
              <li>Separates the rent payment from the acquisition payment</li>
              <li>Establishes a transparent fixed markup rather than compound interest</li>
              <li>Shares the risks and rewards of property ownership</li>
              <li>Follows clear guidelines on permissible transactions in Islamic finance</li>
            </ul>
            <div className="mt-4 text-sm text-gray-500">
              <p>
                <Info className="inline h-4 w-4 mr-1" /> 
                Our financing structure is certified by [Shariah Board Name] to ensure full compliance with Islamic financial principles.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullProjection;
