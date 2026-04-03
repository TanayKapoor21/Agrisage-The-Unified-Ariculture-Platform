
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Send, X, Bot, User, AlertTriangle, Volume2, VolumeX, Sparkles, Languages } from 'lucide-react';
import { getFarmingExpertResponse } from '../services/geminiService';
import { QuotaExceededError } from '../services/apiUtils';
import { Language } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
  timestamp: Date;
}

interface VoiceChatProps {
  language: Language;
  onClose: () => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ language, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Namaste! I am your AgriSage assistant. I can help you with crop advice, market prices, and sustainable farming. How can I help you today?", timestamp: new Date() }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [handsFree, setHandsFree] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speak = (text: string) => {
    stopSpeaking();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language === 'en' ? 'en-IN' : 'hi-IN';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (handsFree) {
        startListening();
      }
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    setError(null);
    const userMsg: Message = { role: 'user', text, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    try {
      const aiResponse = await getFarmingExpertResponse(text, language);
      setMessages(prev => [...prev, { role: 'assistant', text: aiResponse, timestamp: new Date() }]);
      setIsProcessing(false);
      speak(aiResponse);
    } catch (err) {
      setIsProcessing(false);
      if (err instanceof QuotaExceededError) {
        setError("API Quota exceeded. Please try again later.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  const startListening = () => {
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice recognition not supported in this browser.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }

    const recognition = new SpeechRecognition();
    recognitionRef.current = recognition;
    recognition.lang = language === 'en' ? 'en-IN' : 'hi-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      startListening();
    }
  };

  useEffect(() => {
    return () => {
      stopSpeaking();
      recognitionRef.current?.stop();
    };
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-emerald-950/40 backdrop-blur-md"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white dark:bg-slate-900 w-full max-w-2xl rounded-[2.5rem] shadow-2xl flex flex-col h-[85vh] overflow-hidden border-4 border-white dark:border-slate-800"
      >
        {/* Header */}
        <div className="bg-emerald-900 dark:bg-slate-950 p-6 text-white flex justify-between items-center border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-lime-400 rounded-2xl flex items-center justify-center text-emerald-950 shadow-lg shadow-lime-400/20">
              <Bot size={28} />
            </div>
            <div>
              <h3 className="font-black text-xl uppercase tracking-tighter">AgriSage AI Expert</h3>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-lime-400 rounded-full animate-pulse"></span>
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Online & Ready</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setHandsFree(!handsFree)}
              className={`p-2.5 rounded-xl transition-all flex items-center gap-2 text-[10px] font-black uppercase tracking-widest ${
                handsFree ? 'bg-lime-400 text-emerald-950 shadow-lg shadow-lime-400/20' : 'bg-white/10 text-white hover:bg-white/20'
              }`}
              title="Hands-free Mode"
            >
              <Sparkles size={14} className={handsFree ? 'animate-spin' : ''} />
              <span className="hidden sm:inline">Hands-free</span>
            </button>
            <button onClick={onClose} className="p-2.5 bg-white/10 hover:bg-red-500 text-white rounded-xl transition-all">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-50 dark:bg-slate-950 custom-scrollbar">
          {messages.map((msg, idx) => (
            <motion.div 
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              key={idx} 
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${
                  msg.role === 'user' ? 'bg-emerald-100 text-emerald-700' : 'bg-lime-100 text-emerald-900'
                }`}>
                  {msg.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div className={`p-5 rounded-3xl shadow-sm relative ${
                  msg.role === 'user' 
                  ? 'bg-emerald-600 text-white rounded-tr-none' 
                  : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-none border border-slate-100 dark:border-slate-700'
                }`}>
                  <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  <p className={`text-[9px] mt-2 font-black uppercase tracking-widest opacity-40 ${msg.role === 'user' ? 'text-white' : 'text-slate-400'}`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  {msg.role === 'assistant' && idx === messages.length - 1 && isSpeaking && (
                    <div className="absolute -right-2 -top-2 p-1.5 bg-lime-400 text-emerald-950 rounded-lg shadow-lg animate-bounce">
                      <Volume2 size={12} />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 p-4 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-700 flex gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="p-8 border-t dark:border-slate-800 bg-white dark:bg-slate-900 space-y-6">
          {error && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-4 rounded-2xl border border-red-100 dark:border-red-900/50 flex items-center gap-3"
            >
              <AlertTriangle size={16} />
              <span className="font-bold uppercase tracking-widest">{error}</span>
            </motion.div>
          )}
          
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <input 
                type="text" 
                placeholder={isListening ? "Listening..." : "Type your agricultural question..."} 
                className={`w-full border-2 transition-all rounded-3xl px-6 py-4 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 bg-slate-50 dark:bg-slate-800 dark:text-slate-100 font-bold text-sm ${
                  isListening ? 'border-emerald-500 animate-pulse' : 'border-slate-100 dark:border-slate-700'
                }`}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
                disabled={isListening}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                {isSpeaking && (
                  <button 
                    onClick={stopSpeaking}
                    className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                    title="Stop Speaking"
                  >
                    <VolumeX size={18} />
                  </button>
                )}
                <button 
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isProcessing}
                  className="p-2.5 bg-emerald-950 text-white rounded-xl hover:bg-emerald-900 transition-all disabled:opacity-30"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>

            <button 
              onClick={toggleListening}
              className={`p-5 rounded-3xl transition-all relative group ${
                isListening 
                ? 'bg-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)]' 
                : 'bg-emerald-600 text-white shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:scale-105'
              }`}
            >
              {isListening ? (
                <div className="relative">
                  <MicOff size={24} />
                  <span className="absolute -inset-4 border-4 border-white/30 rounded-full animate-ping"></span>
                </div>
              ) : (
                <Mic size={24} />
              )}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                {isListening ? 'Stop Listening' : 'Speak Now'}
              </div>
            </button>
          </div>

          <div className="flex justify-between items-center px-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                <Languages size={12} />
                <span>{language === 'en' ? 'English (India)' : 'Hindi (India)'}</span>
              </div>
              <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
              <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                Powered by Gemini AI
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${handsFree ? 'bg-lime-400' : 'bg-slate-200 dark:bg-slate-700'}`}></div>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Hands-free {handsFree ? 'ON' : 'OFF'}</span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VoiceChat;
