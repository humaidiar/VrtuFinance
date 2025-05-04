import React from 'react';
import Hero from '@/components/home/Hero';
import ThreeStepProcess from '@/components/home/ThreeStepProcess';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import FinanceFeatures from '@/components/home/FinanceFeatures';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';
import MusharakaCalculator from '@/components/calculator/MusharakaCalculator';
import SectionHeading from '@/components/ui/section-heading';

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <ThreeStepProcess />
      <WhyChooseUs />
      
      {/* Calculator Section */}
      <section className="py-16 bg-white" id="calculator">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Unveiling More Powerful Finance Features"
            subtitle="Discover how Vrtu can make your journey better, helping you achieve your homeownership dreams with clarity and peace of mind."
            center={true}
          />
          
          <MusharakaCalculator />
          
          <FinanceFeatures />
        </div>
      </section>
      
      <FAQ />
      <CTASection />
    </>
  );
};

export default Home;
