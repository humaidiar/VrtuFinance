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
          Detailed breakdown of your Shariah-compliant home financing journey over {result.fullOwnershipYears} years.
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
          {/* Use our new CostComparisonChart component */}
          <div className="mb-6">
            <p className="text-lg font-medium text-emerald-800 mb-2">Diminishing Musharaka vs Conventional Mortgage</p>
            <p className="text-gray-600">
              See how our Shariah-compliant financing option saves you significant money compared to conventional interest-based mortgages.
            </p>
          </div>
          
          {/* Use our new chart component that displays the server-calculated data */}
          {result.costComparison && (
            <CostComparisonChart result={result} />
          )}
          
          {/* Detailed comparison cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <Card className="border-emerald-100">
              <CardHeader className="bg-emerald-50 rounded-t-lg">
                <CardTitle className="text-emerald-800">Diminishing Musharaka Benefits</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-medium">{formatCurrency(result.monthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Initial Ownership</span>
                    <span className="font-medium">{formatPercent(result.initialOwnershipPercentage)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Full Ownership In</span>
                    <span className="font-medium">{result.fullOwnershipYears} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Annual Additional Payment</span>
                    <span className="font-medium">{formatCurrency(formData.additionalSharePayment || 0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit Amount</span>
                    <span className="font-medium">{formatCurrency(formData.depositAmount)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-emerald-700">
                    <span>Total Cost Savings</span>
                    <span>{formatCurrency(result.totalSavings)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="border-gray-200">
              <CardHeader className="bg-gray-50 rounded-t-lg">
                <CardTitle className="text-gray-800">Conventional Mortgage Costs</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Payment</span>
                    <span className="font-medium">{formatCurrency(result.conventionalMonthlyPayment)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Interest Rate</span>
                    <span className="font-medium">7.0%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Term</span>
                    <span className="font-medium">{result.fullOwnershipYears} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Down Payment</span>
                    <span className="font-medium">{formatCurrency(formData.depositAmount)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Loan Amount</span>
                    <span className="font-medium">{formatCurrency(formData.propertyPrice - formData.depositAmount)}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-red-600">
                    <span>Extra Interest Cost</span>
                    <span>{formatCurrency(result.totalSavings)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Key Benefits Section */}
          <Card className="bg-emerald-50 border-emerald-100 mt-6">
            <CardHeader>
              <CardTitle>Why Choose Diminishing Musharaka?</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3 ml-6 list-disc">
                <li className="text-emerald-800">
                  <span className="font-medium">No Interest Payments:</span> 
                  <span className="text-gray-700"> Unlike conventional mortgages which are based on interest, our financing follows Shariah principles.</span>
                </li>
                <li className="text-emerald-800">
                  <span className="font-medium">Transparent Co-Ownership:</span> 
                  <span className="text-gray-700"> You and Vrtu co-own the property, with your ownership increasing over time.</span>
                </li>
                <li className="text-emerald-800">
                  <span className="font-medium">Flexibility to Increase Ownership:</span> 
                  <span className="text-gray-700"> Make additional payments to increase your ownership faster and reduce total costs.</span>
                </li>
                <li className="text-emerald-800">
                  <span className="font-medium">Significant Cost Savings:</span> 
                  <span className="text-gray-700"> Save approximately {formatCurrency(result.totalSavings)} over the financing term compared to a conventional mortgage.</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Table Tab */}
        <TabsContent value="table" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Yearly Breakdown</CardTitle>
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
                      <TableHead>Share Component</TableHead>
                      <TableHead>Remaining Provider Share</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {result.yearlyBreakdown.map((year) => (
                      <TableRow key={year.year}>
                        <TableCell className="font-medium">{year.year}</TableCell>
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
          
          {/* Property Details */}
          {result.propertyDetails && (
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Type</span>
                      <span className="font-medium capitalize">{result.propertyDetails.propertyType.replace('-', ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms</span>
                      <span className="font-medium">{result.propertyDetails.bedroomCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Builder's Report</span>
                      <span className="font-medium">{result.propertyDetails.hasBuilderReport ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Price</span>
                      <span className="font-medium">{formatCurrency(result.propertyDetails.propertyPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deposit Amount</span>
                      <span className="font-medium">{formatCurrency(result.propertyDetails.depositAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Applied Markup</span>
                      <span className="font-medium">{result.propertyDetails.appliedMarkup.toFixed(2)}x</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default FullProjection;