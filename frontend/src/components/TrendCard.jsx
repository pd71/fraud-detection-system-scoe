import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';

// Maps strict neon color glow palettes per scam vector requirement
const TYPE_CONFIG = {
  URL: { color: 'text-blue-400', border: 'border-blue-500/50 hover:border-blue-400', shadow: 'hover:shadow-[0_0_35px_rgba(59,130,246,0.6)]', glow: 'shadow-[inset_0_0_20px_rgba(59,130,246,0.15)]' },
  SMS: { color: 'text-sage-400', border: 'border-sage-500/50 hover:border-sage-400', shadow: 'hover:shadow-[0_0_35px_rgba(0,255,157,0.6)]', glow: 'shadow-[inset_0_0_20px_rgba(0,255,157,0.15)]' },
  Email: { color: 'text-cyan-400', border: 'border-cyan-500/50 hover:border-cyan-400', shadow: 'hover:shadow-[0_0_35px_rgba(6,182,212,0.6)]', glow: 'shadow-[inset_0_0_20px_rgba(6,182,212,0.15)]' },
  Image: { color: 'text-teal-400', border: 'border-teal-500/50 hover:border-teal-400', shadow: 'hover:shadow-[0_0_35px_rgba(20,184,166,0.6)]', glow: 'shadow-[inset_0_0_20px_rgba(20,184,166,0.15)]' }
};

export default function TrendCard({ title, type, frequency, trend }) {
  const config = TYPE_CONFIG[type] || TYPE_CONFIG['URL'];
  
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 15 } }
      }}
      whileHover={{ y: -12, scale: 1.05 }}
      className={`relative flex flex-col items-center justify-center p-6 aspect-square rounded-full glass-panel cursor-pointer transition-all duration-300 border-2 bg-cyber-dark/50 backdrop-blur-xl ${config.border} ${config.glow} ${config.shadow}`}
    >
      {/* Scam Vector Badge */}
      <span className={`px-4 py-1 text-[11px] font-orbitron uppercase tracking-widest rounded-full border border-current font-bold mb-5 shadow-[0_0_15px_currentColor] bg-black/60 ${config.color}`}>
        {type}
      </span>
      
      {/* Title */}
      <h3 className="text-center font-inter font-semibold text-white text-base md:text-lg leading-tight px-1 mb-10 line-clamp-3">
        {title}
      </h3>

      {/* Internal Analytics */}
      <div className="absolute bottom-9 flex flex-col items-center opacity-90">
        <span className="text-xs text-gray-300 font-inter font-light tracking-wide mb-1.5 drop-shadow-md">
          {frequency} reports
        </span>
        <div className={`flex items-center gap-1.5 text-[12px] font-bold ${trend === 'up' ? 'text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]' : trend === 'down' ? 'text-sage-400 drop-shadow-[0_0_5px_rgba(0,255,157,0.8)]' : 'text-gray-400'}`}>
          {trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
          {trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
          {trend === 'flat' && <Minus className="w-4 h-4" />}
          <span className="uppercase text-[10px] tracking-widest">
            {trend === 'up' ? 'Surging' : trend === 'down' ? 'Declining' : 'Stable'}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
