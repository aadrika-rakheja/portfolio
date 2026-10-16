import React, { useState } from 'react';
import {
  ExternalLink, ChevronRight, Sparkles, Users, Layers,
  Cpu, Code, Database, Brain, Wrench, BookOpen,
  Briefcase, CheckCircle2, GraduationCap, ArrowUpRight,
  MessageCircle, X, FolderGit2, Star
} from 'lucide-react';
import { GithubIcon, LeetCodeIcon } from './Icons';
import { PORTFOLIO_DATA } from '../data/portfolioData';

// ─────────────────────────────────────────────────────────────────────────────
// Work / Project Lab Panel
// ─────────────────────────────────────────────────────────────────────────────
function ProjectCard({ project, onSelect, badge, badgeColor = 'red' }) {
  const badgeColors = {
    red: 'bg-red-600/30 text-red-300 border-red-500/30',
    green: 'bg-emerald-950/60 text-emerald-300 border-emerald-500/30',
    yellow: 'bg-yellow-950/50 text-yellow-300 border-yellow-500/30',
  };
  return (
    <div
      onClick={() => onSelect && onSelect(project)}
      className="group p-4 rounded-2xl glass-panel border border-white/15 hover:border-red-500/50 transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(236,5,4,0.2)] hover:bg-red-950/10"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className={`text-[10px] font-mono tracking-widest uppercase px-2 py-0.5 rounded-full border flex items-center gap-1 ${badgeColors[badgeColor] || badgeColors.red}`}>
              {badgeColor === 'red' && <Sparkles className="w-2.5 h-2.5" />}
              {badge}
            </span>
            {project.status && (
              <span className="text-[10px] font-mono text-yellow-300 bg-yellow-950/50 px-2 py-0.5 rounded-full border border-yellow-500/30">
                {project.status}
              </span>
            )}
          </div>
          <h3 className="text-base font-bold text-white tracking-tight">{project.title}</h3>
          <p className="text-xs text-white/60 font-medium">{project.tagline}</p>
        </div>
        <ChevronRight className="w-4 h-4 text-red-400 shrink-0 mt-1 group-hover:translate-x-0.5 transition-transform" />
      </div>

      <p className="text-[11px] text-white/75 leading-relaxed line-clamp-2 mb-3">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1 mb-3">
        {project.techStack.slice(0, 5).map((t, i) => (
          <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white/85 border border-white/5">
            {t}
          </span>
        ))}
        {project.techStack.length > 5 && (
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/10 text-white/60">
            +{project.techStack.length - 5}
          </span>
        )}
      </div>

      <div className="flex items-center justify-between pt-2.5 border-t border-white/10 text-[11px]">
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={e => e.stopPropagation()}
          className="flex items-center gap-1.5 text-white/70 hover:text-white transition-colors"
        >
          <GithubIcon className="w-3.5 h-3.5" />
          <span>GitHub</span>
        </a>
        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            onClick={e => e.stopPropagation()}
            className="flex items-center gap-1 text-red-300 hover:text-red-200 font-medium transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-white/30 text-[10px] font-mono">Click for Details</span>
        )}
      </div>
    </div>
  );
}

function WorkPanel({ onSelectProject }) {
  const finGenie = PORTFOLIO_DATA.projects.find(p => p.id === 'fingenie');
  const cognix = PORTFOLIO_DATA.projects.find(p => p.id === 'cognix');
  const miniBuilds = PORTFOLIO_DATA.miniBuilds;

  return (
    <div className="space-y-3">
      <PanelHeader label="Sector Alpha" title="Project Lab" subtitle="Interactive showcase of full-stack & AI applications" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ProjectCard project={finGenie} onSelect={onSelectProject} badge="Flagship Project" badgeColor="red" />
        <ProjectCard project={cognix} onSelect={onSelectProject} badge="Deployed Live" badgeColor="green" />
      </div>

      {/* Mini Builds */}
      <div className="p-3.5 rounded-2xl glass-panel border border-white/15">
        <div className="flex items-center gap-2 mb-2.5">
          <Layers className="w-3.5 h-3.5 text-red-400" />
          <span className="text-[10px] font-bold text-white tracking-wider uppercase">Mini Builds Archive</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {miniBuilds.map((mb) => (
            <div
              key={mb.id}
              onClick={() => onSelectProject && onSelectProject(mb)}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/25 transition-all cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-semibold text-white">{mb.title}</div>
                <div className="text-[10px] text-white/55">{mb.tagline}</div>
                <div className="flex gap-1 mt-1">
                  {mb.techStack.slice(0, 2).map((t, i) => (
                    <span key={i} className="text-[9px] font-mono px-1.5 py-px rounded bg-white/10 text-white/75">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-2">
                {mb.live && (
                  <a href={mb.live} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-red-600/30 text-red-300 hover:bg-red-600 hover:text-white transition-colors">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
                {mb.github && (
                  <a href={mb.github} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
                    className="p-1.5 rounded-lg bg-white/10 text-white/75 hover:bg-white/20 transition-colors">
                    <GithubIcon className="w-3 h-3" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skills Panel
// ─────────────────────────────────────────────────────────────────────────────
function SkillsPanel({ activeSkill, onSelectSkill }) {
  const { skills } = PORTFOLIO_DATA;
  const categories = [
    { title: 'Languages',            icon: Code,     items: skills.languages },
    { title: 'Frontend',             icon: Layers,   items: skills.frontend  },
    { title: 'Backend',              icon: Cpu,      items: skills.backend   },
    { title: 'Databases',            icon: Database, items: skills.databases },
    { title: 'AI / ML',              icon: Brain,    items: skills.ai_ml     },
    { title: 'Tools & Infra',        icon: Wrench,   items: skills.tools     },
  ];

  return (
    <div className="space-y-3">
      <PanelHeader label="Sector Beta" title="Skills Matrix" subtitle="Core technologies, active learning stacks & tooling" />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div key={idx} className="p-3 rounded-2xl glass-panel border border-white/10">
              <div className="flex items-center gap-1.5 mb-2">
                <Icon className="w-3.5 h-3.5 text-red-400" />
                <h4 className="text-[10px] font-bold text-white tracking-wider uppercase">{cat.title}</h4>
              </div>
              <div className="flex flex-wrap gap-1">
                {cat.items.map((skill, sIdx) => {
                  const isSelected = activeSkill === skill;
                  return (
                    <button
                      key={sIdx}
                      onClick={() => onSelectSkill && onSelectSkill(isSelected ? null : skill)}
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-md transition-all cursor-pointer border
                        ${isSelected
                          ? 'bg-red-600 text-white border-red-400 scale-105 shadow-md shadow-red-600/40'
                          : 'bg-white/10 text-white/85 border-white/5 hover:bg-white/20 hover:border-white/20'}`}
                    >
                      {skill}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3 rounded-2xl bg-red-950/30 border border-red-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-red-400 shrink-0" />
          <div>
            <span className="text-[11px] font-bold text-white tracking-wider uppercase">Currently Learning</span>
            <p className="text-[10px] text-white/55">Actively expanding in modern architectures</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {skills.learning.map((item, i) => (
            <span key={i} className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-red-500/20 text-red-200 border border-red-500/40">
              {item}
            </span>
          ))}
        </div>
      </div>

      {activeSkill && (
        <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-white/70 font-mono">
          <span className="text-red-400">↗</span> Skill highlight active — relevant projects glow in the 3D world.
          <button onClick={() => onSelectSkill && onSelectSkill(null)} className="ml-2 text-white/40 hover:text-white underline cursor-pointer">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Experience Panel
// ─────────────────────────────────────────────────────────────────────────────
function ExperiencePanel() {
  const stepcode = PORTFOLIO_DATA.experience[0];
  return (
    <div className="space-y-3">
      <PanelHeader label="Sector Gamma" title="Professional Experience" subtitle="Verified backend engineering & industry internship work" />

      <div className="p-4 rounded-2xl glass-panel border border-white/15">
        <div className="flex items-start justify-between gap-3 pb-3 mb-3 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-red-600/20 text-red-400 border border-red-500/30 shrink-0">
              <Briefcase className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">{stepcode.role}</h3>
              <p className="text-xs text-red-300 font-medium">{stepcode.company} · {stepcode.type}</p>
            </div>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-white/75 shrink-0">
            {stepcode.period}
          </span>
        </div>

        <p className="text-xs text-white/75 leading-relaxed font-light mb-4">{stepcode.description}</p>

        <div className="space-y-1.5 mb-4">
          {stepcode.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-[11px] text-white/80">
              <CheckCircle2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        <div className="pt-3 border-t border-white/10">
          <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1.5">Technologies & Infrastructure</span>
          <div className="flex flex-wrap gap-1.5">
            {stepcode.techStack.map((t, i) => (
              <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-white/85 border border-white/5">{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// About Panel
// ─────────────────────────────────────────────────────────────────────────────
function AboutPanel({ onOpenResume, onOpenContact }) {
  const { personal, education } = PORTFOLIO_DATA;
  return (
    <div className="space-y-3">
      <PanelHeader label="Sector Delta" title="About & Academic Foundation" subtitle="Engineering education, academic honors & problem solving profile" />

      <div className="p-4 rounded-2xl glass-panel border border-white/15">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div>
            <h3 className="text-base font-bold text-white">{personal.name}</h3>
            <p className="text-xs text-red-300 font-medium">{personal.title}</p>
            <p className="text-[11px] text-white/75 leading-relaxed mt-1.5 max-w-sm">{personal.bio}</p>
          </div>
          <a
            href={personal.leetcode}
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-red-500/40 transition-all flex flex-col items-center text-center shrink-0"
          >
            <LeetCodeIcon className="w-5 h-5 text-yellow-400 mb-1" />
            <span className="text-[10px] font-bold text-white leading-tight">300+</span>
            <span className="text-[8px] font-mono text-white/50">Solved</span>
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 border-t border-white/10">
          {education.map((edu, i) => (
            <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10">
              <div className="flex items-center gap-1.5 mb-1">
                <GraduationCap className="w-3.5 h-3.5 text-red-400" />
                <h4 className="text-xs font-bold text-white">{edu.institution}</h4>
              </div>
              <p className="text-[11px] text-red-300 font-medium">{edu.degree}</p>
              <p className="text-[10px] font-mono text-white/65 mt-0.5">{edu.score}</p>
              <p className="text-[9px] font-mono text-white/45">{edu.period}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={onOpenResume}
          className="px-4 py-2.5 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-full flex items-center gap-1.5 shadow-md hover:bg-white/90 transition-all cursor-pointer"
        >
          <span>View Full CV</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={onOpenContact}
          className="px-4 py-2.5 glass-pill text-white font-medium text-xs tracking-wider uppercase rounded-full flex items-center gap-1.5 shadow-md hover:bg-white/20 transition-all cursor-pointer"
        >
          <MessageCircle className="w-3.5 h-3.5 text-red-400" />
          <span>Let's Connect</span>
        </button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Hub Panel
// ─────────────────────────────────────────────────────────────────────────────
function HubPanel({ onSelectZone }) {
  const zones = [
    { id: 'work',       icon: FolderGit2,    label: 'Project Lab',    sub: 'FinGenie · Cognix · Mini Builds',      color: 'red'   },
    { id: 'skills',     icon: Cpu,           label: 'Skills Matrix',  sub: 'Languages · Frameworks · AI/ML',        color: 'red'   },
    { id: 'experience', icon: Briefcase,     label: 'Experience',     sub: 'StepCode Backend Developer Intern',     color: 'red'   },
    { id: 'about',      icon: GraduationCap, label: 'About',          sub: 'Bennett University · CGPA 9.79',        color: 'red'   },
  ];

  return (
    <div className="space-y-3">
      <PanelHeader label="Nexus Station" title="Central Hub" subtitle="Welcome to Aadrika's 3D portfolio world — select a sector to explore" />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {zones.map(z => {
          const Icon = z.icon;
          return (
            <button
              key={z.id}
              onClick={() => onSelectZone(z.id)}
              className="group p-4 rounded-2xl glass-panel border border-white/15 hover:border-red-500/50 text-left transition-all duration-300 cursor-pointer hover:shadow-[0_0_20px_rgba(236,5,4,0.15)] hover:bg-red-950/10"
            >
              <div className="flex items-center gap-2.5 mb-1.5">
                <div className="p-2 rounded-xl bg-red-600/20 border border-red-500/20 group-hover:bg-red-600 transition-colors">
                  <Icon className="w-3.5 h-3.5 text-red-400 group-hover:text-white transition-colors" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white tracking-wide flex items-center gap-1">
                    {z.label}
                    <ChevronRight className="w-3 h-3 text-red-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </div>
              <p className="text-[10px] text-white/50 font-mono pl-[2.4rem]">{z.sub}</p>
            </button>
          );
        })}
      </div>

      <div className="p-3 rounded-xl bg-red-950/20 border border-red-500/20 text-[11px] text-white/55 font-mono flex items-center gap-2">
        <Star className="w-3.5 h-3.5 text-red-400 shrink-0" />
        Use the nav above or click a sector card to jump directly to that area of the portfolio.
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Shared Panel Header
// ─────────────────────────────────────────────────────────────────────────────
function PanelHeader({ label, title, subtitle }) {
  return (
    <div className="pb-2 border-b border-white/10">
      <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-red-400 bg-red-950/60 px-2.5 py-0.5 rounded-full border border-red-500/30">
        {label}
      </span>
      <h2 className="text-lg font-bold tracking-tight text-white mt-1.5">{title}</h2>
      <p className="text-[11px] text-white/55 mt-0.5">{subtitle}</p>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main ZonePanel — DOM overlay that slides up from bottom-left
// ─────────────────────────────────────────────────────────────────────────────
export default function ZonePanel({
  activeZone,
  onSelectZone,
  onSelectProject,
  activeSkill,
  onSelectSkill,
  onOpenResume,
  onOpenContact,
}) {
  const isVisible = true; // always visible in 3D world

  const renderContent = () => {
    switch (activeZone) {
      case 'work':       return <WorkPanel onSelectProject={onSelectProject} />;
      case 'skills':     return <SkillsPanel activeSkill={activeSkill} onSelectSkill={onSelectSkill} />;
      case 'experience': return <ExperiencePanel />;
      case 'about':      return <AboutPanel onOpenResume={onOpenResume} onOpenContact={onOpenContact} />;
      case 'hub':
      default:           return <HubPanel onSelectZone={onSelectZone} />;
    }
  };

  return (
    <div
      key={activeZone}
      className={`absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-6 pb-14 overflow-y-auto scrollbar-none ${activeZone === 'hub' ? 'pt-3 max-h-[58vh]' : 'pt-1 max-h-[75vh]'}`}
      style={{
        background: activeZone === 'hub'
          ? 'linear-gradient(to top, rgba(10,2,2,0.98) 0%, rgba(10,2,2,0.92) 80%, transparent 100%)'
          : 'linear-gradient(to top, rgba(10,2,2,0.98) 0%, rgba(10,2,2,0.95) 90%, transparent 100%)',
        animation: 'slideUpFade 0.35s ease-out both',
      }}
    >
      {/* Fade-in animation keyframes injected inline */}
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>

      <div className="max-w-3xl mx-auto">
        {renderContent()}
      </div>
    </div>
  );
}
