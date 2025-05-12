
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, BarChart3, ShieldCheck, Wind, Wrench, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const serviceItems = [
  {
    id: 1,
    title: 'Installation',
    description: 'Professional installation of all brands and types of air conditioning units for homes and businesses.',
    icon: <Settings className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0s',
    iconBg: 'bg-blue-50'
  },
  {
    id: 2,
    title: 'Maintenance',
    description: 'Regular maintenance and repair services to keep your air conditioning systems running efficiently.',
    icon: <Wrench className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0.2s',
    iconBg: 'bg-green-50'
  },
  {
    id: 3,
    title: 'Repair',
    description: 'Fast and reliable repair services for all types of air conditioning systems when they break down.',
    icon: <BarChart3 className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0.4s',
    iconBg: 'bg-yellow-50'
  },
  {
    id: 4,
    title: 'Consultation',
    description: 'Expert advice on selecting the right cooling solutions for your specific needs and budget.',
    icon: <Wind className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0.6s',
    iconBg: 'bg-purple-50'
  },
  {
    id: 5,
    title: 'Sales',
    description: 'Wide selection of top-quality air conditioning units and components at competitive prices.',
    icon: <ShoppingCart className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '0.8s',
    iconBg: 'bg-pink-50'
  },
  {
    id: 6,
    title: 'Warranty',
    description: 'Comprehensive warranty coverage on all our installations and products for your peace of mind.',
    icon: <ShieldCheck className="h-10 w-10 text-brand-blue mb-4" />,
    delay: '1s',
    iconBg: 'bg-orange-50'
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceItems.map((service) => (
            <div key={service.id} className="reveal" style={{ transitionDelay: service.delay }}>
              <Card className="h-full border-none shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <CardHeader className="text-center relative overflow-hidden">
                  <div className={`absolute inset-0 ${service.iconBg} transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0`}></div>
                  <div className="relative z-10">
                    <div className={`flex justify-center items-center w-20 h-20 ${service.iconBg} rounded-full mx-auto`}>
                      {service.icon}
                    </div>
                    <CardTitle className="text-2xl mt-4">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-600 mb-6">
                    {service.description}
                  </CardDescription>
                  <div className="text-center">
                    <Button variant="ghost" className="text-brand-blue hover:bg-brand-blue/10">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center reveal">
          <Link to="/products">
            <Button className="bg-brand-blue hover:bg-brand-blue-dark text-white px-8">
              View Our Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
