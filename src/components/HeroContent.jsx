import React from 'react';
import { ArrowUpRight, MessageCircle } from 'lucide-react';

export default function HeroContent({ onOpenResume, onOpenContact }) {
  return (
    <div className="fixed bottom-10 left-6 sm:left-12 md:left-16 z-30 flex flex-col items-start max-w-sm pointer-events-auto">
      {/* "Hi, I'm" subtitle */}
      <span className="text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-white/80 pl-1 drop-shadow">
        Hi, I'm
      </span>

      {/* Name in large, elegant cursive script */}
      <h1 className="font-cursive text-6xl sm:text-7xl md:text-8xl text-white script-shadow -mt-1 sm:-mt-2 mb-2 sm:mb-3 font-bold tracking-wide select-none">
        Aadrika
      </h1>

      {/* Compact 3-line bio about Full Stack Development */}
      <p className="text-white/85 text-xs sm:text-sm leading-relaxed max-w-[340px] mb-6 font-normal drop-shadow">
        Computer Science student building polished full-stack applications, 
        scalable backends, and AI-powered products.
      </p>

      {/* Two stylish white pill buttons */}
      <div className="flex items-center gap-3.5 flex-wrap">
        {/* Resume pill button (solid white with arrow icon) */}
        <button
          onClick={onOpenResume}
          className="group relative px-6 py-3 bg-white text-gray-950 font-semibold text-xs sm:text-sm tracking-wide rounded-full flex items-center gap-2 shadow-xl hover:shadow-[0_10px_25px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="View Resume"
        >
          <span>Resume</span>
          <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </button>

        {/* Let's Talk button (frosted glass / white border) */}
        <button
          onClick={onOpenContact}
          className="group relative px-6 py-3 glass-pill text-white font-medium text-xs sm:text-sm tracking-wide rounded-full flex items-center gap-2 shadow-lg hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Contact Aadrika"
        >
          <MessageCircle className="w-4 h-4 text-white/80 group-hover:text-white transition-colors" />
          <span>Let's Talk</span>
        </button>
      </div>
    </div>
  );
}
