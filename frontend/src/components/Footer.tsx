import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Brand from './Brand';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const subscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <footer className="bg-navy-950 text-mist-300 py-16 px-6 border-t border-navy-line">
      <div className="max-w-[1160px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr_1fr_1.2fr] gap-10 pb-11">
          <div>
            <Brand inverse onClick={() => window.scrollTo(0, 0)} />
            <p className="text-[14px] max-w-[240px] leading-relaxed">High-velocity design for brands that measure everything.</p>
          </div>
          
          <div className="flex flex-col">
            <h4 className="font-mono text-[12px] tracking-[0.08em] uppercase text-mist-500 mb-4 font-semibold">Site</h4>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li><Link to="/services" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Services</Link></li>
              <li><Link to="/process" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Process</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Pricing</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Get Audit</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h4 className="font-mono text-[12px] tracking-[0.08em] uppercase text-mist-500 mb-4 font-semibold">Contact</h4>
            <ul className="flex flex-col gap-3 text-[14.5px]">
              <li><a href="mailto:hello@clickforge.agency" className="hover:text-white transition-colors">hello@clickforge.agency</a></li>
              <li><Link to="/contact" className="hover:text-white transition-colors" onClick={() => window.scrollTo(0, 0)}>Book a call</Link></li>
            </ul>
          </div>
          
          <div className="flex flex-col">
            <h4 className="font-mono text-[12px] tracking-[0.08em] uppercase text-mist-500 mb-4 font-semibold">Get monthly CRO breakdowns</h4>
            <p className="text-[13.5px] text-mist-500 mb-1">No fluff. Unsubscribe anytime.</p>
            <form onSubmit={subscribe} className="flex gap-2 mt-3.5">
              <input 
                type="email" 
                placeholder="you@company.com" 
                value={status === 'success' ? 'Subscribed ✓' : email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'success'}
                className="flex-1 min-w-0 bg-navy-900 border-[1.5px] border-navy-line rounded-lg px-3.5 py-3 text-white font-body text-[14px] focus:outline-none focus:border-blue-400 transition-colors"
              />
              <button 
                type="submit" 
                disabled={status === 'loading' || status === 'success'}
                className="bg-ember-500 hover:bg-ember-600 transition-colors border-none rounded-lg px-4 text-white font-semibold text-[13px] cursor-pointer"
              >
                {status === 'loading' ? 'Sending…' : 'Subscribe'}
              </button>
            </form>
            {status === 'error' && <div className="text-[#FF8A6B] text-[13.5px] mt-2">Enter a valid email.</div>}
          </div>
        </div>
        
        <div className="border-t border-navy-line pt-6 flex flex-wrap gap-4 justify-between items-center text-[13px] text-mist-500">
          <span>© 2026 ClickForge. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
