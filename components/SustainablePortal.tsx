
import React from 'react';
import { Recycle, Coins, TreeDeciduous, Navigation, Gift } from 'lucide-react';
import { WasteManagementMap } from './WasteManagementMap';

interface SustainablePortalProps {
  location: string;
}

const SustainablePortal: React.FC<SustainablePortalProps> = ({ location }) => {
  return (
    <div className="space-y-12 transition-colors duration-300">
      {/* Interactive Map Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border-2 border-slate-100 dark:border-slate-800 shadow-xl">
        <WasteManagementMap location={location} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Waste Center Info */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border-2 border-slate-50 dark:border-slate-800 overflow-hidden hover:border-emerald-500 transition-all duration-500">
          <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-emerald-50/50 dark:bg-emerald-900/10">
            <h3 className="font-black flex items-center gap-3 dark:text-slate-100 uppercase tracking-tight text-xl">
              <Recycle className="w-6 h-6 text-emerald-600" />
              Stubble Management
            </h3>
            <span className="text-[10px] font-black bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 px-3 py-1.5 rounded-full uppercase tracking-widest">Active Network</span>
          </div>
          <div className="p-8 space-y-6">
            <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
              Convert your crop residue into profit. Our network connects you with biomass energy plants and organic fertilizer units across India.
            </p>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm p-5 bg-emerald-50 dark:bg-emerald-900/20 rounded-3xl border border-emerald-100 dark:border-emerald-800/50">
                <span className="flex items-center gap-3 font-black uppercase tracking-widest text-[10px] text-emerald-800 dark:text-emerald-300"><Gift className="w-5 h-5" /> Credits Earnable:</span>
                <span className="font-black text-lg text-emerald-700 dark:text-emerald-400">₹500 - ₹1200 <span className="text-[10px] font-medium text-slate-400">/ Tonne</span></span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Processed</p>
                  <p className="text-lg font-black text-slate-900 dark:text-slate-100">1.2M Tons</p>
                </div>
                <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">CO2 Saved</p>
                  <p className="text-lg font-black text-emerald-600">450K Tons</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Carbon Income */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-sm border-2 border-slate-50 dark:border-slate-800 overflow-hidden hover:border-indigo-500 transition-all duration-500">
          <div className="p-8 border-b dark:border-slate-800 flex justify-between items-center bg-indigo-50/50 dark:bg-indigo-900/10">
            <h3 className="font-black flex items-center gap-3 dark:text-slate-100 uppercase tracking-tight text-xl">
              <TreeDeciduous className="w-6 h-6 text-indigo-600" />
              Carbon Offset
            </h3>
            <span className="text-[10px] font-black bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-400 px-3 py-1.5 rounded-full uppercase tracking-widest">12 Projects</span>
          </div>
          <div className="p-8 space-y-6">
            <div className="flex gap-6 items-center">
              <div className="w-20 h-20 bg-indigo-50 dark:bg-indigo-900/20 rounded-[2rem] flex items-center justify-center border border-indigo-100 dark:border-indigo-800/50">
                <Coins className="w-10 h-10 text-indigo-600" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Est. Earnings</p>
                <p className="text-3xl font-black text-slate-900 dark:text-slate-100 tracking-tight">₹12,450 <span className="text-sm font-medium text-slate-400">/ Year</span></p>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Top Global Partners</p>
              <div className="grid grid-cols-1 gap-3">
                {[
                  { name: 'GreenEarth Co.', rate: '₹450 / Tree' },
                  { name: 'Future Forest', rate: '₹380 / Tree' }
                ].map((p, i) => (
                  <div key={i} className="flex justify-between items-center p-4 border-2 border-slate-50 dark:border-slate-800 rounded-2xl hover:border-indigo-300 dark:hover:border-indigo-700 transition-all group">
                    <span className="text-sm font-black uppercase tracking-tight dark:text-slate-300 group-hover:text-indigo-600 transition-colors">{p.name}</span>
                    <span className="text-sm font-black text-indigo-600 dark:text-indigo-400">{p.rate}</span>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 dark:shadow-none">
              Apply for Plantation Partner
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SustainablePortal;
