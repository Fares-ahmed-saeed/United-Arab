
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Calculator } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMobile } from '@/hooks/use-mobile';
import { Button } from '@/components/ui/button';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();
  const { isMobile } = useMobile();
  const location = useLocation();
  
  // Close mobile menu when resizing to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Active link style
  const activeLinkClass = "text-primary font-medium";
  const normalLinkClass = "text-foreground/80 hover:text-primary transition-colors";

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-border/40">
      <nav className="container flex items-center justify-between h-16 mx-auto px-4">
        <div className="flex items-center">
          <Link to="/" className="flex items-center mr-6">
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-blue-light">
              Arab United AC
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between flex-1">
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className={location.pathname === '/' ? activeLinkClass : normalLinkClass}
            >
              {t('home')}
            </Link>
            <Link 
              to="/products" 
              className={location.pathname === '/products' ? activeLinkClass : normalLinkClass}
            >
              {t('products')}
            </Link>
            <Link 
              to="/calculator" 
              className={location.pathname === '/calculator' ? activeLinkClass : normalLinkClass}
            >
              <div className="flex items-center gap-1">
                <Calculator className="h-4 w-4" />
                {t('ac_calculator')}
              </div>
            </Link>
          </div>
          
          <div className="flex items-center space-x-3">
            <ThemeToggle />
            <Button 
              variant="ghost"
              onClick={() => changeLanguage(language === 'en' ? 'ar' : 'en')}
              className="text-sm"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close Menu" : "Open Menu"}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && isMobile && (
        <div className="fixed inset-0 top-16 z-40 backdrop-blur-lg bg-background/95 flex flex-col p-4 space-y-4 transition-all duration-200 ease-in-out animate-in fade-in slide-in-from-top">
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)} 
            className={`text-lg py-2 ${location.pathname === '/' ? activeLinkClass : normalLinkClass}`}
          >
            {t('home')}
          </Link>
          <Link 
            to="/products" 
            onClick={() => setIsOpen(false)} 
            className={`text-lg py-2 ${location.pathname === '/products' ? activeLinkClass : normalLinkClass}`}
          >
            {t('products')}
          </Link>
          <Link 
            to="/calculator" 
            onClick={() => setIsOpen(false)} 
            className={`text-lg py-2 flex items-center gap-2 ${location.pathname === '/calculator' ? activeLinkClass : normalLinkClass}`}
          >
            <Calculator className="h-4 w-4" />
            {t('ac_calculator')}
          </Link>
          <div className="pt-4 border-t border-border/60">
            <Button 
              onClick={() => {
                changeLanguage(language === 'en' ? 'ar' : 'en');
                setIsOpen(false);
              }}
              variant="outline"
              className="w-full"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
