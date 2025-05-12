
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ContactSection = () => {
  const { t, language } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        phone: '',
        message: ''
      });
      setLoading(false);
    }, 1000);
  };

  return (
    <section id="contact" className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('contact.title')}</h2>
          <div className="w-24 h-1 bg-brand-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          <div className="reveal">
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.name')}
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder.name')}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.phone')}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder.phone')}
                  required
                  className="w-full"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  {t('contact.message')}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t('contact.placeholder.message')}
                  required
                  className="w-full min-h-[120px]"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-brand-blue hover:bg-brand-blue-dark py-6" 
                disabled={loading}
              >
                {loading ? t('contact.sending') : t('contact.send')}
              </Button>
            </form>
          </div>
          
          <div className="reveal">
            <div className="bg-white p-8 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6">{t('contact.getInTouch')}</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                    <Phone className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('contact.phone')}</h4>
                    <p className="text-gray-600">+123-456-7890</p>
                    <p className="text-gray-600">+123-456-7891</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                    <Mail className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('contact.email')}</h4>
                    <p className="text-gray-600">info@arabunitedac.com</p>
                    <p className="text-gray-600">support@arabunitedac.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-brand-blue/10 p-3 rounded-full mr-4">
                    <MapPin className="h-6 w-6 text-brand-blue" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{t('contact.address')}</h4>
                    <p className="text-gray-600">123 Business Avenue, Suite 100</p>
                    <p className="text-gray-600">Dubai, United Arab Emirates</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="font-medium text-gray-900 mb-4">{t('contact.businessHours')}</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">{t('contact.weekdays')}</div>
                  <div className="text-gray-900">{t('contact.weekdaysHours')}</div>
                  <div className="text-gray-600">{t('contact.saturday')}</div>
                  <div className="text-gray-900">{t('contact.saturdayHours')}</div>
                  <div className="text-gray-600">{t('contact.sunday')}</div>
                  <div className="text-gray-900">{t('contact.sundayHours')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
