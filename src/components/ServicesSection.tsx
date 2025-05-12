
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, BarChart3, ShieldCheck } from 'lucide-react';

const serviceItems = [
  {
    id: 1,
    title: 'Installation',
    description: 'Professional installation of all brands and types of air conditioning units for homes and businesses.',
    icon: <Settings className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0s'
  },
  {
    id: 2,
    title: 'Maintenance',
    description: 'Regular maintenance and repair services to keep your air conditioning systems running efficiently.',
    icon: <BarChart3 className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0.2s'
  },
  {
    id: 3,
    title: 'Sales',
    description: 'Wide selection of top-quality air conditioning units and components at competitive prices.',
    icon: <ShieldCheck className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0.4s'
  }
];

const ServicesSection = () => {
  return (
    <section id="services" className="bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
          <div className="w-24 h-1 bg-brand-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive air conditioning solutions for residential and commercial properties.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceItems.map((service) => (
            <div key={service.id} className="reveal" style={{ transitionDelay: service.delay }}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="text-center">
                  <div className="flex justify-center">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
