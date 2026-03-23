
import React, { useState, useEffect } from 'react';
import { CloudSun, Droplets, Wind, Sun, AlertTriangle, Loader2 } from 'lucide-react';
import { fetchRealTimeData, WeatherData } from '../services/dataService';

interface ClimateAlertsProps {
  location: string;
}

const ClimateAlerts: React.FC<ClimateAlertsProps> = ({ location }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchRealTimeData(location);
      setWeather(data?.weather || null);
      setLoading(false);
    };
    loadData();
  }, [location]);

  if (loading || !weather) {
    return (
      <div className="h-96 flex flex-col items-center justify-center gap-4 bg-slate-50 dark:bg-slate-900/50 rounded-[3rem] border-2 border-dashed border-slate-200 dark:border-slate-800">
        <Loader2 className="w-12 h-12 text-emerald-500 animate-spin" />
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Fetching Real-time Climate Data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 transition-colors duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-sky-100 dark:bg-sky-900/30 rounded-lg text-sky-600 dark:text-sky-400">
          <CloudSun className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-slate-100">Climate & Irrigation Advisory</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Weather Card */}
        <div className="md:col-span-2 bg-gradient-to-br from-sky-400 to-blue-600 dark:from-sky-600 dark:to-blue-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row justify-between h-full">
            <div className="space-y-4">
              <div>
                <p className="text-sky-100 text-sm font-bold uppercase tracking-widest">{location}</p>
                <h3 className="text-5xl font-black">{weather.temp}°C</h3>
                <p className="text-lg font-medium">{weather.condition}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-sky-200" />
                  <span className="text-sm font-medium">Humidity: {weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="w-4 h-4 text-sky-200" />
                  <span className="text-sm font-medium">Wind: {weather.wind} km/h</span>
                </div>
              </div>
            </div>
            <div className="mt-6 md:mt-0 flex flex-col items-end justify-between">
              <Sun className="w-24 h-24 text-amber-300 drop-shadow-lg" />
              <div className="text-right">
                <p className="text-xs text-sky-100">Sunrise: {weather.sunrise}</p>
                <p className="text-xs text-sky-100">Sunset: {weather.sunset}</p>
              </div>
            </div>
          </div>
          {/* Abstract background shape */}
          <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Irrigation Alert */}
        <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400">
            <AlertTriangle className="w-5 h-5" />
            <h4 className="font-bold">Irrigation Alert</h4>
          </div>
          <p className="text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
            High heat levels expected for the next 48 hours in {location.split(',')[0]}. Soil moisture evaporation rate is high. 
          </p>
          <div className="p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl border border-amber-100 dark:border-amber-900/40">
            <p className="text-xs font-bold text-amber-600 dark:text-amber-500 uppercase mb-1">Recommendation</p>
            <p className="text-xs font-medium text-gray-700 dark:text-slate-300">Water wheat and mustard crops today evening or tomorrow early morning to prevent wilting.</p>
          </div>
          <button className="w-full py-2 bg-amber-600 text-white rounded-lg text-sm font-bold hover:bg-amber-700 transition-colors">Schedule Irrigation</button>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-6">
        <h4 className="font-bold text-gray-800 dark:text-slate-100 mb-6">5-Day Forecast for {location}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {weather.forecast.map((f, i) => (
            <div key={i} className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
              <span className="text-xs font-bold text-gray-500 dark:text-slate-500 mb-2">{f.day}</span>
              {f.condition.toLowerCase().includes('rain') ? <Droplets className="w-8 h-8 text-blue-400 mb-2" /> : <Sun className="w-8 h-8 text-amber-400 mb-2" />}
              <span className="font-black text-gray-900 dark:text-slate-100">{f.temp}°C</span>
              <span className="text-[10px] text-gray-400 dark:text-slate-500">{f.condition}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClimateAlerts;
