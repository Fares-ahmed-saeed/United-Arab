
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, BarChart3, ShieldCheck, Wind, Wrench, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';

const ServicesSection = () => {
  const { t, language } = useLanguage();
  const [selectedService, setSelectedService] = useState<number | null>(null);

  const serviceItems = [
    {
      id: 1,
      title: t('services.installation'),
      description: t('services.installation.desc'),
      details: t('services.installation.details'),
      icon: <Settings className="h-10 w-10 text-white mb-4" />,
      delay: '0s',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600',
      cardBg: 'bg-gradient-to-br from-cyan-500 to-cyan-700'
    },
    {
      id: 2,
      title: t('services.maintenance'),
      description: t('services.maintenance.desc'),
      details: t('services.maintenance.details'),
      icon: <Wrench className="h-10 w-10 text-white mb-4" />,
      delay: '0.2s',
      iconBg: 'bg-gradient-to-br from-green-400 to-green-600',
      cardBg: 'bg-gradient-to-br from-green-500 to-green-700'
    },
    {
      id: 3,
      title: t('services.repair'),
      description: t('services.repair.desc'),
      details: t('services.repair.details'),
      icon: <BarChart3 className="h-10 w-10 text-white mb-4" />,
      delay: '0.4s',
      iconBg: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
      cardBg: 'bg-gradient-to-br from-yellow-500 to-yellow-700'
    },
    {
      id: 4,
      title: t('services.consultation'),
      description: t('services.consultation.desc'),
      details: t('services.consultation.details'),
      icon: <Wind className="h-10 w-10 text-white mb-4" />,
      delay: '0.6s',
      iconBg: 'bg-gradient-to-br from-purple-400 to-purple-600',
      cardBg: 'bg-gradient-to-br from-purple-500 to-purple-700'
    },
    {
      id: 5,
      title: t('services.sales'),
      description: t('services.sales.desc'),
      details: t('services.sales.details'),
      icon: <ShoppingCart className="h-10 w-10 text-white mb-4" />,
      delay: '0.8s',
      iconBg: 'bg-gradient-to-br from-pink-400 to-pink-600',
      cardBg: 'bg-gradient-to-br from-pink-500 to-pink-700'
    },
    {
      id: 6,
      title: t('services.warranty'),
      description: t('services.warranty.desc'),
      details: t('services.warranty.details'),
      icon: <ShieldCheck className="h-10 w-10 text-white mb-4" />,
      delay: '1s',
      iconBg: 'bg-gradient-to-br from-orange-400 to-orange-600',
      cardBg: 'bg-gradient-to-br from-orange-500 to-orange-700'
    }
  ];

  const getSelectedService = () => {
    return serviceItems.find(service => service.id === selectedService);
  };

  return (
    <section id="services" className="bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t('services.title')}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {serviceItems.map((service) => (
            <div key={service.id} className="reveal" style={{ transitionDelay: service.delay }}>
              <Card 
                className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group cursor-pointer hover:scale-105 transition-transform"
                onClick={() => setSelectedService(service.id)}
              >
                <CardHeader className={`text-center relative overflow-hidden text-white ${service.cardBg}`}>
                  <div className="relative z-10 py-4">
                    <div className={`flex justify-center items-center w-20 h-20 ${service.iconBg} rounded-full mx-auto shadow-lg border border-white/20`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mt-4 text-white">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-6 bg-gradient-to-b from-white to-gray-50">
                  <CardDescription className="text-base text-gray-600 mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="text-center">
                    <Button variant="ghost" className="text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 font-semibold">
                      {t('services.viewDetails')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal">
          <Link to="/products">
            <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-white/10 hover:scale-105">
              {t('services.viewProducts')}
            </Button>
          </Link>
        </div>

        <Dialog open={selectedService !== null} onOpenChange={() => setSelectedService(null)}>
          <DialogContent className="sm:max-w-md bg-gradient-to-b from-white to-gray-50">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {getSelectedService()?.title}
              </DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-base text-gray-600">
              {getSelectedService()?.details}
            </DialogDescription>
            <DialogFooter dir={language === 'ar' ? 'rtl' : 'ltr'}>
              <Button 
                onClick={() => setSelectedService(null)}
                className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
              >
                {t('services.close')}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ServicesSection;
