import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { LogIn, LogOut, Menu, X, Zap, BookOpen, Upload } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';

export default function Navbar({ onUploadClick }: { onUploadClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();

  useEffect(() => {
    const authUnsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return () => authUnsubscribe();
  }, []);

  const login = () => signInWithPopup(auth, new GoogleAuthProvider());
  const logout = () => signOut(auth);

  const NavLink = ({ to, children, icon: Icon, mobile = false }: any) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          mobile ? "flex items-center gap-3 p-4 rounded-xl text-lg font-bold transition-colors" : "text-xs font-black uppercase tracking-widest transition-colors px-4 py-2",
          active ? "text-blue-600 bg-blue-50/50" : "text-black/60 hover:text-black hover:bg-gray-50"
        )}
      >
        {Icon && <Icon size={mobile ? 24 : 14} />}
        <span>{children}</span>
      </Link>
    );
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[5000] px-4 pt-4 md:pt-6">
        <div className="max-w-7xl mx-auto h-16 bg-white/70 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-sm flex items-center justify-between px-6">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <Logo className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/" icon={BookOpen}>Home</NavLink>
            <NavLink to="/how-it-works" icon={Zap}>How it Works</NavLink>
            <button onClick={onUploadClick} className="px-6 py-2 bg-[#aaff00] text-black rounded-full text-xs font-black uppercase tracking-widest hover:bg-[#99ee00] transition-colors">
              Audit a Bill
            </button>
            {user ? (
              <button onClick={logout} className="ml-2 px-5 py-2 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2">
                <LogOut size={14} />Sign Out
              </button>
            ) : (
              <button onClick={login} className="ml-2 px-5 py-2 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors flex items-center gap-2">
                <LogIn size={14} />Login / Sign up
              </button>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full transition-colors">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[4999] bg-white md:hidden flex flex-col pt-32 px-8 gap-4"
          >
            <NavLink to="/" icon={BookOpen} mobile>Home</NavLink>
            <NavLink to="/how-it-works" icon={Zap} mobile>How it Works</NavLink>
            <button onClick={() => { onUploadClick?.(); setIsMenuOpen(false); }} className="w-full mt-4 p-4 bg-[#aaff00] text-black rounded-2xl text-lg font-bold flex items-center justify-center gap-3">
              <Upload size={24} />Audit a Bill
            </button>
            {user ? (
              <button onClick={() => { logout(); setIsMenuOpen(false); }} className="w-full p-4 bg-black text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3">
                <LogOut size={24} />Sign Out
              </button>
            ) : (
              <button onClick={() => { login(); setIsMenuOpen(false); }} className="w-full p-4 bg-black text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3">
                <LogIn size={24} />Login / Sign up
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
