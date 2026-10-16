import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function SkillsZone({ isActive }) {
  const pillarRef = useRef();

  useFrame((state, delta) => {
    if (pillarRef.current) {
      pillarRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[12, 0, -4]}>
      {/* Zone Floor Platform */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]}>
        <cylinderGeometry args={[7.5, 7.8, 0.2, 40]} />
        <meshStandardMaterial color="#0d0202" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Decorative Floor Rings */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.05, 0]}>
        <ringGeometry args={[6.8, 6.95, 48]} />
        <meshBasicMaterial color="#ec0504" transparent opacity={isActive ? 0.8 : 0.4} />
      </mesh>

      {/* Central Rotating Holographic Prism */}
      <mesh ref={pillarRef} position={[0, 1.2, 0]}>
        <cylinderGeometry args={[0.4, 0.6, 1.8, 6]} />
        <meshStandardMaterial
          color="#ec0504"
          emissive="#550303"
          emissiveIntensity={isActive ? 1.0 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* Satellite orb decorations */}
      {[-2.5, 2.5, 0, 0].map((x, i) => (
        <mesh key={i} position={[x, 0.6, i < 2 ? 0 : (i === 2 ? -2.5 : 2.5)]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial
            color="#ec0504"
            emissive="#330101"
            emissiveIntensity={0.6}
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}
