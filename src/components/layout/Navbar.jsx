import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '../../lib/utils';
import gsap from 'gsap';
import logo from '../../assets/logo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const menuRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Setup GSAP Timeline
    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current
      .to(menuRef.current, {
        clipPath: 'circle(150% at calc(100% - 40px) 40px)',
        duration: 0.4,
        ease: 'power4.inOut',
        display: 'flex'
      })
      .fromTo('.mobile-nav-link',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, stagger: 0.05, ease: 'power3.out' },
        "-=0.2"
      )
      .fromTo('.mobile-nav-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' },
        "-=0.2"
      )
      .fromTo('.mobile-nav-footer',
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' },
        "-=0.1"
      );

    return () => {
      if (timelineRef.current) timelineRef.current.kill();
    };
  }, []);

  useEffect(() => {
    if (timelineRef.current) {
      if (isOpen) {
        timelineRef.current.play();
        document.body.style.overflow = 'hidden';
      } else {
        timelineRef.current.reverse();
        document.body.style.overflow = 'auto';
      }
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'LED Display', path: '/led-display' },
    { name: 'Projects', path: '/projects' },

  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none",
          scrolled && !isOpen ? "py-4" : "py-6"
        )}
      >
        <div className="container mx-auto px-4 md:px-0 lg:px-10 pointer-events-auto">
          <nav className={cn(
            "flex items-center justify-between rounded-3xl px-6 py-4 backdrop-blur-md transition-all duration-300 border border-white/5",
            scrolled && !isOpen ? "bg-black/80 shadow-lg" : "bg-black/50"
          )}>
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center z-[60] overflow-hidden group"
              onClick={() => setIsOpen(false)}
            >
              <img
                src={logo}
                alt="logo"
                className="h-8 sm:h-10 md:h-12 lg:h-12 w-auto object-contain"
              />
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8 z-[60]">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-sm font-medium tracking-wide uppercase   transition-colors relative group",
                    location.pathname === link.path ? "text-signal-amber" : "text-gray-300 hover:text-white"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute -bottom-1 left-0 w-full h-[1px] bg-signal-amber scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left",
                    location.pathname === link.path && "scale-x-100"
                  )}></span>
                </Link>
              ))}
              <Link
                to="/contact"
                className="px-6 py-2.5 bg-white text-black font-semibold text-sm rounded-full hover:bg-signal-amber transition-colors duration-300"
              >
                Contact Us
              </Link>
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden text-white z-[60] focus:outline-none relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={20} className="text-signal-amber" /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {/* Premium Premium Offcanvas Mobile Menu */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 bg-[#050505] flex-col justify-between hidden pointer-events-auto"
        style={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
      >
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-signal-amber/10 via-background to-background pointer-events-none"></div>
        <div className="absolute -top-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-signal-amber/5 blur-[120px] pointer-events-none" />

        {/* Links Container */}
        <div className="flex flex-col items-center justify-center flex-grow w-full px-6 pt-32">
          {navLinks.map((link) => (
            <div key={link.name} className="overflow-hidden w-full text-center my-2">
              <Link
                to={link.path}
                className={cn(
                  "mobile-nav-link block text-5xl sm:text-6xl font-display font-extrabold tracking-tighter transition-all duration-300 py-2",
                  location.pathname === link.path ? "text-signal-amber" : "text-white/70 hover:text-white hover:tracking-tight hover:scale-105"
                )}
              >
                {link.name}
              </Link>
            </div>
          ))}

          <div className="overflow-hidden w-full max-w-sm mt-12 mb-8">
            <Link
              to="/contact"
              className="mobile-nav-cta block w-full text-center px-8 py-5 bg-signal-amber text-white font-bold text-xl rounded-full hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_30px_rgba(14,165,233,0.3)]"
            >
              Start a Project
            </Link>
          </div>
        </div>

        {/* Footer info in menu */}
        <div className="mobile-nav-footer w-full px-8 pb-12 pt-8 border-t border-white/10 flex flex-col items-center text-center">
          <p className="text-gray-400 text-sm mb-4 font-medium">Have a specific requirement?</p>
          <a href="mailto:sureshgk.signal@gmail.com" className="text-xl font-display font-medium text-white hover:text-signal-amber transition-colors mb-2">
            sureshgk.signal@gmail.com
          </a>
          <a href="tel:+919876543210" className="text-lg font-medium text-gray-300 hover:text-white transition-colors">
            +91 73977 66555
          </a>
        </div>
      </div>
    </>
  );
}
