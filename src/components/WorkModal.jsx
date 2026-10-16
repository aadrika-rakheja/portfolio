import React from 'react';
import { X, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';

const PROJECTS = [
  {
    title: "Aura AI Studio",
    tagline: "Generative Multimodal Interface & Workflow Engine",
    description: "Next-generation generative creative canvas featuring real-time diffusion streaming, WebGL node graph composition, and sub-50ms latency WebSocket synchronization.",
    tags: ["React", "TypeScript", "WebGL", "FastAPI", "WebSockets"],
    live: "https://example.com/aura",
    github: "https://github.com",
    featured: true
  },
  {
    title: "Verve Luxury Commerce",
    tagline: "High-Speed Headless Luxury Storefront",
    description: "Sub-second loading headless storefront with 3D product visualizer, zero-ghosting micro-interactions, and high-concurrency serverless checkout orchestration.",
    tags: ["Next.js", "Three.js", "Tailwind CSS", "Stripe API", "Redis"],
    live: "https://example.com/verve",
    github: "https://github.com",
    featured: false
  },
  {
    title: "Pulse Realtime Analytics",
    tagline: "Global Cloud Metrics & Event Streaming Platform",
    description: "Distributed analytics engine processing over 10M events/sec with Apache Kafka, interactive multi-dimensional dashboards, and sub-100ms anomaly alerting.",
    tags: ["Go", "Kafka", "ClickHouse", "React", "Docker"],
    live: "https://example.com/pulse",
    github: "https://github.com",
    featured: false
  }
];

export default function WorkModal({ isOpen, onClose }) {
  if (!isOpen) return null;

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
            <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-mono">Portfolio</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Featured Work</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full glass-pill hover:bg-white/25 transition-colors cursor-pointer text-white/80 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Project List */}
        <div className="mt-6 space-y-6">
          {PROJECTS.map((proj, idx) => (
            <div
              key={idx}
              className="group p-5 sm:p-6 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-white/95">
                    {proj.title}
                  </h3>
                  {proj.featured && (
                    <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-white text-black rounded-full flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-black" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full glass-pill hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    aria-label="GitHub Repository"
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-full glass-pill hover:bg-white/20 text-white/80 hover:text-white transition-colors"
                    aria-label="Live Demo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <p className="text-sm text-white/70 font-medium mt-1 mb-3">
                {proj.tagline}
              </p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-4">
                {proj.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {proj.tags.map((t, tidx) => (
                  <span
                    key={tidx}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-white/10 text-white/90 border border-white/10"
                  >
                    {t}
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
