import { motion } from 'motion/react';
import { Building2, ShieldCheck, Users, Zap, ArrowRight, Sparkles, Network } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-black text-white pt-40 pb-24 overflow-hidden selection:bg-findr/30 selection:text-white">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[10%] left-[5%] w-[500px] h-[500px] bg-findr/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[20%] right-[5%] w-[400px] h-[400px] bg-zest/5 blur-[120px] rounded-full" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.05]" 
             style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-zest border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm"
          >
            <Sparkles size={14} /> Institutional-Grade Advocacy
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight leading-[0.85] mb-10"
          >
            Scale your <span className="text-zest">impact.</span> <br />
            Protect their <span className="text-findr italic">wealth.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl mx-auto leading-relaxed"
          >
            Findr Enterprise empowers employers, insurers, and high-net-worth advocates with the world's most precise health auditing engine.
          </motion.p>
        </header>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-40">
          {[
            {
              icon: <Building2 className="text-findr" size={32} />,
              title: "Employer Benefits",
              desc: "Reduce your organization's total health spend by auditing claims at the source before they hit your stop-loss."
            },
            {
              icon: <Network className="text-findr" size={32} />,
              title: "Advocacy Portals",
              desc: "White-labeled solutions for professional advocates and financial advisors to protect client medical assets."
            },
            {
              icon: <Zap className="text-findr" size={32} />,
              title: "Bulk Operations",
              desc: "Ingest and analyze thousands of EOBs simultaneously with 98% accuracy and real-time error flagging."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white/5 border border-white/10 rounded-[3.5rem] backdrop-blur-xl hover:bg-white/[0.08] transition-all group"
            >
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-10 border border-white/10 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-3xl font-display font-bold mb-6">{feature.title}</h3>
              <p className="text-gray-400 text-lg font-medium leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </section>

        {/* Stats Section */}
        <section className="mb-40 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="p-12 md:p-20 bg-zest rounded-[4rem] text-black">
               <h3 className="text-5xl md:text-7xl font-display font-bold mb-10 leading-[0.85] tracking-tight text-black">Precision is our <br /> Baseline.</h3>
               <div className="grid grid-cols-2 gap-6">
                  <div>
                     <p className="text-5xl font-display font-bold mb-2">98.4%</p>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Audit Accuracy</p>
                  </div>
                  <div>
                     <p className="text-5xl font-display font-bold mb-2">350k</p>
                     <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Claims Analyzed</p>
                  </div>
               </div>
            </div>
            <div className="p-12 md:p-20 bg-white/5 border border-white/10 rounded-[4rem] backdrop-blur-sm self-stretch flex flex-col justify-center">
               <p className="text-2xl text-gray-400 font-medium leading-relaxed italic mb-10">
                  "Findr Enterprise has transformed how we manage our self-funded plan. We've reclaimed millions in overcharges that used to just be accepted 'cost of doing business'."
               </p>
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full" />
                  <div>
                     <p className="font-bold text-lg">Robert Sterling</p>
                     <p className="text-xs font-black uppercase tracking-widest text-findr">VP of HR, Sterling & Co.</p>
                  </div>
               </div>
            </div>
        </section>

        {/* Contact Form Area */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-12 md:p-20 bg-white rounded-[4.5rem] text-black relative"
        >
          <Sparkles className="absolute top-12 right-12 text-zest" size={48} />
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight">Connect with Partners.</h2>
          <p className="text-gray-500 text-lg font-medium mb-16">Tell us about your organization's needs and one of our institutional leads will reach out within 4 hours.</p>
          
          <form className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-findr/10 outline-none font-medium" />
              </div>
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Organization</label>
                <input type="text" placeholder="Company Inc." className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-findr/10 outline-none font-medium" />
              </div>
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Work Email</label>
               <input type="email" placeholder="john@organization.com" className="w-full px-8 py-5 bg-gray-50 border border-gray-100 rounded-[2rem] focus:ring-4 focus:ring-findr/10 outline-none font-medium" />
            </div>
            <div className="space-y-3">
               <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 ml-4">Project Scope</label>
               <textarea rows={4} placeholder="Tell us about your volume and goals..." className="w-full px-8 py-6 bg-gray-50 border border-gray-100 rounded-[2.5rem] focus:ring-4 focus:ring-findr/10 outline-none font-medium resize-none" />
            </div>
            <button type="submit" className="w-full py-7 bg-black text-white rounded-[2.5rem] font-black uppercase tracking-[0.2em] text-lg hover:bg-findr transition-all shadow-2xl flex items-center justify-center gap-4 group">
              Submit Inquiry <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </motion.section>

        {/* Back Link */}
        <div className="mt-32 text-center pb-12">
          <Link to="/" className="inline-flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-zest hover:bg-white/10 font-bold uppercase tracking-widest text-sm transition-all group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Consumer Platform
          </Link>
        </div>
      </div>
    </div>
  );
}
