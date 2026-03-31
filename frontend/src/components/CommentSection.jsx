import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User } from 'lucide-react';

export default function CommentSection({ comments: initialComments }) {
  const [comments, setComments] = useState(initialComments || []);
  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    setComments([...comments, { id: Date.now(), text: newComment, author: 'You', avatar: null }]);
    setNewComment('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      className="mt-6 pt-4 border-t border-sage-500/20"
    >
      <div className="flex flex-col gap-4 mb-4">
        <AnimatePresence>
          {comments.length === 0 ? (
            <div className="text-gray-500 text-sm italic font-inter px-2">No intelligence recorded yet. Add your analysis.</div>
          ) : (
            comments.map((comment, index) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-start gap-3"
              >
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center flex-shrink-0 overflow-hidden">
                  {comment.avatar ? (
                    <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-4 h-4 text-gray-400" />
                  )}
                </div>
                <div className="flex flex-col bg-cyber-dark/40 rounded-xl rounded-tl-none px-4 py-2.5 border border-white/5 flex-1 shadow-sm">
                  <span className="font-orbitron font-bold text-[11px] text-sage-400 mb-0.5 tracking-wider">{comment.author}</span>
                  <p className="text-gray-300 font-inter text-sm leading-relaxed">{comment.text}</p>
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddComment()}
          placeholder="Add your intelligence briefing..."
          className="flex-1 bg-black/40 border border-sage-500/30 rounded-full px-5 py-2.5 text-sm text-white focus:outline-none focus:border-sage-400 focus:shadow-[0_0_15px_rgba(0,255,157,0.2)] font-inter transition-all placeholder:text-gray-600"
        />
        <button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="p-2.5 rounded-full bg-sage-500/20 text-sage-400 hover:bg-sage-500 hover:text-black hover:shadow-[0_0_15px_rgba(0,255,157,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-sage-500/50 flex-shrink-0"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </div>
    </motion.div>
  );
}
