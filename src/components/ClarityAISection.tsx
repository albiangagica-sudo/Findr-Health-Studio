import { motion } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

const openClarity = () => window.dispatchEvent(new CustomEvent('open-clarity'));

export default function ClarityAISection() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      {/* Cobalt gradient glow */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#2E5BFF]/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-20 items-center">
          {/* Left side */}
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-zest text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-8 shadow-sm"
            >
              <Sparkles size={14} /> AI Healthcare Assistant
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-bold text-white tracking-tight leading-[0.9] mb-8"
            >
              Ask Clarity<br />anything.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-gray-400 font-medium max-w-md mb-12 leading-relaxed"
            >
              Insurance jargon. Drug costs. Billing disputes. Ask anything — Clarity speaks healthcare so you don't have to.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              {[
                'Why is my MRI so expensive?',
                'What does coinsurance mean?',
                'How do I appeal a denied claim?',
              ].map((q) => (
                <button
                  key={q}
                  onClick={openClarity}
                  className="px-5 py-3 border border-white/20 rounded-full text-sm text-white/80 hover:bg-white/10 transition-colors"
                >
                  {q}
                </button>
              ))}
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={openClarity}
              className="group bg-zest text-black rounded-full px-10 py-5 font-black text-lg flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zest/20"
            >
              Start a conversation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </div>

          {/* Right side — chat illustration */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:w-1/2 w-full"
          >
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[3rem] p-8">
              <div className="bg-white/10 rounded-2xl p-4 mb-4">
                <p className="text-white/90 text-sm">My ER bill is $4,800. Is that normal?</p>
              </div>
              <div className="bg-[#2E5BFF]/30 rounded-2xl p-4">
                <p className="text-white text-sm">That's about 3x typical. An ER visit usually costs $1,200–$2,400. I can show you which charges are inflated and what to say when you call.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
