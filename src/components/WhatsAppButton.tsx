
import React from 'react';
import { MessageCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhatsAppButton = () => {
  const { language } = useLanguage();
  const phoneNumber = '01155331256';
  const whatsappLink = `https://wa.me/${phoneNumber}`;
  
  return (
    <a 
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 pulse-animation pulse-active"
      aria-label={language === 'ar' ? "تواصل معنا عبر واتساب" : "Contact us on WhatsApp"}
    >
      <MessageCircle size={28} />
    </a>
  );
};

export default WhatsAppButton;
