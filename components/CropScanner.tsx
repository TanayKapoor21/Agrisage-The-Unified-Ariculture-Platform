
import React, { useState, useRef, useEffect } from 'react';
import { Camera, RefreshCw, CheckCircle2, AlertCircle, Loader2, Info, MapPin, FlaskConical, ThermometerSun } from 'lucide-react';
import { analyzeCropImage } from '../services/geminiService';

interface CropScannerProps {
  location: string;
}

const CropScanner: React.FC<CropScannerProps> = ({ location }) => {
  const [hasStarted, setHasStarted] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setError(null);
      setHasStarted(true);
      
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Your browser does not support camera access.");
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err: any) {
      console.error("Camera Error:", err);
      setHasStarted(false);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError("Camera permission was denied. Please enable it in your browser settings.");
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError("No camera found on this device.");
      } else {
        setError(err.message || "Could not access camera. Please ensure permissions are granted.");
      }
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setHasStarted(false);
  };

  const captureAndAnalyze = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    setIsScanning(true);
    setError(null);

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Use actual video dimensions
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8).split(',')[1];
      
      const result = await analyzeCropImage(base64Image, location);
      if (result) {
        setAnalysis(result);
        stopCamera();
      } else {
        setError("Failed to analyze image. Please try again.");
      }
    }
    setIsScanning(false);
  };

  const resetScanner = () => {
    setAnalysis(null);
    setError(null);
    setHasStarted(false);
  };

  useEffect(() => {
    return () => stopCamera();
  }, []);

  return (
    <div className="space-y-6 transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 rounded-[3rem] p-8 md:p-12 border-2 border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        
        <div className="relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-100 dark:border-emerald-800 text-[10px] font-black uppercase tracking-widest">
                <Camera size={14} /> Computer Vision Scanner
              </div>
              <h2 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">
                Smart Crop <span className="text-emerald-600">Identification</span>
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium max-w-md">
                Point your camera at a crop to identify species, growth stage, and receive instant health insights.
              </p>
            </div>
            
            {(analysis || hasStarted) && (
              <button 
                onClick={resetScanner}
                className="flex items-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
              >
                <RefreshCw size={16} /> {analysis ? 'Scan Another' : 'Stop Scanner'}
              </button>
            )}
          </div>

          {!analysis ? (
            <div className="relative rounded-[2.5rem] overflow-hidden bg-slate-900 aspect-video border-4 border-slate-200 dark:border-slate-800 shadow-2xl group flex items-center justify-center">
              {!hasStarted ? (
                <div className="flex flex-col items-center gap-6 p-12 text-center">
                  <div className="w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 mb-2">
                    <Camera size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase">Ready to Scan</h3>
                    <p className="text-slate-400 text-sm max-w-xs mx-auto">Click the button below to enable your camera and start identifying crops.</p>
                  </div>
                  <button 
                    onClick={startCamera}
                    className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
                  >
                    Enable Camera
                  </button>
                  {error && (
                    <div className="flex items-center gap-2 text-red-400 text-xs font-bold bg-red-500/10 px-4 py-2 rounded-lg border border-red-500/20">
                      <AlertCircle size={14} />
                      {error}
                    </div>
                  )}
                </div>
              ) : error ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center space-y-4 bg-slate-900 z-30">
                  <AlertCircle size={48} className="text-red-500" />
                  <p className="text-white font-bold">{error}</p>
                  <button onClick={startCamera} className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-black uppercase tracking-widest text-xs">Retry Camera</button>
                </div>
              ) : (
                <>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 border-[2px] border-emerald-500/30 pointer-events-none">
                    <div className="absolute top-1/2 left-0 w-full h-[2px] bg-emerald-500/50 animate-scan-line shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
                  </div>
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
                    <button 
                      onClick={captureAndAnalyze}
                      disabled={isScanning}
                      className="group relative flex items-center justify-center"
                    >
                      <div className="absolute inset-0 bg-emerald-500 rounded-full blur-xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
                      <div className={`relative p-6 rounded-full bg-white dark:bg-slate-800 text-emerald-600 shadow-2xl transition-transform active:scale-90 ${isScanning ? 'animate-pulse' : ''}`}>
                        {isScanning ? <Loader2 size={32} className="animate-spin" /> : <Camera size={32} />}
                      </div>
                    </button>
                  </div>
                </>
              )}
              <canvas ref={canvasRef} className="hidden" />
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
              {/* Main ID Card */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-[2.5rem] p-8 border border-emerald-100 dark:border-emerald-800 flex flex-col md:flex-row gap-8 items-center">
                  <div className="w-48 h-48 rounded-[2rem] overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                    <canvas 
                      ref={(el) => {
                        if (el && canvasRef.current) {
                          const ctx = el.getContext('2d');
                          el.width = canvasRef.current.width;
                          el.height = canvasRef.current.height;
                          ctx?.drawImage(canvasRef.current, 0, 0);
                        }
                      }}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 space-y-4 text-center md:text-left">
                    <div className="space-y-1">
                      <p className="text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-[0.3em]">Identified Species</p>
                      <h3 className="text-4xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">{analysis.cropName}</h3>
                    </div>
                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <div className="px-4 py-2 bg-white dark:bg-slate-800 rounded-xl border border-emerald-100 dark:border-emerald-800 shadow-sm flex items-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{analysis.growthStage}</span>
                      </div>
                      <div className={`px-4 py-2 rounded-xl border shadow-sm flex items-center gap-2 ${
                        analysis.healthStatus.toLowerCase().includes('healthy') 
                        ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-800 text-green-700 dark:text-green-400' 
                        : 'bg-amber-50 dark:bg-amber-900/20 border-amber-100 dark:border-amber-800 text-amber-700 dark:text-amber-400'
                      }`}>
                        <AlertCircle size={16} />
                        <span className="text-xs font-bold">{analysis.healthStatus}</span>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                      {analysis.healthDetails}
                    </p>
                  </div>
                </div>

                {/* Regional Suitability */}
                <div className="bg-white dark:bg-slate-800/50 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-lg space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Regional Suitability</h4>
                      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Geographic & Climate compatibility</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Best Regions</p>
                        <div className="flex flex-wrap gap-2">
                          {analysis.regionSuitability.bestRegions.map((region: string) => (
                            <span key={region} className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-lg text-[10px] font-bold">{region}</span>
                          ))}
                        </div>
                      </div>
                      <div className="p-4 bg-blue-50/50 dark:bg-blue-900/10 rounded-2xl border border-blue-100 dark:border-blue-800">
                        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 mb-1">
                          <ThermometerSun size={14} />
                          <span className="text-[10px] font-black uppercase tracking-widest">Climate</span>
                        </div>
                        <p className="text-xs font-medium text-slate-700 dark:text-slate-300">{analysis.regionSuitability.climateCompatibility}</p>
                      </div>
                    </div>
                    <div className="p-6 bg-slate-900 dark:bg-slate-950 rounded-[2rem] text-white space-y-3">
                      <div className="flex items-center gap-2 text-lime-400">
                        <Info size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Seasonal Advice</span>
                      </div>
                      <p className="text-xs text-emerald-100/70 leading-relaxed font-medium">
                        {analysis.regionSuitability.seasonalAdvice}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Soil Suitability */}
              <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] p-8 border border-slate-100 dark:border-slate-800 shadow-xl space-y-8">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded-2xl">
                    <FlaskConical size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-slate-900 dark:text-slate-100 uppercase tracking-tight">Soil Analysis</h4>
                    <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Ideal growth conditions</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="p-6 bg-slate-50 dark:bg-slate-800 rounded-[2rem] border border-slate-100 dark:border-slate-700">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Ideal Soil Type</p>
                    <p className="text-lg font-black text-slate-900 dark:text-slate-100">{analysis.soilSuitability.idealType}</p>
                  </div>

                  <div className="flex items-center justify-between p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2rem] border border-emerald-100 dark:border-emerald-800">
                    <p className="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Recommended pH</p>
                    <p className="text-2xl font-black text-emerald-600">{analysis.soilSuitability.pH}</p>
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-2">Key Nutrients</p>
                    <div className="grid grid-cols-1 gap-2">
                      {analysis.soilSuitability.nutrients.map((nutrient: string) => (
                        <div key={nutrient} className="flex items-center gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 group hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors">
                          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                          <span className="text-[10px] font-black text-slate-900 dark:text-slate-100 uppercase tracking-widest">{nutrient}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0%; }
          100% { top: 100%; }
        }
        .animate-scan-line {
          animation: scan-line 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default CropScanner;
