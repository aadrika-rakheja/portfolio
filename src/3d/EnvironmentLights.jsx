import React from 'react';

export default function EnvironmentLights() {
  return (
    <>
      {/* Dark subtle ambient base */}
      <ambientLight intensity={0.4} color="#3a0808" />

      {/* Main key light */}
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        color="#ffffff"
      />

      {/* Rim light from behind */}
      <directionalLight
        position={[-10, 10, -15]}
        intensity={0.8}
        color="#ec0504"
      />

      {/* Red floor glow */}
      <pointLight
        position={[0, 0.5, 0]}
        intensity={2.5}
        distance={15}
        color="#ec0504"
      />

      {/* Project Lab red accent light */}
      <pointLight
        position={[-12, 2, -4]}
        intensity={2.0}
        distance={12}
        color="#e70b07"
      />

      {/* Skills Zone accent light */}
      <pointLight
        position={[12, 2, -4]}
        intensity={2.0}
        distance={12}
        color="#ec0504"
      />

      {/* Experience & About deep glow */}
      <pointLight
        position={[0, 2, -14]}
        intensity={2.0}
        distance={14}
        color="#ec0504"
      />
    </>
  );
}
