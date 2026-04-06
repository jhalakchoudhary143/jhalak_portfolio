"use client";

import { useFrame } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import type { Group, Mesh } from "three";

export function AssistantCharacter() {
  const group = useRef<Group>(null);
  const head = useRef<Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (group.current) {
      const breath = 1 + Math.sin(t * 2.1) * 0.018;
      group.current.scale.setScalar(breath);
      group.current.position.y = Math.sin(t * 1.15) * 0.04;
      group.current.rotation.y = Math.sin(t * 0.55) * 0.12;
    }
    if (head.current) {
      head.current.rotation.x = Math.sin(t * 0.9) * 0.06;
      head.current.rotation.z = Math.sin(t * 0.45) * 0.04;
    }
  });

  return (
    <group ref={group} position={[0, -0.05, 0]}>
      <mesh ref={head} position={[0, 0.52, 0]}>
        <sphereGeometry args={[0.34, 40, 40]} />
        <meshStandardMaterial color="#e9d5ff" roughness={0.35} metalness={0.15} />
      </mesh>
      <mesh position={[-0.1, 0.56, 0.26]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#1a202c" roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 0.56, 0.26]}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshStandardMaterial color="#1a202c" roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.44, 0.28]}>
        <boxGeometry args={[0.12, 0.03, 0.02]} />
        <meshStandardMaterial color="#7c3aed" />
      </mesh>

      <RoundedBox args={[0.72, 0.78, 0.38]} radius={0.12} smoothness={4} position={[0, -0.05, 0]}>
        <meshStandardMaterial color="#6B46C1" roughness={0.45} metalness={0.2} />
      </RoundedBox>

      <mesh position={[0, 0.12, 0.22]}>
        <boxGeometry args={[0.5, 0.12, 0.06]} />
        <meshStandardMaterial color="#312e81" />
      </mesh>
    </group>
  );
}
