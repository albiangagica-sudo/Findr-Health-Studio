import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { LogIn, LogOut, User, Menu, X, Zap, Gift, BookOpen, Crown, Home, Upload, Mail, FileText, Lock, ShieldCheck, Activity } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

const LogoComponent = ({ onClick }: { onClick?: () => void }) => (
  <Link to="/" onClick={onClick} className="flex items-center group relative shrink-0" title="Findr Health">
    <Logo className="h-9 md:h-12 w-auto transition-transform group-hover:scale-105 active:scale-95 duration-200" />
  </Link>
);

const NavLink = ({ to, children, icon: Icon, mobile = false, active, onClick }: { to: string, children: React.ReactNode, icon?: any, mobile?: boolean, active?: boolean, onClick?: () => void }) => {
  const baseClasses = mobile ? "text-base font-bold py-4 transition-colors uppercase tracking-tight flex items-center gap-4 px-5 rounded-2xl hover:bg-gray-50" : "text-xs font-black uppercase tracking-widest transition-all relative group flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-white hover:shadow-sm";
  const activeClasses = mobile ? "text-findr bg-findr-light/50" : "text-findr bg-white shadow-sm";
  const inactiveClasses = "text-black/60 hover:text-black hover:bg-white";
  return (
    <Link to={to} onClick={onClick} className={cn(baseClasses, active ? activeClasses : inactiveClasses)}>
      {Icon && <Icon size={mobile ? 24 : 14} className={cn(active ? "text-findr" : "text-gray-400 group-hover:text-black")} />}
      <span>{children}</span>
      {!mobile && active && (
        <motion.span layoutId="nav-pill" className="absolute inset-0 bg-white -z-10 rounded-xl shadow-sm border border-gray-100" transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }} />
      )}
    </Link>
  );
};

export default function Navbar({ onUploadClick }: { onUploadClick?: () => void }) {
  const [user, setUser] = useState(auth.currentUser);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (isMenuOpen) { document.body.style.overflow = 'hidden'; } else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => authUnsubscribe();
  }, []);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  const MobileLegalLink = ({ children, icon: Icon, onClick }: { children: React.ReactNode, icon: any, onClick?: () => void }) => (
    <a href="#" onClick={(e) => { e.preventDefault(); onClick?.(); setIsMenuOpen(false); }} className="text-sm font-bold py-3 px-4 text-black/60 hover:text-black transition-colors uppercase tracking-tight flex items-center gap-3 rounded-xl hover:bg-gray-100">
      <Icon size={18} className="text-gray-400" />
      <span>{children}</span>
    </a>
  );

  return (
    <nav className="fixed top-0 left-0 right-0 z-[2000] px-4 pt-4 md:pt-6">
      <div className="max-w-7xl mx-auto h-16 bg-white/70 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.04)] flex items-center justify-between px-5 md:px-6 relative z-[2010]">
        <LogoComponent onClick={() => setIsMenuOpen(false)} />
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="flex items-center gap-2 lg:gap-3 bg-gray-100/50 p-1.5 rounded-2xl border border-gray-100">
            <NavLink to="/" icon={Home} active={location.pathname === '/'}>Home</NavLink>
            <NavLink to="/how-it-works" icon={Zap} active={location.pathname === '/how-it-works'}>How it Works</NavLink>
          </div>
          <button onClick={onUploadClick} className="px-6 h-11 bg-zest text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-black hover:text-white transition-all shadow-lg shadow-zest/10 active:scale-95 flex items-center justify-center gap-2">
            <Upload size={14} /> Audit a bill
          </button>
          {user ? (
            <div className="flex items-center gap-4 border-l border-gray-100 pl-4 ml-2">
              <div className="flex items-center gap-3 pr-2 border-r border-gray-100">
                <div className="flex flex-col items-end">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest leading-none">Level 4</span>
                  <span className="text-[10px] font-bold text-black leading-none mt-0.5">Legendary</span>
                </div>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-black border border-black/5" style={{ backgroundColor: '#fcea01' }}>
                  <Crown size={16} />
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-findr-light rounded-full border border-findr/20">
                {user.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || ''} className="w-6 h-6 rounded-full ring-2 ring-white" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-6 h-6 rounded-full bg-findr flex items-center justify-center text-white"><User size={12} /></div>
                )}
                <span className="text-xs font-bold text-findr-dark">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button onClick={logout} className="p-2.5 hover:bg-red-50 hover:text-red-500 rounded-full transition-all active:scale-95"><LogOut size={18} /></button>
            </div>
          ) : (
            <button onClick={login} className="px-8 h-11 bg-black text-white rounded-2xl text-sm font-black hover:bg-cobalt transition-all hover:scale-105 active:scale-95 shadow-lg shadow-black/10 flex items-center justify-center">
              Login / Sign up
            </button>
          )}
        </div>
        <button className="md:hidden w-12 h-12 flex items-center justify-center text-black active:scale-90 transition-transform relative z-[2011] select-none touch-manipulation" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle Menu">
          {isMenuOpen ? <X size={28} strokeWidth={2.5} /> : <Menu size={28} strokeWidth={2.5} />}
        </button>
      </div>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div key="mobile-nav-root" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[3000] md:hidden">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsMenuOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} transition={{ type: 'spring', damping: 30, stiffness: 300, mass: 0.8 }} className="absolute bottom-0 left-0 right-0 bg-[#FBFBFE] rounded-t-[3rem] shadow-[0_-20px_80px_rgba(0,0,0,0.4)] flex flex-col max-h-[92vh] overflow-hidden border-t border-white">
              <div className="w-12 h-1.5 bg-gray-200 rounded-full mx-auto my-6 shrink-0" />
              <div className="flex-1 overflow-y-auto px-8 pb-12 pt-4 overscroll-contain">
                <div className="flex flex-col gap-8">
                  <button onClick={() => { onUploadClick?.(); setIsMenuOpen(false); }} className="w-full py-6 bg-zest text-black rounded-[2rem] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-zest/20 active:scale-95 transition-all">
                    <Upload size={20} /> Audit a bill
                  </button>
                  <div className="flex flex-col gap-2">
                    <NavLink to="/" icon={Home} mobile active={location.pathname === '/'} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
                    <NavLink to="/how-it-works" icon={Zap} mobile active={location.pathname === '/how-it-works'} onClick={() => setIsMenuOpen(false)}>How it Works</NavLink>
                    <NavLink to="/dashboard/family-wellness" icon={Activity} mobile active={location.pathname === '/dashboard/family-wellness'} onClick={() => setIsMenuOpen(false)}>Wellness Dashboard</NavLink>
                    <NavLink to="/findr-fridays" icon={Gift} mobile active={location.pathname === '/findr-fridays'} onClick={() => setIsMenuOpen(false)}>Findr Fridays</NavLink>
                    <NavLink to="/health-tips" icon={BookOpen} mobile active={location.pathname === '/health-tips'} onClick={() => setIsMenuOpen(false)}>Health Tips</NavLink>
                    <NavLink to="/enterprise" icon={Crown} mobile active={location.pathname === '/enterprise'} onClick={() => setIsMenuOpen(false)}>Enterprise</NavLink>
                    <a href="mailto:contact@findrhealth.com" onClick={() => setIsMenuOpen(false)} className="text-lg font-bold py-4 px-5 text-black/60 hover:text-black transition-colors uppercase tracking-tight flex items-center gap-4 rounded-2xl hover:bg-gray-100">
                      <Mail size={24} className="text-gray-400" /><span>Contact Support</span>
                    </a>
                  </div>
                  <div className="pt-8 border-t border-gray-200">
                    {!user ? (
                      <button onClick={() => { login(); setIsMenuOpen(false); }} className="w-full py-6 bg-black text-white rounded-[2rem] font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all">Login / Sign up</button>
                    ) : (
                      <div className="flex flex-col gap-6">
                        <div className="flex items-center gap-5 px-6 py-4 bg-gray-100 rounded-[2.5rem] border border-gray-200">
                          {user.photoURL ? (
                            <img src={user.photoURL} className="w-14 h-14 rounded-full ring-4 ring-white shadow-lg" referrerPolicy="no-referrer" />
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-findr flex items-center justify-center text-white"><User size={28} /></div>
                          )}
                          <div>
                            <p className="font-black text-base uppercase tracking-tight">{user.displayName}</p>
                            <p className="text-xs text-findr font-black uppercase tracking-widest mt-1">Premium Member</p>
                          </div>
                        </div>
                        <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full py-6 text-red-500 bg-red-100/50 hover:bg-red-100 rounded-[2rem] font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-colors active:scale-95 shadow-sm">
                          <LogOut size={20} /> Logout Account
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="pt-8 border-t border-gray-200 grid grid-cols-2 gap-4">
                    <MobileLegalLink icon={ShieldCheck}>HIPAA</MobileLegalLink>
                    <MobileLegalLink icon={FileText}>Terms</MobileLegalLink>
                    <MobileLegalLink icon={Lock}>Privacy</MobileLegalLink>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
