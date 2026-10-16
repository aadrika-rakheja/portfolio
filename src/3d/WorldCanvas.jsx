import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Scene from './Scene';

export default function WorldCanvas({
  activeZone = 'hub',
  onSelectZone,
  activeSkill,
}) {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#0a0202]">
      <Canvas
        camera={{ position: [0, 3.8, 9], fov: 48, near: 0.1, far: 100 }}
        dpr={[1, typeof window !== 'undefined' && window.devicePixelRatio > 1.5 ? 1.5 : 1]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        className="w-full h-full"
      >
        <color attach="background" args={['#0a0202']} />
        <fog attach="fog" args={['#0a0202', 18, 50]} />

        <Suspense fallback={null}>
          <Scene
            activeZone={activeZone}
            onSelectZone={onSelectZone}
            activeSkill={activeSkill}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
