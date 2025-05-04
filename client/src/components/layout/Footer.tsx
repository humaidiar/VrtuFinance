import React from 'react';
import { Link } from 'wouter';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-8 md:mb-0">
            <div className="text-emerald-700 font-bold text-2xl mb-4">Vrtu</div>
            <p className="text-gray-600 max-w-xs">
              We love to help you to get your first home :)
            </p>
            
            <div className="flex space-x-4 mt-6">
              <a 
                href="#" 
                aria-label="Facebook"
                className="text-gray-400 hover:text-emerald-700 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                aria-label="Instagram"
                className="text-gray-400 hover:text-emerald-700 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                aria-label="Twitter"
                className="text-gray-400 hover:text-emerald-700 transition-colors"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a 
                href="#" 
                aria-label="LinkedIn"
                className="text-gray-400 hover:text-emerald-700 transition-colors"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                The Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/how-it-works">
                    <a className="text-base text-gray-600 hover:text-emerald-700">
                      How It Works
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator">
                    <a className="text-base text-gray-600 hover:text-emerald-700">
                      Calculator
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/calculator">
                    <a className="text-base text-gray-600 hover:text-emerald-700">
                      Apply Now
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Company
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/about">
                    <a className="text-base text-gray-600 hover:text-emerald-700">
                      About
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/about#shariah-board">
                    <a className="text-base text-gray-600 hover:text-emerald-700">
                      Shariah Board
                    </a>
                  </Link>
                </li>
                <li>
                  <Link href="/about#careers">
                    <a className="text-base text-gray-600 hover:text-emerald-700">
                      Careers
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-emerald-700">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-base text-gray-600 hover:text-emerald-700">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <Link href="/about#contact">
                    <a className="text-base text-gray-600 hover:text-emerald-700">
                      Contact
                    </a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Vrtu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
