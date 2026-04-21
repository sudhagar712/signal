import { useState, useEffect, useCallback } from 'react';
import PageBanner from '../components/sections/PageBanner';
import useSEO from '../hooks/useSEO';
import Projectvideos from './Projectvideos';
import { Maximize2, X, ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';

// Dynamically import all images from assets/projects
const projectImages = import.meta.glob('../assets/projects/*.{jpg,jpeg,png,webp,JPEG}', { eager: true });
const allImagePaths = Object.values(projectImages).map(m => m.default);

export default function Projects() {
  useSEO({
    title: 'Portfolio | Signal Visibility',
    description: 'High-end showcase of Signal Visibility projects. Proper view masonry gallery.',
    keywords: 'LED Signage, Digital Branding, Portfolio Gallery'
  });

  const [selectedIndex, setSelectedIndex] = useState(null);

  // Navigation Logic
  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % allImagePaths.length);
  }, []);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + allImagePaths.length) % allImagePaths.length);
  }, []);

  // Keyboard Navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'Escape') setSelectedIndex(null);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  return (
    <div className="relative bg-[#030303] min-h-screen pb-32 selection:bg-signal-amber selection:text-black antialiased">
      {/* Premium Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-[0.03] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      <PageBanner 
        badge="Projects"
        title="Portfolio"
        subtitle="Precision engineering and architectural visibility. Explore our catalog of successfully delivered installations."
      />

      <div className="container mx-auto px-4 lg:px-12 mt-12 md:mt-20">
        
        {/* Gallery Header */}
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 md:mb-16 gap-4 border-b border-white/5 pb-8 md:pb-10">
          <div>
            <h2 className="text-3xl md:text-6xl font-display font-medium tracking-tight text-white/90">
              Recent <span className="italic font-light text-white/40">Work</span>
            </h2>
          </div>
          <p className="text-signal-amber/60 text-[10px] md:text-sm tracking-[0.2em] uppercase font-bold">
            {allImagePaths.length} Active Deployments
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="columns-2 lg:columns-3 xl:columns-4 gap-3 md:gap-8 space-y-3 md:space-y-8">
          {allImagePaths.map((img, index) => (
            <div 
              key={index}
              onClick={() => setSelectedIndex(index)}
              className="group relative break-inside-avoid rounded-xl md:rounded-2xl overflow-hidden bg-zinc-950 border border-white/5 cursor-pointer shadow-xl active:scale-[0.98] transition-transform duration-200"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={img} 
                  alt={`Signal Project ${index + 1}`}
                  className="w-full h-auto object-contain transition-transform duration-500 md:group-hover:scale-105"
                  loading="lazy"
                />
                
                <div className="absolute bottom-2 right-2 md:hidden">
                   <div className="p-2 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-white/80">
                      <Maximize2 className="w-3 h-3" />
                   </div>
                </div>

                <div className="hidden md:flex absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 items-center justify-center backdrop-blur-[1px]">
                   <div className="flex flex-col items-center gap-3">
                      <div className="p-4 rounded-full bg-signal-amber text-black shadow-xl ring-4 ring-signal-amber/20">
                        <Maximize2 className="w-6 h-6" />
                      </div>
                      <span className="text-white text-xs font-bold tracking-[0.2em] uppercase">Expand View</span>
                   </div>
                </div>

                <div className="absolute top-2 left-2 md:top-4 md:left-4 px-2 py-0.5 md:px-3 md:py-1 rounded-md md:rounded-full bg-black/40 backdrop-blur-md border border-white/5 text-[8px] md:text-[10px] font-bold text-white/40 tracking-tighter">
                   #{ (index + 1).toString().padStart(2, '0') }
                </div>
              </div>
            </div>
          ))}
        </div>

<div className="mt-20 mb-20 md:px-20">
  <Projectvideos />
</div>
        












        

        {/* Ultra-Premium Cinematic CTA */}
        <div className="mt-32 md:mt-60 relative group">
          {/* Background Ambient Glows */}
          <div className="absolute -top-24 left-1/4 w-64 h-64 bg-signal-amber/10 blur-[100px] rounded-full group-hover:bg-signal-amber/20 transition-colors duration-1000"></div>
          <div className="absolute -bottom-24 right-1/4 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-1000"></div>

          <div className="relative overflow-hidden rounded-[3rem] md:rounded-[6rem] border border-white/5 bg-zinc-950/40 backdrop-blur-3xl px-8 py-20 md:py-40 text-center shadow-[0_0_100px_rgba(0,0,0,0.5)]">
            {/* Animated Shimmer Border */}
            <div className="absolute inset-0 border border-white/10 rounded-[3rem] md:rounded-[6rem] group-hover:border-signal-amber/30 transition-colors duration-700"></div>
            
            {/* Moving Hero Glow */}
            <div className="absolute inset-0 bg-hero-glow opacity-10 group-hover:opacity-30 transition-opacity duration-1000 rotate-180 scale-150"></div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <span className="w-2 h-2 rounded-full bg-signal-amber animate-pulse"></span>
                <span className="text-[10px] md:text-xs font-bold text-white/60 uppercase tracking-[0.3em]">Available for projects</span>
              </div>

              <h2 className="text-4xl md:text-9xl font-display font-medium tracking-tighter leading-[0.9] text-white mb-12">
                Let's reveal your <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-signal-amber via-white to-blue-400">Brand's Soul.</span>
              </h2>

              <p className="text-gray-400 text-sm md:text-xl max-w-2xl mx-auto mb-16 leading-relaxed px-4">
                We combine architectural precision with digital brilliance. From the first spark of an idea to the final glowing installation.
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <a 
                  href="/contact" 
                  className="group/btn relative inline-flex items-center gap-4 px-12 py-6 bg-white text-black font-bold rounded-full overflow-hidden hover:bg-signal-amber transition-all duration-500 shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-signal-amber/40"
                >
                  <span className="relative z-10 text-lg md:text-xl">START A PROJECT</span>
                  <ArrowUpRight className="relative z-10 w-6 h-6 group-hover/btn:rotate-45 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-signal-amber translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500"></div>
                </a>
                
               
              </div>
            </div>

            {/* Floating Glass Accent */}
            <div className="absolute top-1/2 -right-10 w-40 h-40 bg-white/5 backdrop-blur-3xl rounded-full border border-white/10 hidden md:block rotate-12 blur-sm"></div>
            <div className="absolute bottom-0 -left-10 w-32 h-32 bg-signal-amber/5 backdrop-blur-3xl rounded-3xl border border-white/10 hidden md:block -rotate-12 blur-sm"></div>
          </div>
        </div>
      </div>






      

      {/* Navigation Lightbox */}
      {selectedIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-2 md:p-12"
          onClick={() => setSelectedIndex(null)}
        >
          {/* Close Button */}
          <button 
            className="fixed top-6 right-6 md:top-10 md:right-10 p-2 text-white/30 hover:text-white transition-colors z-[110]"
            onClick={() => setSelectedIndex(null)}
          >
            <X className="w-8 h-8 md:w-12 md:h-12" />
          </button>

          {/* Previous Button */}
          <button 
            className="fixed left-4 md:left-10 p-3 md:p-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-all z-[110]"
            onClick={handlePrev}
          >
            <ChevronLeft className="w-6 h-6 md:w-10 md:h-10" />
          </button>

          {/* Next Button */}
          <button 
            className="fixed right-4 md:right-10 p-3 md:p-5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/50 hover:text-white transition-all z-[110]"
            onClick={handleNext}
          >
            <ChevronRight className="w-6 h-6 md:w-10 md:h-10" />
          </button>

          {/* Image */}
          <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
            <img 
              src={allImagePaths[selectedIndex]} 
              alt="Full Preview" 
              className="max-w-full max-h-full object-contain rounded-lg shadow-[0_0_80px_rgba(0,0,0,0.8)] pointer-events-auto"
            />
          </div>
          
          {/* Counter Overlay */}
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/40 text-[10px] md:text-xs tracking-[0.2em] font-bold uppercase">
             {selectedIndex + 1} / {allImagePaths.length}
          </div>
        </div>
      )}

      {/* Decorative Accents */}
     
     
     
      <div className="fixed top-0 right-0 w-[60vw] h-[60vw] bg-signal-amber/[0.015] blur-[80px] rounded-full pointer-events-none -z-10"></div>
  

  
    </div>


  );
}
