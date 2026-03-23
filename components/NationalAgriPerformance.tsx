
import React, { useState } from 'react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell 
} from 'recharts';
import { Activity, ShieldCheck, Zap, TrendingUp, Droplets, Leaf } from 'lucide-react';

const regionalPerformanceData = [
  { subject: 'Yield Growth', North: 120, South: 110, East: 85, West: 150, Central: 100, fullMark: 150 },
  { subject: 'Water Efficiency', North: 98, South: 130, East: 140, West: 80, Central: 110, fullMark: 150 },
  { subject: 'Soil Quality', North: 110, South: 100, East: 120, West: 90, Central: 130, fullMark: 150 },
  { subject: 'Market Sentiment', North: 140, South: 120, East: 100, West: 135, Central: 115, fullMark: 150 },
  { subject: 'Sustainability', North: 105, South: 140, East: 130, West: 95, Central: 125, fullMark: 150 },
];

const regionMetrics = [
  { name: 'North India', score: 88, status: 'Optimal', color: '#10b981', icon: <TrendingUp size={14}/> },
  { name: 'West India', score: 92, status: 'Peak', color: '#84cc16', icon: <Zap size={14}/> },
  { name: 'South India', score: 84, status: 'Stable', color: '#06b6d4', icon: <Droplets size={14}/> },
  { name: 'Central India', score: 79, status: 'Average', color: '#f59e0b', icon: <Leaf size={14}/> },
  { name: 'East India', score: 81, status: 'Rising', color: '#ec4899', icon: <Activity size={14}/> },
];

const NationalAgriPerformance: React.FC = () => {
  const [activeRegion, setActiveRegion] = useState<string>('West');

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 text-slate-900 dark:text-slate-100 overflow-hidden relative border-2 border-slate-100 dark:border-slate-800 shadow-xl transition-colors duration-300">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800 text-[10px] font-black uppercase tracking-widest">
              <ShieldCheck size={14} /> Performance Intelligence
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight text-emerald-950 dark:text-emerald-50">
              National Agricultural <br/>
              <span className="text-emerald-500">Pulse Analysis</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-base font-medium leading-relaxed max-w-md">
              A multi-dimensional comparison of regional farming performance. Analyzing sustainability, market reach, and resource efficiency across India's key zones.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {regionMetrics.map((region) => (
              <button
                key={region.name}
                onMouseEnter={() => setActiveRegion(region.name.split(' ')[0])}
                className={`p-4 rounded-2xl border-2 transition-all text-left flex items-center justify-between group ${
                  activeRegion === region.name.split(' ')[0] 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg translate-x-1' 
                  : 'border-slate-50 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 group-hover:text-emerald-600 transition-colors">
                    {region.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{region.status}</p>
                    <p className="text-sm font-black text-slate-900 dark:text-slate-100">{region.name}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black text-emerald-600">{region.score}%</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative bg-slate-900 rounded-[3.5rem] p-8 border border-slate-800 shadow-2xl overflow-hidden min-h-[600px] flex flex-col items-center">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full -mr-32 -mt-32 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>

          <div className="w-full flex-1 flex flex-col gap-4 pb-24">
            <div className="flex-1 min-h-[280px]">
              <ResponsiveContainer width="100%" height="100%" key={`radar-${activeRegion}`} minWidth={0}>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={regionalPerformanceData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar
                    name="North"
                    dataKey="North"
                    stroke="#10b981"
                    fill="#10b981"
                    fillOpacity={activeRegion === 'North' ? 0.6 : 0.1}
                    strokeWidth={activeRegion === 'North' ? 3 : 1}
                  />
                  <Radar
                    name="South"
                    dataKey="South"
                    stroke="#06b6d4"
                    fill="#06b6d4"
                    fillOpacity={activeRegion === 'South' ? 0.6 : 0.1}
                    strokeWidth={activeRegion === 'South' ? 3 : 1}
                  />
                  <Radar
                    name="West"
                    dataKey="West"
                    stroke="#84cc16"
                    fill="#84cc16"
                    fillOpacity={activeRegion === 'West' ? 0.6 : 0.1}
                    strokeWidth={activeRegion === 'West' ? 3 : 1}
                  />
                  <Radar
                    name="Central"
                    dataKey="Central"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={activeRegion === 'Central' ? 0.6 : 0.1}
                    strokeWidth={activeRegion === 'Central' ? 3 : 1}
                  />
                  <Radar
                    name="East"
                    dataKey="East"
                    stroke="#ec4899"
                    fill="#ec4899"
                    fillOpacity={activeRegion === 'East' ? 0.6 : 0.1}
                    strokeWidth={activeRegion === 'East' ? 3 : 1}
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '1rem', color: '#fff' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: '20px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="h-[180px] w-full">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 text-center">Regional Efficiency Comparison</p>
              <ResponsiveContainer width="100%" height="100%" key={`bar-${activeRegion}`} minWidth={0}>
                <BarChart data={regionMetrics} margin={{ top: 10, right: 10, left: 10, bottom: 20 }}>
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 8, fontWeight: 800 }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Tooltip 
                    cursor={{ fill: 'transparent' }}
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '1rem', color: '#fff' }}
                  />
                  <Bar dataKey="score" radius={[10, 10, 0, 0]}>
                    {regionMetrics.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={activeRegion === entry.name.split(' ')[0] ? 1 : 0.4} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="absolute bottom-8 left-8 right-8 p-6 glass-card rounded-3xl flex justify-around border border-white/10 shadow-2xl backdrop-blur-3xl z-30 bg-slate-800/50">
             <div className="text-center space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Active Analysis</p>
                <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                   <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse shadow-sm shadow-emerald-400/50"></div>
                   {activeRegion} INDIA METRICS
                </div>
             </div>
             <div className="h-10 w-px bg-slate-700"></div>
             <div className="text-center space-y-1">
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Global Rank</p>
                <p className="text-xs font-black text-white uppercase tracking-wider">Top 5% Eco-Resilience</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NationalAgriPerformance;
