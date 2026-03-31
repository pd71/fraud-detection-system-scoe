import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThumbsUp, ThumbsDown, MessageSquare, User, AlertTriangle } from 'lucide-react';
import CommentSection from './CommentSection';

const TAG_STYLES = {
  SMS: 'text-sage-400 bg-sage-500/10 border-sage-500/50 shadow-[0_0_10px_rgba(0,255,157,0.2)]',
  Email: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/50 shadow-[0_0_10px_rgba(6,182,212,0.2)]',
  URL: 'text-blue-400 bg-blue-500/10 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]',
  Image: 'text-teal-400 bg-teal-500/10 border-teal-500/50 shadow-[0_0_10px_rgba(20,184,166,0.2)]',
};

export default function PostCard({ post }) {
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleLike = () => { setLiked(!liked); if (!liked) setDisliked(false); };
  const handleDislike = () => { setDisliked(!disliked); if (!disliked) setLiked(false); };

  const tagStyle = TAG_STYLES[post.type] || 'text-sage-400 bg-sage-500/10 border-sage-500/50 shadow-[0_0_10px_rgba(0,255,157,0.2)]';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -2 }}
      className="w-full glass-panel bg-cyber-dark/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6 hover:shadow-[0_0_20px_rgba(0,255,157,0.05)] hover:border-sage-500/20 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-transparent via-sage-500/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="flex justify-between items-start mb-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner">
            {post.avatar ? (
              <img src={post.avatar} alt={post.username} className="w-full h-full object-cover" />
            ) : (
              <User className="w-5 h-5 text-gray-400" />
            )}
          </div>
          <div className="flex flex-col">
            <h4 className="font-orbitron font-bold text-white tracking-wide text-sm drop-shadow-[0_0_5px_rgba(255,255,255,0.2)]">{post.username}</h4>
            <span className="font-inter text-xs text-gray-500 font-medium tracking-wide">{post.timestamp}</span>
          </div>
        </div>
        
        <span className={`px-4 py-1.5 mt-1 mr-1 text-[10px] uppercase font-orbitron font-bold tracking-widest rounded-full border ${tagStyle}`}>
          {post.type} Vector
        </span>
      </div>

      <div className="mb-5">
        <p className="font-inter text-gray-200 text-[15px] leading-relaxed whitespace-pre-wrap">{post.content}</p>
        
        {post.image && (
          <div className="mt-4 rounded-xl overflow-hidden border border-white/10 relative group">
            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded text-[10px] font-orbitron font-bold text-red-500 flex items-center gap-1 border border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)] z-10 transition-transform group-hover:scale-105">
              <AlertTriangle className="w-3 h-3 animate-pulse" /> MEDIA PAYLOAD
            </div>
            <img src={post.image} alt="Reported scam payload" className="w-full h-auto max-h-96 object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-700 ease-out" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-50 pointer-events-none" />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6 mt-4">
        <button 
          onClick={handleLike}
          className={`group flex items-center gap-2 text-sm font-inter transition-all ${liked ? 'text-sage-400 drop-shadow-[0_0_8px_rgba(0,255,157,0.5)]' : 'text-gray-400 hover:text-white'}`}
        >
          <div className={`p-2 rounded-full transition-colors ${liked ? 'bg-sage-500/20' : 'bg-transparent group-hover:bg-white/5'}`}>
            <ThumbsUp className={`w-4 h-4 transition-transform group-active:scale-90 ${liked ? 'fill-sage-400 text-sage-400 shadow-[0_0_10px_currentColor]' : ''}`} />
          </div>
          <span className="font-medium">{post.likes + (liked ? 1 : 0)}</span>
        </button>
        
        <button 
          onClick={handleDislike}
          className={`group flex items-center gap-2 text-sm font-inter transition-all ${disliked ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]' : 'text-gray-400 hover:text-white'}`}
        >
          <div className={`p-2 rounded-full transition-colors ${disliked ? 'bg-red-500/20' : 'bg-transparent group-hover:bg-white/5'}`}>
            <ThumbsDown className={`w-4 h-4 transition-transform group-active:scale-90 ${disliked ? 'fill-red-400 text-red-400 shadow-[0_0_10px_currentColor]' : ''}`} />
          </div>
          <span className="font-medium">{post.dislikes + (disliked ? 1 : 0)}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className={`group flex items-center gap-2 text-sm font-inter transition-all ml-auto pr-2 ${showComments ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]' : 'text-gray-400 hover:text-white'}`}
        >
          <div className={`p-2 rounded-full transition-colors ${showComments ? 'bg-blue-500/20' : 'bg-transparent group-hover:bg-white/5'}`}>
            <MessageSquare className={`w-4 h-4 transition-transform group-active:scale-90 ${showComments ? 'fill-blue-400 text-blue-400 shadow-[0_0_10px_currentColor]' : ''}`} />
          </div>
          <span className="font-medium">{post.comments.length} Comments</span>
        </button>
      </div>

      <AnimatePresence>
        {showComments && <CommentSection comments={post.comments} />}
      </AnimatePresence>
    </motion.div>
  );
}
