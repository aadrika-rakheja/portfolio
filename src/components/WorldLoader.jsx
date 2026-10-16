import React, { useEffect, useState } from 'react';

export default function WorldLoader({ text = "INITIALIZING 3D WORLD" }) {
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const timer1 = setTimeout(() => setProgress(65), 100);
    const timer2 = setTimeout(() => setProgress(95), 250);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0202] z-40 text-white select-none">
      <div className="flex flex-col items-center gap-3 p-8 rounded-3xl glass-panel border border-red-500/20 shadow-2xl max-w-sm w-full mx-4">
        {/* Terminal Header */}
        <div className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-red-400">
            {text}
          </span>
        </div>

        {/* Identity */}
        <h2 className="font-cursive text-3xl sm:text-4xl text-white script-shadow">
          Aadrika Rakheja
        </h2>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-2 p-0.5">
          <div
            className="h-full bg-gradient-to-r from-red-600 via-red-500 to-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Block Bar Display */}
        <div className="font-mono text-[10px] text-white/50 tracking-widest mt-1">
          {progress < 50
            ? '██████░░░░░░░░░░'
            : progress < 85
            ? '████████████░░░░'
            : '████████████████'}
        </div>
      </div>
    </div>
  );
}
