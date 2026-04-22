import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { Menu, X, Zap, Gift, BookOpen, Upload } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';

export default function Navbar({ onUploadClick }: { onUploadClick?: () => void }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (to: string) => {
    setIsMenuOpen(false);
    setTimeout(() => navigate(to), 100);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[5000] px-4 pt-4 md:pt-6 pointer-events-none">
        <div className="max-w-7xl mx-auto h-16 bg-white/70 backdrop-blur-xl border border-gray-100 rounded-[2rem] shadow-sm flex items-center justify-between px-6 pointer-events-auto">
          <Link to="/" onClick={() => setIsMenuOpen(false)}>
            <Logo className="h-8 md:h-10 w-auto" />
          </Link>
          <div className="hidden md:flex items-center gap-2">
            <Link to="/" className="text-xs font-black uppercase tracking-widest transition-colors px-4 py-2 text-black/60 hover:text-black hover:bg-gray-50">Home</Link>
            <Link to="/how-it-works" className="text-xs font-black uppercase tracking-widest transition-colors px-4 py-2 text-black/60 hover:text-black hover:bg-gray-50">Process</Link>
            <button
              onClick={onUploadClick}
              className="px-6 py-2 bg-black text-white rounded-full text-xs font-black uppercase tracking-widest hover:bg-gray-800 transition-colors"
            >
              Audit a Bill
            </button>
          </div>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-black hover:bg-gray-100 rounded-full transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <div
          className="fixed inset-0 z-[6000] bg-white flex flex-col pt-32 px-8 gap-4 md:hidden"
          style={{ pointerEvents: 'auto' }}
        >
          <button onClick={() => handleNavClick('/')} className="flex items-center gap-3 p-4 rounded-xl text-lg font-bold transition-colors text-black/60 hover:text-black hover:bg-gray-50 text-left">
            <BookOpen size={24} /><span>Home</span>
          </button>
          <button onClick={() => handleNavClick('/how-it-works')} className="flex items-center gap-3 p-4 rounded-xl text-lg font-bold transition-colors text-black/60 hover:text-black hover:bg-gray-50 text-left">
            <Zap size={24} /><span>How it Works</span>
          </button>
          <button onClick={() => handleNavClick('/findr-fridays')} className="flex items-center gap-3 p-4 rounded-xl text-lg font-bold transition-colors text-black/60 hover:text-black hover:bg-gray-50 text-left">
            <Gift size={24} /><span>Findr Fridays</span>
          </button>
          <button onClick={() => handleNavClick('/health-tips')} className="flex items-center gap-3 p-4 rounded-xl text-lg font-bold transition-colors text-black/60 hover:text-black hover:bg-gray-50 text-left">
            <BookOpen size={24} /><span>Health Tips</span>
          </button>
          <button
            onClick={() => { onUploadClick?.(); setIsMenuOpen(false); }}
            className="w-full mt-4 p-4 bg-black text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3"
          >
            <Upload size={24} />
            Audit a Bill
          </button>
        </div>
      )}
    </>
  );
}
