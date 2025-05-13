import React, { createContext, useContext, useState, useCallback } from 'react';

// Define the available languages
export type Language = 'en' | 'ar';

// Translations
const translations = {
  en: {
    // Existing translations
    home: 'Home',
    products: 'Products',
    contact_us: 'Contact Us',
    services: 'Services',
    why_choose_us: 'Why Choose Us',
    send_message: 'Send Message',
    // Air Conditioner Calculator
    ac_calculator: 'AC Calculator',
    ac_calculator_title: 'Air Conditioning BTU Calculator',
    ac_calculator_subtitle: 'Find the Right Air Conditioner Size',
    ac_calculator_description: 'Use this calculator to determine the appropriate air conditioning capacity (BTU) needed for your room or space.',
    room_length: 'Room Length',
    room_width: 'Room Width',
    ceiling_height: 'Ceiling Height',
    room_type: 'Room Type',
    select_room_type: 'Select room type',
    bedroom: 'Bedroom',
    living_room: 'Living Room',
    kitchen: 'Kitchen',
    office: 'Office',
    sun_exposure: 'Sun Exposure',
    select_sun_exposure: 'Select sun exposure',
    sun_low: 'Low (Shaded/North Facing)',
    sun_medium: 'Medium (East/West Facing)',
    sun_high: 'High (Direct Sun/South Facing)',
    people_count: 'Number of People',
    insulation_quality: 'Insulation Quality',
    select_insulation: 'Select insulation quality',
    insulation_poor: 'Poor',
    insulation_average: 'Average',
    insulation_good: 'Good',
    insulation_description: 'How well insulated is your room?',
    calculate_btu: 'Calculate BTU',
    results: 'Recommended Capacity',
    btu_recommendation_note: 'This is an estimate. For professional sizing, please consult with our specialists.',
    ac_size_small: 'Small AC unit (5,000-8,000 BTU)',
    ac_size_medium: 'Medium AC unit (9,000-12,000 BTU)',
    ac_size_large: 'Large AC unit (14,000-18,000 BTU)',
    ac_size_xlarge: 'Extra Large AC unit (21,000-24,000 BTU)',
    ac_size_multiple: 'Multiple units or central system recommended',
    calculation_complete: 'Calculation Complete',
    btu_calculated: 'BTU requirement calculated successfully',
    calculation_error: 'Calculation Error',
    please_check_values: 'Please check your input values',
    // Dark mode
    switch_to_dark_mode: 'Switch to Dark Mode',
    switch_to_light_mode: 'Switch to Light Mode',
  },
  ar: {
    // Existing translations
    home: 'الرئيسية',
    products: 'المنتجات',
    contact_us: 'اتصل بنا',
    services: 'خدماتنا',
    why_choose_us: 'لماذا تختارنا',
    send_message: 'إرسال رسالة',
    // Air Conditioner Calculator
    ac_calculator: 'حاسبة التكييف',
    ac_calculator_title: 'حاسبة وحدات حرارية بريطانية (BTU) للتكييف',
    ac_calculator_subtitle: 'ابحث عن حجم مكيف الهواء المناسب',
    ac_calculator_description: 'استخدم هذه الحاسبة لتحديد سعة تكييف الهواء المناسبة (BTU) اللازمة لغرفتك أو مساحتك.',
    room_length: 'طول الغرفة',
    room_width: 'عرض الغرفة',
    ceiling_height: 'ارتفاع السقف',
    room_type: 'نوع الغرفة',
    select_room_type: 'اختر نوع الغرفة',
    bedroom: 'غرفة نوم',
    living_room: 'غرفة معيشة',
    kitchen: 'مطبخ',
    office: 'مكتب',
    sun_exposure: 'التعرض للشمس',
    select_sun_exposure: 'حدد التعرض للشمس',
    sun_low: 'منخفض (مظلل/مواجه للشمال)',
    sun_medium: 'متوسط (مواجه للشرق/الغرب)',
    sun_high: 'عالي (شمس مباشرة/مواجه للجنوب)',
    people_count: 'عدد الأشخاص',
    insulation_quality: 'جودة العزل',
    select_insulation: 'حدد جودة العزل',
    insulation_poor: 'ضعيف',
    insulation_average: 'متوسط',
    insulation_good: 'جيد',
    insulation_description: 'ما مدى عزل غرفتك؟',
    calculate_btu: 'حساب BTU',
    results: 'السعة الموصى بها',
    btu_recommendation_note: 'هذا تقدير. للحصول على الحجم المهني، يرجى استشارة المتخصصين لدينا.',
    ac_size_small: 'وحدة تكييف صغيرة (5,000-8,000 BTU)',
    ac_size_medium: 'وحدة تكييف متوسطة (9,000-12,000 BTU)',
    ac_size_large: 'وحدة تكييف كبيرة (14,000-18,000 BTU)',
    ac_size_xlarge: 'وحدة تكييف كبيرة جداً (21,000-24,000 BTU)',
    ac_size_multiple: 'ينصح بوحدات متعددة أو نظام مركزي',
    calculation_complete: 'اكتمل الحساب',
    btu_calculated: 'تم حساب متطلبات BTU بنجاح',
    calculation_error: 'خطأ في الحساب',
    please_check_values: 'يرجى التحقق من قيم الإدخال الخاصة بك',
    // Dark mode
    switch_to_dark_mode: 'التبديل إلى الوضع المظلم',
    switch_to_light_mode: 'التبديل إلى الوضع المضيء',
  }
};

// Create the context type
export interface LanguageContextValue {
  language: Language;
  changeLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context with default values
const LanguageContext = createContext<LanguageContextValue>({
  language: 'en',
  changeLanguage: () => {},
  t: (key) => key,
});

// Custom hook to use the language context
export const useLanguage = () => useContext(LanguageContext);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    return savedLanguage || 'en';
  });

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key as keyof typeof translations[typeof language]] || key;
    },
    [language]
  );

  const value = { language, changeLanguage, t };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
