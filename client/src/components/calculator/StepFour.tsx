import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  Form,
  FormMessage
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Label } from 'recharts';
import { type CalculatorFormData, type CalculationResult } from '@shared/schema';

interface StepFourProps {
  form: UseFormReturn<CalculatorFormData>;
  calculationResult: CalculationResult | null;
}

const StepFour: React.FC<StepFourProps> = ({ form, calculationResult }) => {
  const watchTermYears = form.watch('term');
  const watchPropertyPrice = form.watch('propertyPrice');
  const watchDepositAmount = form.watch('depositAmount');
  
  // Financing terms options
  const terms = [
    { value: 15, label: '15 Years' },
    { value: 20, label: '20 Years' },
    { value: 25, label: '25 Years' },
    { value: 30, label: '30 Years' },
  ];
  
  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Calculate basic payment estimates
  const financedAmount = watchPropertyPrice - watchDepositAmount;
  const initialOwnershipPercentage = (watchDepositAmount / watchPropertyPrice) * 100;
  
  // Estimated monthly rent calculation
  const annualRentalRate = 0.04; // 4% annual rental rate
  const estimatedMonthlyRent = (financedAmount * annualRentalRate) * ((100 - initialOwnershipPercentage) / 100) / 12;
  
  // Get additional share payment
  const additionalSharePayment = form.watch('additionalSharePayment') || 0;
  
  // Estimated monthly acquisition payment (purchasing Vrtu's shares)
  const standardMonthlyAcquisition = financedAmount / (watchTermYears * 12);
  const additionalMonthlyAcquisition = additionalSharePayment / 12;
  const estimatedMonthlyAcquisition = standardMonthlyAcquisition + additionalMonthlyAcquisition;
  
  // Total monthly payment
  const totalMonthlyPayment = estimatedMonthlyRent + estimatedMonthlyAcquisition;
  
  // Calculate new estimated ownership years with additional payments
  const estimatedYearsToFullOwnership = calculationResult ? calculationResult.fullOwnershipYears : watchTermYears;
  
  // Placeholder for payment breakdown chart
  const paymentData = [
    { name: 'Rent Component', value: estimatedMonthlyRent },
    { name: 'Acquisition Component', value: estimatedMonthlyAcquisition },
  ];
  
  const COLORS = ['#10B981', '#4F46E5'];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Payment Plan Preview</h2>
        <p className="text-gray-600">
          Review your projected payments and ownership journey. This is an estimate based on your inputs.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="additionalSharePayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Annual Additional Share Payments (Optional)</FormLabel>
                <FormControl>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="relative flex-grow">
                        <div className="flex items-center">
                          <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              <span className="text-gray-500">$</span>
                            </div>
                            <input
                              type="number"
                              min="0"
                              max="100000"
                              step="1000"
                              value={field.value || 0}
                              onChange={(e) => {
                                const value = e.target.value === '' ? 0 : Number(e.target.value);
                                field.onChange(value);
                              }}
                              className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                              placeholder="0"
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-500">/year</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600">
                        Enter additional annual payments to accelerate your path to full ownership.
                      </p>
                      {calculationResult && (
                        <div className="text-sm font-medium text-emerald-700">
                          {field.value > 0 
                            ? `Reduce ownership time by ${Math.max(0, watchTermYears - calculationResult.fullOwnershipYears)} years!` 
                            : `Optional: Add payments to reduce your term`}
                        </div>
                      )}
                    </div>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>

      <Separator />
      
      {/* Payment Breakdown */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Monthly Payment Card */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Payment</CardTitle>
            <CardDescription>
              Estimated based on your inputs and a {(annualRentalRate * 100).toFixed(1)}% annual rental rate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700 mb-4">
              {formatCurrency(totalMonthlyPayment)}
              <span className="text-sm font-normal text-gray-500 ml-1">/ month</span>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Rent Component:</span>
                <span className="font-medium">{formatCurrency(estimatedMonthlyRent)}</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Standard Acquisition:</span>
                <span className="font-medium">{formatCurrency(standardMonthlyAcquisition)}</span>
              </div>
              
              {additionalSharePayment > 0 && (
                <div className="flex justify-between text-sm text-emerald-700">
                  <span>Additional Acquisition:</span>
                  <span className="font-medium">+{formatCurrency(additionalMonthlyAcquisition)}</span>
                </div>
              )}
              
              <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-500">Initial Ownership:</span>
                <span className="font-medium">{initialOwnershipPercentage.toFixed(1)}%</span>
              </div>
              
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Standard Term:</span>
                <span className="font-medium">{watchTermYears} years</span>
              </div>
              
              {additionalSharePayment > 0 && calculationResult && (
                <div className="flex justify-between text-sm text-emerald-700 font-medium">
                  <span>Reduced Term:</span>
                  <span>{calculationResult.fullOwnershipYears} years</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
        
        {/* Payment Composition Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Composition</CardTitle>
            <CardDescription>
              Your monthly payment consists of rent and acquisition components
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={paymentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {paymentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    <Label position="center" value="Monthly Payment" />
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Summary and Benefits */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle>Financing Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Property Value</p>
              <p className="font-medium">{formatCurrency(watchPropertyPrice)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Your Initial Contribution</p>
              <p className="font-medium">{formatCurrency(watchDepositAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Vrtu's Contribution</p>
              <p className="font-medium">{formatCurrency(financedAmount)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Full Ownership In</p>
              <p className="font-medium">
                {calculationResult ? (
                  <>
                    <span className={additionalSharePayment > 0 ? "line-through text-gray-400 mr-2" : ""}>
                      {watchTermYears}
                    </span>
                    {additionalSharePayment > 0 && (
                      <span className="text-emerald-700">{calculationResult.fullOwnershipYears}</span>
                    )}
                  </>
                ) : watchTermYears} years
              </p>
              {additionalSharePayment > 0 && calculationResult && (
                <p className="text-xs text-emerald-700 font-medium mt-1">
                  Save {watchTermYears - calculationResult.fullOwnershipYears} years with additional payments!
                </p>
              )}
            </div>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <h4 className="font-medium mb-2">Benefits of Diminishing Musharaka</h4>
            <ul className="text-sm text-gray-600 space-y-1 ml-5 list-disc">
              <li>No interest paid, fully Shariah-compliant</li>
              <li>Transparent payment structure</li>
              <li>Gradual increase in your ownership</li>
              <li>Flexibility for early payment</li>
              <li>Lower overall cost compared to conventional mortgages</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StepFour;
