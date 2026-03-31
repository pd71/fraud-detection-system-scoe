import { Link, useLocation } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const location = useLocation();
  const isLanding = location.pathname === "/";
  const isAuth = location.pathname === "/login" || location.pathname === "/signup";
  const isInterior = !isLanding && !isAuth;

  return (
    <motion.nav 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 inset-x-0 z-50 px-6 py-4 border-b border-sage-500/20 bg-cyber-dark/40 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,255,157,0.05)]"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link to={isInterior ? "/dashboard" : "/"} className="flex items-center gap-3 group">
          <ShieldAlert className="w-8 h-8 text-sage-400 drop-shadow-[0_0_8px_rgba(0,255,157,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,157,0.8)] transition-all duration-300" />
          <span className="font-orbitron font-bold text-xl tracking-widest text-white mt-1 transition-colors">
            FRAUD<span className="text-sage-400 drop-shadow-[0_0_8px_rgba(0,255,157,0.5)] group-hover:drop-shadow-[0_0_15px_rgba(0,255,157,0.8)] transition-all duration-300">GUARD</span>
          </span>
        </Link>
        <div className="flex flex-col md:flex-row items-center gap-4 hidden md:flex">
          {isInterior && (
            <div className="flex items-center gap-8 mr-8">
              <Link to="/dashboard" className="relative group flex items-center justify-center">
                <span className={`font-orbitron font-semibold tracking-wide transition-colors ${location.pathname === '/dashboard' ? 'text-sage-400 drop-shadow-[0_0_8px_rgba(0,255,157,0.6)]' : 'text-gray-400 hover:text-white'}`}>Home</span>
                {location.pathname === '/dashboard' && <span className="absolute -bottom-2 w-full h-[2px] bg-sage-400 shadow-[0_0_10px_rgba(0,255,157,0.8)]"></span>}
              </Link>
              <Link to="/scanner" className="relative group flex items-center justify-center">
                <span className={`font-orbitron font-semibold tracking-wide transition-colors ${location.pathname === '/scanner' ? 'text-sage-400 drop-shadow-[0_0_8px_rgba(0,255,157,0.6)]' : 'text-gray-400 hover:text-white'}`}>Scanner</span>
                {location.pathname === '/scanner' && <span className="absolute -bottom-2 w-full h-[2px] bg-sage-400 shadow-[0_0_10px_rgba(0,255,157,0.8)]"></span>}
              </Link>
              <Link to="/community" className="relative group flex items-center justify-center">
                <span className={`font-orbitron font-semibold tracking-wide transition-colors ${location.pathname === '/community' ? 'text-sage-400 drop-shadow-[0_0_8px_rgba(0,255,157,0.6)]' : 'text-gray-400 hover:text-white'}`}>Community</span>
                {location.pathname === '/community' && <span className="absolute -bottom-2 w-full h-[2px] bg-sage-400 shadow-[0_0_10px_rgba(0,255,157,0.8)]"></span>}
              </Link>
            </div>
          )}

          {isLanding && (
            <>
              <Link to="/login" className="px-5 py-2 font-orbitron font-semibold text-white hover:text-sage-400 transition-colors tracking-wider">Login</Link>
              <Link to="/signup" className="px-6 py-2.5 font-orbitron font-bold text-black bg-sage-500 rounded shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:bg-sage-400 hover:shadow-[0_0_30px_rgba(0,255,157,0.7)] transition-all">Sign Up</Link>
            </>
          )}
          
          {!isLanding && !isInterior && (
            <Link to="/" className="px-5 py-2 font-orbitron font-semibold text-sage-400 hover:text-white transition-colors tracking-wider">Back to Home</Link>
          )}

          {isInterior && (
            <div className="w-10 h-10 rounded-full bg-sage-500/10 border border-sage-500/40 flex items-center justify-center cursor-pointer hover:bg-sage-500/30 transition-all shadow-[0_0_15px_rgba(0,255,157,0.2)] ml-2">
               <span className="font-orbitron font-bold text-sage-400 text-sm tracking-widest pl-1">AG</span>
            </div>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
