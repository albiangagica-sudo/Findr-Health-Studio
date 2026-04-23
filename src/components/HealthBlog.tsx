import { motion } from 'motion/react';
import { ArrowRight, Clock, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HealthBlog() {
  const posts = [
    {
      title: "Your hospital bill is negotiable. Here's the script.",
      excerpt: "Most patients don't know they can call billing and ask for a prompt-pay discount. Here's exactly what to say to save 20-40%.",
      category: "Billing Secrets",
      readTime: "4 min",
      image: "https://images.unsplash.com/photo-1554224155-1696413565d3?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "That 'facility fee'? You shouldn't have to pay it.",
      excerpt: "If your doctor's office is owned by a hospital, you're paying hundreds extra just for walking in the door. Here's how to fight back.",
      category: "Hidden Charges",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "5 words that cut any medical bill by 30%",
      excerpt: "'What is your prompt-pay discount?' These five words have saved Findr users thousands. Here's why they work every time.",
      category: "Savings Playbook",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1454165833767-131438967469?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="blog" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
             <motion.div 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="inline-flex items-center gap-2 px-3 py-1 bg-lavender/20 text-lavender-dark rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
             >
               <Sparkles size={14} /> Insider Knowledge
             </motion.div>
             <h2 className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-[0.9]">
                The insider <br />
                <span className="text-cobalt italic">playbook.</span>
             </h2>
             <p className="text-xl text-gray-500 font-medium mt-8 max-w-md leading-relaxed">
                No wellness tips. No lifestyle advice. Just the billing secrets the healthcare system doesn't want you to know.
             </p>
          </div>
          <Link to="/health-tips" className="flex items-center gap-3 text-sm font-black uppercase tracking-widest hover:gap-6 transition-all group">
             View All Articles <ArrowRight size={20} className="group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, idx) => (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group cursor-pointer"
            >
              <div className="relative aspect-[4/5] rounded-[3.5rem] overflow-hidden mb-8 bg-gray-50 border border-gray-100 shadow-xl shadow-black/[0.02]">
                 <img 
                   src={post.image} 
                   alt="" 
                   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                   referrerPolicy="no-referrer"
                 />
                 <div className="absolute top-6 left-6 px-5 py-2 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-black">
                    {post.category}
                 </div>
              </div>
              
              <div className="px-2">
                 <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">
                    <span className="flex items-center gap-1.5"><Clock size={12} /> {post.readTime} Read</span>
                 </div>
                 <h3 className="text-3xl font-display font-bold text-black leading-tight mb-4 group-hover:text-findr transition-colors tracking-tight">{post.title}</h3>
                 <p className="text-gray-500 font-medium text-base leading-relaxed mb-8 line-clamp-2">{post.excerpt}</p>
                 <div className="flex items-center gap-3 font-black text-xs uppercase tracking-[0.2em] group-hover:text-cobalt transition-colors">
                    Dive In <ArrowRight size={16} />
                 </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
