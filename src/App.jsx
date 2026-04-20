import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import CustomCursor from './components/ui/CustomCursor';
import FloatingActions from './components/ui/FloatingActions';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import LEDDisplay from './pages/LEDDisplay';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="relative  min-h-screen bg-background text-white selection:bg-signal-amber selection:text-black">
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <FloatingActions />
      
      <main className="flex-grow w-full overflow-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/led-display" element={<LEDDisplay />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
