import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/">
              <span className="text-emerald-700 font-bold text-2xl cursor-pointer">Vrtu</span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8 text-sm">
            <Link href="/">
              <a className={`font-medium ${isActive('/') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'}`}>
                Home
              </a>
            </Link>
            <Link href="/how-it-works">
              <a className={`font-medium ${isActive('/how-it-works') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'}`}>
                How It Works
              </a>
            </Link>
            <Link href="/calculator">
              <a className={`font-medium ${isActive('/calculator') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'}`}>
                Calculator
              </a>
            </Link>
            <Link href="/about">
              <a className={`font-medium ${isActive('/about') ? 'text-emerald-700' : 'text-gray-700 hover:text-emerald-700'}`}>
                About Us
              </a>
            </Link>
          </nav>
          
          <div className="hidden md:block">
            <Link href="/calculator">
              <Button className="bg-emerald-700 hover:bg-emerald-800 text-white">
                Get Started
              </Button>
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-500 hover:text-emerald-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex flex-col space-y-3 py-3">
              <Link href="/">
                <a 
                  className={`px-3 py-2 rounded-md ${isActive('/') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'}`}
                  onClick={closeMenu}
                >
                  Home
                </a>
              </Link>
              <Link href="/how-it-works">
                <a 
                  className={`px-3 py-2 rounded-md ${isActive('/how-it-works') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'}`}
                  onClick={closeMenu}
                >
                  How It Works
                </a>
              </Link>
              <Link href="/calculator">
                <a 
                  className={`px-3 py-2 rounded-md ${isActive('/calculator') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'}`}
                  onClick={closeMenu}
                >
                  Calculator
                </a>
              </Link>
              <Link href="/about">
                <a 
                  className={`px-3 py-2 rounded-md ${isActive('/about') ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'}`}
                  onClick={closeMenu}
                >
                  About Us
                </a>
              </Link>
              <div className="pt-2">
                <Link href="/calculator">
                  <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white" onClick={closeMenu}>
                    Get Started
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
