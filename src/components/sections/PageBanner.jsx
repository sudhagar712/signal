import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PageBanner({ title, subtitle, badge }) {
  const container = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial properties
      gsap.set('.banner-elem', { y: 60, opacity: 0, rotateX: 20 });
      gsap.set('.banner-line', { scaleX: 0, opacity: 0 });

      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });
      
      tl.to('.banner-elem', { y: 0, opacity: 1, rotateX: 0, stagger: 0.15, delay: 0.1 })
        .to('.banner-line', { scaleX: 1, opacity: 1, duration: 1.5, ease: 'expo.inOut' }, '-=0.8');

      // Subtle parallax on the background shapes
      gsap.to('.banner-bg-shape', {
        y: '20%',
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
      
      {/* ── Background Abstract Shapes ── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="banner-bg-shape absolute -top-[50%] left-1/2 -translate-x-1/2 w-[150%] md:w-[100%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-signal-amber/15 via-transparent to-transparent opacity-80" />
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
