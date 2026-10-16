import React from 'react';
import { Home, FolderGit2, Cpu, Briefcase, GraduationCap, Compass, MessageCircle } from 'lucide-react';

export default function WorldHUD({
  activeZone = 'hub',
  onSelectZone,
  onReturnHome,
  onOpenContact
}) {
  const sectors = [
    { id: 'hub', label: 'HUB', icon: Compass },
    { id: 'work', label: 'PROJECT LAB', icon: FolderGit2 },
    { id: 'skills', label: 'SKILLS', icon: Cpu },
    { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
    { id: 'about', label: 'ABOUT', icon: GraduationCap }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-40 select-none">
      {/* Top Bar Navigation */}
      <header className="absolute top-4 sm:top-6 left-0 right-0 px-4 sm:px-8 flex items-center justify-between pointer-events-auto">
        {/* Back to Home Button */}
        <button
          onClick={onReturnHome}
          className="group glass-pill px-3.5 sm:px-4 py-2 rounded-full flex items-center gap-2 text-white hover:text-white transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer"
          aria-label="Return to Homepage"
        >
          <Home className="w-3.5 h-3.5 text-red-400 group-hover:-translate-x-0.5 transition-transform" />
          <span className="text-xs font-bold tracking-wider uppercase">
            Home
          </span>
        </button>

        {/* Central Sector Switcher */}
        <nav
          className="glass-pill rounded-full p-1 flex items-center gap-1 shadow-2xl max-w-[90vw] overflow-x-auto scrollbar-none"
          role="navigation"
          aria-label="3D World Navigation"
        >
          {sectors.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeZone === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => onSelectZone(sec.id)}
                className={`relative px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider transition-all duration-300 rounded-full flex items-center gap-1.5 cursor-pointer whitespace-nowrap
                  ${isActive
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/40'
                    : 'text-white/75 hover:text-white hover:bg-white/10'}`}
              >
                <Icon className={`w-3 h-3 ${isActive ? 'text-white' : 'text-red-400'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right CTA: Let's Talk */}
        <button
          onClick={onOpenContact}
          className="hidden sm:flex glass-pill px-3.5 sm:px-4 py-2 rounded-full items-center gap-2 text-white hover:scale-105 transition-all duration-300 shadow-xl cursor-pointer"
          aria-label="Contact Aadrika"
        >
          <MessageCircle className="w-3.5 h-3.5 text-red-400" />
          <span className="text-xs font-bold tracking-wider uppercase">
            Let's Talk
          </span>
        </button>
      </header>

    </div>
  );
}
