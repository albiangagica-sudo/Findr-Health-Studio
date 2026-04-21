import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, FileText, CheckCircle2, AlertCircle, ArrowRight, Loader2, Zap } from 'lucide-react';

export default function UploadBillModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'analyzing' | 'success'>('idle');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startAnalysis = async () => {
    if (!file) return;
    setStatus('uploading');
    
    // Simulate upload
    await new Promise(r => setTimeout(r, 1500));
    setStatus('analyzing');
    
    // Simulate AI analysis
    await new Promise(r => setTimeout(r, 2500));
    setStatus('success');
  };

  const reset = () => {
    setFile(null);
    setStatus('idle');
  };

  const handleClose = () => {
    onClose();
    setTimeout(reset, 300); // Reset after animation
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-[200]"
          />
          <div className="fixed inset-0 z-[201] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-xl bg-white rounded-[3rem] shadow-2xl relative overflow-hidden pointer-events-auto"
            >
              {/* Header */}
              <div className="p-8 border-b border-gray-50 flex items-center justify-between">
                <div>
                   <h2 className="text-2xl font-display font-bold">Audit Medical Bill</h2>
                   <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mt-1">AI Audit Engine v2.4</p>
                </div>
                <button 
                  onClick={handleClose}
                  className="p-3 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Content */}
              <div className="p-10">
                {status === 'idle' && (
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="border-4 border-dashed border-gray-100 rounded-[2.5rem] p-16 flex flex-col items-center justify-center gap-6 cursor-pointer hover:border-findr/30 hover:bg-findr-light/10 transition-all group"
                  >
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                    <div className="w-20 h-20 bg-gray-50 rounded-3xl flex items-center justify-center text-gray-400 group-hover:bg-white group-hover:text-findr group-hover:scale-110 transition-all shadow-sm">
                       {file ? <FileText size={40} /> : <Upload size={40} />}
                    </div>
                    <div className="text-center">
                       <p className="text-lg font-bold mb-1">
                         {file ? file.name : "Choose a file or drag it here"}
                       </p>
                       <p className="text-sm text-gray-400 font-medium tracking-tight">Supports PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  </div>
                )}

                {(status === 'uploading' || status === 'analyzing') && (
                  <div className="py-12 flex flex-col items-center text-center">
                    <div className="relative mb-10">
                       <div className="w-32 h-32 border-4 border-gray-100 rounded-full" />
                       <motion.div 
                         animate={{ rotate: 360 }}
                         transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                         className="absolute inset-0 border-4 border-t-findr border-r-transparent border-b-transparent border-l-transparent rounded-full"
                       />
                       <div className="absolute inset-0 flex items-center justify-center">
                          <FileText size={40} className="text-findr" />
                       </div>
                    </div>
                    <h3 className="text-2xl font-display font-bold mb-3">
                      {status === 'uploading' ? "Uploading to secure cloud..." : "AI Intelligence Analyzing..."}
                    </h3>
                    <p className="text-gray-500 font-medium max-w-xs mx-auto">
                      We're scanning codes and cross-referencing against insurance fair-pay databases.
                    </p>
                  </div>
                )}

                {status === 'success' && (
                  <div className="py-12 flex flex-col items-center text-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-24 h-24 bg-zest rounded-full flex items-center justify-center text-black mb-10 shadow-xl shadow-zest/20"
                    >
                       <CheckCircle2 size={48} />
                    </motion.div>
                    <h3 className="text-3xl font-display font-bold mb-4 tracking-tight">Analysis Complete!</h3>
                    <div className="p-6 bg-gray-50 rounded-2xl border border-gray-100 mb-8 w-full text-left">
                       <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Potential Errors</span>
                          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded text-[9px] font-black uppercase">3 Found</span>
                       </div>
                       <div className="flex items-center justify-between">
                          <span className="text-lg font-bold">Estimated Savings</span>
                          <span className="text-3xl font-display font-bold text-findr">$424.15</span>
                       </div>
                    </div>
                    <button className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 hover:bg-cobalt transition-colors group">
                       View Detailed Audit <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
                    </button>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              {status === 'idle' && (
                <div className="p-8 border-t border-gray-50 bg-gray-50/50 flex flex-col py-6">
                  <button 
                    disabled={!file}
                    onClick={startAnalysis}
                    className={`w-full py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-xl ${
                      file 
                        ? "bg-findr text-white hover:bg-black shadow-findr/20" 
                        : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                    }`}
                  >
                    Start Analysis <Zap size={20} />
                  </button>
                  <p className="text-[10px] text-center text-gray-400 font-black uppercase tracking-widest mt-6">
                     100% HIPAA SECURE & ENCRYPTED
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

