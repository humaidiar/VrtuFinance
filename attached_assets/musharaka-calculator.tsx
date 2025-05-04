import React, { useState, useEffect } from 'react';
import { ChevronRight, Home, Calculator, ArrowRight, DollarSign, HelpCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface FormData {
  goal: string;
  location: string;
  income: number;
  savings: number;
  expenses: number;
  commitments: number;
  propertyPrice: number;
  depositAmount: number;
}

interface SimulationData {
  year: number;
  customerOwnershipPercentage: number;
  weeklyRental: number;
  yearlyRental: number;
  remainingProviderShare: number;
  yearlySharePayment: number;
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
  { id: 'investment', title: 'Investment', description: 'Building your property portfolio' },
  { id: 'new-home', title: 'New Home', description: 'Time for a bigger space' }
];

const MusharakaCalculator = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResults, setShowResults] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    goal: '',
    location: '',
    income: 100000,
    savings: 150000,
    expenses: 3000,
    commitments: 5000,
    propertyPrice: 800000,
    depositAmount: 200000
  });

  const [simulationData, setSimulationData] = useState<SimulationData[]>([]);
  const [totalRentPaid, setTotalRentPaid] = useState(0);
  const [totalSharesPaid, setTotalSharesPaid] = useState(0);
  const [yearsToFullOwnership, setYearsToFullOwnership] = useState(0);

  const updateFormData = (key: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const calculateSimulation = () => {
    const markup = 1.3; // 30% markup
    const providerAmount = formData.propertyPrice - formData.depositAmount;
    const providerShareWithMarkup = providerAmount * markup;
    const yearlyAdditionalPayment = Math.min(50000, (formData.income * 0.4) - (formData.expenses * 12) - formData.commitments);
    
    const data: SimulationData[] = [];
    let remainingProviderShare = providerShareWithMarkup;
    let customerOwnership = formData.depositAmount / formData.propertyPrice;
    let totalRent = 0;
    let totalShares = 0;
    let yearsNeeded = 0;
    const rentalRatePerYear = 3.5;
    
    // Generate data for each year
    for (let year = 0; year <= 30; year++) {
      if (remainingProviderShare <= 0) {
        yearsNeeded = year - 1;
        break;
      }
      
      const yearlyRental = (remainingProviderShare * (rentalRatePerYear / 100)) * (1 - customerOwnership);
      const weeklyRental = yearlyRental / 52;
      
      data.push({
        year,
        customerOwnershipPercentage: Number((customerOwnership * 100).toFixed(2)),
        weeklyRental: Number(weeklyRental.toFixed(2)),
        yearlyRental: Number(yearlyRental.toFixed(2)),
        remainingProviderShare: Number(remainingProviderShare.toFixed(2)),
        yearlySharePayment: yearlyAdditionalPayment
      });
      
      totalRent += yearlyRental;
      totalShares += yearlyAdditionalPayment;
      remainingProviderShare -= yearlyAdditionalPayment;
      
      if (remainingProviderShare > 0) {
        customerOwnership = (formData.propertyPrice - remainingProviderShare / markup) / formData.propertyPrice;
      } else {
        customerOwnership = 1;
      }
    }
    
    setSimulationData(data);
    setTotalRentPaid(totalRent);
    setTotalSharesPaid(totalShares);
    setYearsToFullOwnership(yearsNeeded);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-NZ', {
      style: 'currency',
      currency: 'NZD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const getFullProjection = () => {
    calculateSimulation();
    setShowResults(true);
  };

  const monthlyIncome = formData.income / 12;
  const availableForFinancing = monthlyIncome - formData.expenses - (formData.commitments / 12);
  const financingCapacity = availableForFinancing * 250; // Rough estimate

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {!showResults ? (
          <>
            {/* Header */}
            <header className="text-center mb-8">
              <h1 className="text-3xl font-bold text-emerald-700 mb-2">
                Your Diminishing Musharaka Journey
              </h1>
              <p className="text-gray-600 text-lg">
                Find the right Shariah-compliant path to homeownership
              </p>
            </header>

            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((step) => (
                  <div key={step} className="flex-1">
                    <div className="relative">
                      {step < 4 && (
                        <div 
                          className={`absolute left-1/2 top-1/2 w-full h-0.5 -translate-y-1/2 translate-x-4 ${
                            step < currentStep ? 'bg-emerald-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                      <div 
                        className={`relative w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-semibold ${
                          step < currentStep 
                            ? 'border-emerald-600 bg-emerald-600 text-white' 
                            : step === currentStep 
                            ? 'border-emerald-600 text-emerald-600' 
                            : 'border-gray-300 text-gray-300'
                        }`}
                      >
                        {step}
                      </div>
                    </div>
                    <div className="text-center mt-2 text-sm font-medium text-gray-600">
                      {step === 1 && 'Your Goals'}
                      {step === 2 && 'Your Finances'}
                      {step === 3 && 'Property Details'}
                      {step === 4 && 'Payment Plan'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Main Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              {/* Step 1: Your Goals */}
              {currentStep === 1 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What's bringing you here today?</h2>
                    <p className="text-gray-600">Let's understand your homeownership goals</p>
                  </div>

                  <div className="grid gap-4">
                    {goals.map((goal) => (
                      <label 
                        key={goal.id}
                        className={`
                          flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all
                          ${formData.goal === goal.id 
                            ? 'border-emerald-600 bg-emerald-50' 
                            : 'border-gray-200 hover:border-emerald-200'}
                        `}
                      >
                        <input
                          type="radio"
                          name="goal"
                          value={goal.id}
                          checked={formData.goal === goal.id}
                          onChange={(e) => updateFormData('goal', e.target.value)}
                          className="sr-only"
                        />
                        <div className="flex-1">
                          <span className="font-semibold text-gray-900">{goal.title}</span>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </label>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Where are you looking to buy?
                    </label>
                    <select
                      value={formData.location}
                      onChange={(e) => updateFormData('location', e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                    >
                      <option value="">Select location</option>
                      {LocationOptions.map((location) => (
                        <option key={location} value={location}>{location}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Your Finances */}
              {currentStep === 2 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your financial situation</h2>
                    <p className="text-gray-600">Let's get some details about your savings and income to help calculate what you can afford in your Diminishing Musharaka arrangement.</p>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        How much have you saved for your initial contribution? 
                        <span className="inline-flex items-center justify-center w-4 h-4 ml-1 bg-gray-300 rounded-full text-white text-xs">i</span>
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.savings}
                          onChange={(e) => updateFormData('savings', Number(e.target.value))}
                          className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="200,000"
                        />
                      </div>
                      <small className="text-gray-500 block mt-1">This will determine your initial ownership percentage</small>
                      <div className="bg-emerald-50 border border-emerald-100 p-3 rounded mt-2">
                        <p className="text-sm text-emerald-800">
                          Shariah-compliant financing typically requires a minimum initial contribution. A larger contribution means you'll own more of the property from the start and pay less in rent.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        What is your annual household income before tax? 
                        <span className="inline-flex items-center justify-center w-4 h-4 ml-1 bg-gray-300 rounded-full text-white text-xs">i</span>
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.income}
                          onChange={(e) => updateFormData('income', Number(e.target.value))}
                          className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="120,000"
                        />
                      </div>
                      <small className="text-gray-500 block mt-1">Include all sources of halal income</small>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        What are your monthly living expenses? 
                        <span className="inline-flex items-center justify-center w-4 h-4 ml-1 bg-gray-300 rounded-full text-white text-xs">i</span>
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.expenses}
                          onChange={(e) => updateFormData('expenses', Number(e.target.value))}
                          className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="3,000"
                        />
                      </div>
                      <small className="text-gray-500 block mt-1">Include food, utilities, transportation, etc.</small>
                    </div>

                    <div>
                      <label className="block font-medium text-gray-700 mb-2">
                        Do you have any existing financial commitments? 
                        <span className="inline-flex items-center justify-center w-4 h-4 ml-1 bg-gray-300 rounded-full text-white text-xs">i</span>
                      </label>
                      <div className="flex items-center">
                        <span className="absolute ml-3 text-gray-500">$</span>
                        <input
                          type="number"
                          value={formData.commitments}
                          onChange={(e) => updateFormData('commitments', Number(e.target.value))}
                          className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                          placeholder="10,000"
                        />
                      </div>
                      <small className="text-gray-500 block mt-1">Include car payments, education costs, other financing arrangements</small>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-lg p-4 border border-emerald-100">
                    <h3 className="font-semibold text-emerald-800 mb-3">Your Financial Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Initial Contribution:</span>
                        <span className="font-bold text-gray-900">{formatCurrency(formData.savings)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Monthly Income:</span>
                        <span className="font-bold text-gray-900">{formatCurrency(monthlyIncome)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Available for Home Financing:</span>
                        <span className="font-bold text-gray-900">{formatCurrency(availableForFinancing)}/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-medium text-gray-700">Estimated Financing Capacity:</span>
                        <span className="font-bold text-gray-900">Up to {formatCurrency(financingCapacity)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Your Property */}
              {currentStep === 3 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">About your property</h2>
                    <p className="text-gray-600">Let's estimate what you're looking to buy</p>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Estimated property price
                    </label>
                    <div className="flex items-center">
                      <span className="absolute ml-3 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.propertyPrice}
                        onChange={(e) => updateFormData('propertyPrice', Number(e.target.value))}
                        className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="800,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-medium text-gray-700 mb-2">
                      Your deposit amount
                    </label>
                    <div className="flex items-center">
                      <span className="absolute ml-3 text-gray-500">$</span>
                      <input
                        type="number"
                        value={formData.depositAmount}
                        onChange={(e) => updateFormData('depositAmount', Number(e.target.value))}
                        className="w-full p-3 pl-8 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        placeholder="200,000"
                      />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      ({((formData.depositAmount / formData.propertyPrice) * 100).toFixed(1)}% of property value)
                    </p>
                  </div>

                  <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                    <p className="text-sm text-emerald-800">
                      With a {formatCurrency(formData.depositAmount)} deposit, you'll own {((formData.depositAmount / formData.propertyPrice) * 100).toFixed(1)}% of the property from day one.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 4: Your Plan */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Diminishing Musharaka Plan</h2>
                    <p className="text-gray-600">Here's what your journey could look like</p>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="font-semibold text-gray-900 mb-4">Monthly Payment Breakdown</h3>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Your share buyout</span>
                        <span className="font-bold text-gray-900">{formatCurrency(availableForFinancing * 0.6)}/month</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Rent on remaining share</span>
                        <span className="font-bold text-gray-900">{formatCurrency(availableForFinancing * 0.4)}/month</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-gray-900">Total monthly payment</span>
                          <span className="font-bold text-gray-900 text-lg">{formatCurrency(availableForFinancing)}/month</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-lg p-6">
                    <h3 className="font-semibold text-emerald-900 mb-2">How it works</h3>
                    <ul className="space-y-2 text-sm text-emerald-800">
                      <li>• You start owning {((formData.depositAmount / formData.propertyPrice) * 100).toFixed(1)}% of the property</li>
                      <li>• Your rent decreases as you buy more shares</li>
                      <li>• You'll own 100% in approximately 20 years</li>
                      <li>• Total cost: {formatCurrency(formData.propertyPrice * 1.3)} (vs property value: {formatCurrency(formData.propertyPrice)})</li>
                    </ul>
                  </div>

                  <div className="text-center">
                    <button 
                      onClick={getFullProjection}
                      className="bg-emerald-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                    >
                      Get Your Full Projection
                    </button>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-12">
                <button
                  onClick={prevStep}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    currentStep === 1 
                      ? 'invisible' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  ← Back
                </button>
                <button
                  onClick={nextStep}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    currentStep === 4
                      ? 'hidden'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}
                >
                  Continue →
                </button>
              </div>
            </div>
          </>
        ) : (
          /* Full Results View */
          <div>
            <button
              onClick={() => setShowResults(false)}
              className="mb-6 text-emerald-600 flex items-center hover:text-emerald-700"
            >
              ← Back to Calculator
            </button>

            <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
              <h1 className="text-3xl font-bold text-emerald-700 mb-6">Your Diminishing Musharaka Projection</h1>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Input Summary */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-emerald-600">Your Property Details</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Property Value:</span>
                      <span className="font-medium">{formatCurrency(formData.propertyPrice)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Your Initial Contribution:</span>
                      <span className="font-medium">{formatCurrency(formData.depositAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider Contribution:</span>
                      <span className="font-medium">{formatCurrency(formData.propertyPrice - formData.depositAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provider Share (with 30% markup):</span>
                      <span className="font-medium">{formatCurrency((formData.propertyPrice - formData.depositAmount) * 1.3)}</span>
                    </div>
                  </div>
                  
                  <div className="bg-emerald-50 p-4 rounded-lg mt-8">
                    <h3 className="font-semibold text-emerald-700 mb-2">Summary</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Time to Full Ownership:</span>
                        <span className="font-medium">{yearsToFullOwnership} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Rent Paid:</span>
                        <span className="font-medium">{formatCurrency(totalRentPaid)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Shares Paid:</span>
                        <span className="font-medium">{formatCurrency(totalSharesPaid)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Graph Section */}
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-emerald-600">Ownership & Payment Visualization</h2>
                  
                  <div className="h-64 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={simulationData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottomRight', offset: -5 }} />
                        <YAxis yAxisId="left" orientation="left" label={{ value: 'Ownership %', angle: -90, position: 'insideLeft' }} />
                        <YAxis yAxisId="right" orientation="right" label={{ value: 'Weekly Rental ($)', angle: 90, position: 'insideRight' }} />
                        <Tooltip formatter={(value, name) => {
                          if (name === 'customerOwnershipPercentage') return [`${value}%`, 'Ownership'];
                          if (name === 'weeklyRental') return [`$${value}`, 'Weekly Rental'];
                          return [value, name];
                        }} />
                        <Legend />
                        <Line yAxisId="left" type="monotone" dataKey="customerOwnershipPercentage" name="Ownership %" stroke="#10b981" activeDot={{ r: 8 }} />
                        <Line yAxisId="right" type="monotone" dataKey="weeklyRental" name="Weekly Rental" stroke="#3b82f6" />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
              
              <h2 className="text-xl font-semibold mb-4 text-emerald-600">Yearly Payment Breakdown</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Year</th>
                      <th className="p-2 text-right">Ownership</th>
                      <th className="p-2 text-right">Weekly Rent</th>
                      <th className="p-2 text-right">Share Payment</th>
                      <th className="p-2 text-right">Remaining Share</th>
                    </tr>
                  </thead>
                  <tbody>
                    {simulationData.slice(0, 10).map((item) => (
                      <tr key={item.year} className="border-b">
                        <td className="p-2">{item.year}</td>
                        <td className="p-2 text-right">{item.customerOwnershipPercentage}%</td>
                        <td className="p-2 text-right">{formatCurrency(item.weeklyRental)}</td>
                        <td className="p-2 text-right">{formatCurrency(item.yearlySharePayment)}</td>
                        <td className="p-2 text-right">{formatCurrency(item.remainingProviderShare)}</td>
                      </tr>
                    ))}
                    {simulationData.length > 10 && (
                      <tr>
                        <td colSpan={5} className="p-2 text-center text-gray-500">Showing first 10 years</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-8 bg-emerald-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-2 text-emerald-700">How Diminishing Musharaka Works</h2>
                <p className="mb-2">In this Shariah-compliant home financing arrangement:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>You and the provider jointly purchase the property</li>
                  <li>Provider's contribution is marked up by 30% (representing their profit)</li>
                  <li>You pay rent only on the provider's remaining share, which decreases as you buy more shares</li>
                  <li>Rental payments decrease proportionally as your ownership increases</li>
                  <li>You can accelerate ownership by increasing your additional share payments</li>
                </ul>
                <p className="mt-2 italic text-sm">Use the sliders above to simulate different scenarios and find the best payment strategy for your situation.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MusharakaCalculator;