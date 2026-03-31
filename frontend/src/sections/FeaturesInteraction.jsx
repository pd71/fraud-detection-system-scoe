import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MessageSquareWarning, MailWarning, Link2, ScanFace, Users, TrendingUp, ShieldCheck } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';

const FEATURES = [
  { id: 1, title: 'SMS Scam Detection', description: 'Real-time analysis to identify malicious smishing attempts before they reach you.', icon: MessageSquareWarning },
  { id: 2, title: 'Email Fraud Detection', description: 'Advanced AI filters for deep phishing and BEC attacks, securing your inbox.', icon: MailWarning },
  { id: 3, title: 'Malicious URL Scanner', description: 'Instant deep-scan of hyperlinks across all sources to verify authenticity.', icon: Link2 },
  { id: 4, title: 'AI Image Scam Detection', description: 'Detect deepfakes and manipulated images used in identity fraud.', icon: ScanFace },
  { id: 5, title: 'Community Scam Reports', description: 'Crowdsourced threat intelligence shared globally to prevent repeated attacks.', icon: Users },
  { id: 6, title: 'Scam Trend Analytics', description: 'Predictive modeling identifying emerging cyber threats in your region.', icon: TrendingUp },
  { id: 7, title: 'Trust Score System', description: 'Dynamic credibility scoring for senders, domains, and specific transactions.', icon: ShieldCheck },
];

export default function FeaturesInteraction() {
  const containerRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Accelerated scroll map so cards appear much sooner
  const shieldScale = useTransform(scrollYProgress, [0, 0.1], [0.3, 1]);
  const shieldOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);
  const shieldRotate = useTransform(scrollYProgress, [0, 0.1], [30, 0]);

  const lockShackleY = useTransform(scrollYProgress, [0.1, 0.15], [0, -20]);
  const lockShackleRotate = useTransform(scrollYProgress, [0.15, 0.25], [0, -45]);
  const lockOpacity = useTransform(scrollYProgress, [0.25, 0.35], [1, 0.1]);

  const cardsExpansion = useTransform(scrollYProgress, [0.25, 0.5], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-cyber-dark perspective-1000">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Animated Feature Cards */}
        {FEATURES.map((feature, index) => {
          const angle = -90 + (index * (360 / 7));
          const rad = (angle * Math.PI) / 180;
          
          const maxRadiusX = windowWidth < 768 ? 140 : 380;
          const maxRadiusY = windowWidth < 768 ? 180 : 300;

          const translateX = useTransform(cardsExpansion, (val) => val * (maxRadiusX * Math.cos(rad)));
          const translateY = useTransform(cardsExpansion, (val) => val * (maxRadiusY * Math.sin(rad)));
          const scale = useTransform(cardsExpansion, [0, 0.5, 1], [0.1, 0.5, 1]);
          const opacity = useTransform(cardsExpansion, [0, 0.2, 0.8], [0, 1, 1]);

          return (
            <FeatureCard
              key={feature.id}
              {...feature}
              style={{
                x: translateX,
                y: translateY,
                scale,
                opacity,
              }}
            />
          );
        })}

        {/* Central Blue Glowing Shield */}
        <motion.div
           style={{
             scale: shieldScale,
             opacity: shieldOpacity,
             rotateX: shieldRotate,
           }}
           className="absolute z-10 w-[320px] h-[400px] flex items-center justify-center preserve-3d inset-0 m-auto"
        >
          {/* SVG Shield Base */}
          <svg viewBox="0 0 320 400" className="absolute inset-0 w-full h-full drop-shadow-[0_0_50px_rgba(0,136,255,0.7)] z-0">
            <defs>
              <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(0, 136, 255, 0.1)" />
                <stop offset="100%" stopColor="rgba(0, 50, 150, 0.6)" />
              </linearGradient>
              <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 255, 255, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            
            {/* Shield Outline Hexagon/Pentagon */}
            <path d="M 160 10 L 300 50 L 300 250 L 160 380 L 20 250 L 20 50 Z" 
                  fill="url(#shieldGrad)" stroke="#0077FF" strokeWidth="6" strokeLinejoin="round" />
                  
            {/* Shield Grid Inner Background */}
            <path d="M 160 10 L 300 50 L 300 250 L 160 380 L 20 250 L 20 50 Z" 
                  fill="url(#grid)" />
                  
            {/* Inner Neon Glow Line */}
            <path d="M 160 28 L 285 62 L 285 240 L 160 355 L 35 240 L 35 62 Z" 
                  fill="none" stroke="#00FFFF" strokeWidth="2" strokeLinejoin="round" opacity="0.8" />
          </svg>

          {/* Mechanical Lock Assembly */}
          <motion.div 
            style={{ opacity: lockOpacity }}
            className="relative w-24 h-32 flex flex-col items-center justify-end z-20"
          >
            {/* Shackle */}
            <motion.div
               style={{
                 y: lockShackleY,
                 rotateZ: lockShackleRotate,
                 originX: 0.15,
                 originY: 0.9
               }}
               className="w-14 h-16 border-[6px] border-[#00FFFF] border-b-0 rounded-t-full absolute top-[10px] [box-shadow:inset_0_5px_10px_rgba(0,255,255,0.5)] drop-shadow-[0_0_8px_rgba(0,255,255,0.8)]"
            />
            {/* Lock Body */}
            <div className="w-24 h-20 bg-[#000B1A] border-[4px] border-[#0077FF] rounded-[10px] relative z-10 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(0,136,255,0.6)]">
               <div className="w-3 h-4 bg-[#00FFFF] rounded-full relative mb-1 drop-shadow-[0_0_8px_rgba(0,255,255,1)]">
                 <div className="w-1.5 h-4 bg-[#00FFFF] absolute top-2.5 left-1/2 -translate-x-1/2 rounded-b-sm" />
               </div>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
