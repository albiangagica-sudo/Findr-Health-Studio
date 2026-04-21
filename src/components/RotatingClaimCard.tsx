import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';

const CLAIMS = [
  { id: '#FL-44021', type: 'Duplicate Charge', amount: '$842.10', status: 'Error Flagged', color: 'bg-red-50 text-red-500' },
  { id: '#FL-82103', type: 'Coding Discrepancy', amount: '$1,240.50', status: 'Compliance Gap', color: 'bg-orange-50 text-orange-500' },
  { id: '#FL-22918', type: 'Unbundled Services', amount: '$415.00', status: 'Savings Found', color: 'bg-findr-light text-findr' },
  { id: '#FL-90210', type: 'Overpriced Procedure', amount: '$2,890.30', status: 'Major Recovery', color: 'bg-purple-50 text-purple-600' },
  { id: '#FL-11504', type: 'Wrongful Denial', amount: '$3,120.00', status: 'Appealing...', color: 'bg-blue-50 text-blue-500' }
];

export function RotatingClaimCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % CLAIMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const claim = CLAIMS[index];

  return (
    <div className="relative group/card">
      <motion.div 
        layout
        className="relative z-20 bg-white/40 backdrop-blur-3xl p-8 rounded-[3rem] shadow-[0_32px_80px_rgba(0,0,0,0.12)] border border-white/40 max-w-md mx-auto transform transition-all duration-700 overflow-hidden"
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

        <AnimatePresence mode="wait">
          <motion.div
            key={claim.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-findr-light rounded-2xl flex items-center justify-center text-findr">
                  <Activity size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Medical Claim</p>
                  <p className="text-sm font-bold text-black">{claim.id}</p>
                </div>
              </div>
              <div className={cn("px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full transition-colors", claim.color)}>
                {claim.status}
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-center justify-between">
                <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Analysis Type</div>
                <div className="text-xs font-bold text-black px-2 py-1 bg-gray-50 rounded-lg border border-gray-100">{claim.type}</div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 5, ease: "linear" }}
                    className="h-full bg-findr"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-zest rounded-3xl flex flex-col items-center text-center relative overflow-hidden group shadow-xl shadow-zest/20">
              <div className="absolute top-0 right-0 p-2 text-black/10 group-hover:text-black/20 transition-colors">
                 <Sparkles size={24} />
              </div>
              <p className="text-[10px] font-black text-black/60 uppercase tracking-widest mb-1 leading-none">Potential Savings</p>
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-display font-bold text-black tracking-tight">{claim.amount}</span>
                <span className="text-[9px] font-black bg-black text-white px-1.5 py-0.5 rounded-md mb-1 ml-1">RECLAIMED</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Audit Animation Overlay */}
        <div className="absolute top-0 left-0 w-full h-[2px] bg-findr/10">
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="w-1/3 h-full bg-findr blur-sm"
          />
        </div>
      </motion.div>

      <div className="absolute top-[-20px] left-[-20px] lg:left-[20px] w-24 h-24 lg:w-[134px] lg:h-[134px] bg-zest rounded-full -z-10 animate-float" />
      <div className="absolute bottom-[-10px] right-[-10px] w-32 h-32 bg-cobalt rounded-[2rem] -z-10 animate-spin-slow opacity-20" />
    </div>
  );
}
