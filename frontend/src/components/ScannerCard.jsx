import { motion } from 'framer-motion';
import { MessageSquare, Mail, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';

// Unified UI Color Tokens
const THEME = {
  'SMS/Chat': { icon: MessageSquare, color: 'text-sage-400', border: 'border-sage-500/50', shadow: 'shadow-[0_0_30px_rgba(0,255,157,0.3)]' },
  Email: { icon: Mail, color: 'text-cyan-400', border: 'border-cyan-500/50', shadow: 'shadow-[0_0_30px_rgba(6,182,212,0.3)]' },
  URL: { icon: LinkIcon, color: 'text-blue-400', border: 'border-blue-500/50', shadow: 'shadow-[0_0_30px_rgba(59,130,246,0.3)]' },
  Image: { icon: ImageIcon, color: 'text-teal-400', border: 'border-teal-500/50', shadow: 'shadow-[0_0_30px_rgba(20,184,166,0.3)]' },
};

export default function ScannerCard({ type, id, isActive, onClick }) {
  const config = THEME[type];
  const Icon = config.icon;

  return (
    <motion.div
      onClick={onClick}
      className={`w-full h-full flex flex-col items-center justify-center p-6 rounded-3xl glass-panel relative cursor-pointer border-2 transition-colors duration-500 
      ${isActive ? `bg-cyber-dark/80 backdrop-blur-2xl ${config.border} ${config.shadow} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]` : 'bg-cyber-dark/40 backdrop-blur-sm border-white/10'}`}
      whileHover={isActive ? { y: -8, scale: 1.02 } : { scale: 1.05 }}
    >
      <div className={`p-4 rounded-full mb-6 relative z-10 ${isActive ? `bg-black/40 ${config.shadow}` : 'bg-white/5'}`}>
        <Icon className={`w-12 h-12 ${isActive ? config.color : 'text-gray-400'}`} />
      </div>
      
      <h3 className={`text-xl font-orbitron font-bold text-center tracking-wide ${isActive ? 'text-white' : 'text-gray-400'}`}>
        {type} Scanner
      </h3>

      {isActive && (
        <span className="mt-4 px-4 py-1.5 text-xs font-inter font-semibold uppercase tracking-widest text-black bg-sage-500 rounded-full drop-shadow-[0_0_8px_rgba(0,255,157,0.8)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)]">
          Launch Module
        </span>
      )}
    </motion.div>
  );
}
