import { useState } from 'react';
import { motion } from 'framer-motion';
import FanCards from '../components/FanCards';
import ScannerModal from '../components/ScannerModal';

export default function Scanner() {
  const [activeScanner, setActiveScanner] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center w-full min-h-screen pt-32 px-4 z-20 overflow-hidden relative"
    >
      <div className="w-full max-w-6xl flex items-center justify-center flex-col text-center mb-16 relative z-10">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
          DEEP<span className="text-sage-400 drop-shadow-[0_0_35px_rgba(0,255,157,0.7)]">SCAN</span> ENGINE
        </h1>
        <p className="text-gray-400 font-inter text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto drop-shadow-[0_0_5px_rgba(255,255,255,0.05)]">
          Select a threat vector module to initiate AI-driven behavioral analysis and signature extraction flow.
        </p>
      </div>

      <div className="w-full relative py-8 md:py-16">
         <FanCards onLaunch={(type) => setActiveScanner(type)} />
      </div>

      {activeScanner && (
         <ScannerModal type={activeScanner} onClose={() => setActiveScanner(null)} />
      )}
    </motion.div>
  );
}
