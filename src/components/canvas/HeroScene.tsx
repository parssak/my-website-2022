import React, { useMemo, useRef } from "react";
import { useFrame, extend, useLoader } from "@react-three/fiber";
import { Canvas } from "@react-three/fiber";
import useShaders from "./shaders";
// import glsl from "babel-plugin-glsl/macro";

type Props = {};

const Wave = () => {
  const meshRef = useRef<any>(null);
  const ref = useRef<any>();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.uTime = clock.getElapsedTime() * 0.1;
    }
    if (meshRef.current) {
      const speed = 0.2;
      meshRef.current.rotation.x = meshRef.current.rotation.y -= 0.01 * speed;
    }
  });

  return (
    <mesh position={[0, 2, 0]} ref={meshRef}>
      <torusBufferGeometry attach="geometry" args={[0.7, 0.2, 16, 64]} />
      {/* @ts-ignore */}
      <fresnelShaderMaterial uBaseColor="#fa1496" uFresnelColor="#b055fa" uFresnelPower={1} />
    </mesh>
  );
};

const HeroSceneCanvas = () => {
  const meshRef = React.useRef<any>();
  const outlineRef = React.useRef<any>();
  useShaders();

  useFrame(() => {
    const speed = 0.2;
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed;
      meshRef.current.rotation.y += meshRef.current.rotation.x * speed;
    }

    if (outlineRef.current) {
      outlineRef.current.rotation.x -= 0.01 * speed;
      outlineRef.current.rotation.y -= outlineRef.current.rotation.x / 100000;
    }
  });

  return (
    <>
      <ambientLight intensity={1} color="#fa1496" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#b055fa" />

      <mesh scale={[1.6, 1.6, 1.6]} position={[0, 2, 0]} ref={outlineRef}>
        <octahedronBufferGeometry attach="geometry" args={[1, 2]} />
        <meshStandardMaterial attach="material" color="white" wireframe metalness={0.5} />
      </mesh>

      <Wave />
    </>
  );
};

export default function HeroScene({}: Props) {
  return (
    <Canvas camera={{ position: [0, 0, 3] }} className="w-full h-full filter invert dark:invert-0">
      <HeroSceneCanvas />
    </Canvas>
  );
}
