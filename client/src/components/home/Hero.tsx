import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

const Hero: React.FC = () => {
  return (
    <section className="bg-white py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Make a positive impact with every step you take
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Our financing solutions provide the right paths and open doors while adhering to Shariah principles, 
            making homeownership accessible and ethical.
          </p>
          <Link href="/calculator">
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white py-3 px-8 text-base">
              Get Started
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-lg font-semibold mb-3">Share in the Value</h3>
            <p className="text-gray-600 mb-4">
              A true partnership where you and Vrtu own portions of your home, with your ownership increasing over time.
            </p>
            <Link href="/how-it-works" className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center">
              Learn more 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          <div className="bg-gray-100 rounded-lg p-8">
            <h3 className="text-lg font-semibold mb-3">Find Your Way</h3>
            <p className="text-gray-600 mb-4">
              Our unique home financing solutions are specially designed to meet the needs of everyday New Zealanders.
            </p>
            <Link href="/calculator" className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center">
              Explore options
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
