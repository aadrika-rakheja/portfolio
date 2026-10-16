import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function AboutZone({ isActive }) {
  const torusRef = useRef();

  useFrame((state, delta) => {
    if (torusRef.current) {
      torusRef.current.rotation.x += delta * 0.15;
      torusRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, 0, -22]}>
      {/* Floor Platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <cylinderGeometry args={[6.5, 6.8, 0.2, 36]} />
        <meshStandardMaterial color="#0d0202" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Glowing Edge Ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[5.8, 5.95, 48]} />
        <meshBasicMaterial color="#ec0504" transparent opacity={isActive ? 0.8 : 0.4} />
      </mesh>

      {/* Floating 3D Geometric Anchor */}
      <mesh ref={torusRef} position={[0, 1.2, 0]}>
        <torusKnotGeometry args={[0.45, 0.14, 64, 16]} />
        <meshStandardMaterial
          color="#ec0504"
          emissive="#550303"
          emissiveIntensity={isActive ? 1.0 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}
