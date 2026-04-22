import { motion } from 'motion/react';
import { Gift, MapPin, Star, ArrowRight, Sparkles, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
const familyYoga = 'https://res.cloudinary.com/dxtisv39w/image/upload/family_yoga_kdos63.jpg';
const mealKit = 'https://res.cloudinary.com/dxtisv39w/image/upload/Meal_kit_djirru.jpg';
const vet = 'https://res.cloudinary.com/dxtisv39w/image/upload/Vet_pzkzrm.jpg';

export default function FindrFridays() {
  const deals = [
    {
      title: "Family Yoga Session",
      merchant: "Serene Studio",
      discount: "50% OFF",
      type: "Wellness",
      image: familyYoga
    },
    {
      title: "Organic Meal Kit",
      merchant: "Green Basket",
      discount: "$25 Credit",
      type: "Nutrition",
      image: mealKit
    },
    {
      title: "Local Vet Care",
      merchant: "Paws & Care",
      discount: "Free First Visit",
      type: "Pets",
      image: vet
    }
  ];

  return (
    <section id="fridays" className="py-32 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-white text-black border border-gray-100 shadow-sm rounded-full text-[10px] font-black uppercase tracking-widest mb-6"
            >
              <Gift size={14} className="text-findr" /> Rewards Program
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-8xl font-display font-bold text-black tracking-tight leading-[0.85]"
            >
              Findr <span className="text-findr">Fridays.</span>
            </motion.h2>
          </div>
          <Link to="/findr-fridays" className="flex items-center gap-4 text-sm font-black uppercase tracking-widest bg-black text-white px-10 py-5 rounded-2xl shadow-xl hover:bg-cobalt transition-all group active:scale-95 text-center">
            Explore Deals <ArrowRight size={20} className="group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {deals.map((deal, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[3rem] mb-8 bg-gray-50 border border-gray-100">
                <img src={deal.image} alt={deal.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute top-6 left-6">
                  <span className="px-5 py-2 bg-white text-black text-xs font-black rounded-full shadow-2xl">{deal.discount}</span>
                </div>
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button className="px-10 py-4 bg-white text-black font-black rounded-2xl shadow-2xl active:scale-90 transition-transform">Claim Access</button>
                </div>
              </div>
              <div className="px-4">
                <div className="flex items-center gap-2 text-[10px] font-black text-findr uppercase tracking-widest mb-2">
                  <MapPin size={12} /> {deal.merchant}
                </div>
                <h3 className="text-2xl font-display font-bold text-black leading-tight mb-4">{deal.title}</h3>
                <div className="flex items-center gap-2">
                  <div className="flex text-amber-500">
                    {[1,2,3,4,5].map(i => <Star key={i} size={12} className="fill-current" />)}
                  </div>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Verified Win</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-16 bg-[#FBFBFE] rounded-[4rem] border border-gray-100 relative overflow-hidden group"
        >
          <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-5 transition-opacity">
            <Sparkles size={160} />
          </div>
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-zest rounded-[2rem] flex items-center justify-center text-black mb-10 shadow-xl">
              <Trophy size={36} />
            </div>
            <h4 className="text-3xl md:text-5xl font-display font-bold mb-6 tracking-tight md:whitespace-nowrap max-w-[280px] md:max-w-none mx-auto">Better savings, better rewards.</h4>
            <p className="text-gray-500 font-medium text-lg leading-relaxed mb-12 italic max-w-[320px] md:max-w-xl mx-auto">"I saved $450 on my dental surgery last month. Findr Fridays just treated us to a full family organic meal kit."</p>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="flex -space-x-4">
                {[1,2,3,4].map(i => (
                  <img key={i} src={"https://picsum.photos/seed/person-" + (i + 10) + "/100"} className="w-12 h-12 rounded-full border-4 border-[#FBFBFE] shadow-lg" referrerPolicy="no-referrer" />
                ))}
              </div>
              <button className="px-8 py-4 bg-findr text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-findr/20 hover:bg-black transition-all active:scale-95 leading-tight w-[250px]">
                Join 15,240 families <br />
                <span className="text-[9px] opacity-70">Saving & Winning Together</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
