
import React, { useState, useEffect } from 'react';
import { smoothScroll } from '@/utils/scrollUtils';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#home" className="flex items-center" onClick={(e) => smoothScroll(e, 'home')}>
          <h1 className={`font-bold text-2xl md:text-3xl ${isScrolled ? 'text-brand-blue' : 'text-white'}`}>
            Arab United <span className="hidden sm:inline">for Air Conditioning</span>
          </h1>
        </a>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {['home', 'services', 'about', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => smoothScroll(e, item)}
              className={`${
                isScrolled ? 'text-gray-800' : 'text-white'
              } hover:text-brand-blue font-medium transition-colors`}
            >
              {item === 'home' ? 'Home' : 
               item === 'services' ? 'Our Services' : 
               item === 'about' ? 'About Us' : 'Contact'}
            </a>
          ))}
          <Button className="bg-brand-blue hover:bg-brand-blue-dark">
            Book Now
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-brand-blue focus:outline-none" 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-64 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      } bg-white overflow-hidden`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
          {['home', 'services', 'about', 'contact'].map((item) => (
            <a
              key={item}
              href={`#${item}`}
              onClick={(e) => {
                smoothScroll(e, item);
                closeMobileMenu();
              }}
              className="text-gray-800 hover:text-brand-blue py-2 font-medium"
            >
              {item === 'home' ? 'Home' : 
               item === 'services' ? 'Our Services' : 
               item === 'about' ? 'About Us' : 'Contact'}
            </a>
          ))}
          <Button className="bg-brand-blue hover:bg-brand-blue-dark w-full">
            Book Now
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
