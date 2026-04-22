import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Features from './components/Features';
import FindrFridaysSection from './components/FindrFridays';
import AppDownload from './components/AppDownload';
import BillAnalysis from './components/BillAnalysis';
import HealthBlog from './components/HealthBlog';
import Dashboard from './components/Dashboard';
import ClarityAI from './components/ClarityAI';
import UploadBillModal from './components/UploadBillModal';
import HowItWorks from './pages/HowItWorks';
import FindrFridays from './pages/FindrFridays';
import HealthTips from './pages/HealthTips';
import Enterprise from './pages/Enterprise';
import FamilyWellnessDashboard from './pages/FamilyWellnessDashboard';
import { RotatingClaimCard } from './components/RotatingClaimCard';
import { PhoneMockup } from './components/PhoneMockup';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Logo as BrandLogo } from './components/Logo';
import LockedGate from './components/LockedGate';
import { Link as RouteLink } from 'react-router-dom';

function LandingSections() {
  return (
    <>
      <Features />
      <FindrFridaysSection />
      <AppDownload />
      <HealthBlog />
    </>
  );
}

function HomePage() {
  return (
    <>
      <div
        className="relative"
        style={{
          background: `
            radial-gradient(at 0% 0%, #eed9ff 0%, transparent 50%),
            radial-gradient(at 100% 0%, rgba(212, 255, 89, 0.4) 0%, transparent 50%),
            radial-gradient(at 100% 100%, #DBEAFE 0%, transparent 50%),
            radial-gradient(at 0% 100%, #EFF6FF 0%, transparent 50%)
          `,
          backgroundColor: '#FBFBFE'
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <section className="relative pt-32 pb-24 overflow-hidden border-b border-white/20 z-10">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-black mb-10 shadow-sm lg:mt-12"
                >
                  <Sparkles size={14} className="animate-spin-slow text-findr" /> AI-Powered Health Guardian
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-[3.2rem] md:text-[5.1rem] xl:text-[6.4rem] font-display font-bold tracking-tight leading-[0.85] mb-10"
                >
                  <span className="block whitespace-nowrap">Health bills</span>
                  <span className="text-findr relative block">
                    simplified.
                    <svg className="absolute -bottom-2 left-0 w-full h-3 text-zest/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                      <path d="M0 5 Q 25 0, 50 5 T 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                    </svg>
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl md:text-2xl text-gray-500 font-medium mb-12 max-w-xl lg:mx-0 mx-auto leading-relaxed"
                >
                  Stop overpaying for healthcare. Findr analyzes your claims to flag errors and unlock savings for your family.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
                >
                  <button
                    onClick={() => window.dispatchEvent(new CustomEvent('open-upload'))}
                    className="group w-full sm:w-auto px-12 py-6 bg-black text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-cobalt transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                  >
                    <span className="relative z-10">Start here</span>
                    <ArrowRight size={24} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    <div className="absolute inset-0 bg-findr opacity-0 group-hover:opacity-20 transition-opacity" />
                  </button>
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map(i => (
                        <img
                          key={i}
                          src={`https://images.unsplash.com/photo-${i === 1 ? '1534528741775-53994a69daeb' : i === 2 ? '1506794778202-cad84cf45f1d' : '1507003211169-0a1dd7228f2d'}?w=100&h=100&fit=crop`}
                          className="w-12 h-12 rounded-full border-4 border-white shadow-lg object-cover"
                          referrerPolicy="no-referrer"
                        />
                      ))}
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Trusted By</p>
                      <p className="text-sm font-bold text-black">15,000+ Caregivers</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ delay: 0.5, type: "spring", damping: 15 }}
                className="flex-1 relative"
              >
                <RotatingClaimCard />
              </motion.div>
            </div>
          </div>
        </section>

        <BillAnalysis />
      </div>

      <LandingSections />
    </>
  );
}

function AuthenticatedHome() {
  return (
    <>
      <Dashboard />
      <div
        className="relative"
        style={{
          background: `
            radial-gradient(at 0% 0%, #eed9ff 0%, transparent 50%),
            radial-gradient(at 100% 0%, rgba(212, 255, 89, 0.4) 0%, transparent 50%),
            radial-gradient(at 100% 100%, #DBEAFE 0%, transparent 50%),
            radial-gradient(at 0% 100%, #EFF6FF 0%, transparent 50%)
          `,
          backgroundColor: '#FBFBFE'
        }}
      >
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0"
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <BillAnalysis />
      </div>
      <LandingSections />
    </>
  );
}

export default function App() {
  const [user, setUser] = useState(auth.currentUser);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => authUnsubscribe();
  }, []);

  useEffect(() => {
    const handleOpenUpload = () => setIsUploadOpen(true);
    window.addEventListener('open-upload', handleOpenUpload);
    return () => window.removeEventListener('open-upload', handleOpenUpload);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <LockedGate>
      <div className={`min-h-screen transition-colors duration-500 ${location.pathname === '/enterprise' ? 'bg-black' : 'bg-[#FBFBFE]'} text-black font-sans selection:bg-findr/30 selection:text-black`}>
        <Navbar onUploadClick={() => setIsUploadOpen(true)} />
        <ClarityAI />
        <UploadBillModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />

        <main>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={user ? <AuthenticatedHome /> : <HomePage />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/dashboard/family-wellness" element={<FamilyWellnessDashboard />} />
            <Route path="/findr-fridays" element={<FindrFridays />} />
            <Route path="/health-tips" element={<HealthTips />} />
            <Route path="/enterprise" element={<Enterprise />} />
          </Routes>
        </main>

        <footer className="pt-32 pb-16 bg-black text-white rounded-t-[2rem] md:rounded-t-[5rem]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-20 mb-32">
              <div className="md:col-span-2">
                <div className="flex items-center gap-4 mb-10">
                  <BrandLogo className="h-16 w-auto" color="white" />
                </div>
                <p className="text-gray-500 max-w-sm font-medium text-lg leading-relaxed mb-12">
                  The world's first tech-forward health billing advocate for families. Built by caregivers, for caregivers.
                </p>
                <div className="flex gap-4 mb-8">
                  {['X', 'Instagram', 'LinkedIn'].map(social => (
                    <button key={social} className="px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                      {social}
                    </button>
                  ))}
                </div>
                <div className="flex flex-wrap gap-3">
                  <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                      alt="Download on the App Store"
                      className="h-10 w-auto"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                  <a href="#" className="transition-transform hover:scale-105 active:scale-95">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                      alt="Get it on Google Play"
                      className="h-10 w-auto"
                      referrerPolicy="no-referrer"
                    />
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-zest font-display font-bold text-xl mb-8">Platform</h4>
                <ul className="space-y-4 text-gray-400 font-bold text-sm uppercase tracking-widest">
                  <li><RouteLink to="/" className="hover:text-white transition-colors">Home</RouteLink></li>
                  <li><RouteLink to="/how-it-works" className="hover:text-white transition-colors">How it Works</RouteLink></li>
                  <li><RouteLink to="/findr-fridays" className="hover:text-white transition-colors">Findr Fridays</RouteLink></li>
                  <li><RouteLink to="/health-tips" className="hover:text-white transition-colors">Health Tips</RouteLink></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-findr font-display font-bold text-xl mb-8">Legal</h4>
                <ul className="space-y-4 text-gray-400 font-bold text-sm uppercase tracking-widest">
                  <li><a href="#" className="hover:text-white transition-colors">HIPAA Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Data Rights</a></li>
                </ul>
              </div>
            </div>

            {location.pathname !== '/enterprise' && (
              <div className="mb-20">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-8 md:p-12 bg-white/5 border border-white/10 rounded-[3rem] backdrop-blur-sm hover:bg-white/[0.08] transition-colors group">
                  <div className="text-center md:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-zest rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
                      <Sparkles size={12} /> Institutional Access
                    </div>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mb-3">Enterprise & Professional Partners.</h3>
                    <p className="text-gray-500 font-medium text-lg">Scale your health advocacy impact with our institutional-grade audit engine.</p>
                  </div>
                  <RouteLink
                    to="/enterprise"
                    className="whitespace-nowrap px-10 py-6 bg-zest text-black rounded-full font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-zest/20"
                  >
                    Click Here to Connect <ArrowRight size={20} />
                  </RouteLink>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row items-center justify-between pt-16 border-t border-white/10 gap-8">
              <p className="text-gray-600 text-xs font-bold uppercase tracking-widest">© 2026 Findr Health Inc. All Rights Reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </LockedGate>
  );
}
