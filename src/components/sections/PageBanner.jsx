import React, { useEffect, useRef, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

gsap.registerPlugin(ScrollTrigger);

// ── Ultra-Smooth 3D Particle Field ───────────────────────────────────────────
// Using Points is the most performant way to render thousands of 3D objects.
// Ensures zero lagging even on low-end mobile devices while maintaining visual depth.
function ParticleField({ count = 800, color = "#0ea5e9", size = 0.05, speed = 0.03, reverse = false }) {
  const pointsRef = useRef();
  
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Spread particles out widely to create a deep ambient environment
        pos[i * 3] = (Math.random() - 0.5) * 40; // x
        pos[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
        pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5; // z
    }
    return pos;
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      // Smooth continuous rotation at zero CPU cost (done on GPU)
      const direction = reverse ? -1 : 1;
      pointsRef.current.rotation.y += delta * speed * direction;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial 
        size={size} 
        color={color} 
        transparent 
        opacity={0.6}
        blending={THREE.AdditiveBlending} 
        depthWrite={false} 
        sizeAttenuation={true}
      />
    </points>
  );
}

function SceneLayout() {
  const ringRef = useRef();
  const ringRef2 = useRef();
  
  useFrame((state, delta) => {
    if (ringRef.current) {
        ringRef.current.rotation.x += delta * 0.05;
        ringRef.current.rotation.y += delta * 0.08;
    }
    if (ringRef2.current) {
        ringRef2.current.rotation.x -= delta * 0.06;
        ringRef2.current.rotation.y -= delta * 0.04;
    }
  });

  return (
    <group>
      {/* Distinct layers of particles create parallax depth */}
      <ParticleField count={1500} size={0.03} speed={0.02} color="#ffffff" />
      <ParticleField count={800} size={0.06} speed={0.04} color="#0ea5e9" reverse={true} />
      <ParticleField count={300} size={0.12} speed={0.015} color="#0284c7" />
      
      {/* Abstract geometric rings for a premium tech feel */}
      <mesh ref={ringRef} position={[0, 0, -8]}>
         <torusGeometry args={[6, 0.01, 16, 100]} />
         <meshBasicMaterial color="#0ea5e9" transparent opacity={0.2} />
      </mesh>
      <mesh ref={ringRef2} position={[0, 0, -10]}>
         <torusGeometry args={[9, 0.02, 16, 100]} />
         <meshBasicMaterial color="#0284c7" transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

export default function PageBanner({ title, subtitle, badge }) {
  const container = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial properties
      gsap.set('.banner-elem', { y: 40, opacity: 0, rotateX: 10 });
      gsap.set('.banner-line', { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
      
      tl.to('.banner-elem', { y: 0, opacity: 1, rotateX: 0, stagger: 0.1, delay: 0.1 })
        .to('.banner-line', { scaleX: 1, opacity: 1, duration: 1.2, ease: 'expo.inOut' }, '-=0.8');

      // Subtle parallax on the background canvas container
      gsap.to('.banner-bg-container', {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: container.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={container} className="relative w-full overflow-hidden bg-[#020202] pt-40 md:pt-48 pb-20 md:pb-28 px-6 flex flex-col justify-center items-center min-h-[40vh] md:min-h-[50vh] border-b border-white/5 text-center">
      
      {/* ── Background Abstract 3D Animation ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        
        {/* Parallax Container for 3D */}
        <div className="banner-bg-container absolute inset-0 w-full h-[120%] -top-[10%]">
          {/* Hardware-accelerated Canvas with aggressive performance limits */}
          <Canvas
            camera={{ position: [0, 0, 5], fov: 60 }}
            gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 1.5]} /* Hard-cap device pixel ratio to 1.5x (eliminates retina lagging on mobile) */
            style={{ width: '100%', height: '100%' }}
          >
            <SceneLayout />
          </Canvas>
        </div>

        {/* Vignette & Gradient Overlays for perfect text readability backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] md:w-[100%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-signal-amber/15 via-transparent to-transparent opacity-80 mix-blend-screen" />
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-[#020202] via-[#020202]/80 to-transparent z-[1]" />
        
        {/* Tech Grid Pattern overlay */}
        <div className="absolute inset-0 z-[1] opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at center, #ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      {/* ── Content ── */}
      <div className="container mx-auto relative z-10 flex flex-col items-center">
        <div className="max-w-4xl flex flex-col items-center">
          {badge && (
            <div className="banner-elem inline-block mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-signal-amber animate-pulse border border-signal-amber/50" />
                <span className="text-xs font-mono font-medium tracking-widest uppercase text-white/70">{badge}</span>
              </span>
            </div>
          )}
          
          <h1 className="banner-elem text-5xl md:text-7xl lg:text-[6rem] font-display font-bold tracking-tighter leading-[1] text-white drop-shadow-2xl" style={{ perspective: '1000px' }}>
            {title}
          </h1>
          
          <div className="banner-line w-24 h-1 bg-gradient-to-r from-transparent via-signal-amber to-transparent mt-10 mb-8 origin-center" />

          {subtitle && (
            <p className="banner-elem text-lg md:text-xl text-gray-400 font-light max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
