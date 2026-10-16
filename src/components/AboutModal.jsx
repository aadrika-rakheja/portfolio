import React from 'react';
import { X, Code2, Server, Cpu, Palette } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const skillGroups = [
    {
      title: "Frontend & Creative Tech",
      icon: <Code2 className="w-4 h-4 text-white" />,
      items: ["React / Next.js", "TypeScript", "Canvas 2D / WebGL", "Tailwind CSS", "GSAP / Framer Motion", "State Architectures"]
    },
    {
      title: "Backend & Cloud",
      icon: <Server className="w-4 h-4 text-white" />,
      items: ["Node.js / Express", "Python / FastAPI", "Go", "PostgreSQL", "Redis / Cache Design", "REST & GraphQL APIs"]
    },
    {
      title: "Architecture & DevOps",
      icon: <Cpu className="w-4 h-4 text-white" />,
      items: ["Docker & Containers", "AWS & Cloudflare", "CI/CD Pipelines", "System Design", "Microservices", "Performance Profiling"]
    },
    {
      title: "Design & Interaction",
      icon: <Palette className="w-4 h-4 text-white" />,
      items: ["Luxury UI/UX", "Micro-Interactions", "Responsive Systems", "Design Systems", "Prototyping", "Accessibility (a11y)"]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md transition-opacity duration-300">
      <div 
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 text-white border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-mono">Philosophy & Background</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">About Aadrika</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full glass-pill hover:bg-white/25 transition-colors cursor-pointer text-white/80 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Bio Narrative */}
        <div className="mt-6 space-y-4 text-sm sm:text-base text-white/85 leading-relaxed font-light">
          <p>
            I am a <strong className="text-white font-semibold">Full Stack Engineer</strong> dedicated to the intersection of luxury aesthetic design, high-performance visual computing, and robust cloud infrastructure.
          </p>
          <p>
            Whether engineering sub-millisecond interactive canvas engines, orchestrating distributed microservices, or sculpting bespoke design systems, my focus remains uncompromising: <em className="text-white font-normal">absolute fluidity, zero lag, and unforgettable human interaction.</em>
          </p>
        </div>

        {/* Skill Matrix */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {skillGroups.map((group, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="p-1.5 rounded-lg bg-white/15">
                  {group.icon}
                </div>
                <h4 className="text-sm font-semibold text-white tracking-wide">{group.title}</h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {group.items.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-2 py-0.5 rounded-md bg-white/10 text-white/90 border border-white/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
