import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export default function ProjectLab({ isActive, highlightedProjectIds = [] }) {
  const finGenieMesh = useRef();
  const cognixMesh = useRef();
  const miniMesh = useRef();

  const isFinGenieHighlighted = highlightedProjectIds.includes('fingenie');
  const isCognixHighlighted = highlightedProjectIds.includes('cognix');

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (finGenieMesh.current) {
      finGenieMesh.current.position.y = 1.0 + Math.sin(t * 1.8) * 0.08;
      finGenieMesh.current.rotation.y += delta * 0.3;
    }
    if (cognixMesh.current) {
      cognixMesh.current.position.y = 1.0 + Math.sin(t * 1.8 + 1.5) * 0.08;
      cognixMesh.current.rotation.y += delta * 0.3;
    }
    if (miniMesh.current) {
      miniMesh.current.position.y = 0.8 + Math.sin(t * 1.5 + 3.0) * 0.06;
      miniMesh.current.rotation.y -= delta * 0.25;
    }
  });

  return (
    <group position={[-12, 0, -4]}>
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

      {/* STATION 1: FinGenie */}
      <group position={[-3.2, 0, 0]}>
        <mesh ref={finGenieMesh} position={[0, 1.0, 0]}>
          <dodecahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={isFinGenieHighlighted ? '#ff3b30' : '#ec0504'}
            emissive={isFinGenieHighlighted ? '#ec0504' : '#550303'}
            emissiveIntensity={isActive ? 1.2 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.7, 16]} />
          <meshStandardMaterial color="#1a0404" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.72, 0]}>
          <ringGeometry args={[1.1, 1.18, 32]} />
          <meshBasicMaterial color="#ec0504" />
        </mesh>
      </group>

      {/* STATION 2: Cognix */}
      <group position={[3.2, 0, 0]}>
        <mesh ref={cognixMesh} position={[0, 1.0, 0]}>
          <icosahedronGeometry args={[0.55, 0]} />
          <meshStandardMaterial
            color={isCognixHighlighted ? '#ff3b30' : '#ec0504'}
            emissive={isCognixHighlighted ? '#ec0504' : '#550303'}
            emissiveIntensity={isActive ? 1.2 : 0.6}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        <mesh position={[0, 0.35, 0]}>
          <cylinderGeometry args={[1.2, 1.4, 0.7, 16]} />
          <meshStandardMaterial color="#1a0404" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.72, 0]}>
          <ringGeometry args={[1.1, 1.18, 32]} />
          <meshBasicMaterial color="#ec0504" />
        </mesh>
      </group>

      {/* STATION 3: Mini Builds */}
      <group position={[0, 0, -3.5]}>
        <mesh ref={miniMesh} position={[0, 0.8, 0]}>
          <torusGeometry args={[0.5, 0.15, 16, 32]} />
          <meshStandardMaterial
            color="#ec0504"
            metalness={0.8}
            roughness={0.2}
            emissiveIntensity={isActive ? 1.0 : 0.4}
          />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[1.4, 1.6, 0.5, 20]} />
          <meshStandardMaterial color="#1a0404" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}
