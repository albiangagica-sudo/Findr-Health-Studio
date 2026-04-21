import React from 'react';
import { motion } from 'motion/react';
import { Apple, Smartphone, ShieldCheck } from 'lucide-react';
import { Logo as BrandLogo } from './Logo';
import { LiveSavingsCard } from './LiveSavingsCard';

export default function AppDownload() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div 
          className="rounded-[4rem] p-10 md:p-16 relative overflow-hidden group min-h-[500px] flex items-center border border-gray-100 shadow-2xl shadow-findr/5"
          style={{
            background: `
              radial-gradient(at 0% 0%, #eed9ff 0%, transparent 50%),
              radial-gradient(at 100% 0%, rgba(212, 255, 89, 0.4) 0%, transparent 50%),
              radial-gradient(at 100% 100%, #DBEAFE 0%, transparent 50%),
              radial-gradient(at 0% 100%, #EFF6FF 0%, transparent 50%)
            `,
            backgroundColor: '#FBFBFE'
          }}
        >
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-findr opacity-10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-110 transition-transform duration-1000" />
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 relative z-10 w-full">
            <div className="flex-1 text-center lg:text-left">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-black text-zest rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
              >
                <Smartphone size={12} /> Mobile First Advocacy
              </motion.div>
              
              <h2 className="text-3xl md:text-5xl font-display font-bold text-black tracking-tight leading-[0.9] mb-6">
                Your Health Guardian, <br />
                <span className="text-findr italic">In Your Pocket.</span>
              </h2>
              
              <p className="text-lg text-gray-600 font-medium max-w-md mb-10 leading-relaxed mx-auto lg:mx-0">
                Scan bills at the doctor's office, track claims on the go, and get instant alerts directly to your phone.
              </p>
              
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" 
                    alt="Download on the App Store" 
                    className="h-[60px] w-auto"
                    referrerPolicy="no-referrer"
                  />
                </a>
                
                <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" 
                    alt="Get it on Google Play" 
                    className="h-[60px] w-auto"
                    referrerPolicy="no-referrer"
                  />
                </a>
              </div>
            </div>
            
            <div className="flex-1 relative w-full flex flex-col items-center justify-center lg:items-end">
               <motion.div 
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="relative w-full max-w-md"
               >
                  <LiveSavingsCard />
               </motion.div>
               
               {/* Decorative Badges removed */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
