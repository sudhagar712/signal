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
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    // Smooth lerp towards mouse position
    ref.current.rotation.y = THREE.MathUtils.lerp(ref.current.rotation.y, targetX, 0.05);
    ref.current.rotation.x = THREE.MathUtils.lerp(ref.current.rotation.x, -targetY, 0.05);
  });
  return <group ref={ref}>{children}</group>;
}

// ── LED Panel ────────────────────────────────────────────────────────────────
function LedPanel({ rows = 28, cols = 48, spacing = 0.12 }) {
  const meshRef = useRef();
  const count = rows * cols;
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorObj = useMemo(() => new THREE.Color(), []);
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = (c - cols / 2) * spacing;
        const y = (r - rows / 2) * spacing;
        
        dummy.position.set(x, y, 0);
        
        // Complex fluid abstract wave mapped to LED pixels
        const px = c * 0.1;
        const py = r * 0.1;
        const wave1 = Math.sin(px * 1.5 + time * 1.5);
        const wave2 = Math.cos(py * 1.5 - time * 1.0);
        const wave3 = Math.sin(px * 2 + py * 2 - time * 2);
        
        const pattern = (wave1 + wave2 + wave3) / 3;
        
        // Dynamic colors based on pattern
        if (pattern > 0.3) {
          colorObj.set('#ffffff'); // White hot spots
        } else if (pattern > 0) {
          colorObj.set('#38bdf8'); // Light bright blue
        } else if (pattern > -0.4) {
          colorObj.set('#0ea5e9'); // Main blue (signal-amber)
        } else {
          colorObj.set('#050505'); // Off / dark
        }
        
        dummy.scale.setScalar(0.4 + Math.max(0, pattern) * 0.6);
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
      {/* Panel Housing / Frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[cols * spacing + 0.3, rows * spacing + 0.3, 0.05]} />
        <meshStandardMaterial color="#050505" roughness={0.5} metalness={0.8} />
      </mesh>
      
      {/* Back Glow ambient effect */}
      <mesh position={[0, 0, -0.08]}>
        <planeGeometry args={[cols * spacing * 1.2, rows * spacing * 1.2]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.15} />
      </mesh>

      {/* LED instances */}
      <instancedMesh ref={meshRef} args={[null, null, count]}>
        <boxGeometry args={[spacing * 0.7, spacing * 0.7, 0.02]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>

      {/* Glass overlay covering the LED matrix for a polished look */}
      <mesh position={[0, 0, 0.02]}>
        <boxGeometry args={[cols * spacing + 0.3, rows * spacing + 0.3, 0.02]} />
        <meshPhysicalMaterial 
          color="#000000"
          transparent 
          opacity={0.3} 
          roughness={0.1}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </group>
  );
}

// ── Scene Composition ────────────────────────────────────────────────────────
function SceneLayout() {
  const { viewport } = useThree();
  const isMobile = viewport.width < 5;
  
  return (
    <InteractiveRig>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      
      {/* Main floating module */}
      <Float speed={2} rotationIntensity={isMobile ? 0.2 : 0.4} floatIntensity={1}>
        <group 
          position={isMobile ? [0, 1.5, -3] : [3, 0.5, -3]} 
          rotation={isMobile ? [0.1, 0, 0] : [-0.1, -0.3, 0]}
        >
          <LedPanel rows={isMobile ? 24 : 32} cols={isMobile ? 36 : 48} />
        </group>
      </Float>

      {/* Secondary module (hidden on mobile) */}
      {!isMobile && (
        <Float speed={1.5} rotationIntensity={0.6} floatIntensity={1.5}>
          <group position={[-5, -1, -5]} rotation={[0.2, 0.4, 0.1]} scale={0.7}>
            <LedPanel rows={20} cols={32} />
          </group>
        </Float>
      )}

      {/* Third module */}
      {!isMobile && (
        <Float speed={2.5} rotationIntensity={0.8} floatIntensity={2}>
          <group position={[1, -4, -6]} rotation={[-0.3, 0.2, -0.1]} scale={0.5}>
            <LedPanel rows={16} cols={24} />
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
    <div ref={container} className="relative mb-10 w-full min-h-[100svh] flex items-center justify-center overflow-hidden bg-background pt-24 md:pt-32">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          dpr={[1, 2]}
        >
          <SceneLayout />
        </Canvas>
      </div>

      {/* Gradients to blend 3D and UI harmoniously */}
      <div className="absolute inset-x-0 bottom-0 h-[40vh] bg-gradient-to-t from-background to-transparent z-[1] pointer-events-none" />
      <div className="absolute inset-0 bg-background/30 mix-blend-multiply z-[1] pointer-events-none" />
      {/* Soft gradient bloom behind text to ensure perfect legibility */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-full md:w-[60%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-background/90 via-background/50 to-transparent z-[2] pointer-events-none hidden md:block" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-transparent to-background z-[2] pointer-events-none md:hidden" />

      {/* Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 flex flex-col justify-center">
        <div className="max-w-2xl text-left">
          <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8">
            <span className="w-2 h-2 rounded-full bg-signal-amber animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-gray-300">Next-Gen Visual Solutions</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-[6.5rem] font-display font-bold tracking-tighter leading-[0.95] mb-8" style={{ perspective: "1000px" }}>
            <span className="block text-white glow-text hero-title-line origin-bottom">MAKE YOUR</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-signal-amber via-white to-signal-amber-dark hero-title-line origin-bottom py-1">
              BRAND
            </span>
            <span className="block text-white hero-title-line origin-bottom">UNMISSABLE</span>
          </h1>

          <p className="hero-desc text-lg md:text-xl text-gray-400 max-w-xl font-light mb-12 leading-relaxed">
            High-performance LED displays and visual branding systems designed to capture attention in the real world.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="hero-btn px-8 py-4 bg-signal-amber text-white font-semibold rounded-full hover:bg-white hover:text-black transition-all duration-300 text-base shadow-[0_0_30px_rgba(14,165,233,0.4)] text-center"
            >
              Get a Quote
            </Link>
            <Link
              to="/projects"
              className="hero-btn group relative overflow-hidden bg-white/5 border border-white/10 px-8 py-4 rounded-full flex items-center justify-center gap-2 text-sm font-semibold tracking-widest uppercase text-white transition-all duration-300 hover:bg-white/10 backdrop-blur-md"
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
