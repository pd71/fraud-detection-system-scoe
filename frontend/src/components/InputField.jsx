import { useState } from 'react';

export default function InputField({ label, type = "text", value, onChange, placeholder, required = true }) {
  const [isFocused, setIsFocused] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  
  const showError = required && isDirty && !value;

  return (
    <div className="mb-7 flex flex-col items-start w-full relative">
      <label className="text-[13px] font-orbitron text-gray-300 tracking-widest font-semibold mb-2 ml-1 uppercase">
        {label} {required && <span className="text-sage-500">*</span>}
      </label>
      
      <div 
        className={`w-full rounded-xl transition-all duration-300 border bg-black/50 backdrop-blur-lg overflow-hidden flex items-center ${
          isFocused 
            ? 'border-sage-400 shadow-[0_0_25px_rgba(0,255,157,0.3)] bg-black/80' 
            : showError 
              ? 'border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]' 
              : 'border-sage-500/20 hover:border-sage-500/60'
        }`}
      >
        <input
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => { setIsFocused(false); setIsDirty(true); }}
          placeholder={placeholder}
          className="w-full bg-transparent px-5 py-3.5 text-white font-inter text-base placeholder-gray-600 focus:outline-none transition-colors"
        />
      </div>
      
      {showError && (
        <span className="absolute -bottom-5 left-1 text-[11px] text-red-500 tracking-wider font-orbitron uppercase">Required Field</span>
      )}
    </div>
  );
}
