import React, { useCallback, useEffect } from "react";
import * as THREE from "three";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default function useScene(
  ref: React.RefObject<any>,
  fn: (scene: THREE.Scene, camera?: THREE.Camera, renderer?: THREE.Renderer) => void
) {
  const createScene = useCallback(async () => {
    if (!ref.current) return;
    if (typeof window === undefined) return;

    await sleep(10);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    // set renderer to ref size

    // remove all children
    while (ref.current.firstChild) {
      ref.current.removeChild(ref.current.firstChild);
    }

    ref.current.appendChild(renderer.domElement);

    fn(scene, camera, renderer);

    const { width, height } = ref.current.getBoundingClientRect();
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // as window resizes, update renderer size
    window.addEventListener("resize", () => {
      const { width, height } = ref.current.getBoundingClientRect();
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, [ref, fn]);

  useEffect(() => {
    createScene();
  }, [createScene]);
}
