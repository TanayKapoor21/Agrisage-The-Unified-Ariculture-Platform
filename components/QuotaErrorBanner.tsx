
import React from 'react';
import { AlertTriangle, Key, RefreshCw } from 'lucide-react';

interface QuotaErrorBannerProps {
  onRetry: () => void;
}

export const QuotaErrorBanner: React.FC<QuotaErrorBannerProps> = ({ onRetry }) => {
  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      onRetry();
    }
  };

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[90%] max-w-2xl">
      <div className="bg-amber-50 dark:bg-amber-900/30 border-2 border-amber-200 dark:border-amber-800 rounded-3xl p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-500">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-100 dark:bg-amber-800 rounded-2xl text-amber-600 dark:text-amber-400">
            <AlertTriangle size={24} />
          </div>
          <div className="flex-1 space-y-2">
            <h3 className="text-lg font-black text-amber-900 dark:text-amber-100 uppercase tracking-tight">API Quota Exhausted</h3>
            <p className="text-sm text-amber-800 dark:text-amber-200 font-medium leading-relaxed">
              The free tier quota for the Gemini API has been reached. You can wait for it to reset or select a different API key to continue using real-time features.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleSelectKey}
                className="px-5 py-2.5 bg-amber-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-amber-700 transition-all flex items-center gap-2"
              >
                <Key size={14} /> Select API Key
              </button>
              <button
                onClick={onRetry}
                className="px-5 py-2.5 bg-white dark:bg-amber-800 text-amber-900 dark:text-amber-100 rounded-xl font-black text-xs uppercase tracking-widest border border-amber-200 dark:border-amber-700 hover:bg-amber-50 dark:hover:bg-amber-700 transition-all flex items-center gap-2"
              >
                <RefreshCw size={14} /> Retry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
