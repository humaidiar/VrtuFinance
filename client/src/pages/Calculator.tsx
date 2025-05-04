import React from 'react';
import MusharakaCalculator from '@/components/calculator/MusharakaCalculator';
import SectionHeading from '@/components/ui/section-heading';

const Calculator: React.FC = () => {
  return (
    <div className="bg-gray-50 py-12 md:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Diminishing Musharaka Calculator"
          subtitle="Explore our Shariah-compliant home financing calculator to understand your payment structure, ownership progression, and total cost."
          center={true}
          className="mb-10"
        />
        
        <MusharakaCalculator />
        
        <div className="mt-16 bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Understanding Your Results</h2>
          <div className="space-y-6 text-gray-600">
            <p>
              Our Diminishing Musharaka calculator provides a transparent breakdown of your home financing journey. 
              The results show how your ownership percentage increases over time as you make payments.
            </p>
            
            <div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">Key Components</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>
                  <span className="font-medium text-gray-800">Monthly Payment:</span> Your total monthly payment, which consists of rent and acquisition components.
                </li>
                <li>
                  <span className="font-medium text-gray-800">Rent Component:</span> This is what you pay for using the portion of the property owned by Vrtu. This amount decreases as your ownership increases.
                </li>
                <li>
                  <span className="font-medium text-gray-800">Acquisition Component:</span> This is the amount you pay to purchase Vrtu's share of the property, increasing your ownership over time.
                </li>
                <li>
                  <span className="font-medium text-gray-800">Ownership Timeline:</span> Shows how your ownership percentage increases year by year until you reach 100% ownership.
                </li>
              </ul>
            </div>
            
            <div className="bg-emerald-50 p-6 rounded-lg">
              <h3 className="text-lg font-medium text-emerald-800 mb-2">Shariah Compliance</h3>
              <p className="text-emerald-700">
                Our financing structure separates the rent payment (which is permissible in Islamic finance) from the acquisition 
                of ownership shares. This structure has been reviewed and approved by Shariah scholars, ensuring that it adheres to 
                Islamic financial principles and avoids interest (riba).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
