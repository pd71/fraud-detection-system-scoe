import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 px-4 overflow-hidden z-10">
      <div className="z-10 w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Central Neon Green Premium Shield */}
        <motion.div
           initial={{ opacity: 0, scale: 0.8, y: 40 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 1.2, ease: "easeOut" }}
           className="relative mb-12 mt-2 flex items-center justify-center z-10"
        >
          <motion.div
             animate={{ y: [-10, 10, -10] }}
             transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
             className="relative w-64 h-80 flex items-center justify-center"
          >
             {/* Pulsating backdrop glow */}
             <motion.div 
               animate={{ opacity: [0.1, 0.4, 0.1], scale: [0.9, 1.1, 0.9] }}
               transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
               className="absolute inset-4 bg-sage-500/20 blur-[40px] rounded-full z-0"
             />

             {/* Energy Waves / Rings */}
             <motion.div
                animate={{ scale: [0.6, 1.6], opacity: [0.8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeOut" }}
                className="absolute w-40 h-40 border-[2px] border-sage-500 rounded-full z-0"
             />
             <motion.div
                animate={{ scale: [0.6, 1.6], opacity: [0.8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeOut", delay: 1.5 }}
                className="absolute w-40 h-40 border border-sage-400 rounded-full z-0"
             />

             {/* True Glassmorphic Background matching the SVG shape exactly */}
             <div className="absolute inset-0 z-10">
               <div 
                 className="w-full h-full backdrop-blur-xl bg-white/[0.03] shadow-[inset_0_0_40px_rgba(0,255,157,0.2)] absolute inset-0 transition-all duration-300"
                 style={{ clipPath: 'polygon(50% 5%, 93.75% 13.75%, 93.75% 61.25%, 50% 93.75%, 6.25% 61.25%, 6.25% 13.75%)' }}
               />
             </div>

             {/* SVG Box for the Premium Shield Strokes and Lock */}
             <svg viewBox="0 0 320 400" className="absolute inset-0 w-full h-full drop-shadow-[0_0_20px_rgba(0,255,157,0.8)] z-20 pointer-events-none">
               <defs>
                 <linearGradient id="shieldEdge" x1="0%" y1="0%" x2="100%" y2="100%">
                   <stop offset="0%" stopColor="#00FF9D" />
                   <stop offset="50%" stopColor="rgba(0, 255, 157, 0.4)" />
                   <stop offset="100%" stopColor="#FFFFFF" />
                 </linearGradient>

                 <pattern id="shieldGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                   <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 157, 0.15)" strokeWidth="1" />
                 </pattern>

                 <linearGradient id="lockCoreGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="rgba(0, 200, 150, 0.4)" />
                   <stop offset="100%" stopColor="rgba(0, 15, 10, 0.9)" />
                 </linearGradient>
               </defs>

               {/* Outer Shield Neon Glow Line */}
               <path d="M 160 20 L 300 55 L 300 245 L 160 375 L 20 245 L 20 55 Z" 
                     fill="none" stroke="url(#shieldEdge)" strokeWidth="5" strokeLinejoin="round" />
                     
               {/* Inner Layer Grid pattern (scaled down slightly for depth) */}
               <g transform="scale(0.88) translate(22, 28)">
                 <path d="M 160 20 L 300 55 L 300 245 L 160 375 L 20 245 L 20 55 Z" 
                       fill="url(#shieldGrid)" stroke="rgba(0, 255, 157, 0.6)" strokeWidth="2" strokeLinejoin="round" />
               </g>

               {/* Lock Shackle */}
               <path d="M 125 190 L 125 150 C 125 130, 195 130, 195 150 L 195 190" 
                     fill="none" stroke="#00FF9D" strokeWidth="8" strokeLinecap="round" />
               <path d="M 125 190 L 125 150 C 125 130, 195 130, 195 150 L 195 190" 
                     fill="none" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

               {/* Lock Body */}
               <rect x="100" y="190" width="120" height="80" rx="12" fill="url(#lockCoreGrad)" stroke="#00FF9D" strokeWidth="3" />
               <rect x="100" y="190" width="120" height="80" rx="12" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3" />

               {/* Lock Keyhole */}
               <circle cx="160" cy="220" r="6" fill="#00FF9D" />
               <path d="M 156 225 L 164 225 L 166 242 L 154 242 Z" fill="#00FF9D" />
               {/* Neon Core Dot inside keyhole */}
               <circle cx="160" cy="220" r="2" fill="#FFFFFF" />
             </svg>
          </motion.div>
        </motion.div>

        {/* Text Area */}
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.4 }}
           className="text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-orbitron font-bold tracking-widest text-white mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.1)]">
            FRAUD<span className="text-sage-400 drop-shadow-[0_0_35px_rgba(0,255,157,0.7)]">GUARD</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 font-inter font-light tracking-wide max-w-3xl mx-auto"
          >
            AI-powered protection against scams, fraud, and digital threats.
          </motion.p>
        </motion.div>
        
      </div>
    </section>
  );
}
