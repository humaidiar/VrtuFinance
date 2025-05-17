import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { InfoIcon, HelpCircle, PiggyBank, DollarSign } from 'lucide-react';
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { type CalculatorFormData } from '@shared/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StepTwoProps {
  form: UseFormReturn<CalculatorFormData>;
}

const StepTwo: React.FC<StepTwoProps> = ({ form }) => {
  const watchIncome = form.watch('income');
  const watchExpenses = form.watch('expenses');
  const watchCommitments = form.watch('commitments');
  
  // Calculate financial health indicators
  const monthlyIncome = watchIncome ? watchIncome / 12 : 0;
  const availableForFinancing = monthlyIncome - (watchExpenses || 0) - ((watchCommitments || 0) / 12);
  const financingCapacity = availableForFinancing * 300; // Rough estimate

  // Debt-to-income ratio
  const dti = (((watchExpenses || 0) * 12) + (watchCommitments || 0)) / (watchIncome || 1);
  
  // Affordability score
  let affordabilityScore = "medium";
  if (dti < 0.3) affordabilityScore = "high";
  if (dti > 0.5) affordabilityScore = "low";

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
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your financial situation</h2>
        <p className="text-gray-600">
          Let's get some details about your savings and income to help calculate what you can afford in your Diminishing Musharaka arrangement.
        </p>
      </div>

      <Form {...form}>
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="income"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1">
                  What is your annual household income before tax?
                  <Tooltip>
                    <TooltipTrigger>
                      <HelpCircle className="h-4 w-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      Include all sources of halal income. For Diminishing Musharaka calculation, we need your total annual income.
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
                      placeholder="120,000"
                    />
                  </div>
                </FormControl>
                <FormDescription>Include all sources of halal income</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />



          <FormField
            control={form.control}
            name="expenses"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monthly living expenses</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pl-8"
                      placeholder="3,000"
                    />
                  </div>
                </FormControl>
                <FormDescription>Food, utilities, transportation, etc.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="commitments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Existing financial commitments/debts (annual)</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                    <Input
                      {...field}
                      type="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="pl-8"
                      placeholder="5,000"
                    />
                  </div>
                </FormControl>
                <FormDescription>Car payments, student loans, other financing, etc.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </Form>

      {/* Financial Summary */}
      {watchIncome > 0 && (
        <Card className="mt-8 bg-gray-50">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg text-gray-800">Financial Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Monthly Available for Financing</p>
                <p className="font-medium">{formatCurrency(availableForFinancing)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Estimated Financing Capacity</p>
                <p className="font-medium">{formatCurrency(financingCapacity)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Affordability Score</p>
                <Badge 
                  className={`
                    mt-1 text-white 
                    ${affordabilityScore === 'high' ? 'bg-emerald-500' : 
                      affordabilityScore === 'medium' ? 'bg-amber-500' : 'bg-red-500'}
                  `}
                >
                  {affordabilityScore === 'high' ? 'Strong' : 
                    affordabilityScore === 'medium' ? 'Moderate' : 'Limited'}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StepTwo;
