import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Code2, Sparkles, CheckCircle2, Cpu, Globe, Layers, Server, Zap } from 'lucide-react';

export default function HeroScene3D() {
  const mountRef = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const codePanelY = useTransform(scrollY, [0, 400], [0, -30]);
  const codePanelOpacity = useTransform(scrollY, [0, 300], [1, 0.4]);
  const cameraZoomScroll = useTransform(scrollY, [0, 400], [0, 0.4]);

  useEffect(() => {
    const handleCheckMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);
    return () => window.removeEventListener('resize', handleCheckMobile);
  }, []);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // --- 1. SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0f1d, 0.025);

    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    // Camera naturally frames upper body, desk, monitors, keyboard, face
    camera.position.set(0, 1.45, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    currentMount.appendChild(renderer.domElement);

    // --- 2. LIGHTING (Cinematic & Atmospheric) ---
    const ambientLight = new THREE.AmbientLight(0x1e293b, 2.5);
    scene.add(ambientLight);

    // Deep Blue Rim Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 4.5);
    rimLight.position.set(-4, 4, -2);
    scene.add(rimLight);

    // Neon Purple Accent Light
    const purpleAccent = new THREE.PointLight(0xa855f7, 4.0, 8);
    purpleAccent.position.set(3, 2, -1);
    scene.add(purpleAccent);

    // Monitor Glow Light (Illuminates face and keyboard)
    const monitorLight = new THREE.PointLight(0x38bdf8, 6.0, 6);
    monitorLight.position.set(0, 1.3, 0.4);
    scene.add(monitorLight);

    // RGB Keyboard Glow Light
    const keyboardRgbLight = new THREE.PointLight(0x06b6d4, 3.5, 4);
    keyboardRgbLight.position.set(0, 0.45, 0.8);
    scene.add(keyboardRgbLight);

    // Warm Desk Lamp Light
    const lampLight = new THREE.SpotLight(0xfef08a, 4.0, 7, Math.PI / 6, 0.4);
    lampLight.position.set(1.8, 1.8, 0.2);
    lampLight.target.position.set(1.2, 0.3, 0.5);
    scene.add(lampLight);
    scene.add(lampLight.target);

    // --- 3. DYNAMIC MONITOR CANVAS TEXTURES ---
    // Main Monitor Texture (InCampus / WonderKids Dashboard UI)
    const mainCanvas = document.createElement('canvas');
    mainCanvas.width = 512;
    mainCanvas.height = 320;
    const ctxMain = mainCanvas.getContext('2d');

    const drawMainMonitor = (time) => {
      ctxMain.fillStyle = '#070b19';
      ctxMain.fillRect(0, 0, 512, 320);

      // Header Bar
      ctxMain.fillStyle = '#0f172a';
      ctxMain.fillRect(0, 0, 512, 36);
      ctxMain.fillStyle = '#38bdf8';
      ctxMain.font = 'bold 14px monospace';
      ctxMain.fillText('● InCampus Analytics & SaaS Dashboard', 16, 23);
      ctxMain.fillStyle = '#22c55e';
      ctxMain.fillRect(430, 12, 65, 14);
      ctxMain.fillStyle = '#ffffff';
      ctxMain.font = 'bold 10px sans-serif';
      ctxMain.fillText('LIVE v2.6', 442, 23);

      // Grid Cards
      ctxMain.fillStyle = '#1e293b';
      ctxMain.roundRect(16, 52, 230, 110, 8);
      ctxMain.fill();
      ctxMain.fillStyle = '#38bdf8';
      ctxMain.font = 'bold 12px sans-serif';
      ctxMain.fillText('WonderKids Engine Status', 28, 74);
      ctxMain.fillStyle = '#94a3b8';
      ctxMain.font = '11px monospace';
      ctxMain.fillText('Active Users: 12,480+', 28, 96);
      ctxMain.fillText('Socket Latency: 18ms', 28, 114);
      ctxMain.fillText('Cluster: AWS us-east-1', 28, 132);

      ctxMain.fillStyle = '#1e293b';
      ctxMain.roundRect(260, 52, 236, 110, 8);
      ctxMain.fill();
      ctxMain.fillStyle = '#a855f7';
      ctxMain.font = 'bold 12px sans-serif';
      ctxMain.fillText('Realtime Socket Stream', 272, 74);
      
      // Animated Wave Line on Card
      ctxMain.beginPath();
      ctxMain.strokeStyle = '#38bdf8';
      ctxMain.lineWidth = 2.5;
      for (let x = 0; x < 210; x += 5) {
        const y = 120 + Math.sin((x + time * 60) * 0.05) * 15;
        if (x === 0) ctxMain.moveTo(272 + x, y);
        else ctxMain.lineTo(272 + x, y);
      }
      ctxMain.stroke();

      // Bottom Chart Box
      ctxMain.fillStyle = '#0f172a';
      ctxMain.roundRect(16, 176, 480, 128, 8);
      ctxMain.fill();
      ctxMain.fillStyle = '#64748b';
      ctxMain.font = '11px monospace';
      ctxMain.fillText('System Throughput (Requests/sec)', 28, 196);

      // Bar Chart
      for (let i = 0; i < 18; i++) {
        const h = 25 + Math.sin(time * 2 + i * 0.5) * 20 + (i % 3) * 12;
        ctxMain.fillStyle = i % 2 === 0 ? '#38bdf8' : '#8b5cf6';
        ctxMain.fillRect(30 + i * 25, 280 - h, 16, h);
      }
    };
    drawMainMonitor(0);

    const mainTexture = new THREE.CanvasTexture(mainCanvas);

    // Second Monitor Texture (GitHub Graph & Live Deployment Grid)
    const secCanvas = document.createElement('canvas');
    secCanvas.width = 320;
    secCanvas.height = 480;
    const ctxSec = secCanvas.getContext('2d');

    const drawSecMonitor = (time) => {
      ctxSec.fillStyle = '#090d18';
      ctxSec.fillRect(0, 0, 320, 480);

      // Header
      ctxSec.fillStyle = '#334155';
      ctxSec.font = 'bold 13px monospace';
      ctxSec.fillText('● GitHub Contribution Graph', 16, 28);

      // Contribution Grid
      const colors = ['#1e293b', '#0e4429', '#006d32', '#26a641', '#39d353'];
      for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 14; col++) {
          const colorIdx = (row * 3 + col * 7) % colors.length;
          ctxSec.fillStyle = colors[colorIdx];
          ctxSec.roundRect(16 + col * 20, 45 + row * 20, 16, 16, 3);
          ctxSec.fill();
        }
      }

      // Deployment Stream Log
      ctxSec.fillStyle = '#1e293b';
      ctxSec.roundRect(16, 305, 288, 155, 8);
      ctxSec.fill();
      ctxSec.fillStyle = '#22c55e';
      ctxSec.font = 'bold 12px monospace';
      ctxSec.fillText('▶ Deployments: Production', 28, 328);

      const logs = [
        '✓ wonderkids-prod deployed',
        '✓ incampus-api healthy',
        '✓ socket-gateway connected',
        '✓ mongodb-atlas cluster green',
        '✓ vercel edge CDN active'
      ];
      ctxSec.fillStyle = '#94a3b8';
      ctxSec.font = '11px monospace';
      logs.forEach((log, idx) => {
        ctxSec.fillText(log, 28, 350 + idx * 20);
      });
    };
    drawSecMonitor(0);

    const secTexture = new THREE.CanvasTexture(secCanvas);

    // --- 4. 3D WORKSTATION ENVIRONMENT ---
    const deskGroup = new THREE.Group();

    // Sleek Desk Tabletop
    const deskGeo = new THREE.BoxGeometry(4.8, 0.12, 2.4);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x111827,
      roughness: 0.2,
      metalness: 0.8,
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, 0, 0);
    desk.receiveShadow = true;
    deskGroup.add(desk);

    // Desk Mat
    const matGeo = new THREE.BoxGeometry(3.6, 0.015, 1.4);
    const matMaterial = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.8 });
    const deskMatMesh = new THREE.Mesh(matGeo, matMaterial);
    deskMatMesh.position.set(0, 0.065, 0.1);
    deskGroup.add(deskMatMesh);

    // Dual Monitor Setup
    // Main Widescreen Monitor
    const mainFrameGeo = new THREE.BoxGeometry(2.2, 1.35, 0.06);
    const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
    const mainMonitorFrame = new THREE.Mesh(mainFrameGeo, frameMat);
    mainMonitorFrame.position.set(-0.35, 0.85, -0.4);
    deskGroup.add(mainMonitorFrame);

    const mainScreenGeo = new THREE.PlaneGeometry(2.12, 1.27);
    const mainScreenMat = new THREE.MeshBasicMaterial({ map: mainTexture });
    const mainScreenMesh = new THREE.Mesh(mainScreenGeo, mainScreenMat);
    mainScreenMesh.position.set(-0.35, 0.85, -0.36);
    deskGroup.add(mainScreenMesh);

    // Secondary Vertical Monitor
    const secFrameGeo = new THREE.BoxGeometry(1.0, 1.5, 0.06);
    const secMonitorFrame = new THREE.Mesh(secFrameGeo, frameMat);
    secMonitorFrame.position.set(1.35, 0.92, -0.2);
    secMonitorFrame.rotation.y = -0.35;
    deskGroup.add(secMonitorFrame);

    const secScreenGeo = new THREE.PlaneGeometry(0.94, 1.42);
    const secScreenMat = new THREE.MeshBasicMaterial({ map: secTexture });
    const secScreenMesh = new THREE.Mesh(secScreenGeo, secScreenMat);
    secScreenMesh.position.set(1.33, 0.92, -0.16);
    secScreenMesh.rotation.y = -0.35;
    deskGroup.add(secScreenMesh);

    // Dual Monitor Stands
    const standPoleGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.8, 16);
    const standMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.9 });
    const standPole = new THREE.Mesh(standPoleGeo, standMat);
    standPole.position.set(0.3, 0.4, -0.45);
    deskGroup.add(standPole);

    // Mechanical Keyboard with RGB Lighting
    const kbGeo = new THREE.BoxGeometry(1.1, 0.05, 0.38);
    const kbMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
    const keyboard = new THREE.Mesh(kbGeo, kbMat);
    keyboard.position.set(-0.25, 0.09, 0.35);
    deskGroup.add(keyboard);

    // Keycaps Group
    const keycapsGroup = new THREE.Group();
    const keyMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 12; c++) {
        const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.03, 0.07), keyMat);
        keyMesh.position.set(-0.7 + c * 0.082, 0.12, 0.22 + r * 0.082);
        keycapsGroup.add(keyMesh);
      }
    }
    deskGroup.add(keycapsGroup);

    // Wireless Mouse
    const mouseGeo = new THREE.BoxGeometry(0.14, 0.06, 0.22);
    const mouseMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.8 });
    const mouse = new THREE.Mesh(mouseGeo, mouseMat);
    mouse.position.set(0.65, 0.09, 0.38);
    deskGroup.add(mouse);

    // Coffee Mug
    const mugGroup = new THREE.Group();
    const mugGeo = new THREE.CylinderGeometry(0.11, 0.1, 0.26, 20);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.2, emissive: 0x0369a1, emissiveIntensity: 0.2 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(-1.4, 0.19, 0.3);
    mugGroup.add(mug);
    deskGroup.add(mugGroup);

    // Engineering Notebook & Pen
    const notebookGeo = new THREE.BoxGeometry(0.35, 0.02, 0.45);
    const notebookMat = new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.5 });
    const notebook = new THREE.Mesh(notebookGeo, notebookMat);
    notebook.position.set(1.4, 0.08, 0.4);
    notebook.rotation.y = 0.25;
    deskGroup.add(notebook);

    // Modern Desk Lamp
    const lampBase = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.18, 0.04, 20), standMat);
    lampBase.position.set(1.8, 0.08, 0.2);
    deskGroup.add(lampBase);

    const lampPole = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 1.2, 16), standMat);
    lampPole.position.set(1.8, 0.68, 0.2);
    lampPole.rotation.z = -0.2;
    deskGroup.add(lampPole);

    // Tiny Potted Indoor Plant
    const potGeo = new THREE.CylinderGeometry(0.12, 0.09, 0.2, 16);
    const potMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3 });
    const pot = new THREE.Mesh(potGeo, potMat);
    pot.position.set(-1.7, 0.16, -0.2);
    deskGroup.add(pot);

    const plantGroup = new THREE.Group();
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4 });
    for (let l = 0; l < 5; l++) {
      const leaf = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.25, 6), leafMat);
      const angle = (l / 5) * Math.PI * 2;
      leaf.position.set(-1.7 + Math.cos(angle) * 0.06, 0.32, -0.2 + Math.sin(angle) * 0.06);
      leaf.rotation.x = Math.sin(angle) * 0.5;
      leaf.rotation.z = Math.cos(angle) * 0.5;
      plantGroup.add(leaf);
    }
    deskGroup.add(plantGroup);

    // Ergonomic Chair (Backdrop behind developer)
    const chairGroup = new THREE.Group();
    const seatGeo = new THREE.BoxGeometry(0.9, 0.1, 0.9);
    const chairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
    const seat = new THREE.Mesh(seatGeo, chairMat);
    seat.position.set(0, 0.28, 1.05);
    chairGroup.add(seat);

    const backrestGeo = new THREE.BoxGeometry(0.85, 1.1, 0.08);
    const backrest = new THREE.Mesh(backrestGeo, chairMat);
    backrest.position.set(0, 0.88, 1.45);
    chairGroup.add(backrest);

    const headrest = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.22, 0.08), chairMat);
    headrest.position.set(0, 1.5, 1.45);
    chairGroup.add(headrest);

    // --- 5. 3D ANIME DEVELOPER CHARACTER (SAQUIB SARFARAZ) ---
    const devGroup = new THREE.Group();

    // Torso (Stylish Black Hoodie)
    const hoodieGeo = new THREE.CylinderGeometry(0.42, 0.48, 1.15, 20);
    const hoodieMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
    const torso = new THREE.Mesh(hoodieGeo, hoodieMat);
    torso.position.set(0, 0.72, 0.95);
    devGroup.add(torso);

    // Hood Folds / Collar Accent
    const hoodCollar = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.08, 12, 24), hoodieMat);
    hoodCollar.position.set(0, 1.25, 0.94);
    hoodCollar.rotation.x = Math.PI / 2;
    devGroup.add(hoodCollar);

    // Legs (Dark Jeans)
    const jeansMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.7 });
    const leftLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.13, 0.75, 16), jeansMat);
    leftLeg.position.set(-0.2, 0.28, 0.92);
    devGroup.add(leftLeg);

    const rightLeg = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.13, 0.75, 16), jeansMat);
    rightLeg.position.set(0.2, 0.28, 0.92);
    devGroup.add(rightLeg);

    // White Sneakers
    const sneakerMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.2 });
    const leftSneaker = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.32), sneakerMat);
    leftSneaker.position.set(-0.22, 0.06, 0.78);
    devGroup.add(leftSneaker);

    const rightSneaker = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.32), sneakerMat);
    rightSneaker.position.set(0.22, 0.06, 0.78);
    devGroup.add(rightSneaker);

    // Head & Skin Tone
    const headGroup = new THREE.Group();
    const headGeo = new THREE.SphereGeometry(0.26, 32, 32);
    const skinMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.45 }); // Anime warm skin tone
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headMesh.position.set(0, 1.48, 0.92);
    headGroup.add(headMesh);

    // Curly Black Hair
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x090d16, roughness: 0.3 });
    for (let i = 0; i < 18; i++) {
      const hairTuft = new THREE.Mesh(new THREE.DodecahedronGeometry(0.08, 0), hairMat);
      const u = Math.random() * Math.PI * 2;
      const v = Math.random() * Math.PI * 0.5 + 0.1;
      hairTuft.position.set(
        Math.cos(u) * Math.sin(v) * 0.25,
        1.55 + Math.cos(v) * 0.18,
        0.88 + Math.sin(u) * Math.sin(v) * 0.24
      );
      headGroup.add(hairTuft);
    }

    // Modern Glasses
    const frameMatGlass = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 });
    const glassLeft = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.012, 8, 20), frameMatGlass);
    glassLeft.position.set(-0.09, 1.49, 0.67);
    headGroup.add(glassLeft);

    const glassRight = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.012, 8, 20), frameMatGlass);
    glassRight.position.set(0.09, 1.49, 0.67);
    headGroup.add(glassRight);

    const glassBridge = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, 0.06), frameMatGlass);
    glassBridge.position.set(0, 1.49, 0.67);
    glassBridge.rotation.z = Math.PI / 2;
    headGroup.add(glassBridge);

    devGroup.add(headGroup);

    // Arms & Hands (Positioned at Keyboard & Mouse)
    const armMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 });
    
    // Left Arm -> Typing on Mechanical Keyboard
    const leftUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.08, 0.52, 16), armMat);
    leftUpperArm.position.set(-0.36, 0.88, 0.72);
    leftUpperArm.rotation.set(0.5, 0.15, -0.2);
    devGroup.add(leftUpperArm);

    const leftForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.48, 16), armMat);
    leftForearm.position.set(-0.32, 0.55, 0.48);
    leftForearm.rotation.set(1.1, 0.25, -0.15);
    devGroup.add(leftForearm);

    // Left Hand & Smartwatch
    const smartwatchGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    const smartwatchMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0284c7, emissiveIntensity: 0.6 });
    const smartwatch = new THREE.Mesh(smartwatchGeo, smartwatchMat);
    smartwatch.position.set(-0.3, 0.42, 0.38);
    devGroup.add(smartwatch);

    // Right Arm -> Operating Wireless Mouse / Keyboard
    const rightUpperArm = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.08, 0.52, 16), armMat);
    rightUpperArm.position.set(0.36, 0.88, 0.72);
    rightUpperArm.rotation.set(0.5, -0.15, 0.2);
    devGroup.add(rightUpperArm);

    const rightForearm = new THREE.Mesh(new THREE.CylinderGeometry(0.075, 0.07, 0.48, 16), armMat);
    rightForearm.position.set(0.42, 0.55, 0.48);
    rightForearm.rotation.set(1.1, -0.2, 0.2);
    devGroup.add(rightForearm);

    scene.add(chairGroup);
    scene.add(deskGroup);
    scene.add(devGroup);

    // --- 6. PARTICLES SYSTEM ---
    const particleCount = isMobile ? 50 : 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePos[i] = (Math.random() - 0.5) * 7;
      particlePos[i + 1] = Math.random() * 4;
      particlePos[i + 2] = (Math.random() - 0.5) * 6;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.05,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- 7. MOUSE CURSOR INTERACTION & ANIMATION LOOP ---
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e) => {
      const rect = currentMount.getBoundingClientRect();
      targetMouseX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetMouseY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      // Update Dynamic Monitors Canvas Textures
      if (Math.floor(elapsedTime * 10) % 2 === 0) {
        drawMainMonitor(elapsedTime);
        mainTexture.needsUpdate = true;
        drawSecMonitor(elapsedTime);
        secTexture.needsUpdate = true;
      }

      // Continuous Typing Animation (Fingers / Arm micro movements)
      leftForearm.rotation.z = -0.15 + Math.sin(elapsedTime * 14) * 0.025;
      rightForearm.rotation.x = 1.1 + Math.cos(elapsedTime * 12) * 0.02;

      // Breathing & Subtle Head Movement Following Cursor
      headGroup.position.y = Math.sin(elapsedTime * 2.2) * 0.012;
      headGroup.rotation.y = currentMouseX * 0.35 + Math.sin(elapsedTime * 0.5) * 0.05;
      headGroup.rotation.x = -currentMouseY * 0.18;

      // Subtle Ergonomic Chair Movement
      chairGroup.rotation.y = Math.sin(elapsedTime * 0.8) * 0.025;

      // Keyboard RGB Pulsing Light
      keyboardRgbLight.color.setHSL((elapsedTime * 0.15) % 1, 0.8, 0.5);

      // Camera Parallax & Subtle Scroll Framing
      camera.position.x = currentMouseX * 0.45;
      camera.position.y = 1.45 + currentMouseY * 0.2;
      camera.lookAt(0, 0.9, 0.4);

      // Floating Particles Animation
      particles.rotation.y = elapsedTime * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newW = currentMount.clientWidth;
      const newH = currentMount.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      scene.clear();
    };
  }, [isMobile]);

  return (
    <div ref={containerRef} className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] rounded-3xl overflow-hidden bg-[#070B19] border border-slate-800/80 shadow-[0_25px_60px_rgba(0,0,0,0.8)] select-none">
      
      {/* Three.js 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-auto" />

      {/* Volumetric Radial Glows */}
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-sky-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

      {/* Floating Micro Orbiting Tech Icons */}
      <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
        {[
          { label: 'React', color: 'text-sky-400', pos: 'top-12 left-10' },
          { label: 'Node.js', color: 'text-emerald-400', pos: 'top-28 right-12' },
          { label: 'MongoDB', color: 'text-green-500', pos: 'bottom-28 left-14' },
          { label: 'Socket.io', color: 'text-cyan-400', pos: 'bottom-20 right-16' },
          { label: 'GitHub', color: 'text-purple-400', pos: 'top-1/2 left-6' },
          { label: 'Vercel', color: 'text-white', pos: 'top-1/3 right-8' },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            animate={{
              y: [0, -10, 0],
              opacity: [0.35, 0.65, 0.35],
            }}
            transition={{
              duration: 4 + idx,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.6,
            }}
            className={`absolute ${item.pos} hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/60 border border-white/10 text-[11px] font-mono ${item.color} backdrop-blur-md shadow-lg`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
            <span>{item.label}</span>
          </motion.div>
        ))}
      </div>

      {/* FLOATING WORKSPACE UI ELEMENTS */}
      <div className="relative z-20 h-full flex flex-col justify-between p-4 sm:p-6 pointer-events-none">
        
        {/* TOP LAYER: Compact Frosted Editor Window & Status Chip */}
        <div className="flex flex-wrap items-start justify-between gap-3 w-full">
          
          {/* Priority 4: Compact Editor Window (Developer.tsx) */}
          <motion.div
            style={{ y: codePanelY, opacity: codePanelOpacity }}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full sm:w-[340px] rounded-[24px] bg-slate-900/60 border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 space-y-3 pointer-events-auto"
          >
            {/* Tiny VS Code Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-slate-300 font-medium ml-2 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-sky-400" />
                  Developer.tsx
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400">TSX</span>
            </div>

            {/* Clean Essential Code Content (Only 5-7 lines) */}
            <pre className="font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto">
              <code>
                <span className="text-purple-400">const</span>{' '}
                <span className="text-sky-300">developer</span> = &#123;{'\n'}
                {'  '}<span className="text-slate-400">name:</span>{' '}
                <span className="text-emerald-300">"Saquib Sarfaraz"</span>,{'\n'}
                {'  '}<span className="text-slate-400">role:</span>{' '}
                <span className="text-emerald-300">"Full Stack Developer"</span>,{'\n'}
                {'  '}<span className="text-slate-400">building:</span> [{'\n'}
                {'    '}<span className="text-amber-300">"WonderKids"</span>,{'\n'}
                {'    '}<span className="text-amber-300">"InCampus"</span>{'\n'}
                {'  '}]{'\n'}
                &#125;;
              </code>
            </pre>
          </motion.div>

          {/* Priority 3: Small Floating Workspace Status Chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="px-4 py-2.5 rounded-full bg-slate-900/70 border border-emerald-500/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(34,197,94,0.15)] flex items-center gap-2.5 pointer-events-auto"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.8)]" />
            <div className="text-xs font-mono">
              <span className="text-emerald-300 font-bold">Available for Opportunities</span>
              <span className="text-slate-400 mx-2">•</span>
              <span className="text-slate-200 font-medium">WonderKids • InCampus</span>
            </div>
          </motion.div>
        </div>

        {/* BOTTOM WORKSPACE LABEL (Priority 2: Name & Role) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-full flex items-center justify-between gap-4 px-5 py-3 rounded-2xl bg-slate-900/65 border border-white/15 backdrop-blur-2xl pointer-events-auto text-white font-mono text-xs shadow-2xl"
        >
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-sky-400 animate-pulse shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
            <div>
              <span className="font-bold text-white text-sm">Saquib Sarfaraz</span>
              <span className="text-slate-400 mx-2">|</span>
              <span className="text-sky-300 font-semibold">Full Stack Developer</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-2 text-slate-300 text-xs">
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">React</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Node.js</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">MongoDB</span>
            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">Socket.io</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
