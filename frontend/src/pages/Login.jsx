import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AuthBox from '../components/AuthBox';
import InputField from '../components/InputField';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if(email && password) {
       navigate('/dashboard');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 w-full pt-16"
    >
      <AuthBox title="Welcome Back" subtitle="Secure Access Portal">
        <form onSubmit={handleLogin} className="flex flex-col mt-4">
          <InputField label="Email Address" type="email" placeholder="agent@fraudguard.ai" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField label="Password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit" className="mt-8 w-full py-4 bg-sage-500 text-black font-orbitron font-bold text-lg rounded-xl transition-all duration-300 hover:bg-sage-400 shadow-[0_0_20px_rgba(0,255,157,0.3)] hover:shadow-[0_0_30px_rgba(0,255,157,0.6)] hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
            Login
          </button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-sage-500/20">
          <Link to="/signup" className="text-gray-400 font-inter text-sm hover:text-sage-400 transition-colors">
            Don't have an account? <span className="font-semibold text-white ml-1 hover:text-sage-400">Sign up</span>
          </Link>
        </div>
      </AuthBox>
    </motion.div>
  );
}
