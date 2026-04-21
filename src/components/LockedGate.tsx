import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, ArrowRight, Lock } from 'lucide-react';
import { Logo } from './Logo';

interface LockedGateProps {
  children: React.ReactNode;
}

export default function LockedGate({ children }: LockedGateProps) {
  const [passcode, setPasscode] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // The secret passcode - ideally this would be an environment variable
  const rawPasscode = (import.meta as any).env?.VITE_APP_PASSCODE;
  // Strip quotes if they were accidentally included in the env var string
  const sanitizedEnvPasscode = typeof rawPasscode === 'string' ? rawPasscode.replace(/['"]+/g, '') : undefined;
  const CORRECT_PASSCODE = (sanitizedEnvPasscode && sanitizedEnvPasscode.trim() !== '') ? sanitizedEnvPasscode : '2026';

  useEffect(() => {
    const savedStatus = localStorage.getItem('findr_unlocked');
    if (savedStatus === 'true') {
      setIsUnlocked(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const entered = passcode.trim().toUpperCase();
    const target = CORRECT_PASSCODE.trim().toUpperCase();

    if (entered === target) {
      setIsUnlocked(true);
      localStorage.setItem('findr_unlocked', 'true');
      setError(false);
    } else {
      setError(true);
      setPasscode('');
      // Shake animation effect could be added here
    }
  };

  if (isLoading) return null;

  if (isUnlocked) return <>{children}</>;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center p-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-findr/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-zest/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="relative z-10 w-full max-w-md">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-10">
            <Logo className="h-16 w-auto" color="white" />
          </div>
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.2em] text-findr mb-6">
            <Lock size={12} /> Sentinel Protected
          </div>
          
          <h1 className="text-4xl font-display font-bold text-white mb-4 tracking-tight">
            Restricted <br /> Access
          </h1>
          <p className="text-gray-500 font-medium px-4">
            FINDR is currently in private preview. Please enter your institutional passcode to continue.
          </p>
        </motion.div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div className="relative group">
            <input
              type="text"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError(false);
              }}
              placeholder="Enter Passcode"
              className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10 group-hover:border-findr/30'} rounded-2xl px-6 py-5 text-white text-center font-bold tracking-[0.3em] uppercase transition-all outline-none focus:border-findr focus:ring-1 focus:ring-findr/20`}
              autoFocus
            />
            {error && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 right-0 -bottom-8 text-red-500 text-[10px] font-black uppercase tracking-widest"
              >
                Incorrect Passcode. Try again.
              </motion.p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-5 bg-zest text-black rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-white transition-all active:scale-95 shadow-xl shadow-zest/10"
          >
            Authenticate <ArrowRight size={16} />
          </button>
        </motion.form>

        <div className="mt-12 text-center">
          <p className="text-[9px] text-gray-700 font-black uppercase tracking-[0.3em]">
            © 2026 Findr Health Inc. • Secure Instance
          </p>
        </div>
      </div>
    </div>
  );
}
