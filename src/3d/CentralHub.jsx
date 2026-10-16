import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { FolderGit2, Cpu, GraduationCap, Briefcase, ArrowRight } from 'lucide-react';

export default function CentralHub({ onSelectZone, isActive }) {
  const crystalRef = useRef();
  const ringRef1 = useRef();
  const ringRef2 = useRef();

  useFrame((state, delta) => {
    if (crystalRef.current) {
      crystalRef.current.rotation.y += delta * 0.4;
      crystalRef.current.position.y = 1.3 + Math.sin(state.clock.elapsedTime * 1.5) * 0.1;
    }
    if (ringRef1.current) ringRef1.current.rotation.z += delta * 0.2;
    if (ringRef2.current) ringRef2.current.rotation.z -= delta * 0.15;
  });

  const portals = [
    { id: 'work',       label: 'PROJECT LAB',   sub: 'FinGenie • Cognix',     icon: FolderGit2, pos: [-3.5, 0, -0.5] },
    { id: 'skills',     label: 'SKILLS',         sub: 'Full Stack • AI/ML',    icon: Cpu,         pos: [3.5, 0, -0.5]  },
    { id: 'experience', label: 'EXPERIENCE',     sub: 'StepCode Internship',   icon: Briefcase,   pos: [-1.6, 0, -3.5] },
    { id: 'about',      label: 'ABOUT',          sub: 'Bennett Uni • 9.79 CGPA',icon: GraduationCap, pos: [1.6, 0, -3.5] },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* Central Base Platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[4.2, 4.5, 0.2, 36]} />
        <meshStandardMaterial color="#120303" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Glowing Inner Ring */}
      <mesh ref={ringRef1} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.08, 0]}>
        <ringGeometry args={[2.5, 2.65, 48]} />
        <meshBasicMaterial color="#ec0504" />
      </mesh>

      {/* Outer Orbit Ring */}
      <mesh ref={ringRef2} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.06, 0]}>
        <ringGeometry args={[3.8, 3.88, 48]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.3} />
      </mesh>

      {/* Central Pedestal */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.9, 1.2, 0.8, 8]} />
        <meshStandardMaterial color="#1f0505" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Floating Crystal */}
      <mesh ref={crystalRef} position={[0, 1.3, 0]}>
        <octahedronGeometry args={[0.55, 0]} />
        <meshStandardMaterial
          color="#ec0504"
          emissive="#770303"
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Hub Label - only shown when hub is active */}
      {isActive && (
        <Html position={[0, 2.5, 0]} center distanceFactor={10} pointerEvents="none">
          <div className="flex flex-col items-center text-center select-none pointer-events-none">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-red-400 bg-red-950/70 px-2.5 py-0.5 rounded-full border border-red-500/30 whitespace-nowrap">
              Nexus Station
            </span>
            <h2 className="text-xl font-bold tracking-tight text-white drop-shadow mt-1 whitespace-nowrap">
              Central Hub
            </h2>
          </div>
        </Html>
      )}

      {/* Portal Waypoints — only visible when hub is active */}
      {isActive && portals.map((p) => {
        const Icon = p.icon;
        return (
          <group key={p.id} position={p.pos}>
            <mesh position={[0, 0.5, 0]}>
              <boxGeometry args={[0.5, 0.9, 0.08]} />
              <meshStandardMaterial color="#1a0404" metalness={0.8} roughness={0.2} />
            </mesh>
            <Html position={[0, 1.3, 0]} center distanceFactor={9}>
              <button
                onClick={() => onSelectZone(p.id)}
                className="group px-3 py-1.5 rounded-xl glass-pill transition-all duration-200 flex items-center gap-1.5 cursor-pointer shadow-lg hover:scale-105 hover:bg-red-600/30 whitespace-nowrap"
              >
                <Icon className="w-3 h-3 text-red-400 group-hover:text-white transition-colors" />
                <div className="text-left">
                  <div className="text-[10px] font-bold text-white tracking-wide flex items-center gap-0.5">
                    <span>{p.label}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-red-400" />
                  </div>
                  <div className="text-[8px] text-white/50 font-mono">{p.sub}</div>
                </div>
              </button>
            </Html>
          </group>
        );
      })}
    </group>
  );
}
