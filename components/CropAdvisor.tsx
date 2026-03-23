
import React, { useState, useEffect } from 'react';
import { Sprout, MapPin, Search, Loader2 } from 'lucide-react';
import { getCropSuggestions } from '../services/geminiService';
import { Language } from '../types';

interface CropAdvisorProps {
  language: Language;
  initialLocation: string;
  onViewGuide: (crop: string) => void;
}

const CropAdvisor: React.FC<CropAdvisorProps> = ({ language, initialLocation, onViewGuide }) => {
  const [soilType, setSoilType] = useState('Alluvial');
  const [location, setLocation] = useState(initialLocation);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  // Update local location if prop changes
  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  const handleRecommend = async () => {
    setLoading(true);
    const month = new Date().toLocaleString('en-US', { month: 'long' });
    const suggestions = await getCropSuggestions(soilType, location || 'Punjab, India', month);
    setResults(suggestions);
    setLoading(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border dark:border-slate-800 p-6 space-y-6 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
          <Sprout className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Crop Recommendations</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Soil Type</label>
          <select 
            className="w-full border dark:border-slate-700 rounded-lg p-2.5 focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-800 dark:text-slate-100"
            value={soilType}
            onChange={(e) => setSoilType(e.target.value)}
          >
            <option>Alluvial</option>
            <option>Black Soil</option>
            <option>Red Soil</option>
            <option>Laterite</option>
            <option>Desert</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 dark:text-slate-400">Location</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="e.g. Haryana" 
              className="w-full border dark:border-slate-700 rounded-lg pl-10 pr-4 py-2.5 focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-800 dark:text-slate-100"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
      </div>

      <button 
        onClick={handleRecommend}
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
      >
        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        Get Best Crops for Today
      </button>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-fade-in">
          {results.map((res, i) => (
            <div key={i} className="border dark:border-emerald-800 rounded-xl p-4 bg-green-50/30 dark:bg-emerald-900/10 border-green-100 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-green-800 dark:text-emerald-400 text-lg">{res.crop}</h4>
                <p className="text-xs text-gray-500 dark:text-slate-400 mb-2">{res.variety}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-slate-500">Water Req:</span>
                    <span className="font-medium dark:text-slate-300">{res.waterLevel}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500 dark:text-slate-500">Est. Yield:</span>
                    <span className="font-medium dark:text-slate-300">{res.expectedYield}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => onViewGuide(res.crop)}
                className="mt-4 text-xs font-bold text-green-600 dark:text-emerald-400 hover:underline"
              >
                View Planting Guide →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CropAdvisor;
