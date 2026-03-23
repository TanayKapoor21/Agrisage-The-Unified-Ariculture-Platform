
import React, { useState, useEffect } from 'react';
import { 
  BrainCircuit, 
  Cpu, 
  Layers, 
  Zap, 
  Activity, 
  ShieldCheck, 
  TrendingUp, 
  Database,
  Info,
  ChevronRight,
  Maximize2,
  Minimize2,
  BarChart3,
  Radar as RadarIcon,
  MapPin
} from 'lucide-react';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, Cell, LineChart, Line
} from 'recharts';

const spectralData = [
  { band: 'Blue', value: 45, wavelength: '450nm' },
  { band: 'Green', value: 52, wavelength: '550nm' },
  { band: 'Red', value: 38, wavelength: '650nm' },
  { band: 'NIR', value: 85, wavelength: '850nm' },
  { band: 'SWIR', value: 62, wavelength: '1600nm' },
];

const accuracyComparison = [
  { name: 'LSTM', accuracy: 85, color: '#94a3b8' },
  { name: 'CNN', accuracy: 88, color: '#64748b' },
  { name: 'HMMFN (Ours)', accuracy: 97, color: '#10b981' },
];

const forecastingData = [
  { time: 'T-4', traditional: 65, tft: 76 },
  { time: 'T-3', traditional: 68, tft: 80 },
  { time: 'T-2', traditional: 62, tft: 74 },
  { time: 'T-1', traditional: 70, tft: 84 },
  { time: 'Now', traditional: 72, tft: 86 },
];

const attentionWeights = [
  { source: 'Spectral (3D-CNN)', weight: 92 },
  { source: 'Soil Moisture', weight: 85 },
  { source: 'Weather (TFT)', weight: 78 },
  { source: 'Historical Yield', weight: 65 },
  { source: 'Spatial Context', weight: 72 },
];

const modelMetrics = [
  { name: 'Inference', value: '<15ms', icon: <Zap size={14} /> },
  { name: 'Accuracy', value: '94-97%', icon: <ShieldCheck size={14} /> },
  { name: 'Compression', value: '18x (Quant)', icon: <Layers size={14} /> },
  { name: 'Deployment', value: 'Triton/ONNX', icon: <Cpu size={14} /> },
];

const IntelligenceLayer: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<'spatial' | 'spectral' | 'fusion'>('fusion');
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="space-y-8 pb-20">
      {/* Header Section */}
      <div className="bg-emerald-950 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden border border-lime-400/20 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-lime-400/10 rounded-full -mr-48 -mt-48 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-400/10 rounded-full -ml-48 -mb-48 blur-3xl"></div>
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-lime-400 text-emerald-950 rounded-full font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl">
              <BrainCircuit size={14} /> Intelligence Layer v2.0
            </div>
            <h2 className="text-5xl md:text-7xl font-black leading-[0.9] font-bebas tracking-tighter">
              SUGAR BEET <br/>
              <span className="text-lime-400">ANALYSIS CORE</span>
            </h2>
            <p className="text-lg text-emerald-100/70 font-medium max-w-md leading-relaxed">
              Evaluating the Hierarchical Multi-Modal Fusion Network (HMMFN) on sugar beet datasets for advanced crop health and disease detection.
            </p>
            
            <div className="grid grid-cols-2 gap-4 pt-4">
              {modelMetrics.map((metric) => (
                <div key={metric.name} className="bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-xl flex items-center gap-4 group hover:bg-white/10 transition-all">
                  <div className="p-2.5 bg-lime-400/20 text-lime-400 rounded-xl group-hover:scale-110 transition-transform">
                    {metric.icon}
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-emerald-400 uppercase tracking-widest">{metric.name}</p>
                    <p className="text-sm font-black text-white">{metric.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative aspect-square bg-emerald-900/50 rounded-[3rem] border border-white/10 p-8 shadow-inner overflow-hidden group">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-lime-400/5 via-transparent to-transparent"></div>
             
             <div className="w-full h-full flex flex-col items-center justify-center space-y-8">
                <div className="relative w-64 h-64">
                   {/* Animated Neural Network Visualization (Simplified) */}
                   <div className="absolute inset-0 border-2 border-lime-400/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
                   <div className="absolute inset-4 border-2 border-emerald-400/20 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                   <div className="absolute inset-8 border-2 border-white/10 rounded-full"></div>
                   
                   <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 bg-lime-400 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(163,230,53,0.5)] animate-pulse">
                         <Cpu size={40} className="text-emerald-950" />
                      </div>
                   </div>

                   {/* Data Nodes */}
                   <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-4 w-10 h-10 bg-emerald-800 border border-lime-400/30 rounded-xl flex items-center justify-center shadow-xl">
                      <Database size={16} className="text-lime-400" />
                   </div>
                   <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-4 w-10 h-10 bg-emerald-800 border border-lime-400/30 rounded-xl flex items-center justify-center shadow-xl">
                      <Activity size={16} className="text-lime-400" />
                   </div>
                   <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-emerald-800 border border-lime-400/30 rounded-xl flex items-center justify-center shadow-xl">
                      <Layers size={16} className="text-lime-400" />
                   </div>
                   <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-emerald-800 border border-lime-400/30 rounded-xl flex items-center justify-center shadow-xl">
                      <Zap size={16} className="text-lime-400" />
                   </div>
                </div>

                <div className="text-center space-y-1">
                   <p className="text-[10px] font-black text-lime-400 uppercase tracking-[0.3em]">Real-time Inference</p>
                   <p className="text-xs font-bold text-white/50">Processing 1.2M parameters/sec</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Main Analysis Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Multi-Modal Attention Weights */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 transition-colors duration-300">
           <div className="flex items-center justify-between">
              <div className="space-y-1">
                 <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Attention Mechanism</h3>
                 <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Cross-modal feature weighting</p>
              </div>
              <div className="p-3 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-2xl">
                 <RadarIcon size={24} />
              </div>
           </div>

           <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                 <RadarChart cx="50%" cy="50%" outerRadius="80%" data={attentionWeights}>
                    <PolarGrid stroke="#334155" />
                    <PolarAngleAxis dataKey="source" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                      name="Attention Weight"
                      dataKey="weight"
                      stroke="#10b981"
                      fill="#10b981"
                      fillOpacity={0.6}
                      strokeWidth={3}
                    />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '1rem', color: '#fff' }}
                    />
                 </RadarChart>
              </ResponsiveContainer>
           </div>

            <div className="bg-slate-50 dark:bg-slate-800 rounded-3xl p-6 border border-slate-100 dark:border-slate-700 flex items-start gap-4">
              <div className="p-2 bg-white dark:bg-slate-700 rounded-xl shadow-sm text-emerald-600 dark:text-emerald-400">
                <Info size={16} />
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Cross-Modal Attention (CMA)</p>
                <p className="text-xs font-mono text-slate-600 dark:text-slate-300">
                  Dynamically prioritizing inputs like soil moisture during drought conditions for context-aware predictions.
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">The model is currently prioritizing Spectral Stream data for disease identification.</p>
              </div>
            </div>
          </div>

          {/* Spectral Analysis */}
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8 transition-colors duration-300">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Spectral Signature</h3>
              <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Sugar Beet Stress Detection</p>
            </div>

            <div className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                <AreaChart data={spectralData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="band" tick={{ fill: '#94a3b8', fontSize: 9, fontWeight: 800 }} axisLine={false} tickLine={false} />
                  <YAxis hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '1rem', color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-emerald-50 dark:bg-emerald-900/10 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800">
              <p className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-widest leading-relaxed">
                3D-CNN successfully captured subtle wavelength variations, enabling early detection of stress zones before visible symptoms appeared.
              </p>
            </div>
          </div>

          {/* Results & Findings Section */}
          <div className="lg:col-span-3 space-y-12 py-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl">
                <h3 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tighter">Results & Findings</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  The proposed HMMFN was evaluated on the sugar beet dataset to assess its effectiveness in crop health monitoring, disease detection, and yield-related insights.
                </p>
              </div>
              <div className="flex gap-4">
                <div className="px-6 py-4 bg-emerald-950 text-white rounded-3xl border border-white/10 shadow-2xl text-center">
                  <p className="text-3xl font-black text-lime-400 leading-none">97%</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-emerald-400 mt-1">Max Accuracy</p>
                </div>
                <div className="px-6 py-4 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-3xl border border-slate-100 dark:border-slate-700 shadow-xl text-center">
                  <p className="text-3xl font-black leading-none">15ms</p>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Latency</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Accuracy Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Classification Accuracy</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HMMFN vs Baseline Models</p>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={accuracyComparison} layout="vertical" margin={{ left: 40, right: 40 }}>
                      <XAxis type="number" domain={[0, 100]} hide />
                      <YAxis dataKey="name" type="category" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem' }} />
                      <Bar dataKey="accuracy" radius={[0, 10, 10, 0]} barSize={30}>
                        {accuracyComparison.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  Outperforming baseline CNN and LSTM models in detecting early-stage disease identification.
                </p>
              </div>

              {/* Forecasting Chart */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-10 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                <div className="space-y-1">
                  <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Forecasting Accuracy</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Temporal Fusion Transformer (TFT) Improvement</p>
                </div>
                <div className="h-[250px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={forecastingData}>
                      <XAxis dataKey="time" tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 800 }} axisLine={false} tickLine={false} />
                      <YAxis hide />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '1rem' }} />
                      <Line type="monotone" dataKey="traditional" stroke="#94a3b8" strokeWidth={2} dot={false} strokeDasharray="5 5" />
                      <Line type="monotone" dataKey="tft" stroke="#10b981" strokeWidth={4} dot={{ fill: '#10b981', r: 4 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic">
                  TFT improved forecasting accuracy for crop price and weather trends by 15–20% over traditional models.
                </p>
              </div>
            </div>

            {/* Insight Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Early Stress Detection', desc: '3D-CNN captures subtle wavelength variations before visible symptoms.', icon: <Activity className="text-red-500" /> },
                { title: 'Forecasting Accuracy', desc: 'TFT improves price & weather trends by 15-20% over traditional models.', icon: <TrendingUp className="text-amber-500" /> },
                { title: 'Contextual Priority', desc: 'CMA dynamically weights soil moisture during drought conditions.', icon: <Layers className="text-blue-500" /> },
                { title: 'Regional Scalability', desc: 'Meta-learning adapts to varying soil types across diverse regions.', icon: <MapPin className="text-emerald-500" /> },
              ].map((insight, i) => (
                <div key={i} className="bg-white dark:bg-slate-900 p-8 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-lg hover:scale-105 transition-transform group">
                  <div className="w-12 h-12 bg-slate-50 dark:bg-slate-800 rounded-2xl flex items-center justify-center mb-6 shadow-inner group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors">
                    {insight.icon}
                  </div>
                  <h5 className="text-lg font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight mb-2">{insight.title}</h5>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{insight.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Hierarchical Fusion Status */}
        <div className="lg:col-span-3 bg-slate-900 rounded-[3rem] p-12 text-white relative overflow-hidden border border-white/5">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative z-10">
              <div className="space-y-6">
                 <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center">
                    <Layers size={24} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tight">Local Fusion</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Pixel-level spectral-spatial feature extraction using 3D-CNN kernels for disease hotspot detection.</p>
                 </div>
                 <div className="h-1 w-full bg-emerald-500/20 rounded-full overflow-hidden">
                    <div className="h-full w-[85%] bg-emerald-500 animate-[progress_2s_ease-in-out]"></div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-2xl flex items-center justify-center">
                    <TrendingUp size={24} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tight">Regional Pulse</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">District-level climate and market trend integration via Temporal Fusion Transformers (TFT).</p>
                 </div>
                 <div className="h-1 w-full bg-blue-500/20 rounded-full overflow-hidden">
                    <div className="h-full w-[62%] bg-blue-500 animate-[progress_2s_ease-in-out_0.5s]"></div>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="w-12 h-12 bg-lime-500/20 text-lime-400 rounded-2xl flex items-center justify-center">
                    <BarChart3 size={24} />
                 </div>
                 <div className="space-y-2">
                    <h4 className="text-xl font-black uppercase tracking-tight">Global Context</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">Cross-domain generalization using meta-learning to adapt to varying soil types across India.</p>
                 </div>
                 <div className="h-1 w-full bg-lime-500/20 rounded-full overflow-hidden">
                    <div className="h-full w-[45%] bg-lime-500 animate-[progress_2s_ease-in-out_1s]"></div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Deployment & Scalability Section */}
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-10 md:p-16 border border-slate-100 dark:border-slate-800 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-colors duration-300">
         <div className="space-y-8">
            <div className="space-y-4">
               <h3 className="text-4xl font-black text-slate-900 dark:text-slate-100 leading-tight">Efficiency & <br/><span className="text-emerald-600">Deployment Metrics</span></h3>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                  Optimized for low-bandwidth rural environments (2G/3G compatible) with efficient edge deployment using ONNX + Triton Inference Server.
               </p>
            </div>

            <div className="space-y-4">
               <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 group hover:border-emerald-500 transition-all">
                  <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                     <Zap size={20} />
                  </div>
                  <div>
                     <p className="text-sm font-black text-slate-900 dark:text-slate-100">Low Latency Inference</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Optimized to &lt;15ms using ONNX</p>
                  </div>
               </div>
               <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-slate-800 rounded-3xl border border-slate-100 dark:border-slate-700 group hover:border-emerald-500 transition-all">
                  <div className="p-3 bg-white dark:bg-slate-700 rounded-2xl shadow-sm text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                     <Layers size={20} />
                  </div>
                  <div>
                     <p className="text-sm font-black text-slate-900 dark:text-slate-100">Model Compression</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">~18x compression via 8-bit quantization</p>
                  </div>
               </div>
            </div>
         </div>

         <div className="bg-slate-900 rounded-[3rem] p-10 text-white space-y-8 border border-white/5 shadow-2xl">
            <div className="flex items-center justify-between">
               <p className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em]">System Architecture</p>
               <div className="flex gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
               </div>
            </div>

            <div className="space-y-4 font-mono text-[11px] text-slate-400">
               <div className="flex items-center gap-3">
                  <span className="text-emerald-500">➜</span>
                  <span>Initializing Triton Inference Server...</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-emerald-500">➜</span>
                  <span>Loading ONNX Runtime (v1.16.0)</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-emerald-500">➜</span>
                  <span>Cross-domain generalization: ENABLED</span>
               </div>
               <div className="flex items-center gap-3">
                  <span className="text-emerald-500">➜</span>
                  <span>Multilingual Embedding Cache: 1.2GB</span>
               </div>
               <div className="flex items-center gap-3 animate-pulse">
                  <span className="text-lime-400">➜</span>
                  <span className="text-white">Serving requests at 0.0.0.0:3000</span>
               </div>
            </div>

            <div className="pt-8 border-t border-white/10">
               <button className="w-full py-4 bg-lime-400 text-emerald-950 font-black rounded-2xl hover:bg-white transition-all transform active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs">
                  View Full API Docs <ChevronRight size={16} />
               </button>
            </div>
         </div>
      </div>
      {/* System-Level Impact Section */}
      <div className="bg-emerald-950 rounded-[3rem] p-12 text-white border border-lime-400/20 shadow-2xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-12">
          <div className="space-y-2">
            <h3 className="text-3xl font-black uppercase tracking-tight">System-Level Impact</h3>
            <p className="text-emerald-100/60 text-sm font-medium">Quantifying the real-world value of AgriSage AI</p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
            <ShieldCheck className="text-lime-400" size={16} />
            <span className="text-[10px] font-black uppercase tracking-widest">Verified Metrics</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { label: 'Manual Inspection', value: '-65%', sub: 'Dependency Reduction', color: 'text-red-400' },
            { label: 'Decision Accuracy', value: '+42%', sub: 'Data-Driven Insights', color: 'text-lime-400' },
            { label: 'Water Usage', value: '-28%', sub: 'Precision Irrigation', color: 'text-blue-400' },
            { label: 'User Engagement', value: '92%', sub: 'Farmer Retention', color: 'text-emerald-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 text-center space-y-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{stat.label}</p>
              <p className={`text-5xl font-black ${stat.color}`}>{stat.value}</p>
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{stat.sub}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-12 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex gap-4">
            <div className="w-1 h-full bg-lime-400 rounded-full"></div>
            <p className="text-sm text-emerald-100/70 leading-relaxed italic">
              "Demonstrated scalability across regions due to multi-modal and multi-lingual integration in AgriSage, improving farmer decision-making with real-time insights."
            </p>
          </div>
          <div className="flex justify-end items-center">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-emerald-950 bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="User" className="w-full h-full object-cover opacity-50" />
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-emerald-950 bg-lime-400 text-emerald-950 flex items-center justify-center text-[10px] font-black">
                  +12k
                </div>
             </div>
             <p className="ml-4 text-[10px] font-black uppercase tracking-widest text-emerald-400">Active Farmers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntelligenceLayer;
