
import React from 'react';
import { Star, Clock, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyChooseUsSection = () => {
  const { t, language } = useLanguage();
  
  const features = [
    {
      id: 1,
      title: 'Quality Service',
      description: 'We use only top-grade materials and equipment for all our installations and repairs.',
      icon: <Star className="h-12 w-12 text-brand-blue" />,
      delay: '0s'
    },
    {
      id: 2,
      title: 'Fast Response',
      description: 'Our team responds quickly to service calls with prompt and efficient solutions.',
      icon: <Clock className="h-12 w-12 text-brand-blue" />,
      delay: '0.2s'
    },
    {
      id: 3,
      title: '24/7 Technical Support',
      description: 'Our technical support team is available round the clock to assist with any issues.',
      icon: <HeadphonesIcon className="h-12 w-12 text-brand-blue" />,
      delay: '0.4s'
    }
  ];

  return (
    <section id="about" className="bg-white relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('about.title')}</h2>
          <div className="w-24 h-1 bg-brand-blue mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center p-6 reveal"
              style={{ transitionDelay: feature.delay }}
            >
              <div className="mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gray-50 p-8 rounded-lg shadow-md reveal">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div>
              <h3 className="text-2xl font-bold mb-4">{t('about.title')}</h3>
              <p className="text-gray-600 mb-4">
                {language === 'en' ? 
                  "With years of experience in the HVAC industry, our team of certified technicians delivers exceptional air conditioning solutions for residential and commercial properties." :
                  "مع سنوات من الخبرة في صناعة التدفئة والتهوية وتكييف الهواء، يقدم فريقنا من الفنيين المعتمدين حلول تكييف الهواء الاستثنائية للعقارات السكنية والتجارية."
                }
              </p>
              <p className="text-gray-600">
                {language === 'en' ? 
                  "We take pride in our commitment to quality workmanship and customer satisfaction, ensuring that every project is completed to the highest standards." :
                  "نحن نفخر بالتزامنا بالعمل الجيد ورضا العملاء، مما يضمن إكمال كل مشروع وفقًا لأعلى المعايير."
                }
              </p>
            </div>
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h4 className="text-4xl font-bold text-brand-blue">10+</h4>
                  <p className="text-gray-600">{t('about.experience')}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h4 className="text-4xl font-bold text-brand-blue">500+</h4>
                  <p className="text-gray-600">{t('about.projects')}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h4 className="text-4xl font-bold text-brand-blue">100%</h4>
                  <p className="text-gray-600">{t('about.satisfaction')}</p>
                </div>
                <div className="bg-white p-6 rounded-lg shadow text-center">
                  <h4 className="text-4xl font-bold text-brand-blue">24/7</h4>
                  <p className="text-gray-600">{t('about.service')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
