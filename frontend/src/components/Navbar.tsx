import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import Brand from './Brand';
import { AnimatePresence, motion } from 'framer-motion';
import { navigation } from '../data/site';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-paper-line bg-white/90 backdrop-blur-xl">
      <div className="max-w-[1200px] mx-auto px-5 md:px-7 h-[72px] flex items-center justify-between">
        <Brand onClick={() => window.scrollTo(0, 0)} />
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[14px] font-semibold text-ink-600">
          {navigation.map((item) => (
            <NavLink key={item.to} to={item.to} className={({ isActive }) => `relative py-1 group transition-colors ${isActive ? 'text-ink-900 active' : 'hover:text-ink-900'}`}>
              {({ isActive }) => <><span>{item.label}</span><span className={`absolute left-0 bottom-0 h-[1.5px] bg-ember-500 transition-all duration-300 group-hover:w-full ${isActive ? 'w-full' : 'w-0'}`} /></>}
            </NavLink>
          ))}
        </div>

        {/* Desktop CTA */}
        <Link to="/contact" className="hidden md:inline-flex btn btn-primary">
          Book a Free Audit
        </Link>

        {/* Mobile Burger */}
        <button 
          className="md:hidden p-2 text-ink-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: .22, ease: 'easeOut' }} className="md:hidden bg-white border-b border-paper-line absolute top-[72px] left-0 w-full py-4 px-6 flex flex-col gap-2 shadow-xl">
          {navigation.map((item) => <NavLink key={item.to} to={item.to} onClick={() => setIsOpen(false)} className={({ isActive }) => `font-medium py-2 ${isActive ? 'text-ember-500' : 'text-ink-600 hover:text-ink-900'}`}>{item.label}</NavLink>)}
          <Link to="/contact" onClick={() => setIsOpen(false)} className="btn btn-primary justify-center mt-2">
            Book a Free Audit <ArrowRight size={16} />
          </Link>
        </motion.div>
      )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
