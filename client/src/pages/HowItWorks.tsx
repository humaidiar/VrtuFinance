import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SectionHeading from '@/components/ui/section-heading';
import { 
  Handshake, 
  PiggyBank, 
  Home, 
  Calendar, 
  DollarSign, 
  ChevronRight,
  CheckCircle2,
  Ban
} from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Understanding Diminishing Musharaka
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Learn how our Shariah-compliant home financing works and why it's a better alternative to conventional interest-based mortgages.
            </p>
            <Link href="/calculator">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                Try Our Calculator
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What is Diminishing Musharaka */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="What is Diminishing Musharaka?"
            subtitle="A Shariah-compliant co-ownership arrangement that provides an ethical path to full homeownership."
            center={true}
          />

          <div className="mt-12 grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">The Co-Ownership Model</h3>
              <p className="text-gray-600 mb-4">
                Diminishing Musharaka (decreasing partnership) is a Shariah-compliant financing arrangement where you and Vrtu jointly purchase a property. Initially, both parties own a portion of the property, with your ownership gradually increasing over time.
              </p>
              <p className="text-gray-600 mb-6">
                This arrangement consists of two distinct components that are kept separate to ensure compliance with Islamic financial principles:
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <Home className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Ownership (Shirkat-ul-Milk)</h4>
                    <p className="text-gray-600">
                      You and Vrtu own units or shares of the property. Your initial contribution (deposit) determines your starting ownership percentage.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <DollarSign className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-gray-900">Lease (Ijara)</h4>
                    <p className="text-gray-600">
                      You pay rent to Vrtu for using their portion of the property. As your ownership increases, the rent amount decreases proportionately.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-emerald-50 rounded-lg p-6 md:p-8">
              <h3 className="text-xl font-semibold mb-4 text-emerald-700">How Ownership Increases</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      You make an initial contribution (deposit) to purchase your starting share of the property.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      Vrtu purchases the remaining units/shares of the property.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      You make regular payments consisting of two distinct parts:
                    </p>
                    <ul className="mt-2 space-y-2 ml-4 list-disc text-gray-700">
                      <li>Rent payment for using Vrtu's portion</li>
                      <li>Additional payment to purchase more units from Vrtu</li>
                    </ul>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      As you purchase more units from Vrtu, your ownership percentage increases and the rent portion decreases.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    5
                  </div>
                  <div className="ml-4">
                    <p className="text-gray-700">
                      Eventually, you own 100% of the property and the partnership ends.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison with Conventional Mortgages */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How Does It Compare to Conventional Mortgages?"
            subtitle="Understanding the key differences between Diminishing Musharaka and interest-based financing"
            center={true}
          />

          <div className="mt-12">
            <Tabs defaultValue="structure" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="structure">Structure</TabsTrigger>
                <TabsTrigger value="payments">Payments</TabsTrigger>
                <TabsTrigger value="ownership">Ownership</TabsTrigger>
                <TabsTrigger value="risks">Risks & Benefits</TabsTrigger>
              </TabsList>
              
              <div className="mt-8">
                <TabsContent value="structure" className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Financing Structure</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader className="bg-emerald-50">
                        <CardTitle className="text-emerald-700">Diminishing Musharaka</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Co-ownership arrangement where both parties own actual shares of the property</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Rent and acquisition payments kept separate</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Equity-based partnership, not debt-based loan</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-gray-50">
                        <CardTitle className="text-gray-700">Conventional Mortgage</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Debt-based arrangement where the bank loans money with interest</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Interest payments are forbidden in Islamic finance (riba)</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Bank holds legal title until loan is fully paid off</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="payments" className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Payment Structure</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader className="bg-emerald-50">
                        <CardTitle className="text-emerald-700">Diminishing Musharaka</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Rent portion decreases as your ownership increases</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Clear distinction between rent and acquisition payments</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">One-time fixed markup on Vrtu's share instead of ongoing compound interest</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-gray-50">
                        <CardTitle className="text-gray-700">Conventional Mortgage</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Early payments heavily weighted toward interest rather than principal</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Interest compounds over time, potentially costing much more</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Interest rates may change over time, creating uncertainty</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="ownership" className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Ownership &amp; Equity</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader className="bg-emerald-50">
                        <CardTitle className="text-emerald-700">Diminishing Musharaka</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Real ownership from day one, with clear percentage of property owned</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Each payment directly increases your ownership percentage</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Shared benefit from property appreciation</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-gray-50">
                        <CardTitle className="text-gray-700">Conventional Mortgage</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Technically don't own the property until loan is paid off</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Equity builds slowly in early years due to interest-heavy payments</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Bank can foreclose if payments are missed</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
                
                <TabsContent value="risks" className="bg-white p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Risks &amp; Benefits</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <Card>
                      <CardHeader className="bg-emerald-50">
                        <CardTitle className="text-emerald-700">Diminishing Musharaka</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Ethical, Shariah-compliant financing solution</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Potential for significant long-term cost savings</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">More flexibility for early repayment without penalties</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">True risk-sharing partnership model</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="bg-gray-50">
                        <CardTitle className="text-gray-700">Conventional Mortgage</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6 space-y-4">
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Not compliant with Islamic financial principles</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Risk of interest rate increases during variable rate periods</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">Early repayment penalties often apply</p>
                          </div>
                        </div>
                        <div className="flex items-start">
                          <Ban className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                          <div className="ml-3">
                            <p className="text-gray-700">All risk borne by the borrower</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How to Get Started"
            subtitle="Your journey to ethical home financing in just a few simple steps"
            center={true}
          />

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 relative">
              <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Calculate Your Options</h3>
              <p className="text-gray-600 mb-5">
                Use our interactive calculator to explore different financing scenarios based on your income, savings, and property preferences.
              </p>
              <Link href="/calculator">
                <a className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center">
                  Try the calculator
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 relative">
              <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Book a Consultation</h3>
              <p className="text-gray-600 mb-5">
                Schedule a meeting with our Shariah-compliant finance experts to discuss your specific needs and get personalized advice.
              </p>
              <Link href="/about#contact">
                <a className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center">
                  Contact us
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6 md:p-8 relative">
              <div className="w-10 h-10 bg-emerald-700 text-white rounded-full flex items-center justify-center font-bold mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Application & Approval</h3>
              <p className="text-gray-600 mb-5">
                Complete our straightforward application process and receive a decision quickly. We'll guide you through document requirements.
              </p>
              <Link href="/about#process">
                <a className="text-emerald-700 font-medium hover:text-emerald-800 inline-flex items-center">
                  Learn about the process
                  <ChevronRight className="h-4 w-4 ml-1" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Explore Your Ethical Home Financing Options?
          </h2>
          <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
            Take the first step towards Shariah-compliant homeownership today. Our calculator will show you how Diminishing Musharaka can work for your situation.
          </p>
          <Link href="/calculator">
            <Button className="bg-white text-emerald-700 hover:bg-emerald-50 py-3 px-8 text-base">
              Calculate Your Options
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
