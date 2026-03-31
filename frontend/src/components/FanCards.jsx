import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScannerCard from './ScannerCard';

const SCANNERS = ['SMS/Chat', 'Email', 'URL', 'Image'];

// Mathematical spatial variants mapping the 3D Fan layout
const fanVariants = {
  0: { x: 0, y: 0, scale: 1, zIndex: 40, opacity: 1, filter: 'blur(0px)' },
  1: { x: 260, y: -40, scale: 0.75, zIndex: 30, opacity: 0.5, filter: 'blur(3px)' },
  2: { x: 0, y: -100, scale: 0.55, zIndex: 20, opacity: 0.2, filter: 'blur(8px)' },
  3: { x: -260, y: -40, scale: 0.75, zIndex: 30, opacity: 0.5, filter: 'blur(3px)' }
};

export default function FanCards({ onLaunch }) {
  const [rotationIndex, setRotationIndex] = useState(0);

  const handleNext = () => setRotationIndex(r => r + 1);
  const handlePrev = () => setRotationIndex(r => r - 1);

  const handleCardClick = (index, slot, type) => {
    if (slot === 0) {
      // Trigger modal launch if already completely in front
      onLaunch(type);
    } else {
      // Auto-rotate the clicked background card directly into the front slot
      const offset = slot === 3 ? -1 : slot;
      setRotationIndex(r => r + offset);
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto h-[450px] flex items-center justify-center">
      {/* Absolute Side Controls */}
      <div className="absolute top-1/2 -translate-y-1/2 -left-6 md:-left-16 z-50">
        <button onClick={handlePrev} className="p-3 rounded-full bg-cyber-dark/80 border border-sage-500/30 text-sage-400 hover:bg-sage-500/20 hover:border-sage-400 transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,255,157,0.2)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] active:scale-95">
          <ChevronLeft className="w-8 h-8" />
        </button>
      </div>

      <div className="absolute top-1/2 -translate-y-1/2 -right-6 md:-right-16 z-50">
        <button onClick={handleNext} className="p-3 rounded-full bg-cyber-dark/80 border border-sage-500/30 text-sage-400 hover:bg-sage-500/20 hover:border-sage-400 transition-all backdrop-blur-md shadow-[0_0_15px_rgba(0,255,157,0.2)] hover:shadow-[0_0_25px_rgba(0,255,157,0.5)] active:scale-95">
          <ChevronRight className="w-8 h-8" />
        </button>
      </div>

      {SCANNERS.map((type, index) => {
        const total = 4;
        const normalizedRotation = ((rotationIndex % total) + total) % total;
        const slot = (index - normalizedRotation + total) % total;
        const isActive = slot === 0;

        return (
          <motion.div
            key={type}
            initial={false}
            animate={fanVariants[slot]}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
            className="absolute top-10 w-[280px] h-[360px]"
          >
            <ScannerCard 
              type={type} 
              isActive={isActive} 
              onClick={() => handleCardClick(index, slot, type)} 
            />
          </motion.div>
        );
      })}
    </div>
  );
}
