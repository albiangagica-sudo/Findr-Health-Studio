import { motion } from 'motion/react';
import { 
  Activity, 
  TrendingDown, 
  Calendar, 
  ShieldCheck, 
  Plus, 
  ArrowRight, 
  Users, 
  Heart, 
  Clock,
  Sparkles,
  Zap,
  ChevronRight,
  TrendingUp,
  FileText
} from 'lucide-react';
import { auth } from '../lib/firebase';

export default function FamilyWellnessDashboard() {
  const familyMembers = [
    { name: 'Self', role: 'Primary', status: 'Healthy', color: 'bg-findr' },
    { name: 'Sarah', role: 'Spouse', status: 'Active Claim', color: 'bg-zest' },
    { name: 'Leo', role: 'Child', status: 'Healthy', color: 'bg-cobalt' },
    { name: 'Emma', role: 'Child', status: 'Checkup Due', color: 'bg-lavender' },
  ];

  const recentEvents = [
    { type: 'Savings', title: 'Dental Claim Audit', amount: '$120.00', date: '2 hours ago', icon: <TrendingDown size={14} /> },
    { type: 'Appointment', title: 'Pediatric Checkup - Leo', status: 'Confirmed', date: 'Tomorrow, 10:00 AM', icon: <Calendar size={14} /> },
    { type: 'Analysis', title: 'HMO Policy Review', status: 'Complete', date: 'Yesterday', icon: <Sparkles size={14} /> },
  ];

  return (
    <div className="pt-32 pb-24 bg-[#FBFBFE] min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border border-gray-100 shadow-sm rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Activity size={14} className="text-findr" /> Health Guardian Active
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-display font-bold text-black tracking-tight leading-[0.85] mb-4">
              Family <br />
              <span className="text-findr italic">Wellness.</span>
            </h1>
            <p className="text-xl text-gray-500 font-medium max-w-xl">
              Centralized intelligence for your family's recovery history and financial health.
            </p>
          </div>
          
          <div className="flex -space-x-4">
            {familyMembers.map((member, i) => (
              <div 
                key={i}
                className={`w-16 h-16 rounded-full border-4 border-[#FBFBFE] shadow-xl flex items-center justify-center text-white font-black text-xl ${member.color}`}
                title={`${member.name} (${member.role})`}
              >
                {member.name[0]}
              </div>
            ))}
            <button className="w-16 h-16 rounded-full border-4 border-dashed border-gray-200 flex items-center justify-center text-gray-400 hover:border-findr hover:text-findr transition-all group">
              <Plus size={24} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Dashboard Panel */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Spend Reduction Chart Area */}
            <div className="p-10 bg-black rounded-[3.5rem] text-white relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-80 h-80 bg-findr/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3" />
               
               <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-8">
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/10">
                        <TrendingDown className="text-findr" size={20} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-findr">Real-time Spend reduction</span>
                    </div>
                    <h2 className="text-5xl font-display font-bold mb-4 tracking-tighter">$4,280 <span className="text-xl font-medium text-gray-500 tracking-normal opacity-60">Total Saved</span></h2>
                    <p className="text-gray-400 font-medium leading-relaxed max-w-md">
                      Your medical spend has decreased by <span className="text-zest">24%</span> compared to last year through systematic auditing.
                    </p>
                  </div>
                  
                  <div className="flex flex-col justify-between shrink-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between gap-8 py-3 border-b border-white/10">
                         <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Efficiency</span>
                         <span className="text-zest font-black">98.2%</span>
                      </div>
                      <div className="flex items-center justify-between gap-8 py-3 border-b border-white/10">
                         <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Active Claims</span>
                         <span className="text-white font-black">12</span>
                      </div>
                    </div>
                    
                    <button className="mt-12 flex items-center gap-3 text-xs font-black uppercase tracking-widest text-findr group/btn">
                       Detailed Analysis <ArrowRight size={16} className="group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
               </div>
            </div>

            {/* Health Timeline */}
            <div className="p-12 bg-white rounded-[3.5rem] border border-gray-100 shadow-xl shadow-black/[0.02]">
              <div className="flex items-center justify-between mb-12">
                 <h3 className="text-3xl font-display font-bold tracking-tight">Recovery Timeline</h3>
                 <div className="flex gap-2">
                    {['1M', '3M', '6M', '1Y'].map(t => (
                      <button key={t} className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${t === '3M' ? 'bg-black text-white' : 'bg-gray-50 text-gray-400 hover:text-black'}`}>
                        {t}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="relative space-y-12 pl-10 border-l border-gray-50">
                 {[
                   { user: 'S', title: 'Post-Op Recovery Phase 2', date: 'Oct 15 - Oct 28', status: 'Tracked', sub: 'Physical Therapy sequence started', color: 'bg-findr' },
                   { user: 'L', title: 'Annual Wellness Screen', date: 'Oct 22', status: 'Validated', sub: 'Baseline vitals synced from clinic', color: 'bg-cobalt' },
                   { user: 'E', title: 'Immunization Update', date: 'Nov 05', status: 'Scheduled', sub: 'Pending provider confirmation', color: 'bg-lavender' },
                 ].map((item, i) => (
                   <motion.div 
                    key={i}
                    whileHover={{ x: 10 }}
                    className="relative group cursor-pointer"
                   >
                     <div className={`absolute -left-[54px] top-0 w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white font-black text-[10px] ring-4 ring-white shadow-lg`}>
                        {item.user}
                     </div>
                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                           <div className="flex items-center gap-3 mb-1">
                              <h4 className="text-xl font-display font-bold group-hover:text-findr transition-colors">{item.title}</h4>
                              <span className="px-2 py-0.5 bg-gray-50 text-gray-400 rounded-md text-[8px] font-black uppercase tracking-widest">{item.status}</span>
                           </div>
                           <p className="text-sm font-medium text-gray-500">{item.sub}</p>
                        </div>
                        <div className="text-right">
                           <p className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.date}</p>
                        </div>
                     </div>
                   </motion.div>
                 ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Care Planning & Intelligence */}
          <aside className="space-y-8">
             <div className="p-10 bg-zest rounded-[3rem] text-black shadow-xl shadow-zest/10 relative overflow-hidden group">
                <div className="absolute bottom-0 right-0 p-8 opacity-10 transform scale-125 group-hover:rotate-12 transition-transform">
                  <Sparkles size={120} />
                </div>
                <div className="relative z-10">
                   <h3 className="text-2xl font-display font-bold mb-4 leading-tight italic">AI Guardian <br />Insights.</h3>
                   <div className="space-y-4">
                      <div className="p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/20">
                         <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-2">Claim Alert</p>
                         <p className="text-xs font-bold leading-relaxed">Suspected upcoding on Sarah's specialist visit last Tuesday. Audit recommended.</p>
                      </div>
                      <div className="p-4 bg-black text-white rounded-2xl shadow-xl">
                         <div className="flex items-center gap-2 mb-2 text-findr">
                            <Plus size={14} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Savings Tip</span>
                         </div>
                         <p className="text-xs font-medium leading-relaxed opacity-80">Switch to Mail-Order pharmacy for 3 medications to save an extra $45/mo.</p>
                      </div>
                   </div>
                </div>
             </div>

             <div className="p-10 bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-black/[0.02]">
                <div className="flex items-center justify-between mb-10">
                   <h3 className="text-xl font-display font-bold">Intelligence Feed</h3>
                   <Clock size={16} className="text-gray-300" />
                </div>
                
                <div className="space-y-8">
                   {recentEvents.map((event, i) => (
                     <div key={i} className="flex gap-4 group cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-findr group-hover:text-white transition-all shrink-0">
                           {event.icon}
                        </div>
                        <div className="flex-1">
                           <div className="flex items-center justify-between gap-2 mb-1">
                              <h4 className="text-sm font-bold truncate pr-2">{event.title}</h4>
                              <p className="text-[9px] font-black text-findr uppercase">{event.amount || event.status}</p>
                           </div>
                           <p className="text-[10px] text-gray-400 font-medium">{event.date}</p>
                        </div>
                     </div>
                   ))}
                </div>

                <div className="mt-12">
                   <button className="w-full py-5 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-findr transition-all flex items-center justify-center gap-3 active:scale-95">
                      Sync Devices <Zap size={14} fill="currentColor" />
                   </button>
                </div>
             </div>

             <div className="p-10 bg-lavender rounded-[3rem] text-cobalt flex flex-col justify-between min-h-[280px] shadow-xl shadow-lavender/40 border border-cobalt/5">
                <div>
                   <h3 className="text-2xl font-display font-bold mb-4 tracking-tight leading-none italic">Documents & <br />Legal.</h3>
                   <div className="space-y-3">
                      <div className="flex items-center gap-3 text-xs font-bold opacity-70 hover:opacity-100 cursor-pointer">
                         <FileText size={14} /> Power of Attorney
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold opacity-70 hover:opacity-100 cursor-pointer">
                         <FileText size={14} /> Living Will (Active)
                      </div>
                      <div className="flex items-center gap-3 text-xs font-bold opacity-70 hover:opacity-100 cursor-pointer">
                         <FileText size={14} /> Insurance ID Cards
                      </div>
                   </div>
                </div>
                <button className="w-full py-4 bg-white text-cobalt text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg hover:shadow-xl transition-all">
                   Manage Vault
                </button>
             </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
