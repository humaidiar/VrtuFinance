import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { HelpCircle, Home, AlertCircle } from 'lucide-react';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  Form,
  FormMessage,
  FormDescription
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { type CalculatorFormData } from '@shared/schema';

interface StepThreeProps {
  form: UseFormReturn<CalculatorFormData>;
}

const propertyTypes = [
  { value: 'existing', label: 'Existing Home' },
  { value: 'new-construction', label: 'New Construction' },
  { value: 'apartment', label: 'Apartment' }
];

const StepThree: React.FC<StepThreeProps> = ({ form }) => {
  const [showDepositWarning, setShowDepositWarning] = useState(false);
  const [showFinancingCapacityWarning, setShowFinancingCapacityWarning] = useState(false);
  
  const watchPropertyPrice = form.watch('propertyPrice');
  const watchDepositAmount = form.watch('depositAmount');
  const watchIncome = form.watch('income');
  const watchExpenses = form.watch('expenses');
  const watchCommitments = form.watch('commitments');
  
  // Calculate ownership percentage
  const initialOwnershipPercentage = watchPropertyPrice && watchDepositAmount
    ? (watchDepositAmount / watchPropertyPrice) * 100
    : 0;
  
  // Calculate LVR ratio
  const lvrRatio = watchPropertyPrice && watchDepositAmount
    ? ((watchPropertyPrice - watchDepositAmount) / watchPropertyPrice) * 100
    : 0;
    
  // Calculate financial health indicators for validation
  const monthlyIncome = watchIncome ? watchIncome / 12 : 0;
  const availableForFinancing = monthlyIncome - (watchExpenses || 0) - ((watchCommitments || 0) / 12);
  const financingCapacity = availableForFinancing * 300; // Rough estimate
  
  // Check if property price exceeds financing capacity
  useEffect(() => {
    if (watchPropertyPrice > financingCapacity && financingCapacity > 0) {
      setShowFinancingCapacityWarning(true);
    } else {
      setShowFinancingCapacityWarning(false);
    }
  }, [watchPropertyPrice, financingCapacity]);

  // Validate deposit amount - must be at least 25% of property price
  useEffect(() => {
    if (watchPropertyPrice && watchDepositAmount) {
      if (watchDepositAmount < watchPropertyPrice * 0.25) {
        setShowDepositWarning(true);
      } else {
        setShowDepositWarning(false);
      }
    }
  }, [watchDepositAmount, watchPropertyPrice]);

  // Make sure deposit amount cannot exceed property price
  useEffect(() => {
    if (watchDepositAmount > watchPropertyPrice) {
      form.setValue('depositAmount', watchPropertyPrice);
    }
  }, [watchDepositAmount, watchPropertyPrice, form]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about the property</h2>
        <p className="text-gray-600">
          Let's gather some details about the property you're looking to finance.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="propertyPrice"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Estimated property price
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      This is the total value of the property. In Diminishing Musharaka, you and Vrtu will co-own this property based on your contribution amounts.
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pl-8"
                      placeholder="800,000"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="depositAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Your initial contribution (deposit)
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      This is your share of the property at the start. The higher your initial contribution, the less you'll pay in rent and the faster you'll achieve full ownership.
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pl-8"
                      placeholder="200,000"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {watchPropertyPrice > 0 && watchDepositAmount > 0 && (
            <Card className="bg-emerald-50 border-emerald-100">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-emerald-800">Initial Ownership</span>
                      <span className="text-sm font-medium text-emerald-800">
                        {initialOwnershipPercentage.toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={initialOwnershipPercentage} className="h-2 bg-emerald-200" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-emerald-700">Your Share</p>
                      <p className="font-medium text-emerald-900">{formatCurrency(watchDepositAmount)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-emerald-700">Vrtu's Share</p>
                      <p className="font-medium text-emerald-900">{formatCurrency(watchPropertyPrice - watchDepositAmount)}</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-emerald-200">
                    <p className="text-sm text-emerald-700">Loan-to-Value Ratio (LVR)</p>
                    <p className="font-medium text-emerald-900">{lvrRatio.toFixed(1)}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <FormField
            control={form.control}
            name="propertyType"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Type</FormLabel>
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>This helps us estimate additional costs</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="appreciationRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  Expected property appreciation rate (% per year)
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      This is an estimate of how much your property might increase in value each year. The historical average in New Zealand is around 5-7% annually.
                    </TooltipContent>
                  </Tooltip>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pl-3 pr-8"
                      placeholder="3"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">%</span>
                  </div>
                </FormControl>
                <FormDescription>Historical average in New Zealand is 5-7%</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>
    </div>
  );
};

export default StepThree;
