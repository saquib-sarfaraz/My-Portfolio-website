import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import { Code2, Terminal, CheckCircle2, GitBranch, Globe, Sparkles } from 'lucide-react';

export default function HeroScene3D() {
  const mountRef = useRef(null);
  const [activeCodeTab, setActiveCodeTab] = useState('WonderKids.jsx');

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x10182c, 0.02);

    // Camera Setup
    const width = currentMount.clientWidth;
    const height = currentMount.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 1.5, 6);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    currentMount.appendChild(renderer.domElement);

    // Illumination Setup
    const ambientLight = new THREE.AmbientLight(0x334155, 3.2);
    scene.add(ambientLight);

    const screenLight = new THREE.PointLight(0x38bdf8, 5.5, 10);
    screenLight.position.set(0, 1.2, 0.5);
    scene.add(screenLight);

    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 4.2);
    rimLight.position.set(-5, 4, -3);
    scene.add(rimLight);

    const floorLight = new THREE.PointLight(0x06b6d4, 3.5, 8);
    floorLight.position.set(0, -0.5, 1);
    scene.add(floorLight);

    // --- 3D WORKSTATION OBJECTS ---
    const deskGroup = new THREE.Group();

    const deskGeo = new THREE.BoxGeometry(4.2, 0.12, 2.2);
    const deskMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.15,
      metalness: 0.8
    });
    const desk = new THREE.Mesh(deskGeo, deskMat);
    desk.position.set(0, 0, 0);
    desk.receiveShadow = true;
    deskGroup.add(desk);

    const laptopBaseGeo = new THREE.BoxGeometry(1.2, 0.04, 0.8);
    const laptopBaseMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.9, roughness: 0.2 });
    const laptopBase = new THREE.Mesh(laptopBaseGeo, laptopBaseMat);
    laptopBase.position.set(0, 0.08, 0.2);
    deskGroup.add(laptopBase);

    const screenGeo = new THREE.BoxGeometry(1.18, 0.75, 0.03);
    const screenMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.2,
      roughness: 0.1
    });
    const laptopScreen = new THREE.Mesh(screenGeo, screenMat);
    laptopScreen.position.set(0, 0.46, -0.18);
    laptopScreen.rotation.x = -0.15;
    deskGroup.add(laptopScreen);

    const mugGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.28, 16);
    const mugMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.1, emissive: 0x0284c7, emissiveIntensity: 0.3 });
    const mug = new THREE.Mesh(mugGeo, mugMat);
    mug.position.set(1.4, 0.2, 0.3);
    deskGroup.add(mug);

    // --- ANIME STYLIZED DEVELOPER FIGURE ---
    const devGroup = new THREE.Group();

    const torsoGeo = new THREE.CylinderGeometry(0.45, 0.52, 1.2, 16);
    const torsoMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
    const torso = new THREE.Mesh(torsoGeo, torsoMat);
    torso.position.set(0, 0.7, 0.95);
    devGroup.add(torso);

    const headGeo = new THREE.SphereGeometry(0.28, 32, 32);
    const headMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.5 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.set(0, 1.48, 0.92);
    devGroup.add(head);

    const hairGroup = new THREE.Group();
    const hairMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
    for (let i = 0; i < 7; i++) {
      const hairTuft = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 8), hairMat);
      const angle = (i / 7) * Math.PI - Math.PI / 2;
      hairTuft.position.set(Math.cos(angle) * 0.22, 1.62, Math.sin(angle) * 0.22 + 0.85);
      hairTuft.rotation.z = angle * 0.3;
      hairGroup.add(hairTuft);
    }
    devGroup.add(hairGroup);

    const armMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4 });
    const leftArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.6, 12), armMat);
    leftArm.position.set(-0.38, 0.72, 0.55);
    leftArm.rotation.set(0.6, 0.2, -0.3);
    devGroup.add(leftArm);

    const rightArm = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.6, 12), armMat);
    rightArm.position.set(0.38, 0.72, 0.55);
    rightArm.rotation.set(0.6, -0.2, 0.3);
    devGroup.add(rightArm);

    scene.add(deskGroup);
    scene.add(devGroup);

    const particlesCount = 100;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 8;
      positions[i + 1] = Math.random() * 4;
      positions[i + 2] = (Math.random() - 0.5) * 6;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.06,
      transparent: true,
      opacity: 0.85
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

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

    let clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      head.position.y = 1.48 + Math.sin(elapsedTime * 2) * 0.015;
      head.rotation.y = currentMouseX * 0.35;
      head.rotation.x = -currentMouseY * 0.2;
      hairGroup.rotation.y = head.rotation.y;

      leftArm.rotation.z = -0.3 + Math.sin(elapsedTime * 8) * 0.04;
      rightArm.rotation.z = 0.3 + Math.cos(elapsedTime * 8) * 0.04;

      camera.position.x = currentMouseX * 0.6;
      camera.position.y = 1.5 + currentMouseY * 0.3;
      camera.lookAt(0, 0.8, 0);

      particles.rotation.y = elapsedTime * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!currentMount) return;
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
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
  }, []);

  return (
    <div className="relative w-full h-[480px] sm:h-[540px] md:h-[600px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#10182C] via-[#15203D] to-[#0D1326] border border-slate-600/60 shadow-[0_20px_50px_rgba(56,189,248,0.2)] flex flex-col justify-between p-4 md:p-6 text-left select-none">
      {/* Three.js 3D WebGL Canvas Layer */}
      <div ref={mountRef} className="absolute inset-0 z-0 pointer-events-auto" />

      {/* Floating Glass Workspace Panels */}
      <div className="relative z-10 flex flex-wrap items-start justify-between gap-3 pointer-events-none">
        {/* Active Code Tab Floating Panel */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="p-4 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(56,189,248,0.2)] space-y-2 pointer-events-auto max-w-xs font-mono text-xs"
        >
          <div className="flex items-center justify-between border-b border-white/15 pb-2 text-slate-200">
            <span className="flex items-center gap-1.5 text-white font-extrabold">
              <Code2 className="w-4 h-4 text-sky-400" />
              {activeCodeTab}
            </span>
            <span className="text-[10px] text-emerald-300 font-bold px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-400/40">
              BUILD SUCCESSFUL
            </span>
          </div>

          <div className="space-y-1.5 text-xs text-white">
            <div className="text-purple-300 font-bold">import &#123; wonderkids &#125; from <span className="text-emerald-300">'./experience'</span>;</div>
            <div className="text-sky-300 font-bold">const platform = new <span className="text-amber-300">SaaSApp</span>();</div>
            <div className="text-slate-200">// Status: Active Internship @ WonderKids</div>
          </div>
        </motion.div>

        {/* Live Socket & Deployment Notification Badge */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="p-3.5 rounded-2xl bg-white/10 border border-emerald-400/40 backdrop-blur-2xl shadow-[0_8px_32px_rgba(34,197,94,0.2)] flex items-center gap-2.5 text-xs font-mono text-emerald-300 pointer-events-auto"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <div className="font-bold text-white text-xs">Deploy Status: Live</div>
            <div className="text-[11px] text-slate-200 font-medium">WonderKids • InCampus Network</div>
          </div>
        </motion.div>
      </div>

      {/* Meaningful Real Information Status Bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/15 bg-white/10 backdrop-blur-2xl px-4 py-3 rounded-2xl pointer-events-auto font-mono text-xs text-white">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-sky-400" />
          <span className="text-white font-extrabold">Developer Workspace</span>
          <span>•</span>
          <span className="text-emerald-300 font-bold">WonderKids Internship Active</span>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-200">
          <span className="font-semibold text-slate-100">Saquib OS v2.6</span>
          <span className="text-slate-400">|</span>
          <span className="text-sky-300 font-bold">Production Build</span>
        </div>
      </div>
    </div>
  );
}
