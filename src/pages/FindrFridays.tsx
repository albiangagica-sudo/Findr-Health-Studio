import { motion } from 'motion/react';
import { Gift, MapPin, Star, ArrowRight, Sparkles, Zap, ShoppingCart, Calendar, Heart } from 'lucide-react';

export default function FindrFridaysPage() {
  const deals = [
    {
      title: "Family Yoga Session",
      merchant: "Serene Studio",
      discount: "50% OFF",
      type: "Wellness",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
      description: "A private 60-minute session for up to 5 family members, focused on connection and calm."
    },
    {
      title: "Organic Meal Kit",
      merchant: "Green Basket",
      discount: "$25 Credit",
      type: "Nutrition",
      image: "https://images.unsplash.com/photo-1543353071-873f17a7a088?auto=format&fit=crop&q=80&w=800",
      description: "Farm-to-table organic ingredients delivered to your door with kid-friendly recipes."
    },
    {
      title: "Local Vet Care",
      merchant: "Paws & Care",
      discount: "Free First Visit",
      type: "Pets",
      image: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&q=80&w=800",
      description: "Full health assessment for your furry companion at any local Paws & Care affiliate."
    },
    {
      title: "Sleep Therapy Kit",
      merchant: "Lulla-Home",
      discount: "20% OFF",
      type: "Rest",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=800",
      description: "Eco-friendly weighted blankets and white noise machines for better family rest."
    },
    {
      title: "Kids Dental Checkup",
      merchant: "Bright Smiles",
      discount: "Free X-Rays",
      type: "Medical",
      image: "https://images.unsplash.com/photo-1534353436294-0dbd4bdac845?auto=format&fit=crop&q=80&w=800",
      description: "Preventative dental care package for children under 12, including flouride treatment."
    },
    {
      title: "Mental Wellness App",
      merchant: "MindfulCare",
      discount: "3 Months Free",
      type: "Mental Health",
      image: "https://images.unsplash.com/photo-1512428559083-a40ea9013be0?auto=format&fit=crop&q=80&w=800",
      description: "Premium access to guided meditation and tele-health counseling for parents."
    }
  ];

  return (
    <div className="pt-40 pb-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <header className="mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border border-gray-100 shadow-sm rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
          >
            <Gift size={14} className="text-findr" /> Rewards Program
          </motion.div>
          <h1 className="text-6xl md:text-9xl font-display font-bold text-black tracking-tight leading-[0.85] mb-8">
            Findr <span className="text-findr">Fridays.</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 font-medium max-w-2xl leading-relaxed">
            Every Friday, we drop local wellness deals and health spend rewards for our most active savers. Saving money on bills should feel like winning.
          </p>
        </header>

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-4 mb-20">
           {['All Deals', 'Wellness', 'Nutrition', 'Pets', 'Medical', 'Mental Health'].map((cat, i) => (
             <button 
               key={cat}
               className={i === 0 
                 ? "px-8 py-3 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest shadow-lg"
                 : "px-8 py-3 bg-gray-50 text-gray-400 hover:text-black hover:bg-white border border-gray-100 rounded-full text-xs font-black uppercase tracking-widest transition-all"}
             >
               {cat}
             </button>
           ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {deals.map((deal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[4rem] mb-8 bg-gray-50 border border-gray-100 shadow-xl shadow-black/[0.02]">
                <img 
                  src={deal.image} 
                  alt={deal.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-8 left-8">
                  <span className="px-6 py-3 bg-white text-black text-[10px] font-black rounded-full shadow-2xl uppercase tracking-widest">
                    {deal.discount}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-8 text-center">
                  <p className="text-white/80 font-medium mb-8 text-lg">{deal.description}</p>
                  <button className="px-12 py-5 bg-white text-black font-black rounded-[2rem] shadow-2xl active:scale-95 transition-transform flex items-center gap-3">
                    Claim Access <ArrowRight size={20} />
                  </button>
                </div>
              </div>
              
              <div className="px-6">
                <div className="flex items-center gap-3 text-[10px] font-black text-findr uppercase tracking-widest mb-3">
                   <div className="w-8 h-8 rounded-lg bg-findr-light flex items-center justify-center">
                      <MapPin size={14} />
                   </div>
                   {deal.merchant}
                </div>
                <h3 className="text-3xl font-display font-bold text-black leading-tight mb-4">{deal.title}</h3>
                <div className="flex items-center gap-3">
                   <div className="flex text-amber-500">
                      {[1,2,3,4,5].map(i => <Star key={i} size={14} className="fill-current" />)}
                   </div>
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Community Favorite</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featurettes */}
        <section className="mt-40 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="p-16 bg-black rounded-[4rem] text-white flex flex-col justify-between min-h-[500px] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-zest opacity-10 blur-[100px]" />
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20 mb-10">
                 <ShoppingCart size={32} />
              </div>
              <div>
                 <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-none">Weekly Spends. <br />Monthly Rewards.</h3>
                 <p className="text-gray-400 text-lg font-medium leading-relaxed">The more you audit, the more points you earn. Use points to unlock premium wellness experiences for your whole family.</p>
              </div>
           </div>
           <div className="p-16 bg-findr rounded-[4rem] text-white flex flex-col justify-between min-h-[500px] overflow-hidden relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 blur-[100px]" />
              <div className="w-16 h-16 bg-white/10 rounded-3xl flex items-center justify-center border border-white/20 mb-10">
                 <Calendar size={32} />
              </div>
              <div>
                 <h3 className="text-4xl md:text-5xl font-display font-bold mb-6 tracking-tight leading-none">Don't Miss <br />A Single Drop.</h3>
                 <p className="text-white/70 text-lg font-medium leading-relaxed">Sign up for Friday alerts and get notified precisely at 10 AM EST when our network partners release their limited claims.</p>
              </div>
           </div>
        </section>

        {/* Testimonial Expanded */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-40 p-16 md:p-32 bg-[#FBFBFE] rounded-[5rem] border border-gray-100 relative overflow-hidden group text-center"
        >
          <div className="max-w-3xl mx-auto">
             <div className="w-24 h-24 bg-zest rounded-[2.5rem] flex items-center justify-center text-black mb-12 shadow-xl rotate-3 mx-auto">
                <Sparkles size={48} />
             </div>
             <h4 className="text-5xl md:text-7xl font-display font-bold mb-10 tracking-tight leading-[0.9]">Saving & Winning.</h4>
             <p className="text-gray-500 font-medium text-2xl leading-relaxed mb-16 italic font-display">"We've reclaimed $17,200 this year. To celebrate, Findr Health treated us to a family retreat. This is healthcare done right."</p>
             
             <div className="flex flex-col items-center gap-10">
                <div className="flex -space-x-6">
                  {[1,2,3,4,5].map(i => (
                    <img 
                      key={i} 
                      src={`https://picsum.photos/seed/person-${i + 60}/100`} 
                      className="w-20 h-20 rounded-full border-8 border-[#FBFBFE] shadow-2xl transition-transform hover:-translate-y-2" 
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <button className="px-12 py-6 bg-findr text-white rounded-[2rem] font-black text-xl shadow-2xl shadow-findr/20 hover:bg-black transition-all active:scale-95 group">
                   <div className="flex flex-col items-center">
                      <span>Join 15,240 families</span>
                      <span className="text-xs uppercase tracking-[0.3em] opacity-80 mt-2 group-hover:tracking-[0.4em] transition-all">Saving & Winning Together</span>
                   </div>
                </button>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
