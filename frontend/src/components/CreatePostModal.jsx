import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, UploadCloud, AlertCircle } from 'lucide-react';

const SCAM_TYPES = ['SMS', 'Email', 'URL', 'Image'];

export default function CreatePostModal({ onClose, onSubmit }) {
  const [content, setContent] = useState('');
  const [type, setType] = useState('SMS');
  const [image, setImage] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    onSubmit({ content, type, image });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg glass-panel bg-cyber-dark/95 border border-sage-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,255,157,0.1)] p-8 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Neon Top Border */}
          <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-sage-400 to-transparent shadow-[0_0_15px_rgba(0,255,157,0.8)]" />

          <button onClick={onClose} className="absolute top-5 right-5 z-50 p-2 rounded-full text-gray-400 hover:text-white hover:bg-white/10 hover:rotate-90 transition-all duration-300">
            <X className="w-5 h-5" />
          </button>

          <h2 className="text-2xl font-orbitron font-bold text-white mb-2 tracking-wide flex items-center gap-3 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            <AlertCircle className="w-6 h-6 text-sage-400 drop-shadow-[0_0_10px_rgba(0,255,157,0.8)] animate-pulse" />
            File Intelligence Report
          </h2>
          <p className="text-gray-400 font-inter text-sm mb-6 pb-6 border-b border-white/5 tracking-wide leading-relaxed">
            Share documented threat vectors to update the global FraudGuard neural net. Your report helps secure the community.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            
            <div className="flex flex-col gap-3">
              <label className="text-xs font-orbitron font-semibold text-gray-300 tracking-widest uppercase">Select Vector Type</label>
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {SCAM_TYPES.map(t => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`px-4 py-1.5 rounded-full font-orbitron text-xs font-bold tracking-wider transition-all border ${
                      type === t 
                        ? 'bg-sage-500/20 text-sage-400 border-sage-500 shadow-[inset_0_0_15px_rgba(0,255,157,0.1),0_0_10px_rgba(0,255,157,0.2)]'
                        : 'bg-black/40 text-gray-500 border-white/5 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-orbitron font-semibold text-gray-300 tracking-widest uppercase">Threat Analysis</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="Describe the scam mechanics, payload details, or psychological vectors used..."
                className="w-full bg-black/60 border border-white/10 rounded-xl p-4 font-inter text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-sage-400 focus:shadow-[0_0_20px_rgba(0,255,157,0.15)] transition-all resize-none shadow-inner"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-xs font-orbitron font-semibold text-gray-300 tracking-widest uppercase">Evidence Media (Optional)</label>
              <div className="w-full h-24 border-2 border-dashed border-white/20 rounded-xl bg-black/40 flex flex-col items-center justify-center cursor-pointer hover:border-sage-500/60 hover:bg-black/60 transition-all group relative overflow-hidden">
                <UploadCloud className="w-6 h-6 text-gray-400 group-hover:text-sage-400 group-hover:drop-shadow-[0_0_8px_rgba(0,255,157,0.8)] mb-2 transition-all transform group-hover:-translate-y-1" />
                <span className="text-[11px] font-inter font-medium text-gray-400 tracking-wide uppercase group-hover:text-sage-300 transition-colors">
                  {image ? "Media Attached ✓" : "Upload Payload Screenshot"}
                </span>
                {/* Dummy hidden file input for visual effect */}
                <input 
                  type="file" 
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                  onChange={() => setImage("https://images.unsplash.com/photo-1563206767-5b18f218e8de?auto=format&fit=crop&q=80&w=800")}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full py-3.5 mt-2 rounded bg-sage-500 text-black font-orbitron font-bold text-sm tracking-widest uppercase shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:bg-sage-400 hover:shadow-[0_0_35px_rgba(0,255,157,0.6)] transition-all disabled:opacity-50 disabled:shadow-none disabled:bg-gray-600 active:scale-[0.98]"
            >
              Post
            </button>
          </form>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
