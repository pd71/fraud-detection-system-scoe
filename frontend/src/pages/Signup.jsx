import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthBox from '../components/AuthBox';
import InputField from '../components/InputField';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if(username && email && password) {
       navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 w-full pt-16"
    >
      <AuthBox title="Join FraudGuard" subtitle="Create your secure identity profile">
        <form onSubmit={handleSignup} className="flex flex-col mt-4">
          <InputField label="Username" type="text" placeholder="AgentName" value={username} onChange={(e) => setUsername(e.target.value)} />
          <InputField label="Email Address" type="email" placeholder="agent@fraudguard.ai" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Phone Number" type="tel" placeholder="+1 (555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="mt-8 w-full py-4 bg-sage-500 text-black font-orbitron font-bold text-lg rounded-xl transition-all duration-300 hover:bg-sage-400 shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
            Sign Up
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-sage-500/20">
          <Link to="/login" className="text-gray-400 font-inter text-sm hover:text-sage-400 transition-colors">
            Already have an account? <span className="font-semibold text-white ml-1 hover:text-sage-400">Login</span>
          </Link>
        </div>
      </AuthBox>
    </motion.div>
  );
}
