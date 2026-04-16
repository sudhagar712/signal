import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageBanner from '../components/sections/PageBanner';

gsap.registerPlugin(ScrollTrigger);

export default function Projects() {
  const projects = [
    { id: 1, title: 'Nexus Tech Park', category: 'Outdoor LED Display', size: 'large', img: 'https://images.unsplash.com/photo-1542482329-873b7a5a8e04?auto=format&fit=crop&w=1200&q=80' },
    { id: 2, title: 'Aurora Mall', category: 'Indoor Retail Signage', size: 'small', img: 'https://images.unsplash.com/photo-1620573908865-c7cd89ba40cf?auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Vertex Towers', category: 'ACP Elevation', size: 'medium', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Lumina Auto Expo', category: 'Event Fabrication', size: 'medium', img: 'https://images.unsplash.com/photo-1534947935414-f87be98fb305?auto=format&fit=crop&w=800&q=80' },
    { id: 5, title: 'Kinetix Stadium', category: 'Perimeter LED Screens', size: 'large', img: 'https://images.unsplash.com/photo-1463171515643-952cee54d42a?auto=format&fit=crop&w=1200&q=80' },
    { id: 6, title: 'Apex Corporate', category: 'Wayfinding & Name Boards', size: 'small', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  ];

  useEffect(() => {
    // Stagger grid entry
    gsap.fromTo('.project-card', 
      { y: 100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: '.project-grid',
          start: "top 85%",
        }
      }
    );
  }, []);

  return (
    <div className="bg-background min-h-screen pb-32">
      <PageBanner 
        badge="Portfolio"
        title="Projects"
        subtitle="Real projects. Real impact. Every project we deliver is built for performance, durability, and visibility in real environments."
      />
      <div className="container mx-auto px-6 pt-24">
        
        {/* Grid */}
        <div className="project-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px]">
          {projects.map((proj) => {
            // Determine span based on size
            const isLarge = proj.size === 'large';
            const isMedium = proj.size === 'medium';
            const spanClass = isLarge ? 'md:col-span-2 md:row-span-2' : isMedium ? 'md:col-span-1 md:row-span-2' : 'md:col-span-1 md:row-span-1';

            return (
              <div 
                key={proj.id} 
                className={`project-card group relative overflow-hidden rounded-2xl bg-white/5 border border-white/5 ${spanClass}`}
              >
                {/* Image */}
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105"
                  style={{ backgroundImage: `url(${proj.img})` }}
                ></div>
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <span className="text-signal-amber text-xs font-bold uppercase tracking-widest mb-3 block opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    {proj.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-display font-medium text-white shadow-sm">
                    {proj.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-32 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">Ready to start your project?</h2>
          <a href="/contact" className="inline-block px-10 py-5 bg-white text-black font-semibold rounded-full hover:bg-signal-amber transition-colors duration-300 text-lg">
            Discuss Your Vision
          </a>
        </div>

      </div>
    </div>
  );
}
