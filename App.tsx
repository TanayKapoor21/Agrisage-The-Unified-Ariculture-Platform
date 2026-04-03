
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  User, 
  Zap, 
  Accessibility,
  Sprout,
  CloudSun,
  LogOut,
  MapPin,
  Camera,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Leaf,
  ChevronRight,
  Activity,
  Award,
  Mic
} from 'lucide-react';
import { Language, AccessibilityMode, User as UserType } from './types';
import { UI_TRANSLATIONS, LANGUAGES, FEATURE_CARDS, LOCATIONS } from './constants';
import { dbService } from './services/dbService';
import VoiceChat from './components/VoiceChat';
import CropAdvisor from './components/CropAdvisor';
import MarketDashboard from './components/MarketDashboard';
import SustainablePortal from './components/SustainablePortal';
import Marketplace from './components/Marketplace';
import ClimateAlerts from './components/ClimateAlerts';
import PlantingGuide from './components/PlantingGuide';
import NationalAgriPerformance from './components/NationalAgriPerformance';
import IntelligenceLayer from './components/IntelligenceLayer';
import CropScanner from './components/CropScanner';
import Auth from './components/Auth';

import { fetchRealTimeData, WeatherData } from './services/dataService';
import { QuotaExceededError } from './services/apiUtils';
import { QuotaErrorBanner } from './components/QuotaErrorBanner';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('en');
  const [accessMode, setAccessMode] = useState<AccessibilityMode>(AccessibilityMode.NORMAL);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [showAi, setShowAi] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [activeLocation, setActiveLocation] = useState<string>('');
  const [guideCrop, setGuideCrop] = useState<string>('');
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [headerWeather, setHeaderWeather] = useState<WeatherData | null>(null);
  const [showQuotaError, setShowQuotaError] = useState(false);

  const t = UI_TRANSLATIONS[lang];

  useEffect(() => {
    const user = dbService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setActiveLocation(user.location);
    }
    setIsAuthChecking(false);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  useEffect(() => {
    if (accessMode === AccessibilityMode.HIGH_CONTRAST) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }, [accessMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setIsLocationOpen(false);
        setIsLangOpen(false);
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (activeLocation) {
      const loadHeaderWeather = async () => {
        try {
          const data = await fetchRealTimeData(activeLocation);
          setHeaderWeather(data?.weather || null);
          setShowQuotaError(false);
        } catch (error) {
          if (error instanceof QuotaExceededError) {
            setShowQuotaError(true);
          }
        }
      };
      loadHeaderWeather();
    }
  }, [activeLocation]);

  const toggleAccess = () => {
    if (accessMode === AccessibilityMode.NORMAL) setAccessMode(AccessibilityMode.HIGH_CONTRAST);
    else if (accessMode === AccessibilityMode.HIGH_CONTRAST) setAccessMode(AccessibilityMode.ICON_ONLY);
    else setAccessMode(AccessibilityMode.NORMAL);
  };

  const handleLogout = () => {
    dbService.logout();
    setCurrentUser(null);
    setActiveTab('home');
  };

  const LandingPage = () => (
    <div className="space-y-32 pb-32 overflow-hidden scroll-smooth">
      {/* Hero Section - Redesigned for Maximum Visibility */}
      <section className="relative h-[85vh] -mx-4 -mt-8 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=1920&q=80" 
            alt="Indian Farmer in Agriculture Field" 
            className="w-full h-full object-cover"
          />
          {/* Dark overlay to make text pop */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-transparent to-transparent opacity-60"></div>
        </div>
        
        <div className="relative z-10 max-w-5xl px-8 md:px-16 space-y-8 animate-fade-in">
          <div className="inline-flex items-center gap-3 px-4 py-2 bg-white text-emerald-950 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl border border-emerald-100">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center border border-emerald-50">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=64&h=64&q=80" 
                alt="Logo" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            National Farming Hub
          </div>
          
          <div className="space-y-4">
            <h1 className="text-6xl md:text-[8rem] font-black text-white leading-[0.8] font-bebas tracking-tighter drop-shadow-2xl">
              CULTIVATING <br/>
              <span className="text-lime-400">SMART ROOTS</span>
            </h1>
            <p className="text-xl md:text-2xl text-emerald-50 font-bold max-w-2xl leading-relaxed drop-shadow-lg">
              The intelligent operating system for India's farmers. 
              <span className="block text-emerald-200 mt-2">Analyze your land, track markets, and grow with real-time AI guidance.</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-5 pt-4">
            <button 
              onClick={() => setActiveTab('scanner')}
              className="px-10 py-5 bg-lime-400 text-emerald-950 font-black rounded-2xl hover:bg-white hover:scale-105 transition-all transform active:scale-95 flex items-center gap-3 shadow-[0_20px_50px_rgba(163,230,53,0.3)] text-sm uppercase tracking-widest"
            >
              Scan Crop <Camera size={20} strokeWidth={3} />
            </button>
            <button 
              onClick={() => setShowAi(true)}
              className="px-10 py-5 bg-emerald-600 text-white font-black rounded-2xl border-2 border-emerald-500/50 backdrop-blur-xl hover:bg-emerald-500 transition-all flex items-center gap-3 text-sm uppercase tracking-widest shadow-[0_20px_50px_rgba(16,185,129,0.2)]"
            >
              Voice Assistant <Mic size={20} strokeWidth={3} className="animate-pulse" />
            </button>
            <button 
              onClick={() => setActiveTab('crop')}
              className="px-10 py-5 bg-white/10 text-white font-black rounded-2xl border-2 border-white/20 backdrop-blur-xl hover:bg-white/20 transition-all flex items-center gap-3 text-sm uppercase tracking-widest"
            >
              Start Analysis <ArrowRight size={20} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Stats Section */}
      <section className="max-w-7xl mx-auto px-4 -mt-24 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.15)] p-10 md:p-14 border border-slate-100 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
           <div className="space-y-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto text-emerald-700 shadow-sm">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase">Mandi Verified</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">Direct data from 2,800+ Mandis across India.</p>
           </div>
           <div className="space-y-4 border-x-0 md:border-x border-slate-100">
              <div className="w-16 h-16 bg-lime-100 rounded-3xl flex items-center justify-center mx-auto text-lime-700 shadow-sm">
                <TrendingUp size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase">Optimized Yield</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">Productivity increase up to 18% with AI.</p>
           </div>
           <div className="space-y-4">
              <div className="w-16 h-16 bg-blue-50 rounded-3xl flex items-center justify-center mx-auto text-blue-700 shadow-sm">
                <Award size={32} />
              </div>
              <h4 className="text-xl font-black text-slate-900 uppercase">Eco-Certified</h4>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest leading-loose">Earn sustainable carbon credit income daily.</p>
           </div>
        </div>
      </section>

      {/* Regional Analysis Dashboard */}
      <section className="max-w-7xl mx-auto px-4">
         <NationalAgriPerformance />
      </section>

      {/* Core Features Showcase */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
           <h3 className="text-sm font-black uppercase tracking-[0.4em] text-emerald-600">The Integrated Ecosystem</h3>
           <h2 className="text-5xl font-black text-emerald-950 tracking-tight">One Platform. Endless Potential.</h2>
           <p className="text-slate-500 font-medium max-w-xl mx-auto">Discover the specialized tools designed to boost your farm's efficiency and profitability.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURE_CARDS.map((card) => (
            <div 
              key={card.id}
              onClick={() => card.id === 'ai' ? setShowAi(true) : setActiveTab(card.id)}
              className="group cursor-pointer bg-white rounded-[2.5rem] border border-slate-100 p-3 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-500 flex flex-col"
            >
              <div className="relative rounded-[2.2rem] overflow-hidden aspect-[4/5] mb-6">
                <img src={card.img} alt={card.id} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 to-transparent"></div>
                <div className={`absolute bottom-4 left-4 p-3.5 ${card.color} rounded-2xl shadow-2xl scale-90 group-hover:scale-100 transition-transform`}>
                  {React.cloneElement(card.icon as React.ReactElement<{ size?: number }>, { size: 24 })}
                </div>
              </div>
              <div className="px-6 pb-8 space-y-2">
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">{(t as any)[card.titleKey]}</h4>
                <p className="text-[10px] text-slate-400 leading-relaxed font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Launch Feature <ChevronRight className="inline ml-1" size={10} />
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Market Intelligence */}
      <section className="max-w-7xl mx-auto px-4">
        <MarketDashboard location={activeLocation} />
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 border-t border-slate-200 pt-20 grid grid-cols-1 md:grid-cols-4 gap-16 text-slate-500 pb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="bg-white p-1.5 rounded-2xl shadow-xl overflow-hidden w-16 h-16 flex items-center justify-center border-2 border-emerald-900/10">
              <img 
                src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=128&h=128&q=80" 
                alt="AgriSage Logo" 
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-black text-emerald-950 font-bebas tracking-[0.2em] leading-none">AgriSage</h1>
              <span className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.4em]">The Unified Platform</span>
            </div>
          </div>
          <p className="text-[11px] font-bold leading-loose uppercase tracking-widest">
            Empowering India's farmers with next-generation digital tools and market intelligence.
          </p>
        </div>
        <div>
          <h5 className="font-black text-slate-900 uppercase tracking-[0.3em] text-[10px] mb-8">Navigation</h5>
          <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest">
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Yield Predictor</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Price Trends</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Climate Portal</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Seed Store</li>
          </ul>
        </div>
        <div>
          <h5 className="font-black text-slate-900 uppercase tracking-[0.3em] text-[10px] mb-8">Community</h5>
          <ul className="space-y-4 text-[11px] font-black uppercase tracking-widest">
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">User Library</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">AI Helpdesk</li>
            <li className="hover:text-emerald-600 cursor-pointer transition-colors">Mandi Forums</li>
          </ul>
        </div>
        <div>
          <h5 className="font-black text-slate-900 uppercase tracking-[0.3em] text-[10px] mb-8">Direct Impact</h5>
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 flex items-center gap-5">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-emerald-600">
              <Leaf size={20} />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900">12k Tonnes</p>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Residue Saved</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'scanner': return <CropScanner location={activeLocation} />;
      case 'crop': return <CropAdvisor language={lang} initialLocation={activeLocation} onViewGuide={(crop) => {
        setGuideCrop(crop);
        setActiveTab('guide');
      }} />;
      case 'rates': return <MarketDashboard location={activeLocation} />;
      case 'waste': 
      case 'carbon': return <SustainablePortal location={activeLocation} />;
      case 'market': return <Marketplace />;
      case 'climate': return <ClimateAlerts location={activeLocation} />;
      case 'guide': return <PlantingGuide language={lang} initialCrop={guideCrop} />;
      case 'intelligence': return <IntelligenceLayer />;
      default: return <LandingPage />;
    }
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-emerald-50">
        <Sprout className="w-12 h-12 text-emerald-600 animate-bounce" />
      </div>
    );
  }

  if (!currentUser) {
    return <Auth onLoginSuccess={(user) => {
      setCurrentUser(user);
      setActiveLocation(user.location);
    }} />;
  }

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-white text-slate-900'}`}>
      {/* Navbar */}
      <header className={`backdrop-blur-2xl border-b sticky top-0 z-50 transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/95 border-slate-800' : 'bg-white/95 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div 
              className="flex items-center gap-4 cursor-pointer group" 
              onClick={() => setActiveTab('home')}
            >
              <div className="bg-white p-1.5 rounded-2xl shadow-md group-hover:scale-110 transition-transform overflow-hidden w-14 h-14 flex items-center justify-center border-2 border-emerald-900/10">
                <img 
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=128&h=128&q=80" 
                  alt="AgriSage Logo" 
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-emerald-950 font-bebas tracking-[0.1em] leading-none">AgriSage</h1>
                <span className="text-[8px] font-black text-emerald-600 uppercase tracking-[0.3em]">Smart Roots</span>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-8">
              {['Scanner', 'Market', 'Crop', 'Rates', 'Climate', 'Intelligence'].map((item) => (
                <button 
                  key={item}
                  onClick={() => setActiveTab(item.toLowerCase())}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${activeTab === item.toLowerCase() ? 'text-emerald-600' : 'text-slate-400 hover:text-emerald-950'}`}
                >
                  {item}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-emerald-600 transition-all ${activeTab === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            {/* Global Location Picker */}
            <div className="relative dropdown-container hidden sm:block">
              <button 
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className={`flex items-center gap-3 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-all text-slate-700 shadow-sm ${isLocationOpen ? 'ring-2 ring-emerald-500/20 border-emerald-500/50' : ''}`}
              >
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span className="text-[10px] font-black uppercase tracking-widest max-w-[120px] truncate">{activeLocation}</span>
                <ChevronDown className={`w-3 h-3 opacity-40 transition-transform ${isLocationOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLocationOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in z-50">
                  <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                    {LOCATIONS.map(loc => (
                      <button 
                        key={loc} 
                        onClick={() => {
                          setActiveLocation(loc);
                          setIsLocationOpen(false);
                        }}
                        className={`w-full text-left px-4 py-3 text-[9px] font-black uppercase rounded-xl hover:bg-emerald-50 transition flex items-center gap-3 ${activeLocation === loc ? 'text-emerald-800 bg-emerald-50' : 'text-slate-500'}`}
                      >
                        <MapPin className="w-3 h-3" />
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>

            {/* Language Picker */}
            <div className="relative dropdown-container">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className={`flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:bg-white transition-all shadow-sm ${isLangOpen ? 'ring-2 ring-emerald-500/20 border-emerald-500/50' : ''}`}
              >
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">{lang}</span>
                <ChevronDown className={`w-3 h-3 opacity-40 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-3 w-32 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in z-50">
                  {LANGUAGES.map(l => (
                    <button 
                      key={l.code} 
                      onClick={() => {
                        setLang(l.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-[9px] font-black uppercase hover:bg-emerald-50 transition ${lang === l.code ? 'text-emerald-950' : 'text-slate-500'}`}
                    >
                      {l.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2.5 rounded-xl transition-all border shadow-sm ${isDarkMode ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-slate-50 text-slate-400 hover:bg-white border-slate-100'}`}
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <CloudSun size={18} /> : <Zap size={18} />}
            </button>

            <button 
              onClick={toggleAccess}
              className={`p-2.5 rounded-xl transition-all border shadow-sm ${accessMode !== AccessibilityMode.NORMAL ? 'bg-lime-400 text-emerald-950 border-lime-500' : 'bg-slate-50 text-slate-400 hover:bg-white border-slate-100'}`}
            >
              <Accessibility size={18} />
            </button>

            {/* User Profile */}
            <div className="relative dropdown-container">
              <button 
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center border-2 border-white shadow-xl overflow-hidden transition-transform active:scale-90"
              >
                <img src={`https://i.pravatar.cc/150?u=${currentUser.id}`} alt="User" className="w-full h-full object-cover" />
              </button>
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white border border-slate-100 rounded-2xl shadow-2xl overflow-hidden animate-fade-in z-50">
                  <div className="p-4 border-b bg-slate-50">
                    <p className="text-[11px] font-black text-emerald-950 truncate">{currentUser.name}</p>
                  </div>
                  <button 
                    onClick={() => {
                      setActiveTab('profile');
                      setIsUserMenuOpen(false);
                    }} 
                    className="w-full text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:bg-emerald-50 flex items-center gap-3"
                  >
                    <User size={14} /> Profile
                  </button>
                  <button 
                    onClick={() => {
                      handleLogout();
                      setIsUserMenuOpen(false);
                    }} 
                    className="w-full text-left px-4 py-4 text-[10px] font-black uppercase tracking-widest text-red-600 hover:bg-red-50 flex items-center gap-3 border-t"
                  >
                    <LogOut size={14} /> Log Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <main className={`flex-1 w-full transition-colors duration-300 ${isDarkMode ? 'bg-slate-900/50' : 'bg-slate-50/50'}`}>
        {activeTab !== 'home' && (
          <div className="max-w-7xl mx-auto px-6 my-12">
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b-4 border-emerald-950">
                <div className="space-y-2">
                  <nav className="flex items-center gap-2.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">
                    <span className="cursor-pointer hover:text-emerald-600" onClick={() => setActiveTab('home')}>Home</span>
                    <ChevronRight size={10} strokeWidth={3} />
                    <span className="text-emerald-600">{activeTab}</span>
                  </nav>
                  <h2 className="text-4xl md:text-5xl font-black text-emerald-950 dark:text-emerald-50 tracking-tighter uppercase leading-none">
                    {activeTab === 'scanner' && 'Computer Vision Scanner'}
                    {activeTab === 'crop' && 'Crop Advisory Engine'}
                    {activeTab === 'market' && 'Seed & Agri Marketplace'}
                    {activeTab === 'rates' && 'Market Intelligence'}
                    {activeTab === 'climate' && 'Precision Forecast'}
                    {activeTab === 'guide' && 'Agricultural Library'}
                    {activeTab === 'waste' && 'Waste Exchange'}
                    {activeTab === 'intelligence' && 'Deep Learning Hub'}
                  </h2>
                </div>
                <div className="flex items-center gap-4 bg-emerald-950 p-4 rounded-2xl text-white shadow-2xl">
                   <div className="p-3 bg-lime-400 rounded-xl text-emerald-950"><CloudSun size={24} /></div>
                   <div className="space-y-0.5">
                     <p className="text-[8px] font-black text-emerald-400 uppercase tracking-[0.3em]">{activeLocation}</p>
                     <p className="text-2xl font-black leading-none tracking-tight">
                       {headerWeather ? `${headerWeather.temp}°C` : '--°C'} 
                       <span className="text-[10px] font-bold text-white/50 ml-1 uppercase">
                         {headerWeather ? headerWeather.condition : 'Loading...'}
                       </span>
                     </p>
                   </div>
                </div>
             </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto px-6">
          {renderContent()}
        </div>
      </main>

      {/* Compact FAB Ask AI */}
      <button 
        onClick={() => setShowAi(true)}
        className="fixed bottom-8 right-8 p-2.5 bg-emerald-950 text-white rounded-2xl shadow-2xl hover:scale-110 active:scale-90 transition-all z-40 flex items-center gap-2.5 group border border-white/10 ring-4 ring-white/50 backdrop-blur-md"
      >
        <div className="relative bg-white p-1 rounded-lg text-emerald-950 shadow-lg w-8 h-8 flex items-center justify-center overflow-hidden border border-emerald-100">
          <Mic size={18} className="text-emerald-600 animate-pulse" />
        </div>
        <span className="font-black tracking-widest uppercase text-[10px] pr-1.5">Voice AI Advisor</span>
      </button>

      {showAi && <VoiceChat language={lang} onClose={() => setShowAi(false)} />}
      
      {showQuotaError && (
        <QuotaErrorBanner 
          onRetry={() => {
            setShowQuotaError(false);
            // Re-trigger weather load
            if (activeLocation) {
              fetchRealTimeData(activeLocation)
                .then(data => setHeaderWeather(data?.weather || null))
                .catch(err => {
                  if (err instanceof QuotaExceededError) setShowQuotaError(true);
                });
            }
          }} 
        />
      )}
    </div>
  );
};

export default App;
