import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/5 pt-20 px-3 md:px-10 pb-10">
      <div className="container mx-auto px-6">
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
