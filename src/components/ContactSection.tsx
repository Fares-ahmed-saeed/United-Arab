import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Create a mailto URL with the form data
      const subject = encodeURIComponent(`New Contact Message from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nPhone: ${formData.phone}\n\nMessage: ${formData.message}`
      );
      
      // Create and click a hidden link to open the default email client
      const mailtoLink = document.createElement('a');
      mailtoLink.href = `mailto:saeedahmee222@gmail.com?subject=${subject}&body=${body}`;
      mailtoLink.style.display = 'none';
      document.body.appendChild(mailtoLink);
      mailtoLink.click();
      document.body.removeChild(mailtoLink);
      
      toast({
        title: t('contact.messageSent'),
        description: t('contact.replyPromise'),
      });
      
      setFormData({
        name: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error sending email:', error);
      toast({
        title: t('contact.error'),
        description: t('contact.errorMessage'),
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const isRTL = language === 'ar';
  
  return (
    <section id="contact" className="bg-gradient-to-b from-white to-blue-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-brand-blue to-vibrant-blue bg-clip-text text-transparent">
            {t('contact.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-blue to-vibrant-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" dir={isRTL ? 'rtl' : 'ltr'}>
          <div className="reveal">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden relative">
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br from-brand-blue-light/20 to-vibrant-cyan/10 rounded-full blur-2xl z-0"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-vibrant-blue/20 to-brand-blue/10 rounded-full blur-xl z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-brand-blue to-vibrant-blue bg-clip-text text-transparent">
                  {t('contact.reachUs')}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="group">
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
                      className={cn(
                        "w-full bg-white/80 backdrop-blur-sm border-blue-100 focus:border-brand-blue transition-all",
                        "rounded-lg shadow-sm focus:ring focus:ring-brand-blue/20"
                      )}
                    />
                  </div>
                  
                  <div className="group">
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
                      className={cn(
                        "w-full bg-white/80 backdrop-blur-sm border-blue-100 focus:border-brand-blue transition-all",
                        "rounded-lg shadow-sm focus:ring focus:ring-brand-blue/20"
                      )}
                    />
                  </div>
                  
                  <div className="group">
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
                      className={cn(
                        "w-full min-h-[120px] bg-white/80 backdrop-blur-sm border-blue-100 focus:border-brand-blue transition-all",
                        "rounded-lg shadow-sm focus:ring focus:ring-brand-blue/20"
                      )}
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className={cn(
                      "w-full py-6",
                      "bg-gradient-to-r from-brand-blue to-vibrant-blue hover:from-brand-blue-dark hover:to-vibrant-blue",
                      "text-white font-medium text-lg shadow-lg hover:shadow-xl",
                      "transition-all duration-300 transform hover:-translate-y-1",
                      "rounded-lg border border-blue-300/30"
                    )}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {t('contact.sending')}
                      </span>
                    ) : (
                      t('contact.send')
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
          
          <div className="reveal">
            <div className="bg-gradient-to-br from-white to-blue-50 p-8 rounded-2xl shadow-lg border border-blue-100 h-full relative overflow-hidden">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-gradient-to-br from-brand-blue-light/20 to-vibrant-cyan/10 rounded-full blur-xl z-0"></div>
              <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-tr from-vibrant-blue/20 to-brand-blue/10 rounded-full blur-2xl z-0"></div>
              
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-brand-blue to-vibrant-blue bg-clip-text text-transparent">
                  {t('contact.getInTouch')}
                </h3>
                
                <div className="space-y-6">
                  <div className={cn("flex items-start", isRTL ? "flex-row-reverse" : "")}>
                    <div className="bg-gradient-to-br from-brand-blue/20 to-vibrant-blue/10 p-3 rounded-full mx-4 shadow-sm">
                      <Phone className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <h4 className="font-medium text-gray-900">{t('contact.phone')}</h4>
                      <p className="text-gray-600 hover:text-brand-blue transition-colors">01155331256</p>
                      <p className="text-gray-600 hover:text-brand-blue transition-colors">01271408891</p>
                    </div>
                  </div>
                  
                  <div className={cn("flex items-start", isRTL ? "flex-row-reverse" : "")}>
                    <div className="bg-gradient-to-br from-brand-blue/20 to-vibrant-blue/10 p-3 rounded-full mx-4 shadow-sm">
                      <Mail className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <h4 className="font-medium text-gray-900">{t('contact.email')}</h4>
                      <p className="text-gray-600 hover:text-brand-blue transition-colors">saeedahmee222@gmail.com</p>
                    </div>
                  </div>
                  
                  <div className={cn("flex items-start", isRTL ? "flex-row-reverse" : "")}>
                    <div className="bg-gradient-to-br from-brand-blue/20 to-vibrant-blue/10 p-3 rounded-full mx-4 shadow-sm">
                      <MapPin className="h-6 w-6 text-brand-blue" />
                    </div>
                    <div className={isRTL ? "text-right" : ""}>
                      <h4 className="font-medium text-gray-900">{t('contact.address')}</h4>
                      <p className="text-gray-600">الباجور المنوفية</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 pt-6 border-t border-blue-100">
                  <h4 className="font-medium text-gray-900 mb-4">{t('contact.businessHours')}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="text-gray-600 font-medium">{t('contact.daily')}</div>
                    <div className="text-gray-900 font-medium">{t('contact.dailyHours')}</div>
                  </div>
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
