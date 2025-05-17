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

          {/* Stepper */}
          <div className="mb-28 px-8">
            <div className="relative flex items-center justify-between">
              {/* Connecting lines */}
              <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0"></div>
              
              {/* Steps */}
              {[
                { number: 1, title: 'Step 1', description: 'Your Goals', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
                { number: 2, title: 'Step 2', description: 'Your Finances', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                { number: 3, title: 'Step 3', description: 'Property Details', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg> },
                { number: 4, title: 'Step 4', description: 'Payment Plan', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg> }
              ].map((step) => (
                <div key={step.number} className="relative z-10 flex flex-col items-center">
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      step.number < currentStep 
                        ? 'bg-emerald-700 text-white' 
                        : step.number === currentStep 
                        ? 'bg-emerald-800 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                    onClick={() => step.number < currentStep && setCurrentStep(step.number)}
                    style={{ cursor: step.number < currentStep ? 'pointer' : 'default' }}
                  >
                    {step.icon}
                  </div>
                  
                  <div className="absolute -bottom-[4.5rem] w-max text-center">
                    <p className={`font-semibold text-base ${
                      step.number === currentStep ? 'text-gray-800' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </p>
                    <p className={`font-normal ${
                      step.number === currentStep ? 'text-gray-700' : 'text-gray-400'
                    }`}>
                      {step.description}
                    </p>
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
            <div className="flex justify-between mt-16">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-2.5 font-medium border-2 ${
                  currentStep === 1 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-gray-800'
                }`}
              >
                PREV
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
                className={`px-8 py-2.5 font-medium ${currentStep < 4 ? 'bg-gray-900 hover:bg-gray-800' : 'bg-emerald-700 hover:bg-emerald-800'} text-white`}
              >
                {isCalculating ? (
                  <span className="animate-spin">...</span>
                ) : (
                  currentStep < 4 ? 'NEXT' : 'CALCULATE'
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
