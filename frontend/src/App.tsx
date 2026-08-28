import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Process from './components/Process';
import Pricing from './components/Pricing';
import Contact from './pages/Contact';
import { ArrowUp } from 'lucide-react';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import PointerAura from './components/PointerAura';

function App() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollProgress = useScrollProgress();
  useSmoothScroll();

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Router>
      <div id="top" className="font-body text-ink-900 bg-white">
        <div className="fixed inset-x-0 top-0 z-[60] h-[3px] origin-left bg-ember-500" style={{ transform: `scaleX(${scrollProgress})` }} />
        <PointerAura />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/process" element={<Process />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      
        <button 
          onClick={scrollToTop}
          className={`fixed right-6 bottom-6 w-12 h-12 rounded-full bg-navy-950 border border-navy-line text-white flex items-center justify-center cursor-pointer transition-all duration-300 z-[90] shadow-lg hover:bg-ember-500 hover:-translate-y-1
            ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </Router>
  );
}

export default App;
