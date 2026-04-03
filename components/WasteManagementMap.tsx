
import React, { useState, useEffect, useCallback } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  InfoWindow,
  useMap
} from '@vis.gl/react-google-maps';
import { findWasteCenters, WasteCenter } from '../services/mapService';
import { Recycle, MapPin, Phone, Info, Navigation, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const MAP_ID = 'DEMO_MAP_ID'; // Replace with a real Map ID if available

interface WasteManagementMapProps {
  location: string;
}

const MapHandler = ({ center }: { center: { lat: number; lng: number } }) => {
  const map = useMap();
  useEffect(() => {
    if (map && center) {
      map.panTo(center);
    }
  }, [map, center]);
  return null;
};

export const WasteManagementMap: React.FC<WasteManagementMapProps> = ({ location }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const [centers, setCenters] = useState<WasteCenter[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<WasteCenter | null>(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Default to Delhi

  const fetchCenters = useCallback(async () => {
    setLoading(true);
    try {
      const results = await findWasteCenters(location);
      setCenters(results);
      
      // Try to get user's current coordinates to center the map
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter({ lat: latitude, lng: longitude });
          setLoading(false);
        },
        () => {
          // Fallback: center on the first result if geolocation fails
          if (results.length > 0) {
            setMapCenter(results[0].location);
          }
          setLoading(false);
        }
      );
    } catch (error) {
      console.error("Error fetching centers:", error);
      setLoading(false);
    }
  }, [location]);

  useEffect(() => {
    fetchCenters();
  }, [fetchCenters]);

  if (!apiKey) {
    return (
      <div className="p-8 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-3xl text-center space-y-4">
        <div className="p-4 bg-amber-100 dark:bg-amber-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-amber-600 dark:text-amber-400">
          <Info size={32} />
        </div>
        <h3 className="text-xl font-black text-amber-900 dark:text-amber-100 uppercase tracking-tight">Google Maps API Key Required</h3>
        <p className="text-amber-800 dark:text-amber-200 font-medium max-w-md mx-auto">
          Please provide a Google Maps API key in your environment variables (VITE_GOOGLE_MAPS_API_KEY) to enable this feature.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-100 flex items-center gap-3 uppercase tracking-tight">
            <Recycle className="text-emerald-600" size={32} />
            Waste Management Network
          </h2>
          <p className="text-slate-500 dark:text-slate-400 font-medium">Locate verified stubble recycling and composting facilities across India.</p>
        </div>
        <button 
          onClick={fetchCenters}
          disabled={loading}
          className="px-6 py-3 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-emerald-700 transition-all flex items-center gap-2 disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={16} /> : <Navigation size={16} />}
          Refresh Nearby Centers
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
        {/* Map Container */}
        <div className="lg:col-span-2 bg-slate-100 dark:bg-slate-800 rounded-[2.5rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-2xl relative">
          <APIProvider apiKey={apiKey}>
            <Map
              defaultCenter={mapCenter}
              defaultZoom={11}
              mapId={MAP_ID}
              className="w-full h-full"
              gestureHandling={'greedy'}
              disableDefaultUI={false}
            >
              <MapHandler center={mapCenter} />
              
              {centers.map((center, index) => (
                <AdvancedMarker
                  key={index}
                  position={center.location}
                  onClick={() => setSelectedCenter(center)}
                >
                  <Pin background={'#10b981'} glyphColor={'#fff'} borderColor={'#064e3b'} />
                </AdvancedMarker>
              ))}

              {selectedCenter && (
                <InfoWindow
                  position={selectedCenter.location}
                  onCloseClick={() => setSelectedCenter(null)}
                >
                  <div className="p-2 min-w-[200px] space-y-2">
                    <h4 className="font-black text-slate-900 uppercase text-sm tracking-tight">{selectedCenter.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{selectedCenter.address}</p>
                    <div className="flex flex-wrap gap-1">
                      {selectedCenter.wasteTypes.map((type, i) => (
                        <span key={i} className="px-2 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {type}
                        </span>
                      ))}
                    </div>
                    {selectedCenter.mapsUri && (
                      <a 
                        href={selectedCenter.mapsUri} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block w-full py-2 bg-emerald-600 text-white text-center rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 transition-all"
                      >
                        View on Google Maps
                      </a>
                    )}
                  </div>
                </InfoWindow>
              )}
            </Map>
          </APIProvider>
        </div>

        {/* Centers List */}
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-6 border dark:border-slate-800 shadow-xl overflow-y-auto space-y-4 custom-scrollbar">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Nearby Facilities ({centers.length})</h3>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-20">
              <Loader2 className="animate-spin text-emerald-600" size={48} />
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">Scanning for centers...</p>
            </div>
          ) : centers.length > 0 ? (
            centers.map((center, index) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                key={index}
                onClick={() => {
                  setSelectedCenter(center);
                  setMapCenter(center.location);
                }}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer group ${
                  selectedCenter?.name === center.name 
                  ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 shadow-lg' 
                  : 'border-slate-50 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-black text-slate-900 dark:text-slate-100 uppercase text-sm tracking-tight group-hover:text-emerald-600 transition-colors">
                      {center.name}
                    </h4>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
                      <MapPin size={14} className="mt-0.5 shrink-0" />
                      <span>{center.address}</span>
                    </div>
                    {center.contact && (
                      <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 font-black tracking-widest uppercase">
                        <Phone size={14} />
                        <span>{center.contact}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {center.wasteTypes.map((type, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-xl text-[9px] font-black uppercase tracking-widest">
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-20 space-y-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-full w-16 h-16 mx-auto flex items-center justify-center text-slate-300">
                <Recycle size={32} />
              </div>
              <p className="text-sm font-black text-slate-400 uppercase tracking-widest">No centers found in this area.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
