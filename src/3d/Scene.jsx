import React from 'react';
import EnvironmentLights from './EnvironmentLights';
import ParticlesField from './ParticlesField';
import CameraController from './CameraController';
import CentralHub from './CentralHub';
import ProjectLab from './ProjectLab';
import SkillsZone from './SkillsZone';
import ExperienceZone from './ExperienceZone';
import AboutZone from './AboutZone';

export default function Scene({
  activeZone = 'hub',
  onSelectZone,
  activeSkill,
}) {
  // Compute highlighted project IDs when a skill is active
  const highlightedProjectIds = React.useMemo(() => {
    if (!activeSkill) return [];
    const s = activeSkill.toLowerCase();
    const ids = [];
    if (['react', 'vite', 'tailwind css', 'node.js', 'express.js', 'mongodb', 'gemini ai'].includes(s)) ids.push('fingenie');
    if (['react', 'vite', 'tailwind css', 'express.js', 'mongodb', 'gemini ai'].includes(s)) ids.push('cognix');
    if (['html5', 'css3', 'javascript'].includes(s)) ids.push('feather-quill');
    if (['react', 'javascript', 'css'].includes(s)) ids.push('sportivo');
    return ids;
  }, [activeSkill]);

  return (
    <>
      {/* Cinematic Lighting */}
      <EnvironmentLights />

      {/* Floating Red Particle Dust */}
      <ParticlesField count={200} />

      {/* Smooth Camera Director */}
      <CameraController activeZone={activeZone} />

      {/* World Floor Grid */}
      <gridHelper args={[80, 80, '#ec0504', '#2a0505']} position={[0, -0.08, -6]} />

      {/* Connecting Pathway Lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6, -0.07, -2]}>
        <planeGeometry args={[12, 0.4]} />
        <meshBasicMaterial color="#ec0504" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[6, -0.07, -2]}>
        <planeGeometry args={[12, 0.4]} />
        <meshBasicMaterial color="#ec0504" transparent opacity={0.25} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.07, -11]}>
        <planeGeometry args={[0.4, 22]} />
        <meshBasicMaterial color="#ec0504" transparent opacity={0.25} />
      </mesh>

      {/* 1. CENTRAL NEXUS HUB */}
      <CentralHub
        onSelectZone={onSelectZone}
        isActive={activeZone === 'hub'}
      />

      {/* 2. PROJECT LAB */}
      <ProjectLab
        isActive={activeZone === 'work'}
        highlightedProjectIds={highlightedProjectIds}
      />

      {/* 3. SKILLS ARCHIVE */}
      <SkillsZone
        isActive={activeZone === 'skills'}
      />

      {/* 4. EXPERIENCE */}
      <ExperienceZone
        isActive={activeZone === 'experience'}
      />

      {/* 5. ABOUT & EDUCATION */}
      <AboutZone
        isActive={activeZone === 'about'}
      />
    </>
  );
}
