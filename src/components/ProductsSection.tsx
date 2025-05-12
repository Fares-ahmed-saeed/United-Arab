
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const products = [
  {
    id: 1,
    name: 'Split Air Conditioner',
    description: 'Energy-efficient split AC units for residential spaces.',
    price: '$599',
    features: ['Energy Efficient', '18,000 BTU', 'Smart Controls', 'Low Noise'],
    image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 2,
    name: 'Ducted Central AC System',
    description: 'Whole-house cooling solution with concealed ductwork.',
    price: '$2,499',
    features: ['Whole House Cooling', '48,000 BTU', 'HEPA Filtration', 'Zone Control'],
    image: 'https://images.unsplash.com/photo-1621921786074-09a1d416fc6a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 3,
    name: 'Portable Air Conditioner',
    description: 'Flexible cooling for any room without installation.',
    price: '$399',
    features: ['No Installation', '12,000 BTU', 'Remote Control', 'Dehumidifier'],
    image: 'https://images.unsplash.com/photo-1625596570538-ab4efd533234?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 4,
    name: 'Commercial HVAC System',
    description: 'Heavy-duty cooling for offices and commercial spaces.',
    price: '$5,999',
    features: ['Commercial Grade', '60,000 BTU', 'Advanced Controls', '24/7 Operation'],
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 5,
    name: 'Window Air Conditioner',
    description: 'Compact units ideal for single rooms and apartments.',
    price: '$299',
    features: ['Easy Installation', '10,000 BTU', 'Programmable Timer', 'Energy Star'],
    image: 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  },
  {
    id: 6,
    name: 'Mini-Split Ductless System',
    description: 'Flexible zoning with multiple indoor units.',
    price: '$899',
    features: ['Multi-Zone Capable', '24,000 BTU', 'WiFi Control', 'Inverter Technology'],
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80'
  }
];

const ProductsSection = () => {
  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Products</h2>
          <div className="w-24 h-1 bg-brand-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our range of high-quality air conditioning systems for residential and commercial use.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <div 
              key={product.id} 
              className="reveal"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <Card className="h-full flex flex-col border shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {product.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                  <p className="text-2xl font-bold text-brand-blue mt-4">{product.price}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-brand-blue hover:bg-brand-blue-dark">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
