import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ZONE_POSITIONS = {
  hub: {
    pos: new THREE.Vector3(0, 3.8, 9),
    target: new THREE.Vector3(0, 0.8, 0)
  },
  work: {
    pos: new THREE.Vector3(-12, 3.2, 3.5),
    target: new THREE.Vector3(-12, 1.2, -4)
  },
  skills: {
    pos: new THREE.Vector3(12, 3.2, 3.5),
    target: new THREE.Vector3(12, 1.2, -4)
  },
  experience: {
    pos: new THREE.Vector3(0, 3.2, -8),
    target: new THREE.Vector3(0, 1.2, -14)
  },
  about: {
    pos: new THREE.Vector3(0, 3.2, -16),
    target: new THREE.Vector3(0, 1.2, -22)
  }
};

export default function CameraController({ activeZone = 'hub' }) {
  const { camera, pointer } = useThree();
  const currentTarget = useRef(new THREE.Vector3(0, 0.8, 0));
  const destination = ZONE_POSITIONS[activeZone] || ZONE_POSITIONS.hub;

  useFrame((state, delta) => {
    // Target position with subtle mouse parallax
    const parallaxX = pointer.x * 0.4;
    const parallaxY = pointer.y * 0.25;

    const targetPos = new THREE.Vector3(
      destination.pos.x + parallaxX,
      destination.pos.y + parallaxY,
      destination.pos.z
    );

    // Smooth dampening / lerp for camera position
    const lerpSpeed = Math.min(delta * 4.0, 0.15);
    camera.position.lerp(targetPos, lerpSpeed);

    // Smooth dampening for lookAt target
    currentTarget.current.lerp(destination.target, lerpSpeed);
    camera.lookAt(currentTarget.current);
  });

  return null;
}
