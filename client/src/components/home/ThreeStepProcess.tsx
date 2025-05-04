import React from 'react';
import SectionHeading from '@/components/ui/section-heading';

const ThreeStepProcess: React.FC = () => {
  const steps = [
    {
      number: 1,
      title: 'Book a Consultation',
      description: 'Meet with our experts to discuss your needs, goals, and eligibility for Shariah-compliant financing.'
    },
    {
      number: 2,
      title: 'Choose Your Plan',
      description: 'Select a Diminishing Musharaka plan that aligns with your financial goals and homeownership timeline.'
    },
    {
      number: 3,
      title: 'Start Your Journey',
      description: 'Begin your path to full ownership with transparent payments and ongoing support.'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Our Easy Three-Step Home Ownership Process" 
          center={true}
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="bg-gray-50 rounded-lg p-6 md:p-8 relative">
              <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThreeStepProcess;
