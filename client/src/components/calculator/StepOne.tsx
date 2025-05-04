import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { ChevronRight } from 'lucide-react';
import { 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  Form,
  FormMessage 
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { type CalculatorFormData } from '@shared/schema';

interface StepOneProps {
  form: UseFormReturn<CalculatorFormData>;
}

const LocationOptions = [
  'Auckland',
  'Wellington',
  'Christchurch',
  'Hamilton',
  'Dunedin',
  'Tauranga',
  'Napier',
  'Palmerston North',
  'Nelson',
  'Rotorua'
];

const goals = [
  { id: 'first-home', title: 'First Home', description: 'Ready to own your first place' },
  { id: 'investment', title: 'Investment Property', description: 'Building your property portfolio' },
  { id: 'new-home', title: 'New Home', description: 'Time for a bigger space' },
  { id: 'refinancing', title: 'Refinancing', description: 'Better terms for your current property' }
];

const StepOne: React.FC<StepOneProps> = ({ form }) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What's bringing you here today?</h2>
        <p className="text-gray-600">Let's understand your homeownership goals</p>
      </div>

      <Form {...form}>
        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem className="space-y-4">
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid gap-4"
                >
                  {goals.map((goal) => (
                    <FormItem key={goal.id} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem 
                          value={goal.id} 
                          id={goal.id}
                          className="sr-only"
                        />
                      </FormControl>
                      <label
                        htmlFor={goal.id}
                        className={`
                          flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all w-full
                          ${field.value === goal.id 
                            ? 'border-emerald-600 bg-emerald-50' 
                            : 'border-gray-200 hover:border-emerald-200'}
                        `}
                      >
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900">{goal.title}</span>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
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
          name="location"
          render={({ field }) => (
            <FormItem className="mt-6">
              <FormLabel className="block text-sm font-medium text-gray-700 mb-2">
                Where are you looking to buy?
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full p-3 h-auto text-base">
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {LocationOptions.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </div>
  );
};

export default StepOne;
