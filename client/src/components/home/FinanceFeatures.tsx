import React from 'react';
import { Link } from 'wouter';
import { BookOpen, Calculator, HeartHandshake } from 'lucide-react';
import SectionHeading from '@/components/ui/section-heading';

const FinanceFeatures: React.FC = () => {
  const features = [
    {
      icon: <BookOpen className="h-6 w-6 text-emerald-700" />,
      title: 'Shariah Finance Education',
      description: 'Learn about Islamic financial principles and why Diminishing Musharaka is the ethical choice for homeownership.',
      link: '/how-it-works',
      linkText: 'Learn more'
    },
    {
      icon: <Calculator className="h-6 w-6 text-emerald-700" />,
      title: 'Online Finance Calculator',
      description: 'Explore personalized financing options, payment breakdowns, and ownership progression with our interactive tools.',
      link: '/calculator',
      linkText: 'Try calculator'
    },
    {
      icon: <HeartHandshake className="h-6 w-6 text-emerald-700" />,
      title: 'Purchase Guidance',
      description: 'Get personalized assistance throughout your home buying journey with our expert advisors.',
      link: '/about#contact',
      linkText: 'Get assistance'
    }
  ];

  return (
    <div className="grid md:grid-cols-3 gap-8 mt-16">
      {features.map((feature, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-6 md:p-8">
          <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
            {feature.icon}
          </div>
          <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
          <p className="text-gray-600">{feature.description}</p>
          <Link href={feature.link} className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center mt-4">
            {feature.linkText}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default FinanceFeatures;
