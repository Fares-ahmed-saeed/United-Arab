
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
    'services.maintenance': 'Maintenance',
    'services.maintenance.desc': 'Regular maintenance and repair services to keep your air conditioning systems running efficiently.',
    'services.repair': 'Repair',
    'services.repair.desc': 'Fast and reliable repair services for all types of air conditioning systems when they break down.',
    'services.consultation': 'Consultation',
    'services.consultation.desc': 'Expert advice on selecting the right cooling solutions for your specific needs and budget.',
    'services.sales': 'Sales',
    'services.sales.desc': 'Wide selection of top-quality air conditioning units and components at competitive prices.',
    'services.warranty': 'Warranty',
    'services.warranty.desc': 'Comprehensive warranty coverage on all our installations and products for your peace of mind.',
    'services.learnMore': 'Learn More',
    'services.viewProducts': 'View Our Products',
    
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
    'hero.projects': 'مشاريع',
    'hero.support': 'دعم',
    'hero.satisfaction': 'رضا العملاء',
    
    // Services Section
    'services.title': 'خدماتنا',
    'services.subtitle': 'نقدم حلول تكييف الهواء الشاملة للعقارات السكنية والتجارية.',
    'services.installation': 'التركيب',
    'services.installation.desc': 'التركيب الاحترافي لجميع العلامات التجارية وأنواع وحدات تكييف الهواء للمنازل والشركات.',
    'services.maintenance': 'الصيانة',
    'services.maintenance.desc': 'خدمات الصيانة والإصلاح المنتظمة للحفاظ على أنظمة تكييف الهواء تعمل بكفاءة.',
    'services.repair': 'الإصلاح',
    'services.repair.desc': 'خدمات إصلاح سريعة وموثوقة لجميع أنواع أنظمة تكييف الهواء عند تعطلها.',
    'services.consultation': 'الاستشارة',
    'services.consultation.desc': 'نصائح خبيرة حول اختيار حلول التبريد المناسبة لاحتياجاتك وميزانيتك المحددة.',
    'services.sales': 'المبيعات',
    'services.sales.desc': 'مجموعة واسعة من وحدات تكييف الهواء عالية الجودة والمكونات بأسعار تنافسية.',
    'services.warranty': 'الضمان',
    'services.warranty.desc': 'تغطية ضمان شاملة على جميع تركيباتنا ومنتجاتنا لراحة بالك.',
    'services.learnMore': 'اعرف المزيد',
    'services.viewProducts': 'عرض منتجاتنا',
    
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
      <div dir={language === 'ar' ? 'rtl' : 'ltr'}>
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
