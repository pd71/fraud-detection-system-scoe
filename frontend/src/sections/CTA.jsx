import { Link } from 'react-router-dom';

export default function CTA() {
  return (
    <section className="relative py-32 px-4 border-t border-sage-500/20 bg-black/40 backdrop-blur-md z-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-8 drop-shadow-[0_0_15px_rgba(0,255,157,0.3)]">
          Secure Your Digital Identity
        </h2>
        <p className="text-gray-400 mb-12 text-lg font-inter">
          Join thousands of users protected by our state-of-the-art AI defense mechanisms.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <Link to="/signup" className="px-8 py-4 font-orbitron font-bold text-black bg-sage-500 rounded-lg w-full sm:w-auto hover:bg-sage-400 shadow-[0_0_20px_rgba(0,255,157,0.4)] hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg uppercase tracking-wider text-center">
            Sign Up Now
          </Link>
          <Link to="/login" className="px-8 py-4 font-orbitron font-bold text-white glass-panel border border-sage-500/40 rounded-lg w-full sm:w-auto hover:bg-white/5 hover:border-sage-400 transition-all duration-300 transform hover:-translate-y-1 active:scale-95 text-lg uppercase tracking-wider text-center">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}
