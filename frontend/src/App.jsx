import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import SpotlightCursor from './components/SpotlightCursor';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Scanner from './pages/Scanner';
import Community from './pages/Community';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scanner" element={<Scanner />} />
        <Route path="/community" element={<Community />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="relative w-full min-h-screen bg-cyber-dark text-white font-inter selection:bg-sage-500/30 selection:text-sage-400 flex flex-col">
        <SpotlightCursor />
        <Navbar />
        
        {/* Animated Video Background */}
        <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-cyber-dark">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-[0.25] blur-[3px] grayscale brightness-110 contrast-125"
            poster="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
          >
            {/* Stable open-source abstract dark matrix/mesh video */}
            <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
          </video>
          
          {/* Northern Lights / Aurora Borealis Color Grade Restrictor */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#00FF9D] via-[#0066FF] to-[#00FF9D] mix-blend-color opacity-90" />
          
          {/* Refined Subtle Overlay Gradient to guarantee text readability without hiding the video */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-dark/70 via-cyber-dark/30 to-cyber-dark/70" />
        </div>

        {/* Global Persistent Background Grid & Glow (Layered above video, below content) */}
        <div className="fixed inset-0 pointer-events-none opacity-[0.03] mix-blend-overlay z-[1]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
        <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sage-500/5 rounded-full blur-[150px]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,157,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,157,0.04)_1px,transparent_1px)] bg-[size:40px_40px] opacity-30" />
        </div>

        <main className="w-full relative z-10 overflow-x-hidden flex-1 flex flex-col min-h-screen">
          <AnimatedRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
