import React, { useState, useEffect, Suspense, lazy } from 'react';
import CharacterCanvas from './components/CharacterCanvas';
import HeaderNav from './components/HeaderNav';
import HeroContent from './components/HeroContent';
import CustomCursor from './components/CustomCursor';
import ContactModal from './components/ContactModal';
import ResumeModal from './components/ResumeModal';
import ProjectDetailDrawer from './components/ProjectDetailDrawer';
import WorldHUD from './components/WorldHUD';
import WorldLoader from './components/WorldLoader';
import ZonePanel from './components/ZonePanel';

const WorldCanvas = lazy(() => import('./3d/WorldCanvas'));

export default function App() {
  // Layer: 'home' | '3d'
  const [currentView, setCurrentView] = useState('home');
  // 3D zone: 'hub' | 'work' | 'skills' | 'experience' | 'about'
  const [activeZone, setActiveZone] = useState('hub');

  // Interactive selection states
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeSkill, setActiveSkill] = useState(null);

  // Modals
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Keyboard: Escape listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (selectedProject) {
          setSelectedProject(null);
        } else if (isContactOpen) {
          setIsContactOpen(false);
        } else if (isResumeOpen) {
          setIsResumeOpen(false);
        } else if (currentView === '3d') {
          setCurrentView('home');
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject, isContactOpen, isResumeOpen, currentView]);

  const handleNavigateTo3D = (zoneId) => {
    setActiveZone(zoneId);
    setCurrentView('3d');
  };

  const handleReturnHome = () => {
    setCurrentView('home');
    setActiveZone('hub');
    setActiveSkill(null);
  };

  const handleSelectZone = (zoneId) => {
    setActiveZone(zoneId);
    setActiveSkill(null);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#e70b07] select-none text-white">

      {/* ================================================================= */}
      {/* LAYER 1: ORIGINAL LUXURY HOMEPAGE                                 */}
      {/* ================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out
          ${currentView === 'home' ? 'opacity-100 pointer-events-auto z-10' : 'opacity-0 pointer-events-none z-0'}`}
      >
        <CharacterCanvas />

        <HeaderNav
          onNavigateTo3D={handleNavigateTo3D}
          activeZone={activeZone}
        />

        <HeroContent
          onOpenResume={() => setIsResumeOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* Top Right Availability Badge */}
        <div className="fixed top-6 right-6 sm:right-10 z-30 hidden sm:flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full pointer-events-auto">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-[11px] font-mono tracking-wider text-white/90 uppercase">
            Available for projects
          </span>
        </div>
      </div>

      {/* ================================================================= */}
      {/* LAYER 2: INTERACTIVE 3D PORTFOLIO WORLD                           */}
      {/* ================================================================= */}
      <div
        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ease-in-out bg-[#0a0202]
          ${currentView === '3d' ? 'opacity-100 pointer-events-auto z-20' : 'opacity-0 pointer-events-none z-0'}`}
      >
        {currentView === '3d' && (
          <>
            {/* 3D Canvas — fills entire screen, no HTML inside */}
            <Suspense fallback={<WorldLoader />}>
              <WorldCanvas
                activeZone={activeZone}
                onSelectZone={handleSelectZone}
                activeSkill={activeSkill}
              />
            </Suspense>

            {/* Top HUD Navigation — fixed z-40 so it's always on top */}
            <WorldHUD
              activeZone={activeZone}
              onSelectZone={handleSelectZone}
              onReturnHome={handleReturnHome}
              onOpenContact={() => setIsContactOpen(true)}
            />

            {/* Bottom Zone Content Panel — slides in with zone content */}
            <ZonePanel
              activeZone={activeZone}
              onSelectZone={handleSelectZone}
              onSelectProject={setSelectedProject}
              activeSkill={activeSkill}
              onSelectSkill={setActiveSkill}
              onOpenResume={() => setIsResumeOpen(true)}
              onOpenContact={() => setIsContactOpen(true)}
            />
          </>
        )}
      </div>

      {/* ================================================================= */}
      {/* OVERLAY DRAWERS & MODALS (above all layers)                       */}
      {/* ================================================================= */}

      {/* Project Detail Slide-in Drawer */}
      <ProjectDetailDrawer
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Resume / CV Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />

      {/* Let's Talk / EmailJS Contact Modal */}
      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* High-Performance Custom Magnetic Cursor */}
      <CustomCursor />
    </div>
  );
}
