import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

// ── Interactive Rig ──────────────────────────────────────────────────────────
function InteractiveRig({ children }) {
  const ref = useRef();
  useFrame((state) => {
    const targetX = (state.pointer.x * Math.PI) / 10;
    const targetY = (state.pointer.y * Math.PI) / 10;
    // Smooth lerp towards mouse position
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetX, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -targetY, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

// ── Immersive LED Wave Panel ───────────────────────────────────────────────────
function ImmersiveLedWave({ rows = 50, cols = 90, spacing = 0.16 }) {
  const meshRef = useRef();
  const count = rows * cols;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    let i = 0;
    
    // Wave animation parameters
    const cx = cols / 2;
    const cy = rows / 2;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        // Base planar positions
        const x = (c - cx) * spacing;
        const y = (r - cy) * spacing;

        const px = c * 0.1;
        const py = r * 0.1;

        // Complex fluid abstract wave mapped to Z axis
        const wave1 = Math.sin(px * 1.0 + time * 1.5);
        const wave2 = Math.cos(py * 1.0 - time * 0.8);
        const wave3 = Math.sin((px + py) * 0.6 - time * 2.0);
        
        const pattern = (wave1 + wave2 + wave3) / 3;
        
        // Z displacement 
        const z = pattern * 0.8;

        dummy.position.set(x, y, z);

        // Dynamic colors based on pattern
        if (pattern > 0.4) {
          colorObj.set('#ffffff'); // Hot spots
        } else if (pattern > 0.1) {
          colorObj.set('#38bdf8'); // Bright blue
        } else if (pattern > -0.2) {
          colorObj.set('#0ea5e9'); // Main blue (signal-amber)
        } else if (pattern > -0.5) {
          colorObj.set('#0284c7'); // Dark blue
        } else {
          colorObj.set('#082f49'); // Deep dark
        }

        const scale = 0.4 + Math.max(0, pattern) * 0.6;
        dummy.scale.setScalar(scale);
        
        dummy.lookAt(x, y, z + 1);
        dummy.updateMatrix();

        meshRef.current.setMatrixAt(i, dummy.matrix);
        meshRef.current.setColorAt(i, colorObj);
        i++;
      }
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
    meshRef.current.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[spacing * 0.6, spacing * 0.6, 0.04]} />
        <meshStandardMaterial toneMapped={false} metalness={0.8} roughness={0.2} />
      </instancedMesh>
    </group>
  );
}

// ── Scene Composition ────────────────────────────────────────────────────────
function SceneLayout() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;

  return (
    <InteractiveRig>
      <ambientLight intensity={1} />
      <directionalLight position={[5, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-5, -10, -5]} intensity={1.5} color="#0ea5e9" />
      <pointLight position={[0, 0, 5]} intensity={2} color="#38bdf8" distance={10} />

      {/* Main immersive background module */}
      <Float speed={2} rotationIntensity={isMobile ? 0.2 : 0.4} floatIntensity={1}>
        <group position={[0, 0, -5]} rotation={[-0.1, 0, 0]}>
          <ImmersiveLedWave rows={isMobile ? 60 : 50} cols={isMobile ? 40 : 90} spacing={0.16} />
        </group>
      </Float>
      
      {/* Floating particles/cubes in front for extreme depth */}
      {!isMobile && (
        <Float speed={3} rotationIntensity={2} floatIntensity={3}>
           <group position={[-6, 3, -2]} scale={0.6}>
             <ImmersiveLedWave rows={8} cols={12} spacing={0.2} />
           </group>
        </Float>
      )}
      {!isMobile && (
        <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
           <group position={[6, -2, -1]} scale={0.5} rotation={[0, -0.5, 0]}>
             <ImmersiveLedWave rows={10} cols={16} spacing={0.15} />
           </group>
        </Float>
      )}
    </InteractiveRig>
  );
}

// ── Hero Component ───────────────────────────────────────────────────────────
export default function HomeHero() {
  const container = useRef();

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(".hero-badge",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.2 }
    )
      .fromTo(".hero-title-line",
        { y: 50, opacity: 0, rotateX: -20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.15 },
        "-=0.6"
      )
      .fromTo(".hero-desc",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.6"
      )
      .fromTo(".hero-btn",
        { scale: 0.9, opacity: 0, y: 10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.8, stagger: 0.1 },
        "-=0.8"
      );
  }, { scope: container });

  return (
    <div ref={container} className="relative mb-10 w-full min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-background pt-24 md:pt-32">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.5]}
        >
          <SceneLayout />
        </Canvas>
      </div>

      {/* Gradients to blend 3D and UI harmoniously */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-[20vh] bg-gradient-to-b from-background to-transparent z-[1] pointer-events-none" />
      
      {/* Centered glow behind text to ensure perfect legibility */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[80%] h-[150%] md:h-[100%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/95 via-background/60 to-transparent z-[2] pointer-events-none" />
      
      {/* Content Layer (Centered) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center text-center">
        <div className="max-w-4xl flex flex-col items-center">
          <div className="hero-badge inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-signal-amber animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-300">Next-Gen Visual Solutions</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] font-bold tracking-tighter leading-[0.95] mb-8" style={{ perspective: "1000px" }}>
            <span className="block text-white glow-text hero-title-line origin-bottom">MAKE YOUR</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-signal-amber via-white to-signal-amber-dark hero-title-line origin-bottom py-1">
              BRAND
            </span>
            <span className="block text-white hero-title-line origin-bottom">UNMISSABLE</span>
          </h1>

          <p className="hero-desc text-lg md:text-2xl text-gray-400 max-w-2xl font-light mb-12 leading-relaxed">
            High-performance LED displays and visual branding systems designed to capture attention in the real world.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-center w-full sm:w-auto">
            <Link
              to="/contact"
              className="hero-btn w-full sm:w-auto px-10 py-4 bg-signal-amber text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-base shadow-[0_0_30px_rgba(14,165,233,0.4)] text-center flex-1"
            >
              Get a Quote
            </Link>
            <Link
              to="/projects"
              className="hero-btn w-full sm:w-auto group relative overflow-hidden bg-white/5 border border-white/10 px-10 py-3 rounded-full flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-md flex-1"
            >
              <span>View Our Work</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50 z-10 pointer-events-none">
        <span className="text-[9px] md:text-[10px] uppercase tracking-widest text-gray-400">Scroll Down</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-signal-amber to-transparent animate-pulse" />
      </div>
    </div>
  );
}
