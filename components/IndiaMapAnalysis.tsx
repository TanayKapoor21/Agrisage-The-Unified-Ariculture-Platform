
import React, { useState } from 'react';
import { Map as MapIcon, ChevronRight, TrendingUp, Search, Layers, Activity } from 'lucide-react';

const regionDetails: Record<string, { yield: string; topCrop: string; color: string; hoverColor: string }> = {
  'North': { yield: '+12%', topCrop: 'Wheat', color: 'rgba(34, 197, 94, 0.6)', hoverColor: 'rgba(34, 197, 94, 0.8)' },
  'West': { yield: '+15%', topCrop: 'Cotton', color: 'rgba(234, 179, 8, 0.6)', hoverColor: 'rgba(234, 179, 8, 0.8)' },
  'South': { yield: '+5%', topCrop: 'Rice', color: 'rgba(37, 99, 235, 0.6)', hoverColor: 'rgba(37, 99, 235, 0.8)' },
  'Central': { yield: '+10%', topCrop: 'Soybean', color: 'rgba(249, 115, 22, 0.6)', hoverColor: 'rgba(249, 115, 22, 0.8)' },
  'East': { yield: '+7%', topCrop: 'Jute', color: 'rgba(234, 88, 12, 0.6)', hoverColor: 'rgba(234, 88, 12, 0.8)' },
};

const IndiaMapAnalysis: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string | null>(null);

  return (
    <div className="bg-white rounded-[3rem] p-8 md:p-12 text-slate-900 overflow-hidden relative border-2 border-slate-100 shadow-xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-100 text-[10px] font-black uppercase tracking-widest">
            <MapIcon size={14} /> Geographical Dashboard
          </div>
          <h2 className="text-4xl md:text-5xl font-black leading-tight text-emerald-950">
            India's Yield <br/>
            <span className="text-emerald-500">Regional Pulse</span>
          </h2>
          <p className="text-slate-500 text-base font-medium leading-relaxed max-w-md">
            Analyzing regional performance through integrated satellite telemetry and mandi reports. Select a region to view local insights.
          </p>

          <div className="grid grid-cols-1 gap-3">
            {Object.entries(regionDetails).map(([name, data]) => (
              <div 
                key={name}
                onMouseEnter={() => setActiveRegion(name)}
                onMouseLeave={() => setActiveRegion(null)}
                className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                  activeRegion === name ? 'border-emerald-500 bg-emerald-50 translate-x-1 shadow-md' : 'border-slate-50 bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: data.color.replace('0.6', '1') }}></div>
                  <div className="space-y-0.5">
                    <span className="font-black text-slate-900 text-sm">{name} India</span>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Top Crop: {data.topCrop}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-[9px] font-black text-slate-400 uppercase">Yield</p>
                    <div className="flex items-center gap-1 text-emerald-600 font-black text-xs">
                        {data.yield} ↑
                    </div>
                  </div>
                  <ChevronRight size={14} className={`text-slate-300 transition-transform ${activeRegion === name ? 'translate-x-1' : ''}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative group bg-slate-900 rounded-[3.5rem] p-2 border border-slate-800 shadow-2xl overflow-hidden flex items-center justify-center min-h-[650px]">
          {/* Base Geographical Map */}
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ef/India_topography_map.png/800px-India_topography_map.png" 
            alt="India Geographical Map" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-screen grayscale-[0.5]"
          />
          
          <svg viewBox="0 0 400 500" className="relative z-20 w-full h-full max-w-[420px] drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            {/* North Zone */}
            <path 
              d="M170,10 L185,5 L210,15 L225,50 L210,140 L160,150 L140,130 L150,70 Z" 
              fill={activeRegion === 'North' ? regionDetails.North.hoverColor : regionDetails.North.color}
              stroke="white" strokeWidth="1" strokeOpacity="0.3"
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActiveRegion('North')}
              onMouseLeave={() => setActiveRegion(null)}
            />
            {/* West Zone */}
            <path 
              d="M140,130 L160,150 L180,330 L100,380 L60,350 L50,250 L90,170 Z" 
              fill={activeRegion === 'West' ? regionDetails.West.hoverColor : regionDetails.West.color}
              stroke="white" strokeWidth="1" strokeOpacity="0.3"
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActiveRegion('West')}
              onMouseLeave={() => setActiveRegion(null)}
            />
            {/* Central Zone */}
            <path 
              d="M160,150 L210,140 L280,180 L300,300 L180,330 Z" 
              fill={activeRegion === 'Central' ? regionDetails.Central.hoverColor : regionDetails.Central.color}
              stroke="white" strokeWidth="1" strokeOpacity="0.3"
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActiveRegion('Central')}
              onMouseLeave={() => setActiveRegion(null)}
            />
            {/* East Zone */}
            <path 
              d="M280,180 L320,170 L340,130 L390,150 L380,250 L300,300 Z" 
              fill={activeRegion === 'East' ? regionDetails.East.hoverColor : regionDetails.East.color}
              stroke="white" strokeWidth="1" strokeOpacity="0.3"
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActiveRegion('East')}
              onMouseLeave={() => setActiveRegion(null)}
            />
            {/* South Zone */}
            <path 
              d="M180,330 L300,300 L260,490 L200,490 L100,380 Z" 
              fill={activeRegion === 'South' ? regionDetails.South.hoverColor : regionDetails.South.color}
              stroke="white" strokeWidth="1" strokeOpacity="0.3"
              className="transition-all duration-300 cursor-pointer"
              onMouseEnter={() => setActiveRegion('South')}
              onMouseLeave={() => setActiveRegion(null)}
            />

            {/* Region Labels matching the reference image style */}
            <g className="pointer-events-none">
              <text x="185" y="85" textAnchor="middle" className="fill-white font-black text-[12px] drop-shadow-lg">NORTH INDIA</text>
              <text x="110" y="260" textAnchor="middle" className="fill-white font-black text-[12px] drop-shadow-lg">WEST INDIA</text>
              <text x="235" y="240" textAnchor="middle" className="fill-white font-black text-[12px] drop-shadow-lg">CENTRAL INDIA</text>
              <text x="340" y="210" textAnchor="middle" className="fill-white font-black text-[12px] drop-shadow-lg">EAST INDIA</text>
              <text x="210" y="410" textAnchor="middle" className="fill-white font-black text-[12px] drop-shadow-lg">SOUTH INDIA</text>
            </g>
          </svg>

          {/* Floating UI Elements */}
          <div className="absolute top-6 left-6 flex flex-col gap-2 z-30">
            <div className="bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-white flex items-center gap-3">
              <Activity size={16} className="text-emerald-400" />
              <div className="space-y-0.5">
                <p className="text-[8px] font-black uppercase text-emerald-400">Telemetry Status</p>
                <p className="text-[10px] font-bold">Synchronized</p>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-3xl flex justify-around border border-white/20 shadow-2xl backdrop-blur-3xl z-30">
             <div className="text-center space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Update Source</p>
                <div className="flex items-center gap-2 text-emerald-600 font-black text-xs">
                   <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                   ISRO SATELLITE FEED
                </div>
             </div>
             <div className="h-10 w-px bg-slate-200"></div>
             <div className="text-center space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Confidence</p>
                <p className="text-xs font-black text-slate-900 uppercase">96.8% VALIDATED</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndiaMapAnalysis;
