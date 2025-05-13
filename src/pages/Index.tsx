
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ServicesSection from '@/components/ServicesSection';
import WhyChooseUsSection from '@/components/WhyChooseUsSection';
import ContactSection from '@/components/ContactSection';
import { initScrollAnimations } from '@/utils/scrollUtils';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const Index = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  
  // Initialize scroll animations when the component mounts
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return () => {
      cleanup();
    };
  }, []);

  // Add RTL direction for Arabic language
  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'font-arabic' : ''}`}>
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <WhyChooseUsSection />
      <ContactSection />
    </div>
  );
};

export default Index;
