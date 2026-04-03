
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { TrendingUp, TrendingDown, Minus, IndianRupee, PieChart, Activity, AlertCircle, Loader2, CheckCircle2, Zap } from 'lucide-react';
import { fetchRealTimeData, MarketPrice, getInstantMarketData } from '../services/dataService';

interface MarketDashboardProps {
  location: string;
}

const MarketDashboard: React.FC<MarketDashboardProps> = ({ location }) => {
  const [prices, setPrices] = useState<MarketPrice[]>([]);
  const [selected, setSelected] = useState<MarketPrice | null>(null);
  const [view, setView] = useState<'price' | 'volume'>('price');
  const [loading, setLoading] = useState(true);
  const [isEstimated, setIsEstimated] = useState(true);

  useEffect(() => {
    // 1. Show instant estimated data immediately
    const instantData = getInstantMarketData(location);
    setPrices(instantData);
    setSelected(instantData[0]);
    setIsEstimated(true);
    setLoading(false); // We can stop the full-page loader immediately

    // 2. Fetch real-time data in the background
    const loadRealData = async () => {
      try {
        const data = await fetchRealTimeData(location);
        if (data?.market && data.market.length > 0) {
          setPrices(data.market);
          setSelected(data.market[0]);
          setIsEstimated(false);
        }
      } catch (error) {
        console.error("Failed to fetch real-time data, staying with estimates", error);
      }
    };
    loadRealData();
  }, [location]);

  if (!selected) {
    return (
      <div className="h-[600px] flex flex-col items-center justify-center gap-4 bg-white dark:bg-slate-900 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Initializing Market Feed...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900 rounded-[3rem] shadow-2xl border-2 border-slate-100 dark:border-slate-800 p-8 md:p-12 space-y-12 transition-colors duration-300 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full -mr-64 -mt-64 blur-[100px] pointer-events-none"></div>
      
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest">
              <Activity size={12} /> Live Exchange Feed
            </div>
            {isEstimated ? (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest animate-pulse">
                <Zap size={12} /> Instant Estimates
              </div>
            ) : (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                <CheckCircle2 size={12} /> Verified Data
              </div>
            )}
          </div>
          <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3">
            Market <span className="text-emerald-600 underline decoration-lime-400">Intelligence</span>
          </h2>
        </div>
        
        <div className="flex gap-4 p-1.5 bg-slate-100 dark:bg-slate-800 rounded-2xl">
          <button 
            onClick={() => setView('price')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${view === 'price' ? 'bg-white dark:bg-slate-700 shadow-md text-emerald-900 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Price Action
          </button>
          <button 
            onClick={() => setView('volume')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all ${view === 'volume' ? 'bg-white dark:bg-slate-700 shadow-md text-emerald-900 dark:text-emerald-400' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Trading Volume
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="space-y-4">
          <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2 pl-2">Top Commodities</h4>
          {prices.map((item, idx) => (
            <button 
              key={idx} 
              onClick={() => setSelected(item)}
              className={`w-full p-6 rounded-[2rem] border-2 transition-all text-left flex flex-col gap-4 ${
                selected.commodity === item.commodity 
                ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-900/20 shadow-xl shadow-emerald-900/5 translate-x-2' 
                : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800/50 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="font-black text-slate-900 dark:text-slate-100 uppercase tracking-wider">{item.commodity}</span>
                <div className={`p-2 rounded-xl ${item.trend === 'up' ? 'bg-green-100 dark:bg-green-900/30 text-green-600' : item.trend === 'down' ? 'bg-red-100 dark:bg-red-900/30 text-red-600' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'}`}>
                  {item.trend === 'up' && <TrendingUp size={16} />}
                  {item.trend === 'down' && <TrendingDown size={16} />}
                  {item.trend === 'stable' && <Minus size={16} />}
                </div>
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-slate-100">₹{item.price}</span>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase mt-1">per {item.unit}</p>
              </div>
            </button>
          ))}
          
          <div className="mt-8 p-6 bg-slate-900 dark:bg-slate-950 rounded-[2rem] text-white space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-full -mr-12 -mt-12 blur-2xl"></div>
            <div className="flex items-center gap-2 text-lime-400">
              <AlertCircle size={18} />
              <h5 className="text-[10px] font-black uppercase tracking-widest">Market Insight</h5>
            </div>
            <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">
              {selected.commodity} prices are showing <span className="text-lime-400 font-bold">{selected.trend}</span> trend in {location} markets based on recent trade data.
            </p>
          </div>
        </div>

        <div className="lg:col-span-3 bg-slate-50 dark:bg-slate-800/50 border-2 border-slate-100 dark:border-slate-800 rounded-[3rem] p-8 min-h-[500px] flex flex-col">
          <div className="flex justify-between items-center mb-8">
            <div className="space-y-1">
              <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{selected.commodity} Trends</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Historical performance over last 15 days in primary mandis.</p>
            </div>
            <div className="px-4 py-2 bg-white dark:bg-slate-700 rounded-2xl border dark:border-slate-600 shadow-sm">
               <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Sentiment: {selected.trend === 'up' ? 'Bullish' : selected.trend === 'down' ? 'Bearish' : 'Neutral'}</span>
            </div>
          </div>

          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              {view === 'price' ? (
                <AreaChart data={selected.history}>
                  <defs>
                    <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={selected.color} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={selected.color} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                  <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dx={-10} domain={['auto', 'auto']} />
                  <Tooltip 
                    cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }}
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '1rem' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="price" 
                    stroke={selected.color} 
                    strokeWidth={4} 
                    fillOpacity={1} 
                    fill="url(#colorPrice)" 
                    animationDuration={1500}
                  />
                </AreaChart>
              ) : (
                <BarChart data={selected.history}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="date" fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                  <YAxis fontSize={10} fontStyle="bold" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dx={-10} />
                  <Tooltip 
                    cursor={{ fill: '#f1f5f9', radius: 10 }}
                    contentStyle={{ borderRadius: '1.5rem', border: 'none', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.1)', padding: '1rem' }}
                  />
                  <Bar dataKey="volume" radius={[10, 10, 0, 0]} animationDuration={1500}>
                    {selected.history.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === selected.history.length - 1 ? '#a3e635' : '#064e3b'} />
                    ))}
                  </Bar>
                </BarChart>
              )}
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-3 gap-8 mt-8 border-t border-slate-200 pt-8">
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Weekly High</p>
              <p className="text-xl font-black text-slate-900">₹{Math.max(...selected.history.map(h => h.price))}</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Volatility</p>
              <p className="text-xl font-black text-emerald-600">Low</p>
            </div>
            <div className="text-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Mandi Volume</p>
              <p className="text-xl font-black text-slate-900">{selected.history.reduce((a, b) => a + b.volume, 0)}T</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketDashboard;
