import React from 'react';
import { X, Download, Briefcase, GraduationCap, Award, ExternalLink, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { personal, experience, education } = PORTFOLIO_DATA;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md transition-opacity duration-300">
      <div 
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 sm:p-8 text-white border border-white/20 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-white/10">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-white/60 font-mono">Curriculum Vitae</span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">Aadrika Rakheja</h2>
            <p className="text-xs text-white/70 mt-0.5">B.Tech CSE • Full Stack Developer</p>
          </div>
          <button
            onClick={onClose}
            className="p-2.5 rounded-full glass-pill hover:bg-white/25 transition-colors cursor-pointer text-white/80 hover:text-white"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-red-500/20 text-red-300 border border-red-500/30">
              LeetCode: {personal.leetcodeSolved}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 glass-pill text-white font-semibold text-xs tracking-wider uppercase rounded-full flex items-center gap-1.5 shadow-md hover:bg-white/20 transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View PDF</span>
            </a>
            <a
              href="/resume.pdf"
              download="Aadrika_Rakheja_Resume.pdf"
              className="px-4 py-2 bg-white text-black font-semibold text-xs tracking-wider uppercase rounded-full flex items-center gap-1.5 shadow-md hover:bg-white/90 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download CV</span>
            </a>
          </div>
        </div>

        {/* Experience Section */}
        <div className="mt-6 space-y-6">
          <div className="flex items-center gap-2 text-white/90 font-semibold text-sm tracking-wider uppercase">
            <Briefcase className="w-4 h-4 text-red-400" />
            <span>Internship Experience</span>
          </div>

          <div className="border-l-2 border-white/20 ml-2 pl-4 space-y-6">
            {experience.map((exp) => (
              <div key={exp.id} className="relative">
                <div className="absolute -left-[23px] top-1.5 w-3 h-3 rounded-full bg-red-600 border-2 border-white shadow-sm" />
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-base font-semibold text-white">{exp.role}</h3>
                  <span className="text-xs font-mono text-white/60">{exp.period}</span>
                </div>
                <div className="text-xs font-medium text-red-300 mb-2">{exp.company} • {exp.type}</div>
                <ul className="text-xs text-white/80 leading-relaxed font-light space-y-1 list-disc pl-4 mb-3">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-1.5">
                  {exp.techStack.map((tech, i) => (
                    <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/90">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Education Section */}
          <div className="pt-4 border-t border-white/10 space-y-4">
            <div className="flex items-center gap-2 text-white/90 font-semibold text-sm tracking-wider uppercase">
              <GraduationCap className="w-4 h-4 text-red-400" />
              <span>Education</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {education.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="text-sm font-semibold text-white">{edu.institution}</h4>
                  <p className="text-xs text-red-300 font-medium mt-0.5">{edu.degree}</p>
                  <p className="text-xs font-mono text-white/70 mt-1">{edu.score} • {edu.period}</p>
                  <p className="text-[11px] text-white/60 mt-2 leading-relaxed">{edu.highlights}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Core Projects Overview */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center gap-2 text-white/90 font-semibold text-sm tracking-wider uppercase mb-3">
              <Code2 className="w-4 h-4 text-red-400" />
              <span>Featured Engineering Projects</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-white">FinGenie</span>
                <p className="text-white/70 text-[11px] mt-1">Personal Finance & AI Budgeting Platform (React, Node, Express, MongoDB, Gemini AI)</p>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="font-semibold text-white">Cognix</span>
                <p className="text-white/70 text-[11px] mt-1">AI Adaptive Learning Platform (React, Express, MongoDB, Gemini AI • 3-Member Team)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
