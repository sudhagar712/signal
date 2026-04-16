import { useEffect } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  useEffect(() => {
    // Only run on desktop
    if (window.innerWidth <= 768) return;

    const cursor = document.getElementById('custom-cursor');
    const dot = document.getElementById('cursor-dot');
    
    if (!cursor || !dot) return;

    // Movement
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX - 16,
        y: e.clientY - 16,
        duration: 0.15,
        ease: "power2.out"
      });
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0,
      });
    };

    // Hover states
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, [role="button"]');
    
    const onMouseEnter = () => {
      gsap.to(cursor, { scale: 2, backgroundColor: 'rgba(245, 166, 35, 0.1)', borderColor: 'rgba(245, 166, 35, 0.5)', duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    
    const onMouseLeave = () => {
      gsap.to(cursor, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(255, 255, 255, 0.3)', duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        id="custom-cursor" 
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[100] hidden md:block backdrop-mix-blend-difference"
      ></div>
      <div 
        id="cursor-dot" 
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-signal-amber pointer-events-none z-[100] hidden md:block"
      ></div>
    </>
  );
}
