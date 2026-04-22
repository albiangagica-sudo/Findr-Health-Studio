import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, Send, ArrowRight } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function ClarityAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === '/') {
        setIsVisible(window.scrollY > 400);
      } else {
        setIsVisible(true);
      }
    };

    const handleOpenClarity = () => setIsOpen(true);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('open-clarity', handleOpenClarity);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('open-clarity', handleOpenClarity);
    };
  }, [location.pathname]);

  return (
    <>
      {/* Floating Button */}
      <AnimatePresence>
        {isVisible && !isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-[3000] w-16 h-16 bg-zest text-black rounded-2xl shadow-[0_20px_40px_rgba(212,255,89,0.3)] flex items-center justify-center group active:scale-90 transition-transform"
          >
            <div className="absolute inset-0 bg-black/5 rounded-2xl scale-0 group-hover:scale-100 transition-transform" />
            <Sparkles size={28} className="group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-findr rounded-full border-2 border-white animate-pulse" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[5500]"
            />
            <motion.aside
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-[5600] shadow-2xl flex flex-col"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-zest rounded-xl flex items-center justify-center text-black shadow-lg shadow-zest/20">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-bold leading-none">Clarity AI</h2>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mt-1">Advanced Billing Intel</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-[#FBFBFE]">
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
                  <p className="text-gray-700 font-medium leading-relaxed">
                    Hello! I'm <span className="text-findr font-bold">Clarity</span>. I can help you explain specific bills, find cheaper local care, or even book your next appointment. What's on your mind?
                  </p>
                </div>

                <div className="space-y-4">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Suggested Actions</p>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Explain my recent bill",
                      "Find a nearby dentist",
                      "How can I save on meds?",
                      "Book a wellness checkup"
                    ].map(q => (
                      <button
                        key={q}
                        onClick={() => setChatMessage(q)}
                        className="text-left px-5 py-4 bg-white hover:border-findr hover:shadow-lg border border-gray-100 rounded-2xl text-sm font-bold transition-all group/item flex items-center justify-between"
                      >
                        {q}
                        <ArrowRight size={14} className="opacity-0 group-hover/item:opacity-100 transition-opacity text-findr" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-white border-t border-gray-100">
                <div className="relative">
                  <input
                    type="text"
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    placeholder="Ask Clarity anything..."
                    className="w-full pl-6 pr-14 py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-zest/20 font-medium transition-all"
                  />
                  <button className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center hover:bg-findr transition-colors">
                    <Send size={18} />
                  </button>
                </div>
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center mt-6">
                  Always consult a medical professional for health advice.
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
