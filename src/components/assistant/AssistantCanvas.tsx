"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import { AssistantCharacter } from "./AssistantCharacter";

export function AssistantCanvas() {
  return (
    <div className="mx-auto h-[160px] w-[160px] sm:h-[180px] sm:w-[180px]">
      <Canvas
        camera={{ position: [0, 0.35, 2.4], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 2]} intensity={1.1} />
        <pointLight position={[-2, 2, 2]} intensity={0.6} color="#c4b5fd" />
        <AssistantCharacter />
        <ContactShadows
          position={[0, -0.55, 0]}
          opacity={0.45}
          scale={8}
          blur={2.2}
          far={3}
        />
        <hemisphereLight args={["#c4b5fd", "#1e1b4b", 0.35]} />
      </Canvas>
    </div>
  );
}
