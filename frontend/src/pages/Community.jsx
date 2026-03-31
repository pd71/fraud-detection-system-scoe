import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Flame, ShieldAlert, Zap } from 'lucide-react';
import FilterBar from '../components/FilterBar';
import PostCard from '../components/PostCard';
import CreatePostModal from '../components/CreatePostModal';

// Dummy dataset simulating initial intelligence feed Let's make it look incredibly cyber/scam related
const INITIAL_POSTS = [
  {
    id: 1,
    username: 'CipherNode_09',
    avatar: 'https://images.unsplash.com/photo-1543269664-7eef42226a21?auto=format&fit=crop&q=80&w=150',
    type: 'SMS',
    content: 'WARNING: New package delivery scam mimicking USPS. The payload link redirects to a credential harvester masked as a re-scheduling fee portal. Do NOT click tracking links originating from non-short-code numbers.',
    image: null,
    likes: 342,
    dislikes: 12,
    comments: [
      { id: 101, text: 'Saw this yesterday, almost fell for it. Thanks for the heads up.', author: 'SysAdmin_Pete' },
      { id: 102, text: 'The fake domain is registered in Panama. Adding to blacklist.', author: 'NetSec_Ops' }
    ],
    timestamp: '2 hours ago',
    score: 342 + 2, // Dummy trending score
  },
  {
    id: 2,
    username: 'NeoCortex',
    avatar: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=150',
    type: 'Image',
    content: 'Deepfake investment scam circulating on Instagram Reels. The audio is synthetic (listen for aberrant breathing artifacts) but mimics Elon Musk perfectly. They are pushing a fake crypto presale.',
    image: 'https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?auto=format&fit=crop&q=80&w=800',
    likes: 890,
    dislikes: 3,
    comments: [],
    timestamp: '5 hours ago',
    score: 890,
  },
  {
    id: 3,
    username: 'Ghost_Protocol',
    avatar: null,
    type: 'URL',
    content: 'Found a malicious domain homoglyph attack. They registered "paypal.com" but used a Cyrillic "a". Bypasses standard visual checks easily. Reported to registrars, but it\'s still active as of 0900 UTC.',
    image: null,
    likes: 156,
    dislikes: 0,
    comments: [
      { id: 103, text: 'Classic IDN homograph. Modern browsers should flag this, what browser did they test on?', author: 'ZeroDay_Hunter' }
    ],
    timestamp: '15 mins ago',
    score: 156 + 1,
  },
  {
    id: 4,
    username: 'Securita_Max',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&q=80&w=150',
    type: 'Email',
    content: 'Spear-phishing campaign explicitly targeting HR departments. Email contains a PDF titled "Q3_Updated_Benefits.pdf" which executes an obfuscated macro dropping a remote access trojan. Header spoofs internal domains.',
    image: null,
    likes: 210,
    dislikes: 4,
    comments: [
      { id: 104, text: 'We just blocked this across our tenant.', author: 'CorpSec_Lead' }
    ],
    timestamp: '1 day ago',
    score: 210 + 1,
  }
];

const FILTERS = ['Trending', 'Most Trusted', 'Latest'];

export default function Community() {
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeFilter, setActiveFilter] = useState('Trending');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sorting logic for dummy data
  const sortedPosts = useMemo(() => {
    switch (activeFilter) {
      case 'Trending':
        // Sort by arbitrary "score" (likes + comments approx)
        return [...posts].sort((a, b) => b.score - a.score);
      case 'Most Trusted':
        // Sort by highest likes minus dislikes ratio
        return [...posts].sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
      case 'Latest':
        // Sort by ID descending assuming higher ID = newer (since it's dummy)
        return [...posts].sort((a, b) => b.id - a.id);
      default:
        return posts;
    }
  }, [posts, activeFilter]);

  const handleCreatePost = (newPostData) => {
    const newPost = {
      id: Date.now(),
      username: 'You',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150',
      type: newPostData.type,
      content: newPostData.content,
      image: newPostData.image,
      likes: 0,
      dislikes: 0,
      comments: [],
      timestamp: 'Just now',
      score: 0,
    };
    
    // Add to top of feed
    setPosts([newPost, ...posts]);
    setIsModalOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center w-full min-h-screen pt-28 px-4 z-20 overflow-x-hidden relative"
    >
      <div className="w-full max-w-2xl flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-orbitron font-bold text-white mb-2 flex items-center gap-3 drop-shadow-[0_0_15px_rgba(255,255,255,0.1)]">
            THREAT <span className="text-sage-400 drop-shadow-[0_0_15px_rgba(0,255,157,0.8)] animate-pulse">FEED</span>
          </h1>
          <p className="text-gray-400 font-inter text-sm md:text-base tracking-wide drop-shadow-[0_0_5px_rgba(255,255,255,0.05)]">
            Decentralized intelligence reporting. Stay ahead of zero-days.
          </p>
        </div>
      </div>

      <div className="w-full max-w-2xl">
        <FilterBar 
          filters={FILTERS} 
          activeFilter={activeFilter} 
          onSelect={setActiveFilter} 
        />
      </div>

      <div className="w-full max-w-2xl pb-24">
        <AnimatePresence mode="popLayout">
          {sortedPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </AnimatePresence>
      </div>

      {isModalOpen && (
        <CreatePostModal 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreatePost} 
        />
      )}

      {/* Floating Action Button for Create Post */}
      <button 
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-10 right-10 group flex items-center justify-center w-16 h-16 bg-sage-500 rounded-full shadow-[0_0_30px_rgba(0,255,157,0.5)] hover:bg-sage-400 hover:shadow-[0_0_50px_rgba(0,255,157,0.8)] hover:-translate-y-1 transition-all duration-300 z-50 overflow-hidden"
      >
        <div className="absolute inset-0 w-1/2 h-full bg-white/30 skew-x-12 -translate-x-full group-hover:translate-x-[200%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
        <Plus className="w-8 h-8 text-black drop-shadow-md relative z-10 font-bold" />
      </button>
    </motion.div>
  );
}
