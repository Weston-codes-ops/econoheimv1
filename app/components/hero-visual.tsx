'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type MapPoint = readonly [number, number];

const continents: readonly (readonly MapPoint[])[] = [
  [
    [0.035, 0.25], [0.065, 0.19], [0.095, 0.17], [0.12, 0.13], [0.16, 0.14],
    [0.18, 0.19], [0.215, 0.2], [0.23, 0.25], [0.26, 0.27], [0.25, 0.32],
    [0.225, 0.35], [0.215, 0.4], [0.19, 0.43], [0.185, 0.49], [0.16, 0.51],
    [0.145, 0.46], [0.125, 0.44], [0.11, 0.39], [0.085, 0.37], [0.07, 0.32],
    [0.045, 0.31],
  ],
  [
    [0.235, 0.46], [0.27, 0.45], [0.295, 0.48], [0.31, 0.54], [0.33, 0.58],
    [0.32, 0.63], [0.305, 0.69], [0.3, 0.75], [0.28, 0.82], [0.265, 0.78],
    [0.27, 0.72], [0.25, 0.66], [0.245, 0.59], [0.225, 0.54],
  ],
  [
    [0.255, 0.12], [0.29, 0.1], [0.315, 0.13], [0.31, 0.17], [0.285, 0.2],
    [0.26, 0.18],
  ],
  [
    [0.435, 0.29], [0.455, 0.26], [0.48, 0.27], [0.49, 0.24], [0.52, 0.25],
    [0.54, 0.29], [0.565, 0.29], [0.58, 0.34], [0.56, 0.37], [0.57, 0.42],
    [0.55, 0.47], [0.54, 0.54], [0.52, 0.61], [0.5, 0.68], [0.48, 0.73],
    [0.465, 0.68], [0.46, 0.61], [0.445, 0.55], [0.44, 0.48], [0.42, 0.42],
    [0.425, 0.36],
  ],
  [
    [0.525, 0.26], [0.55, 0.23], [0.57, 0.25], [0.565, 0.29], [0.54, 0.3],
  ],
  [
    [0.575, 0.2], [0.61, 0.17], [0.65, 0.18], [0.68, 0.16], [0.72, 0.19],
    [0.765, 0.18], [0.8, 0.21], [0.84, 0.22], [0.865, 0.27], [0.85, 0.31],
    [0.82, 0.32], [0.805, 0.37], [0.78, 0.39], [0.76, 0.44], [0.725, 0.45],
    [0.7, 0.42], [0.67, 0.44], [0.645, 0.4], [0.62, 0.4], [0.61, 0.36],
    [0.585, 0.34], [0.57, 0.3],
  ],
  [
    [0.62, 0.4], [0.65, 0.39], [0.68, 0.42], [0.69, 0.47], [0.67, 0.51],
    [0.645, 0.49], [0.63, 0.45],
  ],
  [
    [0.76, 0.59], [0.795, 0.57], [0.83, 0.59], [0.85, 0.63], [0.84, 0.68],
    [0.81, 0.71], [0.78, 0.68], [0.765, 0.64],
  ],
  [
    [0.1, 0.91], [0.19, 0.89], [0.29, 0.91], [0.4, 0.9], [0.51, 0.92],
    [0.62, 0.9], [0.73, 0.92], [0.84, 0.9], [0.92, 0.92], [0.87, 0.96],
    [0.2, 0.96],
  ],
];

export default function HeroVisual() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.18, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xffffff, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    mount.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xffffff, 1.15));

    const keyLight = new THREE.DirectionalLight(0xfff4dc, 2.5);
    keyLight.position.set(3, 3, 4);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x8fcbb0, 1.4);
    fillLight.position.set(-4, 0.5, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x9cc9e8, 1.8);
    rimLight.position.set(-3, 1, -4);
    scene.add(rimLight);

    const textureCanvas = document.createElement('canvas');
    textureCanvas.width = 2048;
    textureCanvas.height = 1024;
    const ctx = textureCanvas.getContext('2d');

    if (ctx) {
      const oceanGradient = ctx.createLinearGradient(0, 0, 0, textureCanvas.height);
      oceanGradient.addColorStop(0, '#6eaa9c');
      oceanGradient.addColorStop(0.48, '#5a9b90');
      oceanGradient.addColorStop(1, '#477e76');
      ctx.fillStyle = oceanGradient;
      ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

      const oceanGlow = ctx.createRadialGradient(
        textureCanvas.width * 0.5,
        textureCanvas.height * 0.42,
        20,
        textureCanvas.width * 0.5,
        textureCanvas.height * 0.42,
        textureCanvas.width * 0.55,
      );
      oceanGlow.addColorStop(0, 'rgba(205, 238, 219, 0.24)');
      oceanGlow.addColorStop(1, 'rgba(205, 238, 219, 0)');
      ctx.fillStyle = oceanGlow;
      ctx.fillRect(0, 0, textureCanvas.width, textureCanvas.height);

      const pixel = (point: MapPoint): MapPoint => [
        point[0] * textureCanvas.width,
        point[1] * textureCanvas.height,
      ];

      for (const continent of continents) {
        const [first, ...rest] = continent;
        if (!first) continue;

        ctx.beginPath();
        ctx.moveTo(...pixel(first));
        for (const point of rest) ctx.lineTo(...pixel(point));
        ctx.closePath();

        const landGradient = ctx.createLinearGradient(
          0,
          textureCanvas.height * 0.15,
          textureCanvas.width * 0.15,
          textureCanvas.height * 0.85,
        );
        landGradient.addColorStop(0, '#d2d7a0');
        landGradient.addColorStop(0.48, '#aebf82');
        landGradient.addColorStop(1, '#829c69');
        ctx.fillStyle = landGradient;
        ctx.fill();

        ctx.save();
        ctx.clip();
        ctx.lineCap = 'round';
        ctx.lineWidth = 2;
        for (let index = 0; index < 7; index += 1) {
          const y = textureCanvas.height * (0.12 + index * 0.12);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.bezierCurveTo(
            textureCanvas.width * 0.28,
            y - textureCanvas.height * 0.07,
            textureCanvas.width * 0.62,
            y + textureCanvas.height * 0.08,
            textureCanvas.width,
            y - textureCanvas.height * 0.03,
          );
          ctx.strokeStyle =
            index % 2 === 0
              ? 'rgba(239, 232, 184, 0.19)'
              : 'rgba(66, 101, 70, 0.11)';
          ctx.stroke();
        }
        ctx.restore();

        ctx.beginPath();
        ctx.moveTo(...pixel(first));
        for (const point of rest) ctx.lineTo(...pixel(point));
        ctx.closePath();
        ctx.lineJoin = 'round';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'rgba(231, 239, 205, 0.78)';
        ctx.stroke();
      }

      const islands: readonly [number, number, number, number][] = [
        [0.37, 0.34, 0.009, 0.012],
        [0.39, 0.38, 0.006, 0.009],
        [0.72, 0.53, 0.008, 0.014],
        [0.735, 0.56, 0.005, 0.009],
        [0.9, 0.48, 0.009, 0.02],
      ];
      ctx.fillStyle = '#aebf82';
      for (const [x, y, width, height] of islands) {
        ctx.beginPath();
        ctx.ellipse(
          x * textureCanvas.width,
          y * textureCanvas.height,
          width * textureCanvas.width,
          height * textureCanvas.height,
          -0.25,
          0,
          Math.PI * 2,
        );
        ctx.fill();
      }
    }

    const globeTexture = new THREE.CanvasTexture(textureCanvas);
    globeTexture.colorSpace = THREE.SRGBColorSpace;
    globeTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

    const globeRadius = 1.58;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 96, 96);
    const globeMaterial = new THREE.MeshPhysicalMaterial({
      map: globeTexture,
      metalness: 0.02,
      roughness: 0.88,
      clearcoat: 0.12,
      clearcoatRoughness: 0.7,
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    globe.rotation.z = 0.22;

    const surface = new THREE.Group();
    surface.add(globe);

    const gridMaterial = new THREE.LineBasicMaterial({
      color: '#e0f2df',
      transparent: true,
      opacity: 0.22,
      depthWrite: false,
    });
    const equatorMaterial = new THREE.LineBasicMaterial({
      color: '#f2f5d9',
      transparent: true,
      opacity: 0.34,
      depthWrite: false,
    });
    const gridGeometries: THREE.BufferGeometry[] = [];
    const gridRadius = globeRadius + 0.008;

    const addGridLine = (points: THREE.Vector3[], equator = false) => {
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      gridGeometries.push(geometry);
      surface.add(
        new THREE.Line(geometry, equator ? equatorMaterial : gridMaterial),
      );
    };

    for (const latitudeDegrees of [-60, -30, 0, 30, 60]) {
      const latitude = THREE.MathUtils.degToRad(latitudeDegrees);
      const points: THREE.Vector3[] = [];
      for (let step = 0; step <= 180; step += 1) {
        const longitude = (step / 180) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            -gridRadius * Math.cos(latitude) * Math.cos(longitude),
            gridRadius * Math.sin(latitude),
            gridRadius * Math.cos(latitude) * Math.sin(longitude),
          ),
        );
      }
      addGridLine(points, latitudeDegrees === 0);
    }

    for (let longitudeDegrees = 0; longitudeDegrees < 360; longitudeDegrees += 30) {
      const longitude = THREE.MathUtils.degToRad(longitudeDegrees);
      const points: THREE.Vector3[] = [];
      for (let step = 0; step <= 120; step += 1) {
        const latitude = -Math.PI / 2 + (step / 120) * Math.PI;
        points.push(
          new THREE.Vector3(
            -gridRadius * Math.cos(latitude) * Math.cos(longitude),
            gridRadius * Math.sin(latitude),
            gridRadius * Math.cos(latitude) * Math.sin(longitude),
          ),
        );
      }
      addGridLine(points);
    }
    surface.rotation.y = -Math.PI / 2;

    const globeGroup = new THREE.Group();
    globeGroup.add(surface);
    scene.add(globeGroup);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches;
    let raf = 0;
    const render = () => {
      if (!prefersReducedMotion) {
        surface.rotation.y += 0.0015;
        surface.rotation.x = Math.sin(performance.now() * 0.00025) * 0.025;
      }
      renderer.render(scene, camera);
      if (!prefersReducedMotion) raf = window.requestAnimationFrame(render);
    };

    const resize = () => {
      const width = mount.clientWidth || 520;
      const height = mount.clientHeight || 540;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener('resize', resize);
    render();

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      renderer.dispose();
      globeTexture.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      gridGeometries.forEach((geometry) => geometry.dispose());
      gridMaterial.dispose();
      equatorMaterial.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative aspect-square h-[min(68vh,560px)] max-h-full w-full max-w-[560px] overflow-hidden rounded-full max-[860px]:h-[min(36svh,360px)] max-[860px]:w-[min(36svh,360px)]"
      role="img"
      aria-label="Animated globe with detailed continents and latitude and longitude lines"
    />
  );
}
