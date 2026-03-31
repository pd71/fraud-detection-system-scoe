import { motion } from 'framer-motion';

export default function FilterBar({ filters, activeFilter, onSelect }) {
  return (
    <div className="flex items-center justify-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-hide">
      {filters.map((filter) => {
        const isActive = activeFilter === filter;
        return (
          <button
            key={filter}
            onClick={() => onSelect(filter)}
            className={`relative px-6 py-2.5 rounded-full font-orbitron font-semibold text-sm transition-all whitespace-nowrap tracking-wide flex-shrink-0 ${
              isActive 
                ? 'text-sage-400 bg-sage-500/10 shadow-[0_0_15px_rgba(0,255,157,0.1)] border border-sage-500/50' 
                : 'text-gray-400 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10 hover:border-white/20'
            }`}
          >
            {filter}
          </button>
        );
      })}
    </div>
  );
}
