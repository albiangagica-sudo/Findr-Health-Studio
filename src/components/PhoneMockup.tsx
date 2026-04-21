import React from 'react';
import { motion } from 'motion/react';
import { Signal, Wifi, Battery } from 'lucide-react';

interface PhoneMockupProps {
  children: React.ReactNode;
  className?: string;
}

export function PhoneMockup({ children, className }: PhoneMockupProps) {
  return (
    <div className={`relative ${className}`}>
      {/* iPhone Frame */}
      <div className="relative mx-auto w-[280px] md:w-[320px] aspect-[9/19] bg-gray-900 rounded-[3rem] border-[8px] border-gray-800 shadow-2xl overflow-hidden ring-1 ring-white/10">
        {/* Dynamic Island */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-3xl z-50 flex items-center justify-center">
           <div className="w-1 h-1 bg-blue-500/20 rounded-full ml-auto mr-4" />
        </div>

        {/* Screen Background */}
        <div className="absolute inset-0 bg-[#FBFBFE] flex flex-col pt-10 pb-6 px-4">
           {/* iOS Status Bar */}
           <div className="flex items-center justify-between px-4 py-2 shrink-0">
              <span className="text-[10px] font-bold">9:41</span>
              <div className="flex items-center gap-1.5 grayscale opacity-40">
                 <Signal size={10} />
                 <Wifi size={10} />
                 <Battery size={10} />
              </div>
           </div>

           {/* App Content Container */}
           <div className="flex-1 relative flex items-center justify-center overflow-hidden">
              {children}
           </div>

           {/* Home Indicator */}
           <div className="w-24 h-1 bg-black/10 rounded-full mx-auto" />
        </div>
      </div>

      {/* Decorative Accents */}
      <div className="absolute -top-10 -right-10 w-24 h-24 bg-zest/20 blur-3xl rounded-full animate-pulse" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-findr/10 blur-3xl rounded-full" />
    </div>
  );
}
