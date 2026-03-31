import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function FeatureCard({ icon: Icon, title, description }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
      className="glass-panel border border-sage-500/20 hover:border-sage-400 rounded-2xl p-6 flex flex-col items-center justify-center text-center cursor-default relative overflow-hidden transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(0,255,157,0.25)] min-h-[180px] bg-white/5 backdrop-blur-md"
    >
      <motion.div layout className="flex flex-col items-center gap-4 w-full">
        <Icon 
          className={`w-14 h-14 transition-all duration-300 ${
            isHovered 
              ? 'text-sage-400 drop-shadow-[0_0_15px_rgba(0,255,157,0.8)] scale-110' 
              : 'text-gray-400'
          }`} 
        />
        <motion.h3 layout className="font-orbitron font-semibold text-lg text-white tracking-wide mt-2">
          {title}
        </motion.h3>
      </motion.div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, height: 0, marginTop: 0 }}
            animate={{ opacity: 1, height: 'auto', marginTop: 12 }}
            exit={{ opacity: 0, height: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="text-gray-300 text-sm leading-relaxed font-light px-2"
          >
            {description}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
