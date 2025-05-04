import React from 'react';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent,  
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import SectionHeading from '@/components/ui/section-heading';
import { 
  UserCircle2, 
  Mail, 
  Phone, 
  MessageSquare,
  BookOpen,
  BadgeCheck,
  Users,
  Building
} from 'lucide-react';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().optional(),
  message: z.string().min(10, "Please provide more details in your message."),
  interested_in: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const About: React.FC = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      interested_in: "Diminishing Musharaka",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      await apiRequest("POST", "/api/contact", data);
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
        variant: "default",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Something went wrong.",
        description: "Your message couldn't be sent. Please try again later.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              About Vrtu
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              New Zealand's leading provider of Shariah-compliant home financing solutions, making ethical homeownership accessible to all Kiwis.
            </p>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="py-16 bg-white" id="mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At Vrtu, we believe that everyone deserves the opportunity to own their home in a way that aligns with their values and religious principles.
              </p>
              <p className="text-gray-600 mb-4">
                Our mission is to provide New Zealanders with ethical, transparent, and Shariah-compliant home financing solutions that avoid interest (riba) while creating genuine partnerships with our clients.
              </p>
              <p className="text-gray-600">
                We're committed to making the dream of homeownership accessible through the principles of Islamic finance, serving both Muslim communities and anyone seeking a more ethical alternative to conventional mortgages.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-emerald-50 border-emerald-100">
                <CardHeader>
                  <BookOpen className="h-8 w-8 text-emerald-700 mb-2" />
                  <CardTitle className="text-lg">Ethical Finance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Providing financial solutions that align with Islamic principles and ethical values.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-emerald-50 border-emerald-100">
                <CardHeader>
                  <BadgeCheck className="h-8 w-8 text-emerald-700 mb-2" />
                  <CardTitle className="text-lg">Transparency</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Clear, honest, and straightforward communication about our products and services.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-emerald-50 border-emerald-100">
                <CardHeader>
                  <Users className="h-8 w-8 text-emerald-700 mb-2" />
                  <CardTitle className="text-lg">Inclusivity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Serving all New Zealanders seeking ethical alternatives to conventional financing.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="bg-emerald-50 border-emerald-100">
                <CardHeader>
                  <Building className="h-8 w-8 text-emerald-700 mb-2" />
                  <CardTitle className="text-lg">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">
                    Supporting the growth and development of communities through ethical homeownership.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Shariah Board Section */}
      <section className="py-16 bg-gray-50" id="shariah-board">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Our Shariah Board"
            subtitle="Our products and services are overseen by respected scholars to ensure full compliance with Islamic financial principles."
            center={true}
          />

          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((scholar) => (
              <Card key={scholar}>
                <CardHeader className="text-center">
                  <div className="mx-auto w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                    <UserCircle2 className="h-12 w-12 text-emerald-700" />
                  </div>
                  <CardTitle>Scholar Name {scholar}</CardTitle>
                  <p className="text-gray-500 text-sm">Islamic Finance Expert</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">
                    With extensive experience in Islamic jurisprudence and finance, our scholar ensures that all Vrtu products meet the highest standards of Shariah compliance.
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 bg-white p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Our Shariah Compliance Process</h3>
            <p className="text-gray-600 mb-6">
              At Vrtu, we take Shariah compliance seriously. All our products and services undergo a rigorous review process:
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    1
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Initial Design</h4>
                    <p className="text-gray-600">Products are designed with Islamic financial principles in mind from the start.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    2
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Scholar Review</h4>
                    <p className="text-gray-600">Our Shariah board reviews all products, contracts, and processes.</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    3
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Certification</h4>
                    <p className="text-gray-600">Only products that receive full certification are offered to clients.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center mt-1 text-emerald-700 font-bold">
                    4
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Ongoing Audit</h4>
                    <p className="text-gray-600">Regular audits ensure continued compliance with Islamic financial principles.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us Section */}
      <section className="py-16 bg-white" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Contact Us"
            subtitle="Have questions about our Shariah-compliant home financing solutions? We're here to help."
            center={true}
          />

          <div className="mt-12 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <Mail className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Email Us</h4>
                    <p className="text-gray-600">info@vrtu.co.nz</p>
                    <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <Phone className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Call Us</h4>
                    <p className="text-gray-600">0800 VRTU NZ (0800 878 869)</p>
                    <p className="text-gray-500 text-sm mt-1">Monday-Friday, 9am-5pm NZST</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mt-1">
                    <MessageSquare className="h-5 w-5 text-emerald-700" />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-medium text-gray-900">Visit Us</h4>
                    <p className="text-gray-600">123 Finance Street, Auckland CBD</p>
                    <p className="text-gray-500 text-sm mt-1">Book an appointment first</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-xl font-semibold mb-4">Our Locations</h3>
                <p className="text-gray-600 mb-2">We have offices in major cities across New Zealand:</p>
                <ul className="space-y-1 ml-5 list-disc text-gray-600">
                  <li>Auckland (Head Office)</li>
                  <li>Wellington</li>
                  <li>Christchurch</li>
                  <li>Hamilton</li>
                </ul>
              </div>
            </div>
            
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Full Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your Name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="your.email@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input placeholder="02X XXX XXXX" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="interested_in"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>I'm interested in</FormLabel>
                            <FormControl>
                              <select
                                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                                {...field}
                              >
                                <option value="Diminishing Musharaka">Diminishing Musharaka Home Financing</option>
                                <option value="Investment Property">Investment Property Financing</option>
                                <option value="Refinancing">Refinancing Existing Property</option>
                                <option value="General Inquiry">General Information</option>
                              </select>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Your Message</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="How can we help you?"
                                className="resize-none min-h-32"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              Please provide details about your financing needs or questions.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <Button 
                        type="submit" 
                        className="w-full bg-emerald-700 hover:bg-emerald-800 text-white"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Join Our Team Section */}
      <section className="py-16 bg-gray-50" id="careers">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            title="Join Our Team"
            subtitle="We're always looking for talented individuals who are passionate about ethical finance"
            center={true}
          />
          
          <div className="mt-8 max-w-2xl mx-auto">
            <p className="text-gray-600 mb-8">
              At Vrtu, we're building a team of dedicated professionals who are committed to making a difference in the financial industry. If you're passionate about ethical finance and want to be part of our mission, we'd love to hear from you.
            </p>
            
            <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
              View Current Openings
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Start Your Ethical Home Financing Journey?
          </h2>
          <p className="text-lg text-emerald-50 mb-8 max-w-2xl mx-auto">
            Take the first step towards Shariah-compliant homeownership today with our interactive calculator.
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

export default About;
