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
          <div className="mb-10 px-4">
            <div className="border rounded-lg">
              <div className="flex">
                {/* Step 1 */}
                <div className={`flex-1 border-r p-4 ${currentStep === 1 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      currentStep > 1 ? 'bg-indigo-600' : currentStep === 1 ? 'bg-indigo-600' : 'bg-gray-300'
                    }`}>
                      {currentStep > 1 ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>01</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Your Goals</h3>
                      <p className="text-gray-500 text-sm">Vitae sed mi luctus laoreet.</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className={`flex-1 border-r p-4 ${currentStep === 2 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > 2 ? 'bg-indigo-600 text-white' : currentStep === 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > 2 ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>02</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Your Finances</h3>
                      <p className="text-gray-500 text-sm">Cursus semper viverra.</p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className={`flex-1 border-r p-4 ${currentStep === 3 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > 3 ? 'bg-indigo-600 text-white' : currentStep === 3 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {currentStep > 3 ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <span>03</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Property Details</h3>
                      <p className="text-gray-500 text-sm">Penatibus eu quis ante.</p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className={`flex-1 p-4 ${currentStep === 4 ? 'bg-white' : 'bg-gray-50'}`}>
                  <div className="flex gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep > 4 ? 'bg-indigo-600 text-white' : currentStep === 4 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}>
                      <span>04</span>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm">Payment Plan</h3>
                      <p className="text-gray-500 text-sm">Tempus semper viverra.</p>
                    </div>
                  </div>
                </div>
              </div>
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
