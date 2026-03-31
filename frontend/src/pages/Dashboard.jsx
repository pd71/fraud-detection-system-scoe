import { motion } from 'framer-motion';
import TrendCard from '../components/TrendCard';

const SCAM_DATA = [
  { id: 1, title: 'Fake Bank OTP Verification', type: 'SMS', frequency: '2.4k', trend: 'up' },
  { id: 2, title: 'Crypto Wallet Phishing', type: 'URL', frequency: '840', trend: 'up' },
  { id: 3, title: 'Deepfake Executive Voice', type: 'Image', frequency: '120', trend: 'up' },
  { id: 4, title: 'Compromised Invoice PDFs', type: 'Email', frequency: '1.2k', trend: 'flat' },
  { id: 5, title: 'Package Delivery Fee', type: 'SMS', frequency: '3.1k', trend: 'down' },
  { id: 6, title: 'Fake Antivirus Renewal', type: 'Email', frequency: '960', trend: 'flat' },
  { id: 7, title: 'Malicious QR Codes', type: 'Image', frequency: '450', trend: 'up' },
  { id: 8, title: 'Romance Scam Extortion', type: 'URL', frequency: '620', trend: 'down' }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col w-full min-h-screen pt-32 px-6 pb-16 z-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Header Block */}
        <div className="mb-14">
          <h1 className="text-4xl md:text-6xl font-orbitron font-bold text-white mb-4 drop-shadow-[0_0_20px_rgba(0,255,157,0.3)]">
            Global Analytics Engine
          </h1>
          <p className="text-sage-400 font-inter text-lg md:text-xl font-light tracking-wide drop-shadow-[0_0_10px_rgba(0,255,157,0.2)]">
            Live monitoring of localized threat vectors and emerging deception tactics.
          </p>
        </div>

        {/* Circular Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10 place-items-center"
        >
          {SCAM_DATA.map(scam => (
            <div key={scam.id} className="w-full max-w-[280px]">
              <TrendCard {...scam} />
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
