
import React, { useState } from 'react';
import { Mail, Lock, User, MapPin, Sprout, ArrowRight, Loader2, UserCircle } from 'lucide-react';
import { dbService } from '../services/dbService';
import { User as UserType } from '../types';

interface AuthProps {
  onLoginSuccess: (user: UserType) => void;
}

const Auth: React.FC<AuthProps> = ({ onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    location: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      if (isLogin) {
        const res = dbService.login(formData.email, formData.password);
        if (res.success && res.user) {
          onLoginSuccess(res.user);
        } else {
          setError(res.message);
        }
      } else {
        const res = dbService.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          location: formData.location
        });
        if (res.success && res.user) {
          onLoginSuccess(res.user);
        } else {
          setError(res.message);
        }
      }
      setLoading(false);
    }, 800);
  };

  const handleGuestAccess = () => {
    setGuestLoading(true);
    setTimeout(() => {
      const guestUser: UserType = {
        id: 'guest-' + Math.random().toString(36).substr(2, 4),
        name: 'Guest Farmer',
        email: 'guest@agrisage.local',
        location: 'Bathinda, Punjab' // Default location for guests
      };
      // Persist guest session so refreshes don't boot them out immediately
      localStorage.setItem('agrisage_current_user', JSON.stringify(guestUser));
      onLoginSuccess(guestUser);
      setGuestLoading(false);
    }, 600);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 p-4">
      <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Branding */}
        <div className="md:w-1/2 bg-green-600 p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white p-1.5 rounded-2xl shadow-xl overflow-hidden w-16 h-16 flex items-center justify-center border-2 border-green-100">
                <img 
                  src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&w=128&h=128&q=80" 
                  alt="AgriSage Logo" 
                  className="w-full h-full object-cover rounded-xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl font-black tracking-tight leading-none">AgriSage</h1>
                <span className="text-[10px] font-black text-green-200 uppercase tracking-[0.3em] mt-1">Smart Roots</span>
              </div>
            </div>
            <h2 className="text-4xl font-bold leading-tight mb-4">
              Cultivating success through data.
            </h2>
            <p className="text-green-100 text-lg">
              The unified platform for the modern farmer. Access global markets, climate insights, and AI guidance.
            </p>
          </div>
          
          <div className="relative z-10 pt-12">
            <div className="flex -space-x-3 mb-4">
              {[1, 2, 3, 4].map(i => (
                <img key={i} className="w-10 h-10 rounded-full border-2 border-green-600 bg-green-100" src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="User" />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-green-600 bg-green-700 flex items-center justify-center text-xs font-bold">
                +2k
              </div>
            </div>
            <p className="text-sm font-medium text-green-100">Joined by 2,000+ farmers across India.</p>
          </div>

          {/* Abstract Decorations */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500 rounded-full -mr-20 -mt-20 opacity-50 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-green-700 rounded-full -ml-10 -mb-10 opacity-50 blur-2xl"></div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="flex justify-between items-center mb-10">
            <h3 className="text-2xl font-bold text-gray-800">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h3>
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm font-bold text-green-600 hover:text-green-700"
            >
              {isLogin ? 'Sign Up' : 'Log In'}
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    name="name"
                    required
                    type="text" 
                    placeholder="e.g. Rajesh Kumar" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  name="email"
                  required
                  type="email" 
                  placeholder="name@farm.com" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
                {isLogin && <button type="button" className="text-[10px] font-bold text-green-600">Forgot?</button>}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input 
                  name="password"
                  required
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Location (District/State)</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input 
                    name="location"
                    required
                    type="text" 
                    placeholder="e.g. Bathinda, Punjab" 
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
                    value={formData.location}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            <div className="space-y-3 pt-2">
              <button 
                type="submit"
                disabled={loading || guestLoading}
                className="w-full bg-green-600 text-white font-bold py-4 rounded-xl shadow-lg hover:bg-green-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                  <>
                    {isLogin ? 'Sign In to Dashboard' : 'Create My Account'}
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 my-4">
                <div className="h-[1px] bg-gray-200 flex-1"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Or</span>
                <div className="h-[1px] bg-gray-200 flex-1"></div>
              </div>

              <button 
                type="button"
                onClick={handleGuestAccess}
                disabled={loading || guestLoading}
                className="w-full bg-white border border-gray-200 text-gray-600 font-bold py-3 rounded-xl hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {guestLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : (
                  <>
                    <UserCircle size={18} className="text-gray-400" />
                    Continue as Guest
                  </>
                )}
              </button>
            </div>
          </form>

          <p className="text-center text-[10px] text-gray-400 mt-8 leading-relaxed">
            By continuing, you agree to AgriSage's Terms of Service and Privacy Policy. Guest access provides limited historical data persistence.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
