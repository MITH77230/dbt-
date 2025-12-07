import { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi' | 'bn' | 'te' | 'mr' | 'ta' | 'gu' | 'kn' | 'ml' | 'or' | 'pa' | 'as' | 'ur';

export const languages = {
  en: 'English',
  hi: 'हिंदी',
  bn: 'বাংলা',
  te: 'తెలుగు',
  mr: 'मराठी',
  ta: 'தமிழ்',
  gu: 'ગુજરાતી',
  kn: 'ಕನ್ನಡ',
  ml: 'മലയാളം',
  or: 'ଓଡ଼ିଆ',
  pa: 'ਪੰਜਾਬੀ',
  as: 'অসমীয়া',
  ur: 'اردو'
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive Translation dictionary for entire portal
const translations: Record<string, Record<Language, string>> = {
  // Header translations
  'header.helpline': {
    en: 'Helpline: 1800-11-8004',
    hi: 'हेल्पलाइन: 1800-11-8004',
    bn: 'হেল্পলাইন: 1800-11-8004',
    te: 'హెల్ప్‌లైన్: 1800-11-8004',
    mr: 'हेल्पलाइन: 1800-11-8004',
    ta: 'உதவி எண்: 1800-11-8004',
    gu: 'હેલ્પલાઇન: 1800-11-8004',
    kn: 'ಸಹಾಯವಾಣಿ: 1800-11-8004',
    ml: 'ഹെൽപ്പ്‌ലൈൻ: 1800-11-8004',
    or: 'ହେଲ୍ପଲାଇନ୍: 1800-11-8004',
    pa: 'ਹੈਲਪਲਾਈਨ: 1800-11-8004',
    as: 'হেল্পলাইন: 1800-11-8004',
    ur: 'ہیلپ لائن: 1800-11-8004'
  },
  'header.govIndia': {
    en: 'Government of India',
    hi: 'भारत सरकार',
    bn: 'ভারত সরকার',
    te: 'భారత ప్రభుత్వం',
    mr: 'भारत सरकार',
    ta: 'இந்திய அரசு',
    gu: 'ભારત સરકાર',
    kn: 'ಭಾರತ ಸರ್ಕಾರ',
    ml: 'ഇന്ത്യാ ഗവൺമെന്റ്',
    or: 'ଭାରତ ସରକାର',
    pa: 'ਭਾਰਤ ਸਰਕਾਰ',
    as: 'ভাৰত চৰকাৰ',
    ur: 'حکومت ہند'
  },
  'header.title': {
    en: 'DBT Awareness & Verification Portal',
    hi: 'डीबीटी जागरूकता और सत्यापन पोर्टल',
    bn: 'ডিবিটি সচেতনতা ও যাচাইকরণ পোর্টাল',
    te: 'DBT అవగాహన మరియు ధృవీకరణ పోర్టల్',
    mr: 'डीबीटी जागरूकता आणि सत्यापन पोर्टल',
    ta: 'DBT விழிப்புணர்வு மற்றும் சரிபார்ப்பு போர்ட்டல்',
    gu: 'ડીબીટી જાગૃતિ અને ચકાસણી પોર્ટલ',
    kn: 'DBT ಅರಿವು ಮತ್ತು ಪರಿಶೀಲನೆ ಪೋರ್ಟಲ್',
    ml: 'DBT അവബോധവും പരിശോധനയും പോർട്ടൽ',
    or: 'DBT ସଚେତନତା ଏବଂ ଯାଞ୍ଚ ପୋର୍ଟାଲ୍',
    pa: 'DBT ਜਾਗਰੂਕਤਾ ਅਤੇ ਤਸਦੀਕ ਪੋਰਟਲ',
    as: 'DBT সজাগতা আৰু সত্যাপন পৰ্টেল',
    ur: 'DBT بیداری اور تصدیق پورٹل'
  },
  // Navigation
  'nav.home': {
    en: 'Home',
    hi: 'होम',
    bn: 'হোম',
    te: 'హోమ్',
    mr: 'होम',
    ta: 'முகப்பு',
    gu: 'હોમ',
    kn: 'ಮುಖಪುಟ',
    ml: 'ഹോം',
    or: 'ହୋମ୍',
    pa: 'ਹੋਮ',
    as: 'হোম',
    ur: 'ہوم'
  },
  'nav.aboutDBT': {
    en: 'About DBT',
    hi: 'डीबीटी के बारे में',
    bn: 'ডিবিটি সম্পর্কে',
    te: 'DBT గురించి',
    mr: 'डीबीटीबद्दल',
    ta: 'DBT பற்றி',
    gu: 'DBT વિશે',
    kn: 'DBT ಬಗ್ಗೆ',
    ml: 'DBT-യെ കുറിച്ച്',
    or: 'DBT ବିଷୟରେ',
    pa: 'DBT ਬਾਰੇ',
    as: 'DBT বিষয়ে',
    ur: 'DBT کے بارے میں'
  },
  // Add more translations as needed
};

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
