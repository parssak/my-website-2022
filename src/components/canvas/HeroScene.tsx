import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import useShaders from "./shaders";

const Scene = () => {
  const torusRef = React.useRef<any>();
  const outlineRef = React.useRef<any>();

  const MIN = 0.001;
  const MAX = 0.02;

  const MIN_SIZE_TORUS = 1;
  const MAX_SIZE_TORUS = 1.2;

  const MIN_SIZE_OUTLINE = 1.6;
  const MAX_SIZE_OUTLINE = 2;

  const [speed, setSpeed] = useState(MIN);

  const [isHovering, setIsHovering] = useState(false);

  useShaders();

  useFrame(() => {
    const torusExists = !!torusRef.current;
    const outlineExists = !!outlineRef.current;

    if (!torusExists || !outlineExists) return;

    if (isHovering) {
      if (speed < MAX) {
        setSpeed(speed + 0.0005);
      }

      if (torusRef.current.scale.x < MAX_SIZE_TORUS) {
        torusRef.current.scale.x += 0.01;
        torusRef.current.scale.y += 0.01;
        torusRef.current.scale.z += 0.01;
      }

      if (outlineRef.current.scale.x < MAX_SIZE_OUTLINE) {
        outlineRef.current.scale.x += 0.005;
        outlineRef.current.scale.y += 0.005;
        outlineRef.current.scale.z += 0.005;
      }
    } else {
      if (speed > MIN) {
        setSpeed(speed - 0.0005);
      }

      if (torusRef.current.scale.x > MIN_SIZE_TORUS) {
        torusRef.current.scale.x -= 0.01;
        torusRef.current.scale.y -= 0.01;
        torusRef.current.scale.z -= 0.01;
      }

      if (outlineRef.current.scale.x > MIN_SIZE_OUTLINE) {
        outlineRef.current.scale.x -= 0.0008;
        outlineRef.current.scale.y -= 0.0008;
        outlineRef.current.scale.z -= 0.0008;
      }

      if (outlineRef.current.scale.x < MIN_SIZE_OUTLINE) {
        outlineRef.current.scale.x = MIN_SIZE_OUTLINE;
        outlineRef.current.scale.y = MIN_SIZE_OUTLINE;
        outlineRef.current.scale.z = MIN_SIZE_OUTLINE;
      }
    }

    torusRef.current.rotation.y += speed * 1.2;
    torusRef.current.rotation.x += speed * 0.8;
    outlineRef.current.rotation.y += speed;
    outlineRef.current.rotation.x += speed * 0.8;
  });

  return (
    <>
      <ambientLight intensity={1} color="#fa1496" />
      <pointLight position={[10, 2, 10]} intensity={2} color="#8e04ff" />

      <mesh
        position={[0, 2, 0]}
        ref={outlineRef}
        onPointerOver={() => setIsHovering(true)}
        onPointerOut={() => setIsHovering(false)}
      >
        <octahedronBufferGeometry attach="geometry" args={[1, 2]} />
        <meshStandardMaterial attach="material" color="white" metalness={0.5} wireframe />
      </mesh>

      <mesh position={[0, 2, 0]} ref={torusRef}>
        <torusBufferGeometry attach="geometry" args={[0.7, 0.2, 16, 64]} />
        {/* @ts-ignore */}
        <fresnelShaderMaterial uBaseColor="#fa1496" uFresnelColor="#b055fa" uFresnelPower={1} />
      </mesh>
    </>
  );
};

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3] }}
      className="w-full min-h-screen filter invert dark:invert-0"
    >
      <Scene />
    </Canvas>
  );
}
