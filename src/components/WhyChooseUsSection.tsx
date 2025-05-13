
import React from 'react';
import { Star, Clock, HeadphonesIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const WhyChooseUsSection = () => {
  const { t, language } = useLanguage();
  
  const features = [
    {
      id: 1,
      title: language === 'en' ? 'Quality Service' : 'خدمة ذات جودة',
      description: language === 'en' ? 
        'We use only top-grade materials and equipment for all our installations and repairs.' : 
        'نستخدم فقط مواد ومعدات عالية الجودة لجميع التركيبات والإصلاحات لدينا.',
      icon: <Star className="h-12 w-12 text-white" />,
      delay: '0s',
      gradient: 'from-cyan-500 to-blue-600'
    },
    {
      id: 2,
      title: language === 'en' ? 'Fast Response' : 'استجابة سريعة',
      description: language === 'en' ? 
        'Our team responds quickly to service calls with prompt and efficient solutions.' : 
        'يستجيب فريقنا بسرعة لمكالمات الخدمة مع حلول سريعة وفعالة.',
      icon: <Clock className="h-12 w-12 text-white" />,
      delay: '0.2s',
      gradient: 'from-purple-500 to-violet-600'
    },
    {
      id: 3,
      title: language === 'en' ? '24/7 Technical Support' : 'دعم فني على مدار الساعة',
      description: language === 'en' ? 
        'Our technical support team is available round the clock to assist with any issues.' : 
        'فريق الدعم الفني لدينا متاح على مدار الساعة للمساعدة في أي مشكلة.',
      icon: <HeadphonesIcon className="h-12 w-12 text-white" />,
      delay: '0.4s',
      gradient: 'from-pink-500 to-fuchsia-600'
    }
  ];

  return (
    <section id="about" className="bg-gradient-to-br from-white to-gray-50 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{t('about.title')}</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-pink-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('about.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {features.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-center text-center p-6 reveal hover:scale-105 transition-all duration-300"
              style={{ transitionDelay: feature.delay }}
            >
              <div className={`mb-6 p-6 rounded-full bg-gradient-to-br ${feature.gradient} shadow-lg border border-white/20 hover:shadow-xl transition-all`}>
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20 bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg shadow-md reveal border border-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center" dir={language === 'ar' ? 'rtl' : 'ltr'}>
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{t('about.title')}</h3>
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
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-lg text-center border border-gray-100 hover:shadow-xl hover:scale-105 transition-all">
                  <h4 className="text-4xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">10+</h4>
                  <p className="text-gray-600">{t('about.experience')}</p>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-lg text-center border border-gray-100 hover:shadow-xl hover:scale-105 transition-all">
                  <h4 className="text-4xl font-bold bg-gradient-to-r from-purple-500 to-violet-600 bg-clip-text text-transparent">500+</h4>
                  <p className="text-gray-600">{t('about.projects')}</p>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-lg text-center border border-gray-100 hover:shadow-xl hover:scale-105 transition-all">
                  <h4 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-fuchsia-600 bg-clip-text text-transparent">100%</h4>
                  <p className="text-gray-600">{t('about.satisfaction')}</p>
                </div>
                <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-lg shadow-lg text-center border border-gray-100 hover:shadow-xl hover:scale-105 transition-all">
                  <h4 className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">24/7</h4>
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
