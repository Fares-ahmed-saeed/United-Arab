
import React, { useState, useEffect } from 'react';
import { smoothScroll } from '@/utils/scrollUtils';
import { Menu, X, Globe, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const { language, setLanguage, t } = useLanguage();
  
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
    handleScroll(); // Initial check
    
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

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const renderHomePageLink = (label: string) => {
    if (isHomePage) {
      return (
        <a
          href="#home"
          onClick={(e) => smoothScroll(e, 'home')}
          className={`${
            isScrolled ? 'text-gray-800' : 'text-white'
          } hover:text-brand-blue font-medium transition-colors`}
        >
          {label}
        </a>
      );
    }
    return (
      <Link
        to="/"
        className="text-gray-800 hover:text-brand-blue font-medium transition-colors"
      >
        {label}
      </Link>
    );
  };

  const navItems = [
    { 
      key: 'home', 
      label: t('nav.home'),
      render: () => renderHomePageLink(t('nav.home'))
    },
    {
      key: 'services',
      label: t('nav.services'),
      render: () => isHomePage ? (
        <a
          href="#services"
          onClick={(e) => smoothScroll(e, 'services')}
          className={`${
            isScrolled ? 'text-gray-800' : 'text-white'
          } hover:text-brand-blue font-medium transition-colors`}
        >
          {t('nav.services')}
        </a>
      ) : (
        <Link
          to="/#services"
          className="text-gray-800 hover:text-brand-blue font-medium transition-colors"
        >
          {t('nav.services')}
        </Link>
      )
    },
    {
      key: 'products',
      label: t('nav.products'),
      render: () => (
        <Link
          to="/products"
          className={`${
            isScrolled ? 'text-gray-800' : 'text-white'
          } hover:text-brand-blue font-medium transition-colors`}
        >
          {t('nav.products')}
        </Link>
      )
    },
    {
      key: 'calculator',
      label: t('nav.calculator') || 'AC Calculator',
      render: () => (
        <Link
          to="/ac-calculator"
          className={`${
            isScrolled ? 'text-gray-800' : 'text-white'
          } hover:text-brand-blue font-medium transition-colors flex items-center gap-1`}
        >
          <Calculator size={16} />
          {t('nav.calculator') || 'AC Calculator'}
        </Link>
      )
    },
    {
      key: 'about',
      label: t('nav.about'),
      render: () => isHomePage ? (
        <a
          href="#about"
          onClick={(e) => smoothScroll(e, 'about')}
          className={`${
            isScrolled ? 'text-gray-800' : 'text-white'
          } hover:text-brand-blue font-medium transition-colors`}
        >
          {t('nav.about')}
        </a>
      ) : (
        <Link
          to="/#about"
          className="text-gray-800 hover:text-brand-blue font-medium transition-colors"
        >
          {t('nav.about')}
        </Link>
      )
    },
    {
      key: 'contact',
      label: t('nav.contact'),
      render: () => isHomePage ? (
        <a
          href="#contact"
          onClick={(e) => smoothScroll(e, 'contact')}
          className={`${
            isScrolled ? 'text-gray-800' : 'text-white'
          } hover:text-brand-blue font-medium transition-colors`}
        >
          {t('nav.contact')}
        </a>
      ) : (
        <Link
          to="/#contact"
          className="text-gray-800 hover:text-brand-blue font-medium transition-colors"
        >
          {t('nav.contact')}
        </Link>
      )
    }
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled || !isHomePage ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <h1 className={`font-bold text-2xl md:text-3xl ${isScrolled || !isHomePage ? 'text-brand-blue' : 'text-white'}`}>
            {language === 'en' ? (
              <>United Arab <span className="hidden sm:inline">Air Conditioning</span></>
            ) : (
              <>العربية المتحدة <span className="hidden sm:inline">لتكييف الهواء</span></>
            )}
          </h1>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center">
          <div className="flex space-x-6">
            {navItems.map((item) => (
              <div key={item.key} className="px-2">{item.render()}</div>
            ))}
          </div>
          
          <div className="ml-6 flex items-center space-x-4">
            <Button 
              className="bg-brand-blue hover:bg-brand-blue-dark text-white"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
                if (isHomePage) {
                  smoothScroll(event, 'contact');
                } else {
                  window.location.href = '/#contact';
                }
              }}
            >
              {t('nav.book')}
            </Button>
            
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Toggle language"
            >
              <Globe size={20} className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`} />
              <span className="sr-only">{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle language"
          >
            <Globe size={20} className={`${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`} />
            <span className="sr-only">{language === 'en' ? 'العربية' : 'English'}</span>
          </button>
          
          <button 
            className={`focus:outline-none ${isScrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-96 opacity-100 visible' : 'max-h-0 opacity-0 invisible'
      } bg-white overflow-hidden`}>
        <div className="container mx-auto px-4 py-2 flex flex-col space-y-4">
          {navItems.map((item) => (
            <div 
              key={item.key} 
              className="py-2"
              onClick={closeMobileMenu}
            >
              {item.render()}
            </div>
          ))}
          <Button 
            className="bg-brand-blue hover:bg-brand-blue-dark w-full"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              const event = e as unknown as React.MouseEvent<HTMLAnchorElement>;
              if (isHomePage) {
                smoothScroll(event, 'contact');
              } else {
                window.location.href = '/#contact';
              }
              closeMobileMenu();
            }}
          >
            {t('nav.book')}
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
