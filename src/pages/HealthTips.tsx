import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Clock, BookOpen, Share2, Heart, Search } from 'lucide-react';

export default function HealthTips() {
  const posts = [
    {
      title: "The hidden 'Triage' tax you're likely paying.",
      excerpt: "Why some insurance companies deny valid claims during the intake process and how to fight it.",
      content: "Insurance companies often use 'triage' as a gatekeeping method. By flagging complex claims for manual review, they delay payment and hope you'll forget to follow up. This article explores strategies to skip the line and get your claims processed faster...",
      category: "Billing Secrets",
      readTime: "4 min",
      author: "Dr. Sarah Chen",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Why your HMO might be denying valid lab work.",
      excerpt: "Decoding the fine print of your healthcare plan to avoid out-of-pocket lab surprises.",
      content: "Many HMO plans have restrictive lists of preferred laboratories. If your sample is sent elsewhere, even by accident, you could be on the hook for the full cost. Learn how to verify lab status before you provide a sample...",
      category: "Insurance Guard",
      readTime: "6 min",
      author: "Mark Evans, Billing Advocate",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Negotiation scripts for out-of-network labs.",
      excerpt: "Practical, battle-tested messages you can send to healthcare providers for instant discounts.",
      content: "When you receive a massive out-of-network bill, don't pay it immediately. Most labs have hidden 'cash pay' discounts that are significantly lower than the insurance rate. Use these specific email templates to start the conversation...",
      category: "Savings Guide",
      readTime: "5 min",
      author: "Linda J. Wu",
      image: "https://images.unsplash.com/photo-1454165833767-131438967469?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Understanding 'Upcoding' and why it costs you.",
      excerpt: "The most common billing error that results in patients overpaying for routine visits.",
      content: "Upcoding occurs when a provider uses a code for a more complex service than what was actually performed. For example, a 15-minute consultation billed as a 45-minute critical care visit. We show you how to read your EOB...",
      category: "Billing Secrets",
      readTime: "7 min",
      author: "Dr. Sarah Chen",
      image: "https://images.unsplash.com/photo-1586770116050-eaef128d5854?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Prescription discount cards vs. Insurance.",
      excerpt: "When to put your insurance card away and use a dedicated savings app instead.",
      content: "It's a dirty secret of the pharmacy world: sometimes the 'cash' price or a third-party discount card is cheaper than your insurance copay. We've mapped out the retailers where this is most likely to happen...",
      category: "Savings Guide",
      readTime: "4 min",
      author: "James Peterson",
      image: "https://images.unsplash.com/photo-1471864190281-a93a307246de?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "Navigating Pediatric Emergency Bills.",
      excerpt: "Special considerations for parents dealing with ER visits and unexpected child specialists.",
      content: "Children's hospitals often have unique billing arrangements. When specialists are brought in for a second opinion, they are frequently separate entities from the hospital itself. This is where surprise bills hide...",
      category: "Family Care",
      readTime: "8 min",
      author: "Mark Evans, Billing Advocate",
      image: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <div className="pt-40 pb-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-6">
        <header className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border border-gray-100 shadow-sm rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Sparkles size={14} className="text-findr" /> Knowledge Hub
            </motion.div>
            <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tight leading-[0.85] mb-8">
              Healthy <br />
              <span className="text-cobalt italic">Hub.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-500 font-medium leading-relaxed">
              Expert insights on medical billing, insurance traps, and family health finance. Curated by billing advocates who know the system.
            </p>
          </div>
          <div className="relative w-full md:w-80 group">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-findr transition-colors" size={20} />
             <input 
               type="text" 
               placeholder="Search articles..."
               className="w-full pl-16 pr-6 py-5 bg-gray-50 border border-gray-100 rounded-3xl focus:outline-none focus:ring-4 focus:ring-findr/10 font-medium transition-all"
             />
          </div>
        </header>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {posts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/5] rounded-[4rem] overflow-hidden mb-8 bg-gray-50 border border-gray-100 shadow-xl shadow-black/[0.02]">
                 <img 
                   src={post.image} 
                   alt={post.title} 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute top-8 left-8">
                    <div className="px-5 py-2 bg-white text-black rounded-full text-[10px] font-black uppercase tracking-widest shadow-2xl">
                       {post.category}
                    </div>
                 </div>
                 <div className="absolute bottom-8 right-8 w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity">
                    <Share2 size={20} className="text-black" />
                 </div>
              </div>
              
              <div className="px-6 flex-1 flex flex-col">
                 <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400">
                       <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime}</span>
                       <span className="w-1 h-1 bg-gray-200 rounded-full" />
                       <span className="flex items-center gap-1.5"><BookOpen size={12} /> 1.2k Reads</span>
                    </div>
                    <Heart size={18} className="text-gray-200 hover:text-red-500 hover:fill-red-500 transition-colors" />
                 </div>
                 <h3 className="text-3xl font-display font-bold text-black leading-tight mb-4 group-hover:text-findr transition-colors tracking-tight">{post.title}</h3>
                 <p className="text-gray-500 font-medium text-lg leading-relaxed mb-8 line-clamp-3 italic">{post.excerpt}</p>
                 
                 <div className="mt-auto pt-8 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                       <div className="w-8 h-8 rounded-full bg-lavender/30 flex items-center justify-center text-cobalt font-black text-[10px]">
                          {post.author.split(' ').map(n => n[0]).join('')}
                       </div>
                       <span className="text-xs font-bold text-gray-400">{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-widest text-black group-hover:text-findr transition-all">
                       Read More <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                 </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Sub Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-40 p-16 md:p-24 bg-zest rounded-[5rem] text-black relative flex flex-col md:flex-row items-center justify-between gap-12 overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-white opacity-10 blur-3xl -translate-x-32 -translate-y-32" />
          <div className="flex-1 max-w-xl text-center md:text-left">
             <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight leading-[0.9] mb-6">Stay informed. Stay saving.</h2>
             <p className="text-lg font-medium opacity-70">Get weekly billing scripts and hidden health tips delivered straight to your inbox. No spam, just value.</p>
          </div>
          <div className="flex-1 w-full max-w-md">
             <div className="flex flex-col sm:flex-row gap-4">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="flex-1 px-8 py-5 bg-white border border-black/5 rounded-[2rem] focus:outline-none focus:ring-4 focus:ring-black/5 font-medium transition-all shadow-sm"
                />
                <button className="px-10 py-5 bg-black text-white rounded-[2rem] font-black shadow-xl hover:scale-105 active:scale-95 transition-all">
                   Join List
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
