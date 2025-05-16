import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { calculatorFormSchema, type CalculatorFormData, type CalculationResult } from '@shared/schema';
import { Button } from '@/components/ui/button';
import StepOne from './StepOne';
import StepTwo from './StepTwo';
import StepThree from './StepThree';
import StepFour from './StepFour';
import FullProjection from './FullProjection';
import { apiRequest } from '@/lib/queryClient';

const MusharakaCalculator: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const form = useForm<CalculatorFormData>({
    resolver: zodResolver(calculatorFormSchema),
    defaultValues: {
      goal: 'first-home',
      location: '',
      income: 100000,
      savings: 150000,
      expenses: 3000,
      commitments: 5000,
      propertyPrice: 800000,
      depositAmount: 200000, // This is 25% of property price
      term: 25,
      appreciationRate: 3,
      propertyType: 'existing',
      bedroomCount: 3,
      hasBuilderReport: false,
    },
  });

  const { watch, handleSubmit, formState } = form;
  const watchAllFields = watch();
  
  // Process calculation results
  const processCalculation = async (data: CalculatorFormData) => {
    try {
      setIsCalculating(true);
      const response = await apiRequest('POST', '/api/calculate', data);
      const result = await response.json();
      setCalculationResult(result);
      setIsCalculating(false);
      return result;
    } catch (error) {
      console.error('Error calculating results:', error);
      setIsCalculating(false);
      // We could use toast to show error message
      return null;
    }
  };

  const nextStep = async () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 4) {
      const data = form.getValues();
      const results = await processCalculation(data);
      if (results) {
        setShowResults(true);
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Return to calculator from results view
  const backToCalculator = () => {
    setShowResults(false);
  };

  // Steps completion status
  const isStepOneComplete = !!watchAllFields.goal && !!watchAllFields.location;
  const isStepTwoComplete = !!watchAllFields.income && !!watchAllFields.savings;
  const isStepThreeComplete = !!watchAllFields.propertyPrice && !!watchAllFields.depositAmount;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 max-w-4xl mx-auto overflow-hidden">
      {!showResults ? (
        <div className="p-6 md:p-10">
          <header className="text-center mb-8">
            <h3 className="text-2xl font-bold text-emerald-700 mb-2">
              Your Diminishing Musharaka Journey
            </h3>
            <p className="text-gray-600 text-lg">
              Find the right Shariah-compliant path to homeownership
            </p>
          </header>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="flex items-center justify-between">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex-1 relative">
                  {/* Connecting lines between circles */}
                  {step < 4 && (
                    <div 
                      className={`absolute top-4 left-0 right-0 h-0.5 z-0 ${
                        step < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                      }`}
                      style={{ width: 'calc(100% - 16px)', left: '50%', transform: 'translateX(-25%)' }}
                    />
                  )}
                  
                  {/* Step circle with number */}
                  <div className="flex flex-col items-center relative z-10">
                    <div 
                      className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                        step < currentStep 
                          ? 'border-emerald-600 bg-emerald-600 text-white' 
                          : step === currentStep 
                          ? 'border-emerald-600 text-emerald-600' 
                          : 'border-gray-300 text-gray-300'
                      }`}
                    >
                      {step}
                    </div>
                    <div className="text-center mt-2 text-xs sm:text-sm font-medium text-gray-600">
                      {step === 1 && 'Your Goals'}
                      {step === 2 && 'Your Finances'}
                      {step === 3 && 'Property Details'}
                      {step === 4 && 'Payment Plan'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form steps */}
          <form>
            {currentStep === 1 && <StepOne form={form} />}
            {currentStep === 2 && <StepTwo form={form} />}
            {currentStep === 3 && <StepThree form={form} />}
            {currentStep === 4 && <StepFour form={form} calculationResult={calculationResult} />}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`text-emerald-700 border-emerald-700 hover:bg-emerald-50 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Back
              </Button>
              
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !isStepOneComplete) ||
                  (currentStep === 2 && !isStepTwoComplete) ||
                  (currentStep === 3 && !isStepThreeComplete) ||
                  isCalculating
                }
                className="bg-emerald-700 hover:bg-emerald-800 text-white"
              >
                {currentStep < 4 ? 'Continue' : 'Get Your Full Projection'}
                {isCalculating ? (
                  <span className="ml-2 animate-spin">...</span>
                ) : (
                  <ArrowRight className="ml-2 h-4 w-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      ) : (
        <FullProjection 
          result={calculationResult!} 
          formData={watchAllFields}
          onBack={backToCalculator} 
        />
      )}
    </div>
  );
};

export default MusharakaCalculator;
