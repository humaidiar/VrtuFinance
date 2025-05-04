import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';
import SectionHeading from '@/components/ui/section-heading';

const FAQ: React.FC = () => {
  const faqItems = [
    {
      question: 'What is Shariah-compliant home financing?',
      answer: 'Shariah-compliant home financing follows Islamic financial principles, avoiding interest (riba). Instead of lending money with interest, Vrtu uses Diminishing Musharaka (co-ownership) where we purchase the property together. You gradually buy our share while paying rent for the portion you don\'t yet own.'
    },
    {
      question: 'How is Diminishing Musharaka different than a conventional mortgage?',
      answer: 'Unlike conventional mortgages which are debt-based with interest, Diminishing Musharaka is an equity-based partnership. You and Vrtu jointly own the property, with your ownership portion increasing over time. You pay rent on the portion you don\'t own yet, and separately purchase more ownership units until you own 100%. This structure avoids interest (riba) while achieving the same goal of homeownership.'
    },
    {
      question: 'Are there any "hidden fees"?',
      answer: 'No, transparency is one of our core values. We clearly disclose all costs upfront - including property valuation, legal fees, administration charges, and our profit markup on our share. There are no application fees, early payment penalties, or other hidden costs. Our calculator shows you exactly what you\'ll pay and how your ownership increases over time.'
    },
    {
      question: 'How do I get started?',
      answer: 'Getting started is easy: 1) Use our online calculator to see what you can afford, 2) Book a consultation with our team, 3) Complete our application form with your financial details, 4) Receive pre-approval, 5) Find your perfect home, and 6) Complete the co-ownership agreement. Our team will guide you through every step of the process.'
    },
    {
      question: 'Can I choose which financing method works for me?',
      answer: 'At Vrtu, we focus exclusively on the Diminishing Musharaka model as it offers the most transparent and Shariah-compliant path to homeownership. We\'ve found this structure works well for most clients seeking ethical home financing. During your consultation, we\'ll customize aspects like payment terms, profit rates, and initial contribution to suit your specific financial situation.'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Have more questions? We've got you!" 
          center={true}
        />

        <Accordion type="single" collapsible className="space-y-4">
          {faqItems.map((item, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-gray-200 rounded-lg bg-white overflow-hidden"
            >
              <AccordionTrigger className="p-4 md:p-6 hover:no-underline">
                <span className="font-medium text-gray-900 text-left">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="p-4 pt-0 md:p-6 md:pt-0 border-t border-gray-100">
                <p className="text-gray-600">{item.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
