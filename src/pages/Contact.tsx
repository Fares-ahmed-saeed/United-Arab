
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ContactSection from '@/components/ContactSection';
import { initScrollAnimations } from '@/utils/scrollUtils';

const Contact = () => {
  // Initialize scroll animations when the component mounts
  useEffect(() => {
    const cleanup = initScrollAnimations();
    return () => {
      cleanup();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="pt-16 lg:pt-20">
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
