
import React from 'react';
import { 
  Sprout, 
  ShoppingBag, 
  BarChart3, 
  CloudSun, 
  Recycle, 
  Coins, 
  BookOpen, 
  MessageCircle,
  BrainCircuit,
  Cpu
} from 'lucide-react';
import { Language, Translation } from './types';

export const LANGUAGES = [
  { code: 'en' as Language, name: 'English' },
  { code: 'hi' as Language, name: 'हिन्दी' },
  { code: 'ta' as Language, name: 'தமிழ்' },
  { code: 'pa' as Language, name: 'ਪੰਜਾਬੀ' },
  { code: 'mr' as Language, name: 'मराठी' }
];

export const LOCATIONS = [
  "Bathinda, Punjab",
  "Mansa, Punjab",
  "Sirsa, Haryana",
  "Nashik, Maharashtra",
  "Indore, Madhya Pradesh",
  "Guntur, Andhra Pradesh",
  "Coimbatore, Tamil Nadu",
  "Karnal, Haryana",
  "Nagpur, Maharashtra"
];

export const UI_TRANSLATIONS: Record<Language, Translation> = {
  en: {
    title: 'AgriSage',
    tagline: 'Empowering the Roots of our Nation',
    cropSuggestion: 'Smart Advisor',
    marketplace: 'Storefront',
    marketPrices: 'Mandi Rates',
    climateAlerts: 'Eco Watch',
    stubbleManagement: 'Waste Node',
    carbonCredits: 'Carbon Hub',
    plantingDetails: 'Agri-Bible',
    askAi: 'Consult AI',
    intelligenceLayer: 'Deep Learning Hub'
  },
  hi: {
    title: 'एग्रिसेज',
    tagline: 'हमारे देश की जड़ों को सशक्त बनाना',
    cropSuggestion: 'स्मार्ट सलाहकार',
    marketplace: 'कृषि स्टोर',
    marketPrices: 'मंडी भाव',
    climateAlerts: 'मौसम अलर्ट',
    stubbleManagement: 'अपशिष्ट केंद्र',
    carbonCredits: 'कार्बन आय',
    plantingDetails: 'रोपण गाइड',
    askAi: 'AI विशेषज्ञ',
    intelligenceLayer: 'डीप लर्निंग हब'
  },
  ta: {
    title: 'அக்ரிசேஜ்',
    tagline: 'நம் நாட்டின் வேர்களை மேம்படுத்துதல்',
    cropSuggestion: 'ஸ்மார்ட் ஆலோசகர்',
    marketplace: 'விவசாய கடை',
    marketPrices: 'சந்தை விலை',
    climateAlerts: 'வானிலை எச்சரிக்கை',
    stubbleManagement: 'கழிவு மையம்',
    carbonCredits: 'கார்பன் வருமானம்',
    plantingDetails: 'நடவு வழிகாட்டி',
    askAi: 'AI நிபுணர்',
    intelligenceLayer: 'டீப் லேர்னிங் ஹப்'
  },
  pa: {
    title: 'ਐਗਰੀਸੇਜ',
    tagline: 'ਸਾਡੇ ਦੇਸ਼ ਦੀਆਂ ਜੜ੍ਹਾਂ ਨੂੰ ਮਜ਼ਬੂਤ ​​ਕਰਨਾ',
    cropSuggestion: 'ਸਮਾਰਟ ਸਲਾਹਕਾਰ',
    marketplace: 'ਖੇਤੀ ਸਟੋਰ',
    marketPrices: 'ਮੰਡੀ ਦੇ ਭਾਅ',
    climateAlerts: 'ਮੌਸਮ ਚੇਤਾਵਨੀ',
    stubbleManagement: 'ਵੇਸਟ ਸੈਂਟਰ',
    carbonCredits: 'ਕਾਰਬਨ ਆਮਦਨ',
    plantingDetails: 'ਬਿਜਾਈ ਗਾਈਡ',
    askAi: 'AI ਮਾਹਰ',
    intelligenceLayer: 'ਡੀਪ ਲਰਨਿੰਗ ਹੱਬ'
  },
  mr: {
    title: 'अॅग्रीसेज',
    tagline: 'आपल्या देशाची मुळे सशक्त करणे',
    cropSuggestion: 'स्मार्ट सल्लागार',
    marketplace: 'कृषी दुकान',
    marketPrices: 'बाजार भाव',
    climateAlerts: 'हवामान इशारा',
    stubbleManagement: 'कचरा केंद्र',
    carbonCredits: 'कार्बन उत्पन्न',
    plantingDetails: 'लागवड मार्गदर्शक',
    askAi: 'AI तज्ज्ञ',
    intelligenceLayer: 'डीप लर्निंग हब'
  }
};

export const FEATURE_CARDS = [
  { 
    id: 'crop', 
    titleKey: 'cropSuggestion', 
    icon: <Sprout />, 
    color: 'bg-emerald-800 text-white', 
    desc: 'Get data-driven suggestions for the best crops based on your specific soil and current season.',
    img: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'market', 
    titleKey: 'marketplace', 
    icon: <ShoppingBag />, 
    color: 'bg-emerald-700 text-white', 
    desc: 'Browse premium seeds and fertilizers with localized delivery and price comparisons.',
    img: 'https://images.unsplash.com/photo-1599422314077-f4dfdaa4cd09?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'rates', 
    titleKey: 'marketPrices', 
    icon: <BarChart3 />, 
    color: 'bg-emerald-600 text-white', 
    desc: 'Track live mandi rates across states and analyze historical trends for smarter selling.',
    img: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5ea?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'climate', 
    titleKey: 'climateAlerts', 
    icon: <CloudSun />, 
    color: 'bg-emerald-500 text-white', 
    desc: 'Stay ahead of extreme weather and optimize irrigation with our hyper-local forecasts.',
    img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'waste', 
    titleKey: 'stubbleManagement', 
    icon: <Recycle />, 
    color: 'bg-emerald-400 text-slate-900', 
    desc: 'Turn your farm waste into profit by locating nearby recycling centers for crop residue.',
    img: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'carbon', 
    titleKey: 'carbonCredits', 
    icon: <Coins />, 
    color: 'bg-emerald-300 text-slate-900', 
    desc: 'Unlock extra income streams through global carbon offset credit partnerships.',
    img: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'guide', 
    titleKey: 'plantingDetails', 
    icon: <BookOpen />, 
    color: 'bg-emerald-200 text-slate-900', 
    desc: 'Access complete sowing to harvesting manuals for over 100 Indian crop varieties.',
    img: 'https://images.unsplash.com/photo-1492496913980-501348b61469?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'intelligence', 
    titleKey: 'intelligenceLayer', 
    icon: <BrainCircuit />, 
    color: 'bg-emerald-950 text-lime-400 border-lime-400/30 border', 
    desc: 'Advanced spectral-spatial fusion and multi-modal attention for precision crop health and yield prediction.',
    img: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=600&q=80'
  },
  { 
    id: 'ai', 
    titleKey: 'askAi', 
    icon: <MessageCircle />, 
    color: 'bg-emerald-100 text-emerald-900', 
    desc: 'Chat with our multilingual AI farming assistant for instant expert agricultural advice.',
    img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80'
  }
];
