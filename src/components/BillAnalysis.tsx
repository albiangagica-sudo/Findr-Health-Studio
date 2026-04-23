import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, FileText, CheckCircle2, AlertCircle, TrendingDown, DollarSign, Wallet, CreditCard, ArrowRight, Activity, Zap, Sparkles, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

export default function BillAnalysis() {
  const [step, setStep] = useState<'idle' | 'uploading' | 'analyzing' | 'results' | 'paywall'>('idle');
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setStep('uploading');
      setTimeout(() => setStep('analyzing'), 1500);
      setTimeout(() => setStep('results'), 4000);
    }
  };

  return (
    <section id="analyze" className="py-32 relative overflow-hidden bg-transparent">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          <div className="lg:w-1/2">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#e9ff5a] text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm"
             >
                <Activity size={14} className="text-black" /> Document Intelligence
             </motion.div>
             <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.9] mb-8">
                Upload it. <br />
                We'll <span className="text-cobalt">explain it</span>.
             </h2>
             <p className="text-xl text-gray-500 font-medium mb-12 max-w-md leading-relaxed">
                Bills, denial letters, insurance forms, confusing statements — drop it in and we'll tell you what it means and what to do next.
             </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col justify-between shadow-sm">
                <p className="text-4xl font-display font-bold text-black mb-4">98%</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Accuracy Rate</p>
              </div>
              <div className="p-8 bg-white rounded-[2.5rem] border border-gray-100 flex flex-col justify-between shadow-sm">
                <p className="text-4xl font-display font-bold text-black mb-4">45s</p>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">Avg Analysis Time</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div 
              layout
              className="bg-white p-2 rounded-[4rem] shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-gray-100 relative"
            >
              <div className="p-8 md:p-12 min-h-[550px] flex flex-col items-center justify-center text-center">
                 <AnimatePresence mode="wait">
                    {step === 'idle' && (
                      <motion.div 
                        key="idle"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05 }}
                        className="w-full flex flex-col items-center"
                      >
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className="w-32 h-32 bg-findr-light border-4 border-dashed border-findr/30 rounded-[3.5rem] flex items-center justify-center text-findr mb-10 group cursor-pointer hover:scale-110 hover:rotate-6 transition-all duration-500"
                        >
                           <Upload size={48} className="group-hover:animate-bounce" />
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">Drop your document.</h3>
                        <p className="text-gray-400 font-medium mb-12 max-w-xs uppercase tracking-widest text-[10px] leading-relaxed">Bills, EOBs, denial letters, statements, or any medical document <br /> (PDF or Image)</p>
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="group px-12 py-6 bg-black text-white rounded-[2rem] font-black text-xl shadow-xl hover:bg-cobalt transition-all flex items-center gap-3 active:scale-95"
                        >
                          Select File <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                        <input 
                          type="file" 
                          ref={fileInputRef} 
                          onChange={handleFile} 
                          className="hidden" 
                          accept="image/*,.pdf,.csv"
                        />
                      </motion.div>
                    )}

                    {(step === 'uploading' || step === 'analyzing') && (
                      <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center"
                      >
                        <div className="w-32 h-32 relative mb-12">
                           <div className="absolute inset-0 border-[12px] border-gray-50 rounded-full" />
                           <motion.div 
                              className="absolute inset-0 border-[12px] border-cobalt rounded-full border-t-transparent animate-spin"
                           />
                           <div className="absolute inset-0 flex items-center justify-center text-cobalt">
                              {step === 'uploading' ? <Upload size={32} /> : <Sparkles size={32} className="animate-pulse" />}
                           </div>
                        </div>
                        <h3 className="text-3xl font-display font-bold mb-4">
                           {step === 'uploading' ? 'Ingesting...' : 'Analyzing Code...'}
                        </h3>
                        <div className="w-64 h-3 bg-gray-50 rounded-full overflow-hidden">
                           <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ duration: step === 'uploading' ? 1.5 : 4 }}
                              className="h-full bg-cobalt"
                           />
                        </div>
                        <p className="text-gray-400 mt-6 text-[10px] font-black uppercase tracking-[0.3em]">
                           {step === 'uploading' ? fileName : 'Checking 16 specific anomalies'}
                        </p>
                      </motion.div>
                    )}

                    {step === 'results' && (
                      <motion.div 
                        key="results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="w-full text-left"
                      >
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-500 rounded-full text-[10px] font-black uppercase tracking-widest mb-10">
                           🚨 Anomaly Detected
                        </div>
                        <h3 className="text-4xl font-display font-bold mb-10 tracking-tight leading-[0.9]">
                           Diagnosis: <br />
                           <span className="text-red-500 underline decoration-red-100">Coding Inflation</span>
                        </h3>
                        
                        <div className="p-8 bg-gray-50 rounded-[3rem] border border-gray-100 mb-10">
                           <div className="flex items-center justify-between mb-4">
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Calculated Recovery</p>
                              <div className="w-8 h-8 rounded-full bg-findr/20 flex items-center justify-center">
                                 <Zap size={16} className="text-findr fill-findr" />
                              </div>
                           </div>
                           <p className="text-7xl font-display font-bold text-black tracking-tighter leading-none">$412.50</p>
                        </div>

                        <button 
                           onClick={() => setStep('paywall')}
                           className="w-full py-7 bg-black text-white rounded-[2rem] font-black text-xl shadow-2xl hover:bg-cobalt transition-all group active:scale-95"
                        >
                          Claim Refund Scripts <ArrowRight className="inline-block ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                      </motion.div>
                    )}

                    {step === 'paywall' && (
                      <motion.div 
                        key="paywall"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full"
                      >
                        <div className="w-24 h-24 bg-zest rounded-[2rem] flex items-center justify-center text-black mx-auto mb-8 shadow-xl rotate-12 relative">
                           <Sparkles size={36} />
                           <div className="absolute -top-2 -right-2 w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-xs">AI</div>
                        </div>
                        <h3 className="text-4xl font-display font-bold mb-4 tracking-tight">One step away.</h3>
                        <p className="text-gray-500 font-medium mb-12 max-w-xs mx-auto">Get your custom-drafted medical dispute letter and a guide to win your claim for just <span className="text-black font-black">$49</span>.</p>
                        
                        <button className="w-full py-7 bg-black text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-cobalt transition-all active:scale-95 mb-8">
                           Secure Check-out
                        </button>
                        
                        <div className="flex items-center justify-center gap-6 opacity-30 grayscale">
                           <ShieldCheck size={24} />
                           <CreditCard size={24} />
                           <p className="text-[9px] font-black uppercase tracking-widest">Encrypted</p>
                        </div>
                      </motion.div>
                    )}
                 </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
