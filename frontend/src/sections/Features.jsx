import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1, y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 20 }
  }
};

export default function Features() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 px-4 bg-cyber-dark z-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 drop-shadow-[0_0_15px_rgba(0,255,157,0.2)]">Core Defenses</h2>
          <p className="text-sage-400 font-inter text-lg">Next-generation security for absolute peace of mind.</p>
        </div>

        <motion.div 
          ref={containerRef}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 justify-center"
        >
          {FEATURES.map((feature, idx) => (
             <motion.div key={feature.id} variants={cardVariants} className={idx === 6 ? "sm:col-span-2 lg:col-span-1 lg:col-start-2 place-self-center lg:place-self-auto w-full max-w-[400px] lg:max-w-none justify-self-center" : ""}> 
               <FeatureCard {...feature} />
             </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
