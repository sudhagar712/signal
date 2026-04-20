import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="relative bg-[#020202] border-t border-white/5 pt-20 px-3 md:px-10 pb-10 overflow-hidden">
      
      {/* Premium Background Design */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        {/* Glow Effects */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[150%] bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-signal-amber/10 via-transparent to-transparent" />
        <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#0EA5E9]/10 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[120px] rounded-full" />
        {/* Subtle Grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_100%,#000_10%,transparent_100%)]" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="inline-block mb-6">
              <img
                src={logo}
                alt="Signal Logo"
                className="h-10 md:h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-gray-400 font-light pr-4">
              High-performance LED displays and visual branding systems designed to capture attention in the real world.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Solutions</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li><Link to="/services/led-display" className="hover:text-signal-amber transition-colors">LED Displays</Link></li>
              <li><Link to="/services" className="hover:text-signal-amber transition-colors">ACP Elevation</Link></li>
              <li><Link to="/services" className="hover:text-signal-amber transition-colors">Sign Boards & Signages</Link></li>
              <li><Link to="/services" className="hover:text-signal-amber transition-colors">Flex & Print</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Company</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li><Link to="/about" className="hover:text-signal-amber transition-colors">About Us</Link></li>
              <li><Link to="/projects" className="hover:text-signal-amber transition-colors">Projects</Link></li>
              <li><Link to="/contact" className="hover:text-signal-amber transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-6 uppercase tracking-wider text-sm">Contact Workspace</h4>
            <ul className="space-y-4 text-gray-400 font-light">
              <li>info@signalvisibility.com</li>
              <li>+91 98765 43210</li>
              <li className="pt-4">
                <Link to="/contact" className="inline-block pb-1 border-b border-signal-amber text-signal-amber hover:text-white hover:border-white transition-colors">
                  Get in touch
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Signal. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white hover:underline transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
