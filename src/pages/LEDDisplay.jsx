import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useSEO from '../hooks/useSEO';

gsap.registerPlugin(ScrollTrigger);

// ══════════════════════════════════════════════════════
// 3D LED Pixel Grid Shader Component
// ══════════════════════════════════════════════════════
function LEDShaderMesh() {
  const meshRef = useRef();
  const uniformsRef = useRef({
    uTime: { value: 0 },
    uAmber: { value: new THREE.Color('#F5A623') },
    uDark: { value: new THREE.Color('#0a0500') },
  });

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uTime;
    uniform vec3  uAmber;
    uniform vec3  uDark;
    varying vec2  vUv;

    // LED pixel mask — round dots on a grid
    float ledMask(vec2 uv, float gridSize) {
      vec2 cell = fract(uv * gridSize);
      return 1.0 - smoothstep(0.38, 0.48, length(cell - 0.5));
    }

    void main() {
      // Scrolling diagonal wave
      float wave = sin(vUv.x * 12.0 - uTime * 2.0)
                 * cos(vUv.y *  8.0 + uTime * 1.4);
      wave = wave * 0.5 + 0.5;

      // Secondary ripple
      float dist  = length(vUv - vec2(0.5));
      float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.5 + 0.5;
      float bright = mix(wave, ripple, 0.35);

      // LED dot mask at multiple scales
      float mask = ledMask(vUv, 36.0);

      // Color: dark → amber
      vec3 color = mix(uDark, uAmber * 1.6, bright);

      // Vignette
      float vig = smoothstep(0.75, 0.3, dist);

      gl_FragColor = vec4(color, mask * vig * (0.4 + bright * 0.6));
    }
  `;

  useFrame((_, delta) => {
    uniformsRef.current.uTime.value += delta;
    meshRef.current.material.uniforms.uTime.value = uniformsRef.current.uTime.value;
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[6, 4, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniformsRef.current}
        transparent
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ══════════════════════════════════════════════════════
// Small inline LED preview for feature cards
// ══════════════════════════════════════════════════════
function MiniLEDCanvas() {
  return (
    <div className="w-full h-40 rounded-xl overflow-hidden">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
        <LEDShaderMesh />
      </Canvas>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// Page
// ══════════════════════════════════════════════════════
export default function LEDDisplay() {
  useSEO({
    title: 'LED Display Systems',
    description: 'Ultra-high brightness LED display systems built for performance and tested for longevity. Designed for storefronts, event spaces, and mega visuals.',
    keywords: 'LED Displays, LED Walls, High Brightness Displays, Outdoor LED, Commercial Screens'
  });

  useEffect(() => {
    // Stagger fade-up for all .led-reveal elements
    const elements = gsap.utils.toArray('.led-reveal');
    elements.forEach((el) => {
      gsap.fromTo(el,
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
        }
      );
    });

    // Horizontal line draw animation
    gsap.utils.toArray('.led-line').forEach((el) => {
      gsap.fromTo(el, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: el, start: 'top 90%' }
      });
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  const features = [
    { num: '01', title: 'Ultra-High Brightness', desc: 'Cuts through direct sunlight — up to 10,000 nits for outdoor clarity at any time of day.', image: 'https://images.pexels.com/photos/28940484/pexels-photo-28940484.jpeg' },
    { num: '02', title: 'Weather-Resistant', desc: 'Sealed against rain, dust, salt, and extreme temperature fluctuations.', image: 'https://images.unsplash.com/photo-1515238152791-8216bfdf89a7?q=80&w=800&auto=format&fit=crop' },
    { num: '03', title: 'Seamless Quality', desc: 'Pixel-perfect imagery with ultra-fine pitch panels and no visible bezels.', image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop' },
    { num: '04', title: 'Energy-Efficient', desc: 'Advanced LED diode arrays delivering maximum nits at minimum wattage.', image: 'https://images.unsplash.com/photo-1518556737724-e362c03e8740?q=80&w=800&auto=format&fit=crop' },
    { num: '05', title: 'Custom Configurations', desc: 'Any size, shape, or curve — fabricated and installed to your exact spec.', image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=1000&auto=format&fit=crop' },
  ];

  const useCases = [
    { title: 'Retail Storefronts', desc: 'Drive footfall with dynamic, eye-catching displays at entrances and windows.', image: 'https://images.pexels.com/photos/7317346/pexels-photo-7317346.jpeg' },
    { title: 'Shopping Complexes', desc: 'Wayfinding, advertising, and event messaging at scale.', image: 'https://images.pexels.com/photos/35243843/pexels-photo-35243843.jpeg' },
    { title: 'Highway Displays', desc: 'High-brightness, large-format screens for maximum road visibility.', image: 'https://images.pexels.com/photos/11601940/pexels-photo-11601940.jpeg' },
    { title: 'Corporate Spaces', desc: 'Lobbies, boardrooms, and reception areas — communicate with clarity.', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Events & Exhibitions', desc: 'Modular, rapid-deploy systems for any event footprint.', image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1200&auto=format&fit=crop' },
    { title: 'Control Rooms', desc: 'Fine-pitch video walls for mission-critical, 24/7 monitoring environments.', image: 'https://images.pexels.com/photos/19452352/pexels-photo-19452352.jpeg' },
  ];

  return (
    <div className="bg-[#050505] min-h-screen overflow-hidden relative">

      {/* ══════════════════════════════════════════════
          GLOBAL PREMIUM CHECK PATTERN BACKGROUND
      ═══════════════════════════════════════════════ */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      />

      {/* ══════════════════════════════════════════════
          HERO — full-screen LED canvas + text
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 pt-28 overflow-hidden">

        {/* Three.js LED canvas — fills entire bg */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
            <LEDShaderMesh />
          </Canvas>
        </div>

        {/* Gradient overlays for readability */}
        <div className="absolute inset-0 z-1 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
        </div>

        {/* Glow blob */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-signal-amber/15 blur-[160px] pointer-events-none z-1" />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl">

          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-signal-amber text-xs font-bold uppercase tracking-[0.25em] mb-10 hover:text-white transition-colors duration-300"
          >
            <span>←</span> All Services
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <div>
              <div className="led-reveal inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-signal-amber/30 bg-signal-amber/10 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-signal-amber animate-pulse" />
                <span className="text-xs text-signal-amber font-semibold tracking-widest uppercase">LED Display Systems</span>
              </div>

              <h1 className="led-reveal text-5xl md:text-7xl lg:text-7xl font-display font-extrabold tracking-tighter leading-[0.9] mb-6">
                LED Displays
                That
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-amber to-yellow-200 glow-text">
                  {' '}Demand{'\n'}Attention.
                </span>
              </h1>

              <p className="led-reveal text-lg md:text-xl text-gray-400 font-light leading-relaxed max-w-lg mb-10">
                In high-competition environments, visibility is everything. Designed for maximum brightness, clarity, and long-term performance — indoors or outdoors.
              </p>

              <div className="led-reveal flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="group relative inline-flex items-center gap-2 px-8 py-4 bg-signal-amber text-black font-bold rounded-full text-base overflow-hidden hover:shadow-[0_0_40px_rgba(245,166,35,0.5)] transition-shadow duration-500"
                >
                  <span className="absolute inset-0 bg-white scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 rounded-full" />
                  <span className="relative z-10">Get a Custom Solution</span>
                  <span className="relative z-10">→</span>
                </Link>
                <Link
                  to="/projects"
                  className="inline-flex items-center gap-2 px-8 py-4 border border-white/15 text-white font-medium rounded-full text-base hover:border-signal-amber/60 hover:text-signal-amber transition-all duration-300 backdrop-blur-sm bg-white/5"
                >
                  View Projects
                </Link>
              </div>
            </div>

            {/* Right: Quick-stat cards */}
            <div className="led-reveal grid grid-cols-2 gap-4">
              {[
                { v: '10K+', l: 'Nits Brightness' },
                { v: 'IP65', l: 'Weather Rating' },
                { v: '< 2mm', l: 'Pixel Pitch' },
                { v: '24/7', l: 'Support & Service' },
              ].map((s) => (
                <div key={s.l} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:border-signal-amber/40 transition-colors duration-300">
                  <div className="text-3xl font-display font-bold text-signal-amber mb-1">{s.v}</div>
                  <div className="text-xs text-gray-400 uppercase tracking-widest">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURES
      ═══════════════════════════════════════════════ */}
      {/* ══════════════════════════════════════════════
          FEATURES (Premium Bento Box)
      ═══════════════════════════════════════════════ */}
      <section className="py-32 border-t border-white/5 relative overflow-hidden bg-[#020202]">
        {/* Soft radial glow in background */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-signal-amber/10 to-transparent blur-3xl pointer-events-none z-0" />

        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">

          <div className="led-reveal flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-sm font-bold tracking-[0.25em] text-[#0EA5E9] uppercase flex items-center gap-4 mb-4">
                <div className="h-[1px] w-8 bg-[#0EA5E9]" /> Core Features
              </span>
              <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tighter text-white drop-shadow-xl">
                Built to outperform.<br />
                <span className="text-gray-500">Engineered to last.</span>
              </h2>
            </div>
            <p className="text-gray-400 font-light max-w-sm text-base leading-relaxed">
              Every system we deploy meets stringent quality benchmarks for extreme brightness, longevity, and environmental resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px]">

            {/* Feature 01 (Span 2) */}
            <div className="led-reveal group relative overflow-hidden rounded-[2.5rem] bg-[#080808] border border-white/10 md:col-span-2 shadow-2xl hover:border-signal-amber/50 transition-all duration-700 hover:-translate-y-2">
              <div className="absolute inset-0 z-0">
                <img src={features[0].image} alt={features[0].title} className="w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-1000 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
              </div>
              <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                <span className="absolute top-10 right-10 text-signal-amber font-mono text-xl font-bold bg-signal-amber/10 px-6 py-2.5 rounded-full border border-signal-amber/20 backdrop-blur-md shadow-[0_0_20px_rgba(245,166,35,0.2)]">{features[0].num}</span>
                <h3 className="text-4xl font-display font-bold text-white mb-4 group-hover:text-signal-amber transition-colors duration-500 drop-shadow-lg">{features[0].title}</h3>
                <p className="text-gray-300 font-light leading-relaxed max-w-md group-hover:text-white transition-colors duration-500 text-lg drop-shadow-md">{features[0].desc}</p>
              </div>
            </div>

            {/* Live Simulation Canvas */}
            <div className="led-reveal group relative overflow-hidden rounded-[2.5rem] bg-[#050505] border border-white/10 col-span-1 shadow-2xl hover:border-[#0EA5E9]/50 transition-all duration-700 hover:-translate-y-2 flex flex-col">
              <div className="flex-1 relative w-full h-[60%]">
                <MiniLEDCanvas />
                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none" />
              </div>
              <div className="p-8 relative z-10 h-[40%] flex flex-col justify-end">
                <h3 className="text-2xl font-display font-bold text-[#0EA5E9] mb-2 group-hover:translate-x-1 transition-transform duration-500">Live LED Matrix</h3>
                <p className="text-gray-400 text-sm font-light">Interactive pixel-pitch simulation rendering in real-time WebGL.</p>
              </div>
            </div>

            {/* Feature 02 & 03 & 04 (Span 1 each) */}
            {features.slice(1, 4).map((f) => (
              <div
                key={f.num}
                className="led-reveal group relative overflow-hidden bg-[#080808] border border-white/10 rounded-[2.5rem] hover:border-signal-amber/40 transition-all duration-700 hover:-translate-y-2 col-span-1 shadow-xl"
              >
                <div className="absolute inset-0 z-0">
                  <img src={f.image} alt={f.title} className="w-full h-full object-cover opacity-20 group-hover:opacity-50 transition-all duration-1000 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/90 to-transparent" />
                </div>

                {/* Glow Overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-signal-amber/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                <div className="relative z-10 p-8 flex flex-col h-full justify-end">
                  <span className="text-white/10 font-mono text-7xl font-bold absolute top-6 right-6 group-hover:text-signal-amber/20 transition-colors duration-500 pointer-events-none select-none">{f.num}</span>
                  <div className="w-10 h-1 bg-white/20 group-hover:w-16 group-hover:bg-signal-amber transition-all duration-500 mb-6 rounded-full drop-shadow-md" />
                  <h3 className="text-2xl font-display font-semibold mb-3 text-white group-hover:-translate-y-1 transition-transform duration-500 drop-shadow-lg">{f.title}</h3>
                  <p className="text-gray-400 text-sm font-light leading-relaxed group-hover:text-gray-200 transition-colors duration-500 drop-shadow-md">{f.desc}</p>
                </div>
              </div>
            ))}

            {/* Feature 05 Connect CTA */}
            <div className="led-reveal group relative grid-cols-1 md:col-span-2 lg:col-span-2 bg-gradient-to-r from-signal-amber to-yellow-500 rounded-[2.5rem] p-10 flex flex-col md:flex-row gap-8 items-center overflow-hidden hover:-translate-y-2 transition-transform duration-700 shadow-[0_20px_50px_rgba(245,166,35,0.2)]">
              {/* Animated rings bg */}
              <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 border border-black/10 rounded-full group-hover:scale-110 transition-transform duration-1000 pointer-events-none" />
              <div className="absolute top-1/2 right-20 -translate-y-1/2 w-64 h-64 border border-black/10 rounded-full group-hover:scale-125 transition-transform duration-1000 pointer-events-none" />

              <div className="flex-1 relative z-10">
                <span className="text-black/60 font-mono text-sm font-bold tracking-[0.2em] uppercase block mb-4 border border-black/10 bg-black/5 w-max px-5 py-2 rounded-full">05 — {features[4].title}</span>
                <h3 className="text-3xl md:text-4xl font-display font-bold text-black mb-4 leading-tight drop-shadow-sm">{features[4].desc}</h3>
              </div>
              <Link to="/contact" className="relative z-10 flex-shrink-0 px-8 py-5 bg-black text-white font-bold rounded-full hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,1)] transition-all duration-500 text-lg whitespace-nowrap flex items-center gap-3">
                Discuss Your Spec <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          USE CASES (Premium Image Cards)
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-[#050505] border-t border-white/5 relative overflow-hidden">
        {/* Subtle ambient gradients */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,_var(--tw-gradient-stops))] from-signal-amber/5 to-transparent blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">

          <div className="led-reveal mb-20 text-center flex flex-col items-center">
            <span className="text-xs font-bold tracking-[0.25em] text-signal-amber uppercase block mb-4 border border-signal-amber/20 bg-signal-amber/10 px-5 py-2 rounded-full">Applications</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter text-white drop-shadow-xl">Where we deploy.</h2>
            <p className="text-gray-400 mt-6 max-w-2xl text-base md:text-lg font-light leading-relaxed">From high-impact storefronts to mission-critical operations, our LED systems are engineered for diverse environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {useCases.map((u, i) => (
              <div
                key={u.title}
                className="led-reveal group relative h-[380px] md:h-[450px] rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-[0_20px_50px_rgba(14,165,233,0.15)] hover:border-[#0EA5E9]/30 transition-all duration-700 hover:-translate-y-3 cursor-pointer"
              >
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                  <img
                    src={u.image}
                    alt={u.title}
                    className="w-full h-full object-cover opacity-50 group-hover:opacity-80 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-110 transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)]"
                    loading="lazy"
                  />
                  {/* Dynamic Dark Gradients */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent group-hover:via-black/20 transition-colors duration-700" />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-black/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                  <div className="mb-auto self-end">
                    <span className="w-12 h-12 rounded-full flex items-center justify-center text-white/50 text-sm font-bold font-mono group-hover:text-[#0EA5E9] bg-white/5 backdrop-blur-md border border-white/10 group-hover:border-[#0EA5E9]/50 transition-all duration-500 shadow-lg">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mb-3 drop-shadow-lg group-hover:text-[#0EA5E9] transition-colors duration-300">
                      {u.title}
                    </h3>

                    {/* Animated height reveal for text */}
                    <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
                      <div className="overflow-hidden">
                        <p className="text-gray-300 text-sm md:text-base font-light leading-relaxed pt-2 drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
                          {u.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CTA STRIP
      ═══════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        {/* Animated LED canvas background */}
        <div className="absolute inset-0 z-0 opacity-30">
          <Canvas camera={{ position: [0, 0, 4], fov: 65 }} gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }} dpr={[1, 1.5]}>
            <LEDShaderMesh />
          </Canvas>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background to-background/60 z-1 pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="led-reveal flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            <div>
              <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter mb-4">
                Start your LED project.<br />
                <span className="text-signal-amber glow-text">Today.</span>
              </h2>
              <p className="text-gray-400 font-light max-w-lg">
                We handle consultation, supply, structural installation, content setup, and ongoing maintenance — end to end.
              </p>
            </div>

            <div className="flex flex-col gap-4 flex-shrink-0">
              <a
                href="tel:+919876543210"
                className="inline-flex items-center gap-3 px-8 py-5 bg-signal-amber text-black font-bold rounded-2xl text-xl hover:bg-white transition-colors duration-300 shadow-[0_0_40px_rgba(245,166,35,0.35)]"
              >
                <span>📞</span>
                +91 73977 66555
              </a>
              <a
                href="mailto:sureshgk.signal@gmail.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-2xl text-base hover:border-signal-amber/40 transition-colors duration-300"
              >
                <span>✉</span>
                sureshgk.signal@gmail.com
              </a>
              <p className="text-gray-500 text-xs text-center">123 Visibility District, Tech Park Avenue</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
