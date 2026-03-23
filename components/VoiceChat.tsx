
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, X, Bot, User } from 'lucide-react';
import { getFarmingExpertResponse } from '../services/geminiService';
import { Language } from '../types';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

interface VoiceChatProps {
  language: Language;
  onClose: () => void;
}

const VoiceChat: React.FC<VoiceChatProps> = ({ language, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hello! I am your AgriSage assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMsg: Message = { role: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsProcessing(true);

    const aiResponse = await getFarmingExpertResponse(text, language);
    setMessages(prev => [...prev, { role: 'assistant', text: aiResponse }]);
    setIsProcessing(false);

    // Text to Speech
    const utterance = new SpeechSynthesisUtterance(aiResponse);
    utterance.lang = language === 'en' ? 'en-US' : (language === 'hi' ? 'hi-IN' : 'en-US');
    window.speechSynthesis.speak(utterance);
  };

  const toggleListening = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = language === 'en' ? 'en-US' : (language === 'hi' ? 'hi-IN' : 'en-US');
    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleSend(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.start();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-colors duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl flex flex-col h-[80vh] overflow-hidden border dark:border-slate-800">
        {/* Header */}
        <div className="bg-green-600 dark:bg-emerald-800 p-4 text-white flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Bot className="w-6 h-6" />
            <h3 className="font-bold text-lg">AgriSage AI Expert</h3>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-green-700 dark:hover:bg-emerald-700 rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-slate-950">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl shadow-sm ${
                msg.role === 'user' 
                ? 'bg-green-600 dark:bg-emerald-600 text-white rounded-tr-none' 
                : 'bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 rounded-tl-none border border-gray-100 dark:border-slate-700'
              }`}>
                <p className="text-sm leading-relaxed">{msg.text}</p>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 flex gap-1">
                <span className="w-2 h-2 bg-gray-300 dark:bg-slate-600 rounded-full animate-bounce"></span>
                <span className="w-2 h-2 bg-gray-300 dark:bg-slate-600 rounded-full animate-bounce delay-100"></span>
                <span className="w-2 h-2 bg-gray-300 dark:bg-slate-600 rounded-full animate-bounce delay-200"></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Footer */}
        <div className="p-4 border-t dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
          <div className="flex gap-2">
            <button 
              onClick={toggleListening}
              className={`p-3 rounded-full transition-all ${
                isListening ? 'bg-red-500 text-white animate-pulse' : 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
              }`}
            >
              {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
            </button>
            <input 
              type="text" 
              placeholder="Type your question..." 
              className="flex-1 border border-gray-200 dark:border-slate-700 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-slate-800 dark:text-slate-100"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend(inputValue)}
            />
            <button 
              onClick={() => handleSend(inputValue)}
              className="p-3 bg-green-600 dark:bg-emerald-600 text-white rounded-full hover:bg-green-700 dark:hover:bg-emerald-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 dark:text-slate-500">
            Powered by AgriSage Gemini AI. Expert guidance for sustainable farming.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VoiceChat;
