
import React from 'react';
import { smoothScroll } from '@/utils/scrollUtils';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h2 className="text-2xl font-bold mb-4">Arab United</h2>
            <p className="mb-4 text-gray-300">
              Professional air conditioning services for residential and commercial properties.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-brand-blue transition-colors" aria-label="Facebook">
                <Facebook />
              </a>
              <a href="#" className="hover:text-brand-blue transition-colors" aria-label="Twitter">
                <Twitter />
              </a>
              <a href="#" className="hover:text-brand-blue transition-colors" aria-label="Instagram">
                <Instagram />
              </a>
              <a href="#" className="hover:text-brand-blue transition-colors" aria-label="LinkedIn">
                <Linkedin />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => smoothScroll(e, 'home')} 
                  className="text-gray-300 hover:text-brand-blue transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#services" 
                  onClick={(e) => smoothScroll(e, 'services')} 
                  className="text-gray-300 hover:text-brand-blue transition-colors"
                >
                  Our Services
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  onClick={(e) => smoothScroll(e, 'about')} 
                  className="text-gray-300 hover:text-brand-blue transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => smoothScroll(e, 'contact')} 
                  className="text-gray-300 hover:text-brand-blue transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-blue transition-colors">
                  AC Installation
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-blue transition-colors">
                  AC Maintenance
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-blue transition-colors">
                  AC Sales
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-300 hover:text-brand-blue transition-colors">
                  Emergency Repairs
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-300">
              <li>123 Business Avenue, Suite 100</li>
              <li>Dubai, United Arab Emirates</li>
              <li>Phone: +123-456-7890</li>
              <li>Email: info@arabunitedac.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-6 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} Arab United for Air Conditioning. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
