
import React, { useState } from 'react';
import { User, Eye, EyeOff, GraduationCap } from 'lucide-react';

import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
  onLogin: (username: string, remember?: boolean) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username, rememberMe);
      navigate('/dashboard');
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-900 overflow-hidden">
      {/* Mock Picture Section (Left) */}
      <div className="hidden lg:block lg:w-2/3 relative h-screen">
        <img 
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070" 
          alt="Learning Platform Mock" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1b75d0]/60 to-slate-900/80 backdrop-blur-[2px]"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-2xl text-white space-y-8">
            <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold uppercase tracking-[0.2em]">The Future of Academic Management</span>
            </div>
            <h2 className="text-6xl font-black leading-tight tracking-tight">Smart Solutions for <br /><span className="text-blue-400">Brighter Futures.</span></h2>
            <p className="text-xl text-slate-200 font-medium leading-relaxed max-w-lg">
              Empower your institution with UniEdu's integrated suite for administration, student tracking, and financial transparency.
            </p>
            <div className="flex items-center gap-6 pt-4">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" className="w-full h-full object-cover" />
                   </div>
                 ))}
               </div>
               <p className="text-sm font-bold text-slate-300">Joined by 10,000+ Educators</p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Card Section (Right) */}
      <div className="w-full lg:w-1/3 flex items-center justify-center p-6 sm:p-12 bg-white relative">
        <div className="lg:hidden absolute inset-0 -z-10">
           <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=2070" 
            alt="Mobile Background"
            className="w-full h-full object-cover opacity-10"
           />
        </div>

        <div className="w-full max-w-md bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl lg:shadow-none border border-blue-50 lg:border-none">
          {/* Logo */}
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2.5 bg-[#1b75d0] rounded-xl shadow-lg shadow-blue-500/20">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">uniedu</span>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="text-2xl font-bold text-slate-900 mb-2">Login</h1>
            <p className="text-slate-500 text-sm font-medium">Please enter your credentials to proceed</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                placeholder="Enter Username"
                className="w-full px-5 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all pr-12 font-medium"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
            </div>

            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="w-full px-5 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all pr-12 font-medium"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer group">
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <div className={`block w-10 h-6 rounded-full transition-colors duration-300 ${rememberMe ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
                  <div className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-300 ${rememberMe ? 'translate-x-4' : 'translate-x-0'}`}></div>
                </div>
                <span className="ml-3 text-sm text-slate-500 font-bold group-hover:text-slate-700 transition-colors">Remember me</span>
              </label>
              <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors">Forgot Password?</a>
            </div>

            <button
              type="submit"
              className="w-full py-4.5 bg-[#1b75d0] hover:bg-blue-700 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/30 transition-all active:scale-[0.98] mt-4"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="mt-16 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.3em]">
              Powered by UniEdu Engine • v3.4.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
