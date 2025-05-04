import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">
          Start Your Journey Today
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Ready for interest-free Home Financing? Take a few minutes to calculate your options.
        </p>
        <Link href="/calculator">
          <Button className="bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-8 text-base">
            Get Started
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CTASection;
