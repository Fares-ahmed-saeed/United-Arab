import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { useLanguage } from '@/contexts/LanguageContext';
import { Separator } from '@/components/ui/separator';
import { useNavigate } from 'react-router-dom';
import { Eye3d } from 'lucide-react';

// Sample air conditioner products for each section with Arabic translations
const sampleProducts = {
  section1: [
    {
      id: 1,
      name: {
        en: "Split AC Model S-101",
        ar: "مكيف سبليت موديل S-101"
      },
      description: {
        en: "Energy efficient split air conditioner for small rooms",
        ar: "مكيف هواء سبليت موفر للطاقة للغرف الصغيرة"
      },
      features: {
        en: ["18,000 BTU", "Energy Star Rated", "Sleep Mode", "Remote Control"],
        ar: ["18,000 وحدة حرارية", "معتمد من Energy Star", "وضع السكون", "تحكم عن بعد"]
      },
      image: "https://images.unsplash.com/photo-1628913296855-8757c622af62?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 2,
      name: {
        en: "Split AC Model S-202",
        ar: "مكيف سبليت موديل S-202"
      },
      description: {
        en: "Powerful cooling for medium-sized rooms with air purifier",
        ar: "تبريد قوي للغرف متوسطة الحجم مع منقي هواء"
      },
      features: {
        en: ["24,000 BTU", "HEPA Filter", "Smart Control", "Low Noise"],
        ar: ["24,000 وحدة حرارية", "فلتر HEPA", "تحكم ذكي", "ضوضاء منخفضة"]
      },
      image: "https://images.unsplash.com/photo-1600520611035-84157ad4494d?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 3,
      name: {
        en: "Split AC Model S-303",
        ar: "مكيف سبليت موديل S-303"
      },
      description: {
        en: "Premium inverter split AC for large living rooms",
        ar: "مكيف سبليت انفرتر ممتاز لغرف المعيشة الكبيرة"
      },
      features: {
        en: ["30,000 BTU", "Inverter Technology", "WiFi Control", "4-Way Air Flow"],
        ar: ["30,000 وحدة حرارية", "تقنية انفرتر", "تحكم عبر WiFi", "تدفق الهواء 4 اتجاهات"]
      },
      image: "https://images.unsplash.com/photo-1581275233124-a1d92edd66a9?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 4,
      name: {
        en: "Split AC Model S-404",
        ar: "مكيف سبليت موديل S-404"
      },
      description: {
        en: "Ultra silent split AC with advanced filtration system",
        ar: "مكيف سبليت فائق الهدوء مع نظام ترشيح متقدم"
      },
      features: {
        en: ["24,000 BTU", "20dB Silent Mode", "Anti-bacterial Filter", "Motion Sensor"],
        ar: ["24,000 وحدة حرارية", "وضع صامت 20 ديسيبل", "فلتر مضاد للبكتيريا", "مستشعر حركة"]
      },
      image: "https://cdn.pixabay.com/photo/2017/08/24/03/41/air-conditioner-2675559_960_720.jpg"
    }
  ],
  section2: [
    {
      id: 5,
      name: {
        en: "Central AC System C-100",
        ar: "نظام تكييف مركزي C-100"
      },
      description: {
        en: "Whole-house cooling solution with zoning capabilities",
        ar: "حل تبريد للمنزل بالكامل مع إمكانيات تقسيم المناطق"
      },
      price: "$2,499",
      features: {
        en: ["60,000 BTU", "Multi-zone Control", "High SEER Rating", "Smart Thermostat"],
        ar: ["60,000 وحدة حرارية", "تحكم متعدد المناطق", "تصنيف SEER عالي", "منظم حرارة ذكي"]
      },
      image: "https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 6,
      name: {
        en: "Central AC System C-200",
        ar: "نظام تكييف مركزي C-200"
      },
      description: {
        en: "Advanced ducted system with humidity control",
        ar: "نظام مجاري متقدم مع التحكم في الرطوبة"
      },
      price: "$3,299",
      features: {
        en: ["72,000 BTU", "Humidity Control", "HEPA Filtration", "Quiet Operation"],
        ar: ["72,000 وحدة حرارية", "التحكم في الرطوبة", "ترشيح HEPA", "تشغيل هادئ"]
      },
      image: "https://images.unsplash.com/photo-1504176910849-16a1790reporter.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 7,
      name: {
        en: "Central AC System C-300",
        ar: "نظام تكييف مركزي C-300"
      },
      description: {
        en: "Commercial-grade central air conditioning with zone control",
        ar: "تكييف هواء مركزي من الدرجة التجارية مع التحكم في المناطق"
      },
      price: "$4,199",
      features: {
        en: ["120,000 BTU", "8-Zone Control", "Commercial Grade", "Energy Management"],
        ar: ["120,000 وحدة حرارية", "تحكم 8 مناطق", "درجة تجارية", "إدارة الطاقة"]
      },
      image: "https://cdn.pixabay.com/photo/2016/11/23/15/04/air-conditioning-1853596_960_720.jpg"
    },
    {
      id: 8,
      name: {
        en: "Central AC System C-400",
        ar: "نظام تكييف مركزي C-400"
      },
      description: {
        en: "High-efficiency central system with air purification",
        ar: "نظام مركزي عالي الكفاءة مع تنقية الهواء"
      },
      price: "$3,799",
      features: {
        en: ["90,000 BTU", "21 SEER Rating", "UV Air Purifier", "Variable Speed Fan"],
        ar: ["90,000 وحدة حرارية", "تصنيف SEER 21", "منقي هواء بالأشعة فوق البنفسجية", "مروحة متغيرة السرعة"]
      },
      image: "https://cdn.pixabay.com/photo/2020/04/28/01/42/ceiling-5102822_960_720.jpg"
    }
  ],
  section3: [
    {
      id: 9,
      name: {
        en: "Portable AC Model P-100",
        ar: "مكيف متنقل موديل P-100"
      },
      description: {
        en: "Compact portable air conditioner for small spaces",
        ar: "مكيف هواء متنقل مدمج للمساحات الصغيرة"
      },
      price: "$349",
      features: {
        en: ["10,000 BTU", "Easy Installation", "Remote Control", "Dehumidifier"],
        ar: ["10,000 وحدة حرارية", "تركيب سهل", "تحكم عن بعد", "مزيل الرطوبة"]
      },
      image: "https://images.unsplash.com/photo-1599732494971-f8cef4b7ccce?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 10,
      name: {
        en: "Portable AC Model P-200",
        ar: "مكيف متنقل موديل P-200"
      },
      description: {
        en: "Mid-size portable unit with smart features",
        ar: "وحدة متنقلة متوسطة الحجم مع ميزات ذكية"
      },
      price: "$449",
      features: {
        en: ["12,000 BTU", "WiFi Control", "Programmable Timer", "Low Noise"],
        ar: ["12,000 وحدة حرارية", "تحكم عبر WiFi", "مؤقت قابل للبرمجة", "ضوضاء منخفضة"]
      },
      image: "https://cdn.pixabay.com/photo/2020/05/07/13/05/air-conditioner-5140647_960_720.jpg"
    },
    {
      id: 11,
      name: {
        en: "Portable AC Model P-300",
        ar: "مكيف متنقل موديل P-300"
      },
      description: {
        en: "High-capacity portable AC for larger rooms",
        ar: "مكيف هواء متنقل بسعة عالية للغرف الأكبر"
      },
      price: "$549",
      features: {
        en: ["14,000 BTU", "Three Cooling Speeds", "Auto-Evaporation", "Sleep Mode"],
        ar: ["14,000 وحدة حرارية", "ثلاث سرعات تبريد", "تبخر تلقائي", "وضع النوم"]
      },
      image: "https://cdn.pixabay.com/photo/2018/09/01/22/22/air-conditioner-3647998_960_720.jpg"
    },
    {
      id: 12,
      name: {
        en: "Portable AC Model P-400",
        ar: "مكيف متنقل موديل P-400"
      },
      description: {
        en: "Premium dual-hose portable air conditioner",
        ar: "مكيف هواء متنقل مزدوج الخرطوم من الدرجة الممتازة"
      },
      price: "$649",
      features: {
        en: ["14,000 BTU", "Dual Hose Design", "Digital Control", "Heating Function"],
        ar: ["14,000 وحدة حرارية", "تصميم مزدوج الخرطوم", "تحكم رقمي", "وظيفة التدفئة"]
      },
      image: "https://cdn.pixabay.com/photo/2018/07/05/22/22/portable-air-conditioner-3519318_960_720.jpg"
    }
  ],
  section4: [
    {
      id: 13,
      name: {
        en: "Energy Saver Model E-100",
        ar: "موديل موفر للطاقة E-100"
      },
      description: {
        en: "Ultra-efficient inverter AC with lowest power consumption",
        ar: "مكيف انفرتر فائق الكفاءة مع أقل استهلاك للطاقة"
      },
      price: "$899",
      features: {
        en: ["12,000 BTU", "28 SEER Rating", "Solar Compatible", "Eco Mode"],
        ar: ["12,000 وحدة حرارية", "تصنيف SEER 28", "متوافق مع الطاقة الشمسية", "وضع توفير الطاقة"]
      },
      image: "https://images.unsplash.com/photo-1543674892-8f7c7ce61394?ixlib=rb-1.2.1&auto=format&fit=crop&w=640&q=80"
    },
    {
      id: 14,
      name: {
        en: "Energy Saver Model E-200",
        ar: "موديل موفر للطاقة E-200"
      },
      description: {
        en: "Smart eco-friendly split AC with consumption tracking",
        ar: "مكيف سبليت صديق للبيئة ذكي مع تتبع الاستهلاك"
      },
      price: "$1,099",
      features: {
        en: ["18,000 BTU", "Energy Tracking App", "R-32 Refrigerant", "Load Sensing"],
        ar: ["18,000 وحدة حرارية", "تطبيق تتبع الطاقة", "غاز تبريد R-32", "استشعار الحمل"]
      },
      image: "https://cdn.pixabay.com/photo/2017/04/10/14/54/air-conditioning-2218756_960_720.jpg"
    },
    {
      id: 15,
      name: {
        en: "Energy Saver Model E-300",
        ar: "موديل موفر للطاقة E-300"
      },
      description: {
        en: "Premium efficiency central AC for whole-house cooling",
        ar: "مكيف مركزي عالي الكفاءة لتبريد المنزل بالكامل"
      },
      price: "$2,899",
      features: {
        en: ["48,000 BTU", "26 SEER Rating", "Variable Speed", "Smart Zoning"],
        ar: ["48,000 وحدة حرارية", "تصنيف SEER 26", "سرعة متغيرة", "تقسيم مناطق ذكي"]
      },
      image: "https://cdn.pixabay.com/photo/2017/08/01/09/34/air-conditioner-2563621_960_720.jpg"
    },
    {
      id: 16,
      name: {
        en: "Energy Saver Model E-400",
        ar: "موديل موفر للطاقة E-400"
      },
      description: {
        en: "Solar-assisted hybrid cooling system",
        ar: "نظام تبريد هجين بمساعدة الطاقة الشمسية"
      },
      price: "$3,499",
      features: {
        en: ["36,000 BTU", "Solar Panel Integration", "Hybrid Technology", "Smart Grid Ready"],
        ar: ["36,000 وحدة حرارية", "تكامل الألواح الشمسية", "تقنية هجينة", "جاهز للشبكة الذكية"]
      },
      image: "https://cdn.pixabay.com/photo/2018/10/05/14/01/cooling-3726493_960_720.jpg"
    }
  ]
};

interface ProductsSectionProps {
  onViewAR: (productImage: string, productName: string) => void;
}

const ProductsSection = ({ onViewAR }: ProductsSectionProps) => {
  const { t, language } = useLanguage();
  const navigate = useNavigate();
  
  // Section titles with updated Arabic translations
  const sectionTitles = {
    en: [
      'Split Air Conditioners',
      'Central Air Conditioning',
      'Portable Air Conditioners',
      'Energy-Saving Models'
    ],
    ar: [
      'مكيفات كارير',
      'تكييفات ميديا',
      'تكييفات شارب',
      'تكييفات تورنيدو'
    ]
  };

  // AR View button translations
  const arViewText = {
    en: "View in AR",
    ar: "عرض بتقنية الواقع المعزز"
  };

  // Navigate to contact page when View Details is clicked
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
                        <Eye3d className="mr-2 h-4 w-4" />
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
