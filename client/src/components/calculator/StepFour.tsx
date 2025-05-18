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
  
  // Estimated monthly acquisition payment (purchasing Vrtu's shares)
  const estimatedMonthlyAcquisition = financedAmount / (watchTermYears * 12);
  
  // Total monthly payment
  const totalMonthlyPayment = estimatedMonthlyRent + estimatedMonthlyAcquisition;
  
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
            name="term"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel>Financing Term</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value.toString()}
                    className="grid grid-cols-2 gap-4"
                  >
                    {terms.map((term) => (
                      <FormItem key={term.value} className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem 
                            value={term.value.toString()}
                            id={`term-${term.value}`}
                            className="sr-only"
                          />
                        </FormControl>
                        <label
                          htmlFor={`term-${term.value}`}
                          className={`
                            flex items-center justify-center p-4 border-2 rounded-lg cursor-pointer transition-all w-full text-center
                            ${field.value === term.value 
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                              : 'border-gray-200 hover:border-emerald-200 text-gray-700'}
                          `}
                        >
                          {term.label}
                        </label>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
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
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="range"
                          min="0"
                          max="50000"
                          step="1000"
                          value={field.value || 0}
                          onChange={(e) => field.onChange(Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      <div className="ml-4 w-24 text-right">
                        <span className="font-medium text-emerald-700">
                          {new Intl.NumberFormat('en-NZ', {
                            style: 'currency',
                            currency: 'NZD',
                            maximumFractionDigits: 0
                          }).format(field.value || 0)}
                        </span>
                        <span className="text-xs text-gray-500 block">/year</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600">
                      Make additional payments to accelerate your path to full ownership.
                    </p>
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
                <span className="text-gray-500">Acquisition Component:</span>
                <span className="font-medium">{formatCurrency(estimatedMonthlyAcquisition)}</span>
              </div>
              <div className="flex justify-between text-sm pt-2 border-t border-gray-100">
                <span className="text-gray-500">Initial Ownership:</span>
                <span className="font-medium">{initialOwnershipPercentage.toFixed(1)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Term:</span>
                <span className="font-medium">{watchTermYears} years</span>
              </div>
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
              <p className="font-medium">{watchTermYears} years</p>
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
