import React, { useEffect } from 'react';
import { X, ExternalLink, Sparkles, CheckCircle2, Users, Layers, AlertCircle } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectDetailDrawer({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/60 backdrop-blur-sm transition-opacity duration-300">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide-in Drawer */}
      <div
        className="relative w-full max-w-lg h-full glass-panel border-l border-white/20 p-6 sm:p-8 text-white overflow-y-auto z-10 shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col justify-between"
        role="dialog"
        aria-modal="true"
      >
        <div>
          {/* Top Controls */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full bg-red-600/30 text-red-300 border border-red-500/30">
                {project.category || 'Project'}
              </span>
              {project.status && (
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border
                  ${project.status === 'Production Deployed'
                    ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30'
                    : 'bg-yellow-950/50 text-yellow-300 border-yellow-500/30'}`}>
                  {project.status}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full glass-pill hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
              aria-label="Close project details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Project Title & Tagline */}
          <div className="mt-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              {project.title}
            </h2>
            <p className="text-sm text-red-300 font-medium mt-1">
              {project.tagline}
            </p>
          </div>

          {/* Team Note if applicable */}
          {project.teamNote && (
            <div className="mt-3 flex items-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80">
              <Users className="w-4 h-4 text-red-400 shrink-0" />
              <span>{project.teamNote}</span>
            </div>
          )}

          {/* Description */}
          <div className="mt-5 space-y-2">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white/60">Overview</h4>
            <p className="text-xs sm:text-sm text-white/85 leading-relaxed font-light">
              {project.longDescription || project.description}
            </p>
          </div>

          {/* Core Real Features */}
          {project.features && project.features.length > 0 && (
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2.5">
                Key Architecture & Features
              </h4>
              <div className="space-y-2">
                {project.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-white/85">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tech Stack Pills */}
          {project.techStack && (
            <div className="mt-6">
              <h4 className="text-xs font-mono uppercase tracking-wider text-white/60 mb-2">
                Technologies Used
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/10 text-white/90 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons at Bottom */}
        <div className="pt-6 mt-6 border-t border-white/10 flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg"
            >
              <GithubIcon className="w-4 h-4" />
              <span>Source Code</span>
            </a>
          )}

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 px-4 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-red-600/30"
            >
              <span>{project.liveStatusText || 'Live Demo'}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          ) : (
            <div className="flex-1 py-3 px-4 rounded-xl bg-white/5 border border-white/10 text-white/40 font-mono text-xs text-center select-none flex items-center justify-center gap-1.5">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{project.liveStatusText || 'Not Deployed'}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
