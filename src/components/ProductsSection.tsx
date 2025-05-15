import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';

const sampleProducts = {
  section1: [
    {
      id: 1,
      name: {
        en: "Carrier Split AC 1.5HP Cooling",
        ar: "مكيف كارير سبليت 1.5 حصان بارد"
      },
      description: {
        en: "High-efficiency 1.5HP cooling split AC for small rooms",
        ar: "مكيف سبليت كارير 1.5 حصان بارد عالي الكفاءة للغرف الصغيرة"
      },
      features: {
        en: ["12,000 BTU", "Energy Saving Mode", "Turbo Cooling", "Quiet Operation"],
        ar: ["12,000 وحدة حرارية", "وضع توفير الطاقة", "تبريد توربو", "تشغيل هادئ"]
      },
      image: "https://img.freepik.com/free-photo/air-conditioner-mounted-white-wall_53876-128235.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 2,
      name: {
        en: "Carrier Split AC 1.5HP Hot/Cold",
        ar: "مكيف كارير سبليت 1.5 حصان ساخن/بارد"
      },
      description: {
        en: "Versatile 1.5HP split AC with heating and cooling for all seasons",
        ar: "مكيف كارير سبليت 1.5 حصان ساخن/بارد متعدد الاستخدامات لجميع الفصول"
      },
      features: {
        en: ["12,000 BTU", "Heat Pump", "Smart Control", "Anti-Dust Filter"],
        ar: ["12,000 وحدة حرارية", "مضخة حرارية", "تحكم ذكي", "فلتر مضاد للغبار"]
      },
      image: "https://pakref.com/wp-content/uploads/2021/09/gree-18fith2w-1024x1024.jpg"
    },
    {
      id: 3,
      name: {
        en: "Carrier Split AC 2.25HP Cooling",
        ar: "مكيف كارير سبليت 2.25 حصان بارد"
      },
      description: {
        en: "Powerful 2.25HP cooling split AC for larger spaces",
        ar: "مكيف كارير سبليت 2.25 حصان بارد قوي للمساحات الكبيرة"
      },
      features: {
        en: ["18,000 BTU", "Inverter Technology", "Fast Cooling", "WiFi Control"],
        ar: ["18,000 وحدة حرارية", "تقنية انفرتر", "تبريد سريع", "تحكم عبر WiFi"]
      },
      image: "https://img.freepik.com/premium-photo/white-air-conditioner-lifelike-background_899449-262542.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 4,
      name: {
        en: "Carrier Split AC 2.25HP Hot/Cold",
        ar: "مكيف كارير سبليت 2.25 حصان ساخن/بارد"
      },
      description: {
        en: "Premium 2.25HP split AC with advanced heating and cooling",
        ar: "مكيف كارير سبليت 2.25 حصان ساخن/بارد بتقنية متقدمة"
      },
      features: {
        en: ["18,000 BTU", "Dual Inverter", "Eco Mode", "4-Way Air Flow"],
        ar: ["18,000 وحدة حرارية", "انفرتر مزدوج", "وضع إيكو", "تدفق هواء رباعي"]
      },
      image: "https://img.freepik.com/free-photo/air-conditioner-mounted-white-wall_53876-142861.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    }
  ],
  section2: [
    {
      id: 5,
      name: {
        en: "Midea Split AC 1.5HP Cooling",
        ar: "مكيف ميديا سبليت 1.5 حصان بارد"
      },
      description: {
        en: "Compact 1.5HP cooling split AC with modern design",
        ar: "مكيف ميديا سبليت 1.5 حصان بارد بتصميم عصري"
      },
      features: {
        en: ["12,000 BTU", "Low Noise Operation", "Smart Diagnosis", "Auto Clean"],
        ar: ["12,000 وحدة حرارية", "تشغيل منخفض الضوضاء", "تشخيص ذكي", "تنظيف تلقائي"]
      },
      image: "https://img.freepik.com/premium-photo/air-conditioner-isolated-white-surface_293060-36.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 6,
      name: {
        en: "Midea Split AC 1.5HP Hot/Cold",
        ar: "مكيف ميديا سبليت 1.5 حصان ساخن/بارد"
      },
      description: {
        en: "Efficient 1.5HP hot/cold split AC for year-round comfort",
        ar: "مكيف ميديا سبليت 1.5 حصان ساخن/بارد لراحة طوال العام"
      },
      features: {
        en: ["12,000 BTU", "Heating Function", "Sleep Mode", "Air Purifier"],
        ar: ["12,000 وحدة حرارية", "وظيفة التدفئة", "وضع النوم", "منقي الهواء"]
      },
      image: "https://img.freepik.com/premium-psd/modern-white-wallmounted-air-conditioner-with-digital-temperature-display_878202-132.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 7,
      name: {
        en: "Midea Split AC 2.25HP Cooling",
        ar: "مكيف ميديا سبليت 2.25 حصان بارد"
      },
      description: {
        en: "High-performance 2.25HP cooling split AC for medium rooms",
        ar: "مكيف ميديا سبليت 2.25 حصان بارد عالي الأداء للغرف المتوسطة"
      },
      features: {
        en: ["18,000 BTU", "Inverter Compressor", "Rapid Cooling", "Remote Control"],
        ar: ["18,000 وحدة حرارية", "ضاغط انفرتر", "تبريد سريع", "تحكم عن بعد"]
      },
      image: "https://img.freepik.com/free-photo/air-conditioner-mounted-white-wall_53876-133368.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 8,
      name: {
        en: "Midea Split AC 2.25HP Hot/Cold",
        ar: "مكيف ميديا سبليت 2.25 حصان ساخن/بارد"
      },
      description: {
        en: "Advanced 2.25HP hot/cold split AC with smart features",
        ar: "مكيف ميديا سبليت 2.25 حصان ساخن/بارد بميزات ذكية"
      },
      features: {
        en: ["18,000 BTU", "WiFi Connectivity", "Eco-Friendly Refrigerant", "Silent Mode"],
        ar: ["18,000 وحدة حرارية", "اتصال WiFi", "مبرد صديق للبيئة", "وضع هادئ"]
      },
      image: "https://img.freepik.com/premium-photo/white-air-conditioner_1218049-14649.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    }
  ],
  section3: [
    {
      id: 9,
      name: {
        en: "Sharp Split AC 1.5HP Cooling",
        ar: "مكيف شارب سبليت 1.5 حصان بارد"
      },
      description: {
        en: "Reliable 1.5HP cooling split AC with Plasmacluster technology",
        ar: "مكيف شارب سبليت 1.5 حصان بارد بتقنية بلازما كلاستر"
      },
      features: {
        en: ["12,000 BTU", "Plasmacluster Ion", "Energy Efficient", "Auto Restart"],
        ar: ["12,000 وحدة حرارية", "بلازما كلاستر أيون", "موفر للطاقة", "إعادة تشغيل تلقائي"]
      },
      image: "https://img.freepik.com/free-photo/air-conditioner-mounted-white-wall_53876-128235.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 10,
      name: {
        en: "Sharp Split AC 1.5HP Hot/Cold",
        ar: "مكيف شارب سبليت 1.5 حصان ساخن/بارد"
      },
      description: {
        en: "1.5HP hot/cold split AC with air purification",
        ar: "مكيف شارب سبليت 1.5 حصان ساخن/بارد مع تنقية الهواء"
      },
      features: {
        en: ["12,000 BTU", "Plasmacluster Technology", "Heating Mode", "Low Noise"],
        ar: ["12,000 وحدة حرارية", "تقنية بلازما كلاستر", "وضع التدفئة", "ضوضاء منخفضة"]
      },
      image: "https://img.freepik.com/free-photo/air-conditioner-mounted-white-wall_53876-142862.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 11,
      name: {
        en: "Sharp Split AC 2.25HP Cooling",
        ar: "مكيف شارب سبليت 2.25 حصان بارد"
      },
      description: {
        en: "Powerful 2.25HP cooling split AC for large spaces",
        ar: "مكيف شارب سبليت 2.25 حصان بارد للمساحات الكبيرة"
      },
      features: {
        en: ["18,000 BTU", "Inverter Technology", "Turbo Cool", "Self-Cleaning"],
        ar: ["18,000 وحدة حرارية", "تقنية انفرتر", "تبريد توربو", "تنظيف ذاتي"]
      },
      image: "https://img.freepik.com/premium-photo/air-conditioner-white_1218049-10807.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 12,
      name: {
        en: "Sharp Split AC 2.25HP Hot/Cold",
        ar: "مكيف شارب سبليت 2.25 حصان ساخن/بارد"
      },
      description: {
        en: "Premium 2.25HP hot/cold split AC with advanced purification",
        ar: "مكيف شارب سبليت 2.25 حصان ساخن/بارد مع تنقية متقدمة"
      },
      features: {
        en: ["18,000 BTU", "Plasmacluster Ion", "Smart Control", "Eco Mode"],
        ar: ["18,000 وحدة حرارية", "بلازما كلاستر أيون", "تحكم ذكي", "وضع إيكو"]
      },
      image: "https://img.freepik.com/premium-photo/silver-ac-with-brown-stripe-it_1216335-175.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    }
  ],
  section4: [
    {
      id: 13,
      name: {
        en: "Tornado Split AC 1.5HP Cooling",
        ar: "مكيف تورنيدو سبليت 1.5 حصان بارد"
      },
      description: {
        en: "Affordable 1.5HP cooling split AC with robust performance",
        ar: "مكيف تورنيدو سبليت 1.5 حصان بارد بأداء قوي وسعر مناسب"
      },
      features: {
        en: ["12,000 BTU", "Turbo Cooling", "Anti-Dust Filter", "Durable Design"],
        ar: ["12,000 وحدة حرارية", "تبريد توربو", "فلتر مضاد للغبار", "تصميم متين"]
      },
      image: "https://img.freepik.com/premium-photo/close-up-air-conditioner-isolated_241146-645.jpg?ga=GA1.1.1450872929.1739217714&semt=ais_hybrid&w=740"
    },
    {
      id: 14,
      name: {
        en: "Tornado Split AC 1.5HP Hot/Cold",
        ar: "مكيف تورنيدو سبليت 1.5 حصان ساخن/بارد"
      },
      description: {
        en: "Reliable 1.5HP hot/cold split AC for all-weather comfort",
        ar: "مكيف تورنيدو سبليت 1.5 حصان ساخن/بارد لراحة في جميع الأحوال الجوية"
      },
      features: {
        en: ["12,000 BTU", "Heat Pump", "Auto Clean", "Remote Control"],
        ar: ["12,000 وحدة حرارية", "مضخة حرارية", "تنظيف تلقائي", "تحكم عن بعد"]
      },
      image: "https://plusair-sales.com/wp-content/uploads/2022/02/%D8%AA%D9%83%D9%8A%D9%8A%D9%81-%D8%AA%D9%88%D8%B1%D9%86%D9%8A%D8%AF%D9%88-%D8%B4%D8%B1%D9%83%D8%A9-%D8%A8%D9%84%D8%B3-%D8%A7%D9%8A%D8%B1-%D9%84%D9%84%D8%AA%D9%83%D9%8A%D9%8A%D9%81%D8%A7%D8%AA-01023069232-plusair-sales.com-.jpg"
    },
    {
      id: 15,
      name: {
        en: "Tornado Split AC 2.25HP Cooling",
        ar: "مكيف تورنيدو سبليت 2.25 حصان بارد"
      },
      description: {
        en: "High-capacity 2.25HP cooling split AC for spacious rooms",
        ar: "مكيف تورنيدو سبليت 2.25 حصان بارد للغرف الواسعة"
      },
      features: {
        en: ["18,000 BTU", "Fast Cooling", "Energy Saving", "Low Noise"],
        ar: ["18,000 وحدة حرارية", "تبريد سريع", "توفير الطاقة", "ضوضاء منخفضة"]
      },
      image: "https://www.aldahome.com/media/catalog/product/cache/1/image/650x/040ec09b1e35df139433887a97daa66f/n/a/napoleon-1.5-ton-indoor.jpg"
    },
    {
      id: 16,
      name: {
        en: "Tornado Split AC 2.25HP Hot/Cold",
        ar: "مكيف تورنيدو سبليت 2.25 حصان ساخن/بارد"
      },
      description: {
        en: "Durable 2.25HP hot/cold split AC with modern features",
        ar: "مكيف تورنيدو سبليت 2.25 حصان ساخن/بارد بميزات عصرية"
      },
      features: {
        en: ["18,000 BTU", "Inverter Technology", "Smart Control", "Anti-Bacterial Filter"],
        ar: ["18,000 وحدة حرارية", "تقنية انفرتر", "تحكم ذكي", "فلتر مضاد للبكتيريا"]
      },
      image: "https://eg.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/16/107372/1.jpg?2228"
    }
  ]
};

interface ProductsSectionProps {
  onViewAR: (productImage: string, productName: string) => void;
}

const ProductsSection = ({ onViewAR }: ProductsSectionProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  const sectionTitles = {
    en: [
      'Carrier Air Conditioners',
      'Midea Air Conditioners',
      'Sharp Air Conditioners',
      'Tornado Air Conditioners'
    ],
    ar: [
      'مكيفات كارير',
      'مكيفات ميديا',
      'مكيفات شارب',
      'مكيفات تورنيدو'
    ]
  };

  const arViewText = {
    en: "View in AR",
    ar: "عرض بتقنية الواقع المعزز"
  };

  const handleViewDetails = () => {
    navigate('/contact');
  };

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
            <h3 className="text-2xl font-bold mb-6 text-gray-800 reveal">
              {language === 'ar' ? sectionTitles.ar[sectionIndex] : sectionTitles.en[sectionIndex]}
            </h3>
            
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
                        alt={language === 'ar' ? product.name.ar : product.name.en} 
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle>{language === 'ar' ? product.name.ar : product.name.en}</CardTitle>
                      <CardDescription>{language === 'ar' ? product.description.ar : product.description.en}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <ul className="list-disc list-inside space-y-1 text-gray-600">
                        {(language === 'ar' ? product.features.ar : product.features.en).map((feature: string, i: number) => (
                          <li key={i}>{feature}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                      <Button 
                        className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white"
                        onClick={handleViewDetails}
                      >
                        {t('products.viewDetails')}
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full border-cyan-500 text-cyan-700 hover:bg-cyan-50"
                        onClick={() => onViewAR(
                          product.image, 
                          language === 'ar' ? product.name.ar : product.name.en
                        )}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        {language === 'ar' ? arViewText.ar : arViewText.en}
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