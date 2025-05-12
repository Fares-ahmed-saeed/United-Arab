
import React, { createContext, useState, useContext, ReactNode } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.services': 'Our Services',
    'nav.products': 'Products',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.book': 'Book Now',
    
    // Hero Section
    'hero.title': 'Expert Air Conditioning Solutions',
    'hero.subtitle': 'Installation, maintenance, and sales services for all your HVAC needs',
    'hero.book': 'Book Now',
    'hero.services': 'Our Services',
    'hero.experience': 'Years Experience',
    'hero.projects': 'Projects',
    'hero.support': 'Support',
    'hero.satisfaction': 'Satisfaction',
    
    // Services Section
    'services.title': 'Our Services',
    'services.subtitle': 'We provide comprehensive air conditioning solutions for residential and commercial properties.',
    'services.installation': 'Installation',
    'services.installation.desc': 'Professional installation of all brands and types of air conditioning units for homes and businesses.',
    'services.installation.details': 'Our team of certified technicians provides seamless installation of air conditioning units for both residential and commercial properties. We ensure proper sizing, optimal placement, and energy-efficient setup to maximize comfort and minimize operational costs.',
    'services.maintenance': 'Maintenance',
    'services.maintenance.desc': 'Regular maintenance and repair services to keep your air conditioning systems running efficiently.',
    'services.maintenance.details': 'Regular maintenance is essential to extend the life of your AC system and reduce energy costs. Our maintenance program includes cleaning or replacing filters, checking refrigerant levels, inspecting components, and ensuring optimal performance year-round.',
    'services.repair': 'Repair',
    'services.repair.desc': 'Fast and reliable repair services for all types of air conditioning systems when they break down.',
    'services.repair.details': 'Our emergency repair service is available 24/7. Our experienced technicians can quickly diagnose and fix issues with all major brands and models of air conditioning systems. We maintain a full inventory of parts to ensure prompt repairs.',
    'services.consultation': 'Consultation',
    'services.consultation.desc': 'Expert advice on selecting the right cooling solutions for your specific needs and budget.',
    'services.consultation.details': 'Our consultation services help you make informed decisions about your HVAC needs. We assess your space, usage patterns, and budget to recommend the most efficient and cost-effective cooling solutions for your home or business.',
    'services.sales': 'Sales',
    'services.sales.desc': 'Wide selection of top-quality air conditioning units and components at competitive prices.',
    'services.sales.details': 'We offer a comprehensive selection of energy-efficient air conditioning systems from leading manufacturers. Our sales team can help you choose the perfect unit based on your cooling requirements, space limitations, and budget considerations.',
    'services.warranty': 'Warranty',
    'services.warranty.desc': 'Comprehensive warranty coverage on all our installations and products for your peace of mind.',
    'services.warranty.details': 'All of our installations come with extensive warranty coverage. We also honor manufacturer warranties and offer extended warranty options for additional peace of mind. Our service agreements provide priority scheduling and discounted rates on maintenance and repairs.',
    'services.learnMore': 'Learn More',
    'services.viewProducts': 'View Our Products',
    'services.viewDetails': 'View Details',
    'services.close': 'Close',
    
    // Products Section
    'products.title': 'Our Products',
    'products.subtitle': 'Explore our range of high-quality air conditioning systems for residential and commercial use.',
    'products.viewDetails': 'View Details',
    'products.loading': 'Loading products...',
    'products.error': 'Error loading products. Please try again later.',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.services': 'خدماتنا',
    'nav.products': 'المنتجات',
    'nav.about': 'من نحن',
    'nav.contact': 'اتصل بنا',
    'nav.book': 'احجز الآن',
    
    // Hero Section
    'hero.title': 'حلول تكييف الهواء المتخصصة',
    'hero.subtitle': 'خدمات التركيب والصيانة والمبيعات لجميع احتياجات التدفئة والتهوية وتكييف الهواء',
    'hero.book': 'احجز الآن',
    'hero.services': 'خدماتنا',
    'hero.experience': 'سنوات الخبرة',
    'hero.projects': 'المشاريع',
    'hero.support': 'الدعم',
    'hero.satisfaction': 'رضا العملاء',
    
    // Services Section
    'services.title': 'خدماتنا',
    'services.subtitle': 'نقدم حلول تكييف الهواء الشاملة للعقارات السكنية والتجارية.',
    'services.installation': 'التركيب',
    'services.installation.desc': 'تركيب احترافي لجميع العلامات التجارية وأنواع وحدات تكييف الهواء للمنازل والشركات.',
    'services.installation.details': 'يقدم فريقنا من الفنيين المعتمدين تركيبًا سلسًا لوحدات تكييف الهواء للعقارات السكنية والتجارية. نضمن الحجم المناسب، والموضع الأمثل، والإعداد الموفر للطاقة لزيادة الراحة وتقليل تكاليف التشغيل.',
    'services.maintenance': 'الصيانة',
    'services.maintenance.desc': 'خدمات الصيانة والإصلاح الدورية للحفاظ على أنظمة تكييف الهواء تعمل بكفاءة.',
    'services.maintenance.details': 'الصيانة المنتظمة ضرورية لإطالة عمر نظام التكييف وتقليل تكاليف الطاقة. يتضمن برنامج الصيانة لدينا تنظيف أو استبدال الفلاتر، وفحص مستويات المبرد، وفحص المكونات، وضمان الأداء الأمثل على مدار العام.',
    'services.repair': 'الإصلاح',
    'services.repair.desc': 'خدمات إصلاح سريعة وموثوقة لجميع أنواع أنظمة تكييف الهواء عند تعطلها.',
    'services.repair.details': 'خدمة الإصلاح الطارئة لدينا متاحة على مدار 24 ساعة طوال أيام الأسبوع. يمكن لفنيينا ذوي الخبرة تشخيص وإصلاح المشكلات سريعًا مع جميع العلامات التجارية والموديلات الرئيسية لأنظمة تكييف الهواء. نحتفظ بمخزون كامل من قطع الغيار لضمان الإصلاحات الفورية.',
    'services.consultation': 'الاستشارة',
    'services.consultation.desc': 'نصائح خبيرة حول اختيار حلول التبريد المناسبة لاحتياجاتك وميزانيتك المحددة.',
    'services.consultation.details': 'تساعدك خدمات الاستشارات لدينا على اتخاذ قرارات مستنيرة بشأن احتياجات التدفئة والتهوية وتكييف الهواء. نحن نقيم مساحتك وأنماط الاستخدام والميزانية للتوصية بأكثر حلول التبريد كفاءة وفعالية من حيث التكلفة لمنزلك أو عملك.',
    'services.sales': 'المبيعات',
    'services.sales.desc': 'مجموعة واسعة من وحدات تكييف الهواء عالية الجودة والمكونات بأسعار تنافسية.',
    'services.sales.details': 'نقدم مجموعة شاملة من أنظمة تكييف الهواء الموفرة للطاقة من الشركات المصنعة الرائدة. يمكن لفريق المبيعات لدينا مساعدتك في اختيار الوحدة المثالية بناءً على متطلبات التبريد وقيود المساحة واعتبارات الميزانية.',
    'services.warranty': 'الضمان',
    'services.warranty.desc': 'تغطية ضمان شاملة على جميع تركيباتنا ومنتجاتنا لراحة بالك.',
    'services.warranty.details': 'تأتي جميع تركيباتنا مع تغطية ضمان واسعة. نحن نحترم أيضًا ضمانات الشركة المصنعة ونقدم خيارات الضمان الممتدة لمزيد من راحة البال. توفر اتفاقيات الخدمة لدينا جدولة ذات أولوية وأسعارًا مخفضة على الصيانة والإصلاحات.',
    'services.learnMore': 'اعرف المزيد',
    'services.viewProducts': 'عرض منتجاتنا',
    'services.viewDetails': 'عرض التفاصيل',
    'services.close': 'إغلاق',
    
    // Products Section
    'products.title': 'منتجاتنا',
    'products.subtitle': 'استكشف مجموعتنا من أنظمة تكييف الهواء عالية الجودة للاستخدام السكني والتجاري.',
    'products.viewDetails': 'عرض التفاصيل',
    'products.loading': 'جاري تحميل المنتجات...',
    'products.error': 'خطأ في تحميل المنتجات. يرجى المحاولة مرة أخرى لاحقًا.',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={language === 'ar' ? 'rtl' : 'ltr'} className="min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
