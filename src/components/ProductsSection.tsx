
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';

// Sample air conditioner products for each section
const sampleProducts = {
  section1: [
    {
      id: 1,
      name: "Split AC Model S-101",
      description: "Energy efficient split air conditioner for small rooms",
      price: "$499",
      features: ["18,000 BTU", "Energy Star Rated", "Sleep Mode", "Remote Control"],
      image: "https://images.unsplash.com/photo-1628913296855-8757c622af62?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 2,
      name: "Split AC Model S-202",
      description: "Powerful cooling for medium-sized rooms with air purifier",
      price: "$649",
      features: ["24,000 BTU", "HEPA Filter", "Smart Control", "Low Noise"],
      image: "https://images.unsplash.com/photo-1600520611035-84157ad4494d?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 3,
      name: "Split AC Model S-303",
      description: "Premium inverter split AC for large living rooms",
      price: "$799",
      features: ["30,000 BTU", "Inverter Technology", "WiFi Control", "4-Way Air Flow"],
      image: "https://images.unsplash.com/photo-1581275233124-a1d92edd66a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 4,
      name: "Split AC Model S-404",
      description: "Ultra silent split AC with advanced filtration system",
      price: "$899",
      features: ["24,000 BTU", "20dB Silent Mode", "Anti-bacterial Filter", "Motion Sensor"],
      image: "https://cdn.pixabay.com/photo/2017/08/24/03/41/air-conditioner-2675559_960_720.jpg"
    }
  ],
  section2: [
    {
      id: 5,
      name: "Central AC System C-100",
      description: "Whole-house cooling solution with zoning capabilities",
      price: "$2,499",
      features: ["60,000 BTU", "Multi-zone Control", "High SEER Rating", "Smart Thermostat"],
      image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 6,
      name: "Central AC System C-200",
      description: "Advanced ducted system with humidity control",
      price: "$3,299",
      features: ["72,000 BTU", "Humidity Control", "HEPA Filtration", "Quiet Operation"],
      image: "https://images.unsplash.com/photo-1504176910849-16a1790reporter.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 7,
      name: "Central AC System C-300",
      description: "Commercial-grade central air conditioning with zone control",
      price: "$4,199",
      features: ["120,000 BTU", "8-Zone Control", "Commercial Grade", "Energy Management"],
      image: "https://cdn.pixabay.com/photo/2016/11/23/15/04/air-conditioning-1853596_960_720.jpg"
    },
    {
      id: 8,
      name: "Central AC System C-400",
      description: "High-efficiency central system with air purification",
      price: "$3,799",
      features: ["90,000 BTU", "21 SEER Rating", "UV Air Purifier", "Variable Speed Fan"],
      image: "https://cdn.pixabay.com/photo/2020/04/28/01/42/ceiling-5102822_960_720.jpg"
    }
  ],
  section3: [
    {
      id: 9,
      name: "Portable AC Model P-100",
      description: "Compact portable air conditioner for small spaces",
      price: "$349",
      features: ["10,000 BTU", "Easy Installation", "Remote Control", "Dehumidifier"],
      image: "https://images.unsplash.com/photo-1599732494971-f8cef4b7ccce?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 10,
      name: "Portable AC Model P-200",
      description: "Mid-size portable unit with smart features",
      price: "$449",
      features: ["12,000 BTU", "WiFi Control", "Programmable Timer", "Low Noise"],
      image: "https://cdn.pixabay.com/photo/2020/05/07/13/05/air-conditioner-5140647_960_720.jpg"
    },
    {
      id: 11,
      name: "Portable AC Model P-300",
      description: "High-capacity portable AC for larger rooms",
      price: "$549",
      features: ["14,000 BTU", "Three Cooling Speeds", "Auto-Evaporation", "Sleep Mode"],
      image: "https://cdn.pixabay.com/photo/2018/09/01/22/22/air-conditioner-3647998_960_720.jpg"
    },
    {
      id: 12,
      name: "Portable AC Model P-400",
      description: "Premium dual-hose portable air conditioner",
      price: "$649",
      features: ["14,000 BTU", "Dual Hose Design", "Digital Control", "Heating Function"],
      image: "https://cdn.pixabay.com/photo/2018/07/05/22/22/portable-air-conditioner-3519318_960_720.jpg"
    }
  ],
  section4: [
    {
      id: 13,
      name: "Energy Saver Model E-100",
      description: "Ultra-efficient inverter AC with lowest power consumption",
      price: "$899",
      features: ["12,000 BTU", "28 SEER Rating", "Solar Compatible", "Eco Mode"],
      image: "https://images.unsplash.com/photo-1543674892-8f7c7ce61394?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 14,
      name: "Energy Saver Model E-200",
      description: "Smart eco-friendly split AC with consumption tracking",
      price: "$1,099",
      features: ["18,000 BTU", "Energy Tracking App", "R-32 Refrigerant", "Load Sensing"],
      image: "https://cdn.pixabay.com/photo/2017/04/10/14/54/air-conditioning-2218756_960_720.jpg"
    },
    {
      id: 15,
      name: "Energy Saver Model E-300",
      description: "Premium efficiency central AC for whole-house cooling",
      price: "$2,899",
      features: ["48,000 BTU", "26 SEER Rating", "Variable Speed", "Smart Zoning"],
      image: "https://cdn.pixabay.com/photo/2017/08/01/09/34/air-conditioner-2563621_960_720.jpg"
    },
    {
      id: 16,
      name: "Energy Saver Model E-400",
      description: "Solar-assisted hybrid cooling system",
      price: "$3,499",
      features: ["36,000 BTU", "Solar Panel Integration", "Hybrid Technology", "Smart Grid Ready"],
      image: "https://cdn.pixabay.com/photo/2018/10/05/14/01/cooling-3726493_960_720.jpg"
    }
  ]
};

const ProductsSection = () => {
  const { t, language } = useLanguage();
  
  // Section titles
  const sectionTitles = [
    t('products.section1'),
    t('products.section2'),
    t('products.section3'),
    t('products.section4')
  ];

  return (
    <section id="products" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">{t('products.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-500 to-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('products.subtitle')}
          </p>
        </div>
        
        {Object.keys(sampleProducts).map((sectionKey, sectionIndex) => (
          <div key={sectionKey} className="mb-16 last:mb-0">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 reveal">{sectionTitles[sectionIndex]}</h3>
            
            <div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8" 
              dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
              {sampleProducts[sectionKey as keyof typeof sampleProducts].map((product: any, index: number) => (
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
                        loading="lazy"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{product.name}</CardTitle>
                      <CardDescription>{product.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {product.features.map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                      <p className="text-2xl font-bold bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent mt-4">{product.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white">
                        {t('products.viewDetails')}
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsSection;
