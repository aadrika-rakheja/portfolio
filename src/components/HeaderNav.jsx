import React from 'react';

export default function HeaderNav({ onNavigateTo3D, activeZone }) {
  const navItems = [
    { id: 'work', label: 'WORK' },
    { id: 'skills', label: 'SKILLS' },
    { id: 'about', label: 'ABOUT' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-40 flex justify-center items-center px-4 pointer-events-auto">
      <nav 
        className="glass-pill rounded-full px-3 py-1.5 flex items-center gap-1 shadow-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]"
        role="navigation"
        aria-label="Main Navigation"
      >
        {navItems.map((item) => {
          const isActive = activeZone === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigateTo3D(item.id)}
              className={`relative px-5 py-2 text-xs md:text-sm font-medium tracking-widest transition-all duration-300 rounded-full cursor-pointer
                ${isActive 
                  ? 'bg-white text-black shadow-md' 
                  : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
            >
              [{item.label}]
            </button>
          );
        })}
      </nav>
    </header>
  );
}
