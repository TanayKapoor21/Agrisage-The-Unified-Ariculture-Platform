
import React from 'react';
import { Recycle, Coins, TreeDeciduous, Navigation, Gift } from 'lucide-react';

const SustainablePortal: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 transition-colors duration-300">
      {/* Waste Center */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border dark:border-slate-800 overflow-hidden">
        <div className="p-5 border-b dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2 dark:text-slate-100">
            <Recycle className="w-5 h-5 text-emerald-600" />
            Waste Management Center
          </h3>
          <span className="text-xs bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-2 py-1 rounded">Nearby (2.4km)</span>
        </div>
        <div className="p-5">
          <div className="relative h-40 bg-gray-100 dark:bg-slate-800 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
             {/* Mock Map Background */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/800/400')] bg-cover"></div>
            <div className="relative z-10 text-center">
              <div className="bg-white dark:bg-slate-700 p-2 rounded-full shadow-lg inline-block mb-2">
                <Navigation className="w-6 h-6 text-blue-600 animate-pulse" />
              </div>
              <p className="text-sm font-semibold text-gray-800 dark:text-slate-100">Krishi Vigyan Kendra Center</p>
              <p className="text-xs text-gray-500 dark:text-slate-400">Mansa Road, Bathinda</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
              <span className="flex items-center gap-2 dark:text-slate-300"><Gift className="w-4 h-4" /> Credits Earnable:</span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">500 Points / Tonne</span>
            </div>
            <button className="w-full py-2 bg-emerald-600 text-white rounded-lg text-sm font-semibold hover:bg-emerald-700 transition">
              Get Directions
            </button>
          </div>
        </div>
      </div>

      {/* Carbon Income */}
      <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border dark:border-slate-800 overflow-hidden">
        <div className="p-5 border-b dark:border-slate-800 flex justify-between items-center">
          <h3 className="font-bold flex items-center gap-2 dark:text-slate-100">
            <TreeDeciduous className="w-5 h-5 text-indigo-600" />
            Carbon Offset Income
          </h3>
          <span className="text-xs bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-2 py-1 rounded">Active Projects: 12</span>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex gap-4 items-center">
            <div className="w-16 h-16 bg-indigo-50 dark:bg-indigo-900/20 rounded-full flex items-center justify-center">
              <Coins className="w-8 h-8 text-indigo-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-slate-400">Total Est. Earnings</p>
              <p className="text-2xl font-black text-gray-900 dark:text-slate-100">₹12,450 <span className="text-sm font-normal text-gray-400">/ Year</span></p>
            </div>
          </div>
          <div className="border-t dark:border-slate-800 pt-4">
            <p className="text-xs font-bold text-gray-400 dark:text-slate-500 mb-2 uppercase tracking-wider">Top Partners</p>
            <div className="space-y-2">
              {[
                { name: 'GreenEarth Co.', rate: '₹450 / Tree' },
                { name: 'Future Forest', rate: '₹380 / Tree' }
              ].map((p, i) => (
                <div key={i} className="flex justify-between items-center p-3 border dark:border-slate-800 rounded-lg hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
                  <span className="text-sm font-medium dark:text-slate-300">{p.name}</span>
                  <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">{p.rate}</span>
                </div>
              ))}
            </div>
          </div>
          <button className="w-full py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition">
            Apply for Plantation Partner
          </button>
        </div>
      </div>
    </div>
  );
};

export default SustainablePortal;
