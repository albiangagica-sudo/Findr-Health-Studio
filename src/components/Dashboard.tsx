import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Award, Calendar, ChevronRight, Zap, ArrowRight, Activity, MessageSquare, Sparkles, X, Send, Store } from 'lucide-react';
import { auth, db } from '../lib/firebase';
import { cn } from '../lib/utils';
import { onSnapshot, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [userData, setUserData] = useState<any>(null);
  useEffect(() => {
    if (!auth.currentUser) return;
    
    return onSnapshot(doc(db, 'users', auth.currentUser.uid), (doc) => {
      if (doc.exists()) setUserData(doc.data());
    });
  }, []);

  const openClarity = () => {
    window.dispatchEvent(new CustomEvent('open-clarity'));
  };

  if (!auth.currentUser) return null;

  return (
    <div className="pt-40 pb-24 bg-[#FBFBFE]">
      <div className="max-w-7xl mx-auto px-6">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="relative">
            <h1 className="text-4xl md:text-7xl font-display font-bold text-black tracking-tight leading-[0.9]">
              Welcome back, <span className="text-findr">{auth.currentUser.displayName?.split(' ')[0]}!</span>
            </h1>
          </div>
          
          <motion.div 
            whileHover={{ scale: 1.05, rotate: -2 }}
            className="flex items-center gap-6 bg-white p-6 rounded-[2.5rem] shadow-xl shadow-black/5 border border-gray-50 pr-10 relative overflow-hidden group text-zest"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-zest/20 blur-3xl rounded-full translate-x-12 -translate-y-12" />
            <div className="w-16 h-16 bg-black text-current rounded-2xl flex items-center justify-center text-3xl font-display font-bold z-10">
              {userData?.streak || 4}
            </div>
            <div className="z-10">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Current Streak</p>
                <span className="flex h-1.5 w-1.5 rounded-full bg-zest animate-pulse" />
              </div>
              <p className="text-xl font-display font-bold text-black leading-none">Active Healthy Saver</p>
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Stats */}
          <section className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
             <motion.div 
                whileHover={{ y: -5 }}
                className="p-10 bg-black rounded-[3rem] text-white relative overflow-hidden group min-h-[400px] flex flex-col justify-between"
             >
                <div className="absolute top-0 right-[-20%] p-10 opacity-5 transform scale-150 group-hover:scale-[2] transition-transform duration-1000">
                  <TrendingUp size={300} />
                </div>
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-10 border border-white/10">
                    <TrendingUp className="text-findr" size={28} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">Total Savings</h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]">Validated by AI</p>
                </div>

                <div className="relative z-10">
                  <div className="flex flex-col mb-10">
                    <span className="text-7xl md:text-8xl font-display font-bold text-findr tracking-tighter leading-none">$1,450</span>
                    <span className="text-sm font-bold text-gray-500 mt-2">Saved across 4 major claims</span>
                  </div>
                  <button className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-findr hover:gap-5 transition-all group/btn">
                    View History <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
             </motion.div>

             <div className="flex flex-col gap-8">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  onClick={openClarity}
                  className="p-8 bg-zest rounded-[3rem] text-black shadow-xl shadow-zest/20 flex flex-col justify-between flex-1 cursor-pointer group"
                >
                   <div className="flex items-center justify-between mb-8">
                     <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white group-hover:rotate-12 transition-transform">
                        <MessageSquare size={24} />
                     </div>
                     <span className="px-3 py-1 bg-black/10 rounded-full text-[10px] font-black uppercase tracking-widest">AI Sidekick</span>
                   </div>
                   
                   <div>
                      <h3 className="text-3xl font-display font-bold mb-2 leading-tight">Clarity AI</h3>
                      <p className="text-xs font-bold text-black/50 uppercase tracking-widest mb-4">Ask anything about billing</p>
                      <div className="flex items-center gap-2 text-sm font-black text-black">
                         Start Chat <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </div>
                   </div>
                </motion.div>

                <Link 
                  to="/findr-fridays"
                  className="p-8 bg-cobalt rounded-[3rem] text-white shadow-xl shadow-cobalt/20 flex items-center gap-6 hover:scale-[1.02] transition-transform"
                >
                   <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/20">
                      <Zap size={24} className="fill-zest text-zest" />
                   </div>
                   <div>
                      <h4 className="text-lg font-display font-bold leading-none mb-2 underline decoration-zest decoration-2 underline-offset-4">Next Unlock</h4>
                      <p className="text-xs font-medium opacity-80 uppercase tracking-widest">75% Off Spa Day</p>
                   </div>
                </Link>
             </div>

             <div className="md:col-span-2 p-12 bg-white rounded-[3.5rem] border border-gray-100 shadow-xl shadow-black/[0.02] flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-findr/10 rounded-full translate-x-32 -translate-y-32 blur-3xl opacity-50" />
                <div className="w-32 h-32 rounded-[2.5rem] flex items-center justify-center text-white shadow-2xl shrink-0 relative z-10 rotate-0" style={{ backgroundColor: '#8927ff', transform: 'none' }}>
                  <Store size={48} />
                </div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <h4 className="text-3xl font-display font-bold tracking-tight">Marketplace</h4>
                    <span className="px-3 py-1 bg-black text-white rounded-full text-[10px] font-black uppercase tracking-widest">Coming Soon</span>
                  </div>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-lg mb-8">Book all medical and wellness appointments while saving money and getting transparent pricing before you schedule.</p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 max-w-md">
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      className="flex-1 px-6 py-4 bg-gray-50 rounded-2xl border border-gray-100 focus:outline-none focus:ring-2 focus:ring-findr/20 font-medium transition-all"
                    />
                    <button className="px-8 py-4 bg-black text-white rounded-2xl font-black shadow-xl hover:bg-findr transition-colors whitespace-nowrap">
                      Join Access
                    </button>
                  </div>
                </div>
             </div>
          </section>

          {/* Sidebar */}
          <aside className="flex flex-col gap-8">
            <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-black/[0.02] relative overflow-hidden group">
                <div className="flex items-center justify-between mb-12">
                   <div>
                      <h3 className="text-xl font-display font-bold">Appointments</h3>
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-findr animate-pulse" /> Up-to-date
                      </p>
                   </div>
                   <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-findr group-hover:text-white transition-all duration-500">
                      <Calendar size={18} />
                   </div>
                </div>
                
                <div className="space-y-12 relative px-2">
                  <div className="absolute left-[19px] top-4 bottom-4 w-[1px] bg-gradient-to-b from-gray-100 via-findr/20 to-gray-50" />
                  
                  {[
                    { day: '24', month: 'Oct', title: 'Results Review', sub: 'Family Care Clinic', status: 'Confirmed', color: 'bg-cobalt text-white' },
                    { day: '28', month: 'Oct', title: 'Dental Checkup', sub: 'Bright Smiles Dental', status: 'Processing', color: 'bg-zest text-black' }
                  ].map((item, idx) => (
                    <motion.div 
                      key={idx}
                      whileHover={{ x: 5 }}
                      className="flex items-start gap-8 relative z-10 group/item cursor-pointer"
                    >
                      <div className="relative shrink-0">
                        <div className="w-10 h-10 rounded-2xl bg-white border-2 border-gray-50 flex flex-col items-center justify-center shadow-lg group-hover/item:border-findr transition-colors">
                          <p className="text-[7px] font-black uppercase text-gray-400 leading-none mb-0.5">{item.month}</p>
                          <p className="text-sm font-black text-black leading-none">{item.day}</p>
                        </div>
                        {idx === 0 && <span className="absolute -top-1 -right-1 w-3 h-3 bg-findr rounded-full ring-4 ring-white" />}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={cn("px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-widest", item.color)}>
                            {item.status}
                          </span>
                        </div>
                        <h4 className="text-base font-display font-bold mb-1 leading-tight group-hover/item:text-findr transition-colors">{item.title}</h4>
                        <p className="text-[10px] text-gray-400 font-medium leading-none">{item.sub}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-14 relative">
                   <div className="absolute inset-0 bg-findr/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                   <button className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl relative z-10 hover:bg-findr hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-black/10">
                      Sync Future Appointments
                   </button>
                </div>
            </div>

            <motion.div 
              whileHover={{ rotate: 1 }}
              className="p-10 bg-lavender rounded-[3rem] text-cobalt relative overflow-hidden border border-cobalt/5 shadow-xl shadow-lavender/40 flex-1 flex flex-col justify-between"
            >
               <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-cobalt opacity-5 rounded-full" />
               <div>
                 <h3 className="text-3xl font-display font-bold mb-4 tracking-tight leading-none">Spread the <br /> Wellness.</h3>
                 <p className="text-sm font-bold text-cobalt/60 uppercase tracking-widest mb-10 leading-relaxed">Give $50, Get $50 towards medical bills.</p>
               </div>
               <button className="w-full py-5 bg-white text-cobalt font-black text-sm rounded-[1.5rem] shadow-xl shadow-cobalt/10 hover:shadow-2xl transition-all">
                 Share Access
               </button>
            </motion.div>
          </aside>
        </div>
      </div>
    </div>
  );
}
import { AnimatePresence } from 'motion/react';
