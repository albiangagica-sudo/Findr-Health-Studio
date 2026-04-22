import { motion } from 'motion/react';
import { TrendingUp, ShieldCheck, Zap, Sparkles, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
const familySavings = 'https://res.cloudinary.com/dxtisv39w/image/upload/family_savings_deamn2';

export default function Features() {
  return (
    <section id="features" className="py-32 bg-[#FBFBFE] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border border-gray-100 shadow-sm rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Zap size={14} className="text-findr" /> The Platform
            </motion.div>
            <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.9]">
              Precision audits. <br />
              <span className="text-findr underline decoration-zest decoration-4 underline-offset-8">Human results.</span>
            </h2>
          </div>
          <p className="text-lg text-gray-500 font-medium max-w-sm mb-2 leading-relaxed">
            We find the mistakes insurance companies hope you ignore. Simple, transparent, and built for your family.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ y: -10 }}
            className="md:col-span-2 p-12 bg-black rounded-[3.5rem] text-white relative overflow-hidden min-h-[500px] flex flex-col justify-end group"
          >
            <div className="absolute top-0 right-[-10%] w-[500px] h-[500px] bg-findr/20 blur-[120px] rounded-full group-hover:scale-110 transition-transform duration-1000" />
            <Activity className="absolute top-12 left-12 text-findr opacity-30" size={140} />
            <div className="relative z-10">
              <h3 className="text-4xl md:text-7xl font-display font-bold mb-8 leading-[0.85] tracking-tight">AI Audit in <br /> Real-Time.</h3>
              <p className="text-xl text-gray-400 font-medium max-w-sm">Our Ciphr engine cross-references thousands of procedure codes against local healthcare compliance laws in seconds.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-10 bg-zest rounded-[3.5rem] text-black min-h-[500px] flex flex-col justify-between relative overflow-hidden group shadow-xl shadow-zest/10"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.1] -z-0"
              style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
            <div className="w-20 h-20 bg-black rounded-[2rem] flex items-center justify-center text-white mb-8 shadow-2xl z-10">
              <Zap size={36} />
            </div>
            <div className="z-10">
              <h3 className="text-4xl font-display font-bold mb-6 leading-[0.9] tracking-tight">Expert <br />Advocacy.</h3>
              <div className="flex flex-col gap-2">
                <p className="text-black/50 font-black uppercase tracking-widest text-[10px]">Expert-Led Savings</p>
                <p className="text-lg font-medium leading-tight">Our team of billing specialists will fight your bill directly to unlock massive savings for your family.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="p-12 bg-cobalt rounded-[3.5rem] text-white min-h-[450px] flex flex-col justify-between relative overflow-hidden shadow-xl shadow-cobalt/20"
          >
            <div className="absolute -bottom-16 -right-16 w-56 h-56 bg-white opacity-10 rounded-full" />
            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-8 border border-white/20">
              <ShieldCheck size={28} />
            </div>
            <div>
              <h3 className="text-4xl font-display font-bold mb-6 tracking-tight leading-[0.9]">100% HIPAA <br />Secure.</h3>
              <p className="text-base opacity-70 leading-relaxed font-medium">Your data is yours. We never sell health info. Military-grade encryption is our baseline, not an extra.</p>
            </div>
          </motion.div>

          <motion.div
            whileHover={{ y: -10 }}
            className="md:col-span-2 p-12 bg-[#eed9ff] rounded-[3.5rem] border border-gray-100 flex flex-col md:flex-row items-center gap-16 min-h-[450px] shadow-2xl shadow-black/[0.02] relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-80 h-80 bg-findr/5 blur-3xl rounded-full translate-x-32 -translate-y-32" />
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border border-gray-100 shadow-sm rounded-full text-[10px] font-black uppercase tracking-widest mb-8">
                <TrendingUp size={12} className="text-findr" /> Family Finance
              </div>
              <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-[0.9]">Family Wellness <br /><span className="text-findr">Dashboard.</span></h3>
              <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10">Track your family recovery history, plan for future care, and witness your medical spend decrease in real-time.</p>
              <Link to="/dashboard/family-wellness" className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.2em] group-hover:gap-6 transition-all">
                Explore Interface <TrendingUp size={16} />
              </Link>
            </div>
            <div className="flex-1 bg-gray-50 rounded-[3rem] h-full w-full relative overflow-hidden group/img min-h-[300px]">
              <img
                src={familySavings}
                alt="Family Wellness"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-findr/5 opacity-40 mix-blend-multiply transition-opacity" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
