import { motion } from 'framer-motion';

export default function AuthBox({ title, subtitle, children }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -30 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative z-20 w-full max-w-[440px] mx-auto p-10 rounded-3xl glass-panel border border-sage-500/40 shadow-[0_0_60px_rgba(0,255,157,0.15)] bg-cyber-dark/60 backdrop-blur-2xl"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-orbitron font-bold tracking-wider text-white mb-3 drop-shadow-[0_0_20px_rgba(0,255,157,0.5)]">
          {title}
        </h2>
        {subtitle && <p className="text-sage-400 font-inter text-sm font-light tracking-wide">{subtitle}</p>}
      </div>
      {children}
    </motion.div>
  );
}
