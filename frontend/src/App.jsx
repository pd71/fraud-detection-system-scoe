import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      setCursor({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden text-white font-body">

      {/* Cursor Glow */}
      <div
        className="pointer-events-none fixed w-[300px] h-[300px] bg-emerald-400/10 blur-[120px] rounded-full z-50"
        style={{
          left: cursor.x - 150,
          top: cursor.y - 150,
        }}
      />

      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[150px] rounded-full top-[-100px] left-[-100px] animate-floatSlow"></div>
        <div className="absolute w-[400px] h-[400px] bg-green-400/10 blur-[120px] rounded-full bottom-[-100px] right-[-100px] animate-floatMedium"></div>
      </div>

      {/* Circuit Background */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
          <g stroke="rgba(16,185,129,0.25)" strokeWidth="1.2" fill="none">

            {/* Horizontal paths */}
            <path d="M0 100 H200 L250 150 H400 L450 100 H800" />
            <path d="M0 300 H150 L200 250 H350 L400 300 H800" />
            <path d="M0 500 H300 L350 450 H600 L650 500 H800" />

            {/* Vertical paths */}
            <path d="M100 0 V150 L150 200 V400 L100 450 V600" />
            <path d="M400 0 V200 L450 250 V450 L400 500 V600" />
            <path d="M700 0 V100 L650 150 V350 L700 400 V600" />

            {/* Nodes */}
            <circle cx="250" cy="150" r="3" fill="#34d399" />
            <circle cx="200" cy="250" r="3" fill="#34d399" />
            <circle cx="350" cy="450" r="3" fill="#34d399" />
            <circle cx="150" cy="200" r="3" fill="#34d399" />
            <circle cx="450" cy="250" r="3" fill="#34d399" />
            <circle cx="650" cy="150" r="3" fill="#34d399" />

          </g>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">

        <h1 className="text-6xl md:text-7xl font-cyber tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 to-green-500">
          FRAUDGUARD
        </h1>

        <p className="mt-5 text-lg max-w-xl font-body bg-gradient-to-r from-emerald-200 to-gray-400 text-transparent bg-clip-text">
          Intelligent AI shield protecting you from scams, phishing, and digital fraud in real-time.
        </p>

      </div>

    </div>
  );
}

export default App;