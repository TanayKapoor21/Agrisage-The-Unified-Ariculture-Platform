
import React, { useState } from 'react';
import { BookOpen, Search, Loader2, Leaf, Droplets, Info } from 'lucide-react';
import { getPlantingGuide } from '../services/geminiService';
import { Language } from '../types';

const PlantingGuide: React.FC<{ language: Language, initialCrop?: string }> = ({ language, initialCrop }) => {
  const [query, setQuery] = useState(initialCrop || '');
  const [loading, setLoading] = useState(false);
  const [guide, setGuide] = useState<string | null>(null);

  React.useEffect(() => {
    if (initialCrop) {
      setQuery(initialCrop);
      handleSearch(initialCrop);
    }
  }, [initialCrop]);

  const handleSearch = async (searchQuery?: string) => {
    const q = searchQuery || query;
    if (!q.trim()) return;
    setLoading(true);
    const result = await getPlantingGuide(q, language);
    setGuide(result || "Guide not available.");
    setLoading(false);
  };

  return (
    <div className="space-y-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border dark:border-slate-800 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Crop-Specific Sowing Guide</h2>
        </div>

        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for a crop (e.g. Wheat, Basmati Rice, Cotton)..." 
            className="w-full pl-12 pr-32 py-4 bg-gray-50 dark:bg-slate-800 border dark:border-slate-700 rounded-2xl text-lg focus:ring-2 focus:ring-orange-500 transition-all outline-none dark:text-slate-100"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            disabled={loading}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 transition disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Get Guide'}
          </button>
        </div>

        {!guide && !loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {['Wheat', 'Cotton', 'Mustard'].map((crop) => (
              <button 
                key={crop}
                onClick={() => { setQuery(crop); }}
                className="p-4 border border-dashed dark:border-slate-700 rounded-xl text-left hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-200 dark:hover:border-orange-800 transition-colors group"
              >
                <div className="flex justify-between items-center">
                  <span className="font-bold text-gray-700 dark:text-slate-300">{crop}</span>
                  <Leaf className="w-4 h-4 text-orange-300 group-hover:text-orange-500" />
                </div>
                <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">Commonly searched guide</p>
              </button>
            ))}
          </div>
        )}

        {guide && (
          <div className="mt-8 animate-fade-in">
            <div className="bg-gray-50 dark:bg-slate-800 rounded-2xl p-6 border border-gray-100 dark:border-slate-700 relative">
               <div className="absolute top-4 right-4 text-orange-200 dark:text-orange-900/40"><Info className="w-12 h-12" /></div>
               <h3 className="text-2xl font-black text-gray-900 dark:text-slate-100 mb-4">{query} Planting Details</h3>
               <div className="prose prose-sm max-w-none text-gray-700 dark:text-slate-300 leading-relaxed">
                  <div dangerouslySetInnerHTML={{ __html: guide.replace(/\n/g, '<br/>') }} />
               </div>
               <div className="mt-8 grid grid-cols-2 gap-4">
                 <div className="flex items-center gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-xl">
                   <Droplets className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase">Optimal Watering Frequency</span>
                 </div>
                 <div className="flex items-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-xl">
                   <Leaf className="w-4 h-4" />
                   <span className="text-xs font-bold uppercase">Organic Fertilizer Ready</span>
                 </div>
               </div>
            </div>
            <button 
              onClick={() => window.print()} 
              className="mt-4 text-sm font-bold text-gray-500 dark:text-slate-400 hover:text-gray-800 dark:hover:text-slate-200 flex items-center gap-1 mx-auto"
            >
              Save as PDF Guide
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlantingGuide;
