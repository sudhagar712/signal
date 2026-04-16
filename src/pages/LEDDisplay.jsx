import { useRef, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ══════════════════════════════════════════════════════
// 3D LED Pixel Grid Shader Component
// ══════════════════════════════════════════════════════
function LEDShaderMesh() {
  const meshRef = useRef();
  const uniformsRef = useRef({
    uTime:      { value: 0 },
    uAmber:     { value: new THREE.Color('#F5A623') },
    uDark:      { value: new THREE.Color('#0a0500') },
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
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }} gl={{ alpha: true }}>
        <LEDShaderMesh />
      </Canvas>
    </div>
  );
}

// ══════════════════════════════════════════════════════
// Page
// ══════════════════════════════════════════════════════
export default function LEDDisplay() {

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
    { num: '01', title: 'Ultra-High Brightness',  desc: 'Cuts through direct sunlight — up to 10,000 nits for outdoor clarity at any time of day.' },
    { num: '02', title: 'Weather-Resistant IP65+', desc: 'Sealed against rain, dust, salt, and extreme temperature fluctuations.' },
    { num: '03', title: 'Seamless Display Quality', desc: 'Pixel-perfect imagery with ultra-fine pitch panels and no visible bezels.' },
    { num: '04', title: 'Energy-Efficient Tech',   desc: 'Advanced LED diode arrays delivering maximum nits at minimum wattage.' },
    { num: '05', title: 'Custom Configurations',   desc: 'Any size, shape, or curve — fabricated and installed to your exact spec.' },
  ];

  const useCases = [
    { title: 'Retail Storefronts',    desc: 'Drive footfall with dynamic, eye-catching displays at entrances and windows.' },
    { title: 'Shopping Complexes',    desc: 'Wayfinding, advertising, and event messaging at scale.' },
    { title: 'Highway Displays',      desc: 'High-brightness, large-format screens for maximum road visibility.' },
    { title: 'Corporate Spaces',      desc: 'Lobbies, boardrooms, and reception areas — communicate with clarity.' },
    { title: 'Events & Exhibitions',  desc: 'Modular, rapid-deploy systems for any event footprint.' },
    { title: 'Control Rooms',         desc: 'Fine-pitch video walls for mission-critical, 24/7 monitoring environments.' },
  ];

  return (
    <div className="bg-background min-h-screen overflow-hidden">

      {/* ══════════════════════════════════════════════
          HERO — full-screen LED canvas + text
      ═══════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col justify-end pb-20 pt-28 overflow-hidden">

        {/* Three.js LED canvas — fills entire bg */}
        <div className="absolute inset-0 z-0">
          <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }} gl={{ alpha: true, antialias: false }}>
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

              <h1 className="led-reveal text-5xl md:text-7xl lg:text-8xl font-display font-extrabold tracking-tighter leading-[0.9] mb-6">
                LED Displays<br />
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
                { v: '10K+',  l: 'Nits Brightness' },
                { v: 'IP65',  l: 'Weather Rating' },
                { v: '< 2mm', l: 'Pixel Pitch' },
                { v: '24/7',  l: 'Support & Service' },
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
      <section className="py-32 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

          <div className="led-reveal flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-signal-amber uppercase block mb-3">Core Features</span>
              <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">Built for performance.<br/>Engineered to last.</h2>
            </div>
            <p className="text-gray-400 font-light max-w-sm text-sm leading-relaxed">
              Every system we deploy meets stringent quality benchmarks for brightness, longevity, and environmental resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Mini LED preview card */}
            <div className="led-reveal md:col-span-2 lg:col-span-1 bg-dark-900 border border-white/5 rounded-3xl p-6 flex flex-col gap-4">
              <MiniLEDCanvas />
              <p className="text-sm text-gray-400 font-light text-center">Live LED pixel simulation</p>
            </div>

            {features.slice(0, 4).map((f) => (
              <div
                key={f.num}
                className="led-reveal group bg-dark-900 border border-white/5 p-8 rounded-3xl hover:border-signal-amber/30 hover:bg-white/[0.02] transition-all duration-500"
              >
                <span className="text-signal-amber font-mono text-xs font-bold block mb-6 group-hover:tracking-widest transition-all duration-300">{f.num}</span>
                <h3 className="text-xl font-display font-semibold mb-3 group-hover:text-signal-amber transition-colors duration-300">{f.title}</h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">{f.desc}</p>
              </div>
            ))}

            {/* Last feature — spanning 2 cols on medium */}
            <div className="led-reveal group md:col-span-2 bg-signal-amber rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <span className="text-black/60 font-mono text-xs font-bold block mb-6">05</span>
                <h3 className="text-2xl font-display font-bold text-black mb-3">{features[4].title}</h3>
                <p className="text-black/70 text-sm font-medium leading-relaxed">{features[4].desc}</p>
              </div>
              <Link to="/contact" className="flex-shrink-0 px-6 py-3 bg-black text-white font-semibold rounded-full hover:bg-dark-900 transition-colors duration-300 text-sm whitespace-nowrap">
                Discuss Your Spec →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          USE CASES
      ═══════════════════════════════════════════════ */}
      <section className="py-24 bg-dark-900 border-t border-white/5">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">

          <div className="led-reveal mb-16">
            <span className="text-xs font-bold tracking-[0.25em] text-signal-amber uppercase block mb-3">Applications</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tighter">Where we deploy.</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {useCases.map((u, i) => (
              <div
                key={u.title}
                className="led-reveal group flex gap-5 p-6 border border-white/5 rounded-2xl hover:border-signal-amber/30 hover:bg-white/[0.02] transition-all duration-500"
              >
                <span className="text-signal-amber font-mono text-xs font-bold flex-shrink-0 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="font-semibold text-white mb-1 group-hover:text-signal-amber transition-colors duration-300">{u.title}</h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed">{u.desc}</p>
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
          <Canvas camera={{ position: [0, 0, 4], fov: 65 }} gl={{ alpha: true, antialias: false }}>
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
                +91 98765 43210
              </a>
              <a
                href="mailto:hello@signalvisibility.com"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white font-medium rounded-2xl text-base hover:border-signal-amber/40 transition-colors duration-300"
              >
                <span>✉</span>
                hello@signalvisibility.com
              </a>
              <p className="text-gray-500 text-xs text-center">123 Visibility District, Tech Park Avenue</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
