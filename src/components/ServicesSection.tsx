
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, BarChart3, ShieldCheck, Wind, Wrench, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const ServicesSection = () => {
  const { t, language } = useLanguage();
  
  const serviceItems = [
    {
      id: 1,
      title: t('services.installation'),
      description: t('services.installation.desc'),
      icon: <Settings className="h-10 w-10 text-white mb-4" />,
      delay: '0s',
      iconBg: 'bg-cyan-500',
      cardBg: 'bg-gradient-to-br from-cyan-500 to-cyan-600'
    },
    {
      id: 2,
      title: t('services.maintenance'),
      description: t('services.maintenance.desc'),
      icon: <Wrench className="h-10 w-10 text-white mb-4" />,
      delay: '0.2s',
      iconBg: 'bg-green-500',
      cardBg: 'bg-gradient-to-br from-green-500 to-green-600'
    },
    {
      id: 3,
      title: t('services.repair'),
      description: t('services.repair.desc'),
      icon: <BarChart3 className="h-10 w-10 text-white mb-4" />,
      delay: '0.4s',
      iconBg: 'bg-yellow-500',
      cardBg: 'bg-gradient-to-br from-yellow-500 to-yellow-600'
    },
    {
      id: 4,
      title: t('services.consultation'),
      description: t('services.consultation.desc'),
      icon: <Wind className="h-10 w-10 text-white mb-4" />,
      delay: '0.6s',
      iconBg: 'bg-purple-500',
      cardBg: 'bg-gradient-to-br from-purple-500 to-purple-600'
    },
    {
      id: 5,
      title: t('services.sales'),
      description: t('services.sales.desc'),
      icon: <ShoppingCart className="h-10 w-10 text-white mb-4" />,
      delay: '0.8s',
      iconBg: 'bg-pink-500',
      cardBg: 'bg-gradient-to-br from-pink-500 to-pink-600'
    },
    {
      id: 6,
      title: t('services.warranty'),
      description: t('services.warranty.desc'),
      icon: <ShieldCheck className="h-10 w-10 text-white mb-4" />,
      delay: '1s',
      iconBg: 'bg-orange-500',
      cardBg: 'bg-gradient-to-br from-orange-500 to-orange-600'
    }
  ];

  return (
    <section id="services" className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t('services.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {serviceItems.map((service) => (
            <div key={service.id} className="reveal" style={{ transitionDelay: service.delay }}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <CardHeader className={`text-center relative overflow-hidden text-white ${service.cardBg}`}>
                  <div className="relative z-10 py-4">
                    <div className={`flex justify-center items-center w-20 h-20 ${service.iconBg} rounded-full mx-auto shadow-lg`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mt-4 text-white">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <CardDescription className="text-base text-gray-600 mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="text-center">
                    <Button variant="ghost" className="text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700">
                      {t('services.learnMore')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal">
          <Link to="/products">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 shadow-lg hover:shadow-xl transition-all duration-300">
              {t('services.viewProducts')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
