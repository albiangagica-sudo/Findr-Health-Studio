import { useRef } from 'react';
import { motion } from 'motion/react';
import { Upload, ArrowRight, Activity } from 'lucide-react';

export default function BillAnalysis() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      window.dispatchEvent(new CustomEvent('open-upload-with-file', { detail: { file } }));
      // Reset the input so the same file can be re-selected
      e.target.value = '';
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
                <div className="w-full flex flex-col items-center">
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
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
