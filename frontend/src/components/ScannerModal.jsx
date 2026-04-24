import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, ShieldAlert, AlertTriangle, Loader2, UploadCloud } from 'lucide-react';

export default function ScannerModal({ type, onClose }) {
  const [formData, setFormData] = useState({
    type: type,
    content: '',
    senderEmail: ''
  });
  const [file, setFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null); 

  const handleScan = async () => {
    // If empty input, refuse scan
    if (!formData.content && !file && type !== 'Image') return;
    
    setScanning(true);
    setResult(null);

    try {
      const payload = {
        type: type.toLowerCase(),
        content: formData.content,
        sender: type === 'Email' ? formData.senderEmail : undefined
      };

      let apiUrl = import.meta.env.VITE_API_URL || '';
      if (apiUrl && !apiUrl.startsWith('http')) {
        apiUrl = `https://${apiUrl}`;
      }
      
      const response = await fetch(`${apiUrl}/detect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      
      const data = await response.json();
      
      const apiResponse = {
        type: type.toLowerCase(),
        prediction: data.prediction,
        confidence: data.confidence
      };

      // Interpretation Logic Converter
      let statusInfo = {};
      if (apiResponse.prediction === 1 && apiResponse.confidence < 0.8) {
        statusInfo = { 
          status: 'warning', 
          title: 'Suspicious', 
          desc: 'Characteristics of a threat are present, but confidence is mixed. Proceed with heightened caution.', 
          color: 'text-yellow-400', border: 'border-yellow-400', bg: 'bg-yellow-400/10' 
        };
      } else if (apiResponse.prediction === 1) {
        statusInfo = { 
          status: 'danger', 
          title: 'Scam', 
          desc: 'High probability of malicious intent. Threat vector confirmed. Do not engage.', 
          color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-500/10' 
        };
      } else {
         statusInfo = { 
          status: 'safe', 
          title: 'Not a Scam', 
          desc: 'No known malicious signatures or behaviors detected in tracking algorithms.', 
          color: 'text-sage-400', border: 'border-sage-400', bg: 'bg-sage-400/10' 
        };
      }
      
      setResult({ ...apiResponse, ...statusInfo });
    } catch (err) {
      console.error(err);
      setResult({
        status: 'danger',
        title: 'Error',
        desc: 'Failed to connect to the analysis engine.',
        color: 'text-red-500', border: 'border-red-500', bg: 'bg-red-500/10',
        type: type.toLowerCase(),
        prediction: null,
        confidence: 0
      });
    } finally {
      setScanning(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-lg glass-panel bg-cyber-dark/80 backdrop-blur-2xl border border-sage-500/30 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,255,157,0.1)] p-8"
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white hover:rotate-90 transition-all duration-300 z-10">
            <X className="w-6 h-6" />
          </button>

          <h2 className="text-3xl font-orbitron font-bold text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
            <span className="text-sage-400 drop-shadow-[0_0_15px_rgba(0,255,157,0.8)]">{type}</span> Analyzer
          </h2>
          <p className="text-gray-400 font-inter text-sm mb-6 max-w-sm">Deep inspection against global intelligence bases and AI threat models.</p>

          <div className="mb-6 flex flex-col gap-4">
            
            {/* Auto-filled Type Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-orbitron font-bold text-gray-400 tracking-widest uppercase">Target Vector Type</label>
              <input
                 type="text"
                 value={type}
                 disabled
                 className="w-full bg-black/30 border border-white/5 rounded-lg p-3 font-inter text-gray-500 text-sm cursor-not-allowed shadow-inner"
              />
            </div>

            {/* Email-specific Input */}
            {type === 'Email' && (
              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-orbitron font-bold text-sage-400 tracking-widest uppercase">Email Address of Sender</label>
                <input
                  type="email"
                  value={formData.senderEmail}
                  onChange={e => setFormData({...formData, senderEmail: e.target.value})}
                  className="w-full bg-black/50 border border-sage-500/30 rounded-lg p-3 font-inter text-white text-sm focus:outline-none focus:border-sage-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.3)] transition-all"
                  placeholder="e.g. unknown-secure-billing@example.com"
                />
              </div>
            )}

            {/* Content / Payload Input */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-orbitron font-bold text-sage-400 tracking-widest uppercase">Payload Content</label>
              {type === 'Image' ? (
                 <div className="w-full h-32 border-2 border-dashed border-sage-500/40 rounded-xl bg-black/40 flex flex-col items-center justify-center cursor-pointer hover:border-sage-400 transition-colors group">
                   <UploadCloud className="w-8 h-8 text-sage-500 group-hover:drop-shadow-[0_0_10px_rgba(0,255,157,0.8)] mb-2 transition-all" />
                   <span className="text-sm font-inter text-gray-300 group-hover:text-white transition-colors">Drag & Drop visual payload here</span>
                   {/* Dummy File Input purely for standard mechanics */}
                   <input type="file" className="hidden" />
                 </div>
              ) : type === 'URL' ? (
                 <input
                   type="url"
                   value={formData.content}
                   onChange={e => setFormData({...formData, content: e.target.value})}
                   className="w-full bg-black/50 border border-sage-500/30 rounded-lg p-3 font-inter text-white text-sm focus:outline-none focus:border-sage-400 focus:shadow-[0_0_20px_rgba(0,255,157,0.3)] transition-all"
                   placeholder="Enter https:// URL to scan..."
                 />
              ) : (
                 <textarea
                   rows={type === 'Email' ? 4 : 3}
                   value={formData.content}
                   onChange={e => setFormData({...formData, content: e.target.value})}
                   className="w-full bg-black/50 border border-sage-500/30 rounded-lg p-3 font-inter text-white text-sm focus:outline-none focus:border-sage-400 focus:shadow-[0_0_20px_rgba(0,255,157,0.3)] transition-all resize-none"
                   placeholder={`Paste raw ${type} payload here...`}
                 />
              )}
            </div>
          </div>

          {!result && !scanning && (
            <button onClick={handleScan} className="w-full py-3 rounded bg-sage-500 text-black font-orbitron font-bold hover:bg-sage-400 transition-all shadow-[0_0_15px_rgba(0,255,157,0.4)] hover:shadow-[0_0_25px_rgba(0,255,157,0.7)] text-lg uppercase tracking-widest active:scale-95">
              Initiate Vector Scan
            </button>
          )}

          {scanning && (
            <div className="w-full py-6 flex flex-col items-center justify-center border border-sage-500/30 rounded bg-sage-500/10 shadow-[inset_0_0_20px_rgba(0,255,157,0.1)]">
              <Loader2 className="w-10 h-10 text-sage-400 animate-spin drop-shadow-[0_0_15px_rgba(0,255,157,0.8)] mb-3" />
              <span className="font-orbitron font-medium text-sage-400 animate-pulse tracking-widest text-sm">ANALYZING SIGNATURES...</span>
            </div>
          )}

          {result && !scanning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring' }}
              className={`w-full p-5 rounded border ${result.border} ${result.bg} flex items-start gap-4 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]`}
            >
              <div className={`mt-1 flex-shrink-0 ${result.color} drop-shadow-[0_0_15px_currentColor]`}>
                {result.status === 'safe' && <ShieldCheck className="w-8 h-8" />}
                {result.status === 'warning' && <AlertTriangle className="w-8 h-8" />}
                {result.status === 'danger' && <ShieldAlert className="w-8 h-8" />}
              </div>
              <div className="flex flex-col flex-1 pl-1">
                
                <div className="flex justify-between items-center mb-1.5 gap-2">
                  <h4 className={`font-orbitron font-bold text-lg ${result.color} drop-shadow-[0_0_8px_currentColor] leading-tight`}>
                    {result.title}
                  </h4>
                  <span className={`flex-shrink-0 font-orbitron font-bold text-[11px] px-2.5 py-1 uppercase tracking-widest rounded border ${result.border} ${result.bg} ${result.color}`}>
                    {(result.confidence * 100).toFixed(1)}% Conf
                  </span>
                </div>

                <p className="font-inter text-sm text-gray-200 leading-relaxed opacity-90 mb-4">{result.desc}</p>
                
                <div className="w-full bg-black/40 rounded p-3 border border-white/5 flex flex-col gap-1 mb-4">
                  <span className="text-[10px] font-orbitron font-bold text-gray-400 tracking-widest uppercase mb-1">Raw API Trace</span>
                  <div className="font-mono text-xs text-gray-300">
                    <span className="text-purple-400">"type"</span>: "{result.type}"<br/>
                    <span className="text-purple-400">"prediction"</span>: {result.prediction}<br/>
                    <span className="text-purple-400">"confidence"</span>: {result.confidence.toFixed(4)}
                  </div>
                </div>

                <button 
                  onClick={() => { setResult(null); setFormData({...formData, content: ''}); }}
                  className="self-start text-xs font-inter font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors"
                >
                  Scan New Payload
                </button>
              </div>
            </motion.div>
          )}

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
