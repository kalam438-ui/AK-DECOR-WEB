import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'hi' | 'mr' | 'ar' | 'bn';
type Currency = 'USD' | 'INR' | 'AED' | 'BDT' | 'OMR';

interface SettingsContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  formatPrice: (price: number) => string;
  t: (key: string) => string;
  isRTL: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    'welcome': 'Welcome to Our Store!',
    'home': 'Home',
    'shop': 'Shop',
    'design': 'Design',
    'about': 'About',
    'admin': 'Admin',
    'login': 'Login',
    'logout': 'Logout',
    'cart': 'Cart',
    'search': 'Search',
    'featured': 'Featured',
    'new': 'New',
    'bestseller': 'Best Seller',
    'toprated': 'Top Rated',
    'add_to_cart': 'Add to Cart',
    'buy_now': 'Buy Now',
    'contact_us': 'Contact Us',
    'chat_with_us': 'Chat with us!',
    'categories': 'Categories',
    'quick_links': 'Quick Links',
    'newsletter': 'Newsletter',
    'subscribe': 'Subscribe',
    'all_rights_reserved': 'All Rights Reserved',
  },
  hi: {
    'welcome': 'हमारे स्टोर में आपका स्वागत है!',
    'home': 'होम',
    'shop': 'शॉप',
    'design': 'डिज़ाइन',
    'about': 'हमारे बारे में',
    'admin': 'एडमिन',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'cart': 'कार्ट',
    'search': 'खोजें',
    'featured': 'विशेष',
    'new': 'नया',
    'bestseller': 'बेस्ट सेलर',
    'toprated': 'टॉप रेटेड',
    'add_to_cart': 'कार्ट में जोड़ें',
    'buy_now': 'अभी खरीदें',
    'contact_us': 'संपर्क करें',
    'chat_with_us': 'हमसे चैट करें!',
    'categories': 'श्रेणियां',
    'quick_links': 'त्वरित लिंक',
    'newsletter': 'न्यूज़लेटर',
    'subscribe': 'सब्सक्राइब',
    'all_rights_reserved': 'सर्वाधिकार सुरक्षित',
  },
  mr: {
    'welcome': 'आमच्या स्टोअरमध्ये आपले स्वागत आहे!',
    'home': 'होम',
    'shop': 'शॉप',
    'design': 'डिझाइन',
    'about': 'आमच्याबद्दल',
    'admin': 'अ‍ॅडमिन',
    'login': 'लॉगिन',
    'logout': 'लॉगआउट',
    'cart': 'कार्ट',
    'search': 'शोधा',
    'featured': 'वैशिष्ट्यीकृत',
    'new': 'नवीन',
    'bestseller': 'बेस्ट सेलर',
    'toprated': 'टॉप रेटेड',
    'add_to_cart': 'कार्टमध्ये जोडा',
    'buy_now': 'आता खरेदी करा',
    'contact_us': 'संपर्क साधा',
    'chat_with_us': 'आमच्याशी चॅट करा!',
    'categories': 'श्रेणी',
    'quick_links': 'द्रुत दुवे',
    'newsletter': 'न्यूझलेटर',
    'subscribe': 'सब्सक्राइब',
    'all_rights_reserved': 'सर्व हक्क राखीव',
  },
  ar: {
    'welcome': 'أهلاً بكم في متجرنا!',
    'home': 'الرئيسية',
    'shop': 'المتجر',
    'design': 'التصميم',
    'about': 'من نحن',
    'admin': 'المسؤول',
    'login': 'تسجيل الدخول',
    'logout': 'تسجيل الخروج',
    'cart': 'السلة',
    'search': 'بحث',
    'featured': 'مميز',
    'new': 'جديد',
    'bestseller': 'الأكثر مبيعاً',
    'toprated': 'الأعلى تقييماً',
    'add_to_cart': 'أضف إلى السلة',
    'buy_now': 'اشتري الآن',
    'contact_us': 'اتصل بنا',
    'chat_with_us': 'دردش معنا!',
    'categories': 'الفئات',
    'quick_links': 'روابط سريعة',
    'newsletter': 'النشرة الإخبارية',
    'subscribe': 'اشتراك',
    'all_rights_reserved': 'جميع الحقوق محفوظة',
  },
  bn: {
    'welcome': 'আমাদের স্টোরে স্বাগতম!',
    'home': 'হোম',
    'shop': 'শপ',
    'design': 'ডিজাইন',
    'about': 'আমাদের সম্পর্কে',
    'admin': 'অ্যাডমিন',
    'login': 'লগইন',
    'logout': 'লগআউট',
    'cart': 'কার্ট',
    'search': 'অনুসন্ধান',
    'featured': 'বৈশিষ্ট্যযুক্ত',
    'new': 'নতুন',
    'bestseller': 'সেরা বিক্রেতা',
    'toprated': 'শীর্ষ রেটযুক্ত',
    'add_to_cart': 'কার্টে যোগ করুন',
    'buy_now': 'এখনই কিনুন',
    'contact_us': 'যোগাযোগ করুন',
    'chat_with_us': 'আমাদের সাথে চ্যাট করুন!',
    'categories': 'বিভাগ',
    'quick_links': 'দ্রুত লিঙ্ক',
    'newsletter': 'নিউজলেটার',
    'subscribe': 'সাবস্ক্রাইব',
    'all_rights_reserved': 'সমস্ত অধিকার সংরক্ষিত',
  }
};

const currencyRates = {
  USD: 1,
  INR: 83.5,
  AED: 3.67,
  BDT: 109.5,
  OMR: 0.38,
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || 'en';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('app_currency');
    return (saved as Currency) || 'USD';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    localStorage.setItem('app_language', language);
    document.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language, isRTL]);

  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

  const formatPrice = (price: number) => {
    const convertedPrice = price * currencyRates[currency];
    return new Intl.NumberFormat(language === 'ar' ? 'ar-AE' : language === 'bn' ? 'bn-BD' : 'en-US', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: currency === 'USD' ? 2 : 3,
    }).format(convertedPrice);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <SettingsContext.Provider value={{ language, currency, setLanguage, setCurrency, formatPrice, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-sans' : ''}>
        {children}
      </div>
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
