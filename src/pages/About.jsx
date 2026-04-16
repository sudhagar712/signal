import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageBanner from '../components/sections/PageBanner';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const textRef = useRef(null);

  useEffect(() => {
    // Parallax fade for content blocks
    gsap.utils.toArray('.about-fade').forEach(block => {
      gsap.fromTo(block, 
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: block,
            start: "top 80%",
          }
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach(st => st.kill());
  }, []);

  return (
    <div className="bg-background min-h-screen pb-20">
      <PageBanner 
        badge="About Us"
        title="About Us"
        subtitle="Signal is a modern visual solutions company specializing in LED display systems and brand visibility infrastructure."
      />
      
      <div className="container mx-auto px-6 pt-24">
        
        {/* Story */}
        <div className="max-w-3xl mx-auto space-y-12 text-xl md:text-3xl font-light text-gray-300">
          <p className="about-fade leading-relaxed text-white font-medium text-2xl md:text-4xl">
            We believe visibility is not an afterthought. <br/>It is a business advantage.
          </p>
          <p className="about-fade leading-relaxed border-l-4 border-signal-amber pl-8 my-16">
            In today’s crowded environment, brands don’t struggle to exist.<br />
            <span className="text-white font-medium">They struggle to stand out.</span><br />
            That’s where we operate.
          </p>
          <p className="about-fade leading-relaxed">
            From high-performance LED displays to precision-crafted signage and branding elements, every solution we deliver is designed to perform in real-world conditions.
          </p>
          <p className="about-fade leading-relaxed">
            We focus on execution, durability, and impact.
            Because <span className="text-white">visibility that fades is wasted investment.</span>
          </p>
        </div>

        {/* Values/Outro */}
        <div className="mt-40 text-center about-fade">
          <h2 className="text-3xl md:text-5xl font-display font-bold max-w-4xl mx-auto">
            Signal works with businesses that want to be seen <span className="text-signal-amber italic">clearly, consistently, and powerfully.</span>
          </h2>
          <div className="mt-16">
            <button className="px-10 py-5 bg-signal-amber text-black font-semibold rounded-full hover:bg-white transition-colors duration-300 text-lg">
              Partner With Us
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
