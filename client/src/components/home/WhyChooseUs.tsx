import React from 'react';
import { ShieldCheck, DollarSign, Info } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: <ShieldCheck className="h-6 w-6 text-emerald-700" />,
      title: 'Shariah-Compliant Structure',
      description: 'True partnership model that avoids interest (riba) and adheres to Islamic financial principles.'
    },
    {
      icon: <DollarSign className="h-6 w-6 text-emerald-700" />,
      title: 'Transparent Terms',
      description: 'Clear breakdown of payments, fees, and ownership progression with no hidden costs.'
    },
    {
      icon: <InfoIcon />,
      title: 'Flexible Solutions',
      description: 'Tailored plans for first-time buyers, investors, and those looking to refinance existing properties.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Why Choose Us for Your Home Financing?" 
          subtitle="We make sure that every agreement is accessible for both parties, ensuring that neither side is economically disadvantaged."
          center={true}
        />
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
