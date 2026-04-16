import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HomeHero from '../components/sections/HomeHero';

gsap.registerPlugin(ScrollTrigger);

// ── Reusable animated section wrapper ────────────────────────────────────────
function FadeUp({ children, className = '' }) {
  const ref = useRef();
  useEffect(() => {
    gsap.fromTo(ref.current,
      { y: 60, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: ref.current, start: 'top 82%' }
      }
    );
  }, []);
  return <div ref={ref} className={className}>{children}</div>;
}

// ── 3D Process Content-Related Icons ───────────────────────────────────────────
function ProcessIconShape({ type, isHovered }) {
  const ref = useRef();
  
  useFrame((state, delta) => {
    const speed = isHovered ? 2.5 : 0.5;
    if (type !== '03') { 
      ref.current.rotation.x += delta * speed * 0.3;
      ref.current.rotation.y += delta * speed * 0.4;
    } else {
      ref.current.rotation.y += delta * speed * 0.4;
    }
    
    const targetScale = isHovered ? 1.3 : 1.0;
    ref.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
  });

  const materialProps = {
    color: isHovered ? "#ffffff" : "#0EA5E9",
    roughness: 0.2,
    metalness: 0.8,
    transparent: true,
    opacity: isHovered ? 0.9 : 0.3
  };

  return (
    <group ref={ref}>
      {/* 01: CONSULT - Network/Brainstorming System */}
      {type === '01' && (
        <group>
          <mesh>
            <sphereGeometry args={[0.4, 16, 16]} />
            <meshStandardMaterial {...materialProps} wireframe={true} />
          </mesh>
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[0.9, 0.02, 16, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
          <mesh rotation={[-Math.PI / 4, Math.PI / 4, 0]}>
            <torusGeometry args={[0.9, 0.02, 16, 32]} />
            <meshStandardMaterial {...materialProps} />
          </mesh>
        </group>
      )}

      {/* 02: DESIGN - Architectural CAD Wireframe */}
      {type === '02' && (
        <group>
          <mesh>
            <boxGeometry args={[0.8, 0.8, 0.8]} />
            <meshStandardMaterial {...materialProps} opacity={isHovered ? 0.4 : 0.1} />
          </mesh>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.4, 1.4, 1.4)]} />
            <lineBasicMaterial color={isHovered ? "#ffffff" : "#0EA5E9"} transparent opacity={isHovered ? 0.8 : 0.4} linewidth={2} />
          </lineSegments>
          <lineSegments>
            <edgesGeometry args={[new THREE.BoxGeometry(1.9, 0.3, 1.9)]} />
            <lineBasicMaterial color="#0EA5E9" transparent opacity={0.3} />
          </lineSegments>
        </group>
      )}

      {/* 03: EXECUTE - LED Hardware Grid Matrix */}
      {type === '03' && (
        <group rotation={[Math.PI / 8, -Math.PI / 8, 0]}>
          {[-0.5, 0, 0.5].map((x, i) => 
            [-0.5, 0, 0.5].map((y, j) => (
              <mesh position={[x * 1.2, y * 1.2, 0]} key={`${i}-${j}`}>
                <boxGeometry args={[0.9, 0.9, 0.15]} />
                <meshStandardMaterial 
                  color={isHovered && (i+j)%2===0 ? "#ffffff" : "#0EA5E9"} 
                  roughness={0.1} 
                  metalness={0.8}
                  transparent 
                  opacity={isHovered ? 0.9 : 0.3} 
                />
              </mesh>
            ))
          )}
        </group>
      )}

      {/* 04: DELIVER - Glossy Finished Display Panel */}
      {type === '04' && (
        <group>
          <mesh>
            <boxGeometry args={[2.0, 1.2, 0.1]} />
            <meshPhysicalMaterial 
              color="#020202" 
              metalness={0.9} 
              roughness={0.1} 
              clearcoat={1} 
            />
          </mesh>
          <mesh position={[0, 0, 0.06]}>
            <planeGeometry args={[1.9, 1.1]} />
            <meshBasicMaterial 
              color={isHovered ? "#ffffff" : "#0EA5E9"} 
              transparent
              opacity={isHovered ? 0.9 : 0.25}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

// ── GSAP + Three.js Responsive Card ──────────────────────────────────────────
function Process3DCard({ p, index }) {
  const cardRef = useRef();
  const [isHovered, setIsHovered] = useState(false);
  
  useEffect(() => {
    gsap.fromTo(cardRef.current,
      { y: 80, opacity: 0, rotateY: 15, scale: 0.9 },
      { 
        y: 0, opacity: 1, rotateY: 0, scale: 1, 
        duration: 1.2, 
        ease: 'power3.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%' },
        delay: index * 0.15 
      }
    );
  }, [index]);

  return (
    <div 
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative h-[380px] rounded-[2rem] bg-[#0A0A0A] border border-white/5 p-8 flex flex-col justify-between overflow-hidden group hover:border-signal-amber/40 hover:bg-white/[0.02] transition-colors duration-500 shadow-xl"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Canvas Background */}
      <div className={`absolute top-0 right-0 w-full h-full z-0 pointer-events-none transform transition-transform duration-1000 ease-out ${isHovered ? 'translate-x-1/4 translate-y-10 scale-110' : 'translate-x-[40%] -translate-y-1/4'}`}>
        <Canvas camera={{ position: [0, 0, 5], fov: 40 }} gl={{ alpha: true }}>
          <ambientLight intensity={1} />
          <directionalLight position={[2, 5, 2]} intensity={3} />
          <Float speed={isHovered ? 4 : 2} rotationIntensity={isHovered ? 2 : 1} floatIntensity={isHovered ? 2 : 1}>
            <ProcessIconShape type={p.step} isHovered={isHovered} />
          </Float>
        </Canvas>
      </div>

      {/* Radial soft glow */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] transition-opacity duration-700 z-0 pointer-events-none ${isHovered ? 'from-signal-amber/20 via-transparent to-transparent opacity-100' : 'from-transparent to-transparent opacity-0'}`} />

      <div className="relative z-10 w-max">
        <span className="text-signal-amber font-mono text-xs font-bold tracking-widest bg-signal-amber/10 px-4 py-2 rounded-full border border-signal-amber/20 inline-block mb-6 shadow-[0_0_15px_rgba(14,165,233,0.2)] transition-all duration-500 group-hover:scale-110 group-hover:shadow-[0_0_25px_rgba(14,165,233,0.4)]">
          STEP {p.step}
        </span>
      </div>
      
      <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
        <h3 className="text-3xl font-display font-bold text-white mb-2">{p.label}</h3>
        <div className="overflow-hidden opacity-0 h-0 group-hover:h-[80px] sm:group-hover:h-[60px] md:group-hover:h-[100px] lg:group-hover:h-[80px] group-hover:opacity-100 transition-all duration-500 ease-out pt-2">
          <p className="text-gray-400 text-sm leading-relaxed">
            {p.desc}
          </p>
        </div>
      </div>

       {/* Premium shiny line at bottom */}
       <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-signal-amber to-white group-hover:w-full transition-all duration-700 ease-in-out" />
    </div>
  );
}

export default function Home() {
  // Hero entrance
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });
    tl.fromTo('.hero-badge', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.3 })
      .fromTo('.hero-headline', { y: 80, opacity: 0 }, { y: 0, opacity: 1, duration: 1.2, stagger: 0.08 }, '-=0.5')
      .fromTo('.hero-sub', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, '-=0.8')
      .fromTo('.hero-ctas', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, '-=0.6');

    // Parallax on hero bg
    gsap.to('.hero-parallax', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: { trigger: '.hero-parallax', start: 'top top', end: 'bottom top', scrub: true }
    });

    // Parallax on CTA bg
    gsap.to('.cta-bg-image', {
      yPercent: 30,
      ease: 'none',
      scrollTrigger: { trigger: '.cta-section', start: 'top bottom', end: 'bottom top', scrub: true }
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  const services = [
    {
      title: 'LED Displays',
      desc: 'Indoor & Outdoor LED Display Solutions',
      items: ['Sales', 'Installation', 'Service'],
      link: '/services/led-display',
    },
    {
      title: 'Branding & Fabrication',
      desc: 'Complete physical brand infrastructure',
      items: ['ACP Elevation', 'Sign Boards', 'Custom Signages', 'Name Boards'],
      link: '/services',
    },
    {
      title: 'Print & Promotion',
      desc: 'High-impact print at every scale',
      items: ['Flex Printing', 'Pamphlets', 'Flyers', 'Brochures'],
      link: '/services',
    },
  ];

  const whyItems = [
    { title: 'Strategic Execution', desc: 'Every project is designed for maximum real-world impact.' },
    { title: 'End-to-End Delivery', desc: 'From concept to installation to maintenance.' },
    { title: 'Performance Driven', desc: 'Built for high traffic, harsh weather, and constant visibility.' },
    { title: 'Reliable Timelines', desc: 'Execution you can actually depend on.' },
  ];

  const process = [
    { step: '01', label: 'Consult', desc: 'Deep dive into visual requirements, site analysis, and objective mapping.' },
    { step: '02', label: 'Design', desc: 'Structural CAD drafting, hardware selection, and digital mockups for approval.' },
    { step: '03', label: 'Execute', desc: 'Precision engineering, fabrication, and LED module assembly at our core facility.' },
    { step: '04', label: 'Deliver', desc: 'On-site installation, software calibration, and final deployment.' },
  ];

  const industries = ['Retail', 'Healthcare', 'Education', 'Real Estate', 'Corporate', 'Events & Exhibitions'];

  return (
    <div className="bg-background">

      {/* ── HERO ─────────────────────────────────────── */}

      <HomeHero />


      {/* ── WHAT WE DO ────────────────────────────────── */}
      <section className="relative rounded-3xl  z-20 py-32 bg-background overflow-hidden border-t border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
        {/* Subtle bloom matching the hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-signal-amber/5 via-background to-background pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10">
          <FadeUp className="mb-20 max-w-4xl">
            <span className="text-xs font-bold tracking-widest text-signal-amber uppercase block mb-4">What We Do</span>
            <h2 className="text-4xl md:text-6xl font-display font-semibold tracking-tighter">
              Visibility Solutions.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Built to Perform.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <FadeUp key={i}>
                <Link
                  to={s.link}
                  className="group relative flex flex-col h-full bg-white/[0.02] backdrop-blur-sm border border-white/10 p-10 rounded-[2rem] overflow-hidden hover:border-signal-amber/50 hover:bg-white/[0.04] transition-all duration-500 hover:-translate-y-2 shadow-lg hover:shadow-[0_0_40px_rgba(14,165,233,0.15)]"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-signal-amber/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <h3 className="text-2xl font-display font-semibold mb-2 group-hover:text-signal-amber transition-colors">{s.title}</h3>
                    <p className="text-gray-500 text-sm mb-8">{s.desc}</p>
                    <ul className="mt-auto space-y-3">
                      {s.items.map((item) => (
                        <li key={item} className="flex items-center gap-3 text-sm text-gray-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-signal-amber flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-8 text-signal-amber text-xs font-bold uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all duration-300">
                      Explore <span>→</span>
                    </div>
                  </div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY SIGNAL ───────────────────────────────── */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-glow opacity-20 pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10">
          <FadeUp className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold">
              We Don't Install.{' '}
              <span className="text-signal-amber glow-text">We Engineer Visibility.</span>
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, i) => (
              <FadeUp key={i}>
                <div className="p-8 border border-white/8 rounded-2xl bg-gradient-to-b from-white/[0.03] to-transparent hover:border-signal-amber/30 transition-colors duration-500 h-full">
                  <div className="w-10 h-10 rounded-full bg-signal-amber/10 border border-signal-amber/20 flex items-center justify-center text-signal-amber font-mono text-xs font-bold mb-6">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-lg font-display font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── INDUSTRIES MARQUEE ───────────────────────── */}
      <div className="py-8 overflow-hidden bg-signal-amber -skew-y-1">
        <div className="animate-marquee items-center gap-12">
          {[...industries, ...industries].map((name, i) => (
            <div key={i} className="flex items-center gap-12 flex-shrink-0">
              <span className="text-4xl md:text-5xl font-display font-extrabold text-black uppercase whitespace-nowrap">{name}</span>
              <span className="w-3 h-3 rounded-full bg-black/30 flex-shrink-0" />
            </div>
          ))}
        </div>
      </div>

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="py-24 md:py-32 border-t border-white/5 relative bg-[#050505] overflow-hidden">
        {/* Subtle premium environment glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-signal-amber/5 via-background to-background pointer-events-none" />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <FadeUp className="max-w-2xl">
              <span className="text-xs font-bold tracking-widest text-signal-amber uppercase block mb-4">The Signal Methodology</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-semibold tracking-tighter">
                Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-amber to-white">Visibility.</span>
              </h2>
            </FadeUp>
            <FadeUp>
              <p className="text-gray-400 font-light max-w-sm">
                Four precision-driven steps to transform your physical brand presence into a high-performance visual asset.
              </p>
            </FadeUp>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p, i) => (
              <Process3DCard key={i} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────── */}
      <section className="cta-section py-40 relative overflow-hidden text-center bg-[#050505]">
        {/* Parallax Background Image */}
        <div className="absolute inset-x-0 -top-[30%] w-full h-[160%] z-0 pointer-events-none">
           <img 
             src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop" 
             alt="Tech core background" 
             className="cta-bg-image w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale"
           />
        </div>

        {/* Blue color overlay */}
        <div className="absolute inset-0 bg-[#0EA5E9]/80 mix-blend-multiply pointer-events-none z-[1]" />
        
        {/* Gradient fades for seamless integration with previous & footer sections */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-[#050505] pointer-events-none z-[2]" />

        <div className="relative z-10 container mx-auto px-6">
          <FadeUp>
            <h2 className="text-5xl md:text-8xl font-display font-bold mb-8 leading-[1] tracking-tighter text-white drop-shadow-xl">
              Let Your Brand<br />
              Be Seen.{' '}
              <span className="text-white italic drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">Properly.</span>
            </h2>
            <p className="text-xl text-white/90 font-light mb-12 max-w-xl mx-auto drop-shadow-md">
              Get in touch with Signal today.
            </p>
            <Link
              to="/contact"
              className="inline-block px-12 py-5 bg-white text-[#0EA5E9] font-bold tracking-wide rounded-full hover:bg-black hover:text-white transition-all duration-300 text-lg shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-none hover:-translate-y-1"
            >
              Start Your Project
            </Link>
          </FadeUp>
        </div>
      </section>

    </div>
  );
}
