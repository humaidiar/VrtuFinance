import React from 'react';
import { Link } from 'wouter';
import { 
  Shield, 
  DollarSign, 
  PiggyBank, 
  Home, 
  ChevronRight, 
  Users, 
  TrendingUp 
} from 'lucide-react';

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  link?: string;
  linkText?: string;
}

const FeatureGrid: React.FC = () => {
  const features: FeatureItem[] = [
    {
      icon: <Shield className="h-6 w-6 text-emerald-700" />,
      title: 'Shariah-Compliant',
      description: 'Our financing model adheres strictly to Islamic financial principles, avoiding interest (riba) completely.',
      link: '/how-it-works',
      linkText: 'Learn more'
    },
    {
      icon: <DollarSign className="h-6 w-6 text-emerald-700" />,
      title: 'Transparent Costs',
      description: 'Clear breakdown of all costs, fees, and payment structures so you know exactly what you're paying for.',
      link: '/calculator',
      linkText: 'See payment plans'
    },
    {
      icon: <PiggyBank className="h-6 w-6 text-emerald-700" />,
      title: 'Build Ownership',
      description: 'Gradually increase your home ownership over time through our diminishing musharaka structure.',
      link: '/how-it-works',
      linkText: 'Understand the process'
    },
    {
      icon: <Home className="h-6 w-6 text-emerald-700" />,
      title: 'Property Flexibility',
      description: 'Finance existing homes, new builds, or investment properties with tailored plans for each.',
      link: '/calculator',
      linkText: 'Calculate options'
    },
    {
      icon: <Users className="h-6 w-6 text-emerald-700" />,
      title: 'Expert Guidance',
      description: 'Our team of specialists will guide you through every step of the home financing process.',
      link: '/about#contact',
      linkText: 'Meet our team'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-emerald-700" />,
      title: 'Long-term Savings',
      description: 'Potentially save significantly compared to conventional interest-based mortgages over time.',
      link: '/calculator',
      linkText: 'See the comparison'
    }
  ];

  return (
    <div className="py-12">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600 mb-4">{feature.description}</p>
            {feature.link && (
              <Link href={feature.link}>
                <a className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center">
                  {feature.linkText}
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureGrid;
