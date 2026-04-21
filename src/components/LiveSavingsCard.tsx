import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Sparkles, MapPin } from 'lucide-react';

const SAVINGS_EVENTS = [
  { id: 1, name: 'Jessica', location: 'Bozeman, MT', amount: '$488', service: 'Dental Surgery', status: 'Audit Reclaimed' },
  { id: 2, name: 'Marcus', location: 'Austin, TX', amount: '$1,240', service: 'ER Visit', status: 'Compliance Win' },
  { id: 3, name: 'Sarah', location: 'Miami, FL', amount: '$915', service: 'Outpatient Care', status: 'Error Flagged' },
  { id: 4, name: 'David', location: 'Seattle, WA', amount: '$2,890', service: 'Knee Surgery', status: 'Major Recovery' },
  { id: 5, name: 'Elena', location: 'Chicago, IL', amount: '$312', service: 'Wellness Check', status: 'Savings Found' }
];

export function LiveSavingsCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % SAVINGS_EVENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const event = SAVINGS_EVENTS[index];

  return (
    <div className="relative group/card w-full">
      <motion.div 
        layout
        className="relative z-20 bg-white/40 backdrop-blur-3xl p-10 md:p-14 rounded-[3rem] shadow-[0_32px_80px_rgba(0,0,0,0.12)] border border-white/40 max-w-md mx-auto transform transition-all duration-700 overflow-hidden"
      >
        {/* Liquid Glass Effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [-20, 20, -20],
              y: [-20, 20, -20]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 -left-1/4 w-full h-full bg-findr/10 blur-[80px] rounded-full"
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [20, -20, 20],
              y: [20, -20, 20]
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 -right-1/4 w-full h-full bg-zest/10 blur-[80px] rounded-full"
          />
          {/* Surface Shine */}
          <motion.div 
            animate={{ x: ["-150%", "150%"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 -z-0"
          />
        </div>

        <div className="flex justify-center mb-12">
          <p className="text-[11px] font-black text-cobalt uppercase tracking-[0.3em] leading-none flex items-center gap-3">
            <span className="w-2 h-2 bg-cobalt rounded-full animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.4)]" />
            Live Savings Feed
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={event.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-cobalt/5 rounded-2xl flex items-center justify-center text-cobalt">
                  <User size={28} />
                </div>
                <div>
                  <p className="text-2xl font-display font-bold text-black tracking-tight leading-none mb-1.5">{event.name}</p>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{event.location}</p>
                </div>
              </div>
              <div className="px-4 py-1.5 bg-green-50 text-green-600 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-100 shadow-sm whitespace-nowrap">
                {event.status}
              </div>
            </div>

            <div className="p-8 bg-zest rounded-[2.5rem] flex flex-col items-center text-center relative overflow-hidden group shadow-xl shadow-zest/10 border border-white/20">
              <div className="absolute top-0 right-0 p-3 text-black/5 group-hover:text-black/10 transition-colors">
                 <Sparkles size={32} />
              </div>
              <p className="text-[11px] font-black text-black/40 uppercase tracking-[0.3em] mb-2 leading-none">User Saved</p>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-display font-bold text-black tracking-tighter leading-none">{event.amount}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Audit Animation Overlay */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-findr/10">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-findr blur-sm"
          />
        </div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-[-20px] right-[-20px] w-20 h-20 bg-findr-light rounded-full -z-10 animate-float opacity-50" />
      <div className="absolute bottom-[-20px] left-[-20px] w-24 h-24 bg-zest rounded-[2rem] -z-10 animate-spin-slow opacity-10" />
    </div>
  );
}
