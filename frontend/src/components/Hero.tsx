import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowRight, MousePointer2, Search, TrendingUp } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import InteractiveGrid from './InteractiveGrid';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gearRef = useRef<SVGSVGElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [signal, setSignal] = useState<'Design' | 'SEO' | 'Paid'>('Design');
  const signals = {
    Design: { value: '+42%', label: 'conversion lift', trend: '↑ 42% CVR', bars: ['38%', '55%', '47%', '72%', '64%', '90%'], seo: '+28.4%', paid: '2.7× ROAS' },
    SEO: { value: '+64%', label: 'organic visibility', trend: '↑ 18 positions', bars: ['24%', '31%', '44%', '48%', '73%', '88%'], seo: '+64.8%', paid: '2.1× ROAS' },
    Paid: { value: '3.9×', label: 'paid efficiency', trend: '↓ 31% CPA', bars: ['28%', '52%', '49%', '68%', '79%', '92%'], seo: '+37.2%', paid: '3.9× ROAS' },
  };
  const current = signals[signal];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Intro animations
      gsap.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.2 });
      gsap.from('.hero-title', { y: 40, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.4 });
      gsap.from('.hero-sub', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.6 });
      gsap.from('.hero-ctas', { y: 20, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.8 });
      gsap.from('.hero-trustline', { opacity: 0, duration: 1, ease: 'power2.inOut', delay: 1 });
      
      // Mock dashboard animation
      gsap.from('.hero-mock', { x: 50, opacity: 0, duration: 1.2, ease: 'power3.out', delay: 0.5 });
      
      // Gear rotation
      if (gearRef.current) {
        gsap.to(gearRef.current, { rotation: 360, duration: 160, repeat: -1, ease: 'none' });
      }

      // Pointer-driven parallax is scoped to the hero and only runs for a
      // precise pointer. `quickTo` prevents a new tween on every mouse event.
      const hero = containerRef.current;
      if (!hero || !window.matchMedia('(pointer: fine)').matches) return;
      
      // Make dashboard parallax much more pronounced with 3D tilt
      gsap.set('.hero-mock', { transformPerspective: 1000, transformOrigin: "center center" });
      const moveX = gsap.quickTo('.hero-mock', 'x', { duration: 0.35, ease: 'power3.out' });
      const moveY = gsap.quickTo('.hero-mock', 'y', { duration: 0.35, ease: 'power3.out' });
      const rotateX = gsap.quickTo('.hero-mock', 'rotationX', { duration: 0.35, ease: 'power3.out' });
      const rotateY = gsap.quickTo('.hero-mock', 'rotationY', { duration: 0.35, ease: 'power3.out' });
      
      gsap.set(glowRef.current, { xPercent: -50, yPercent: -50 });
      const moveGlowX = gsap.quickTo(glowRef.current, 'x', { duration: 0.4, ease: 'power3.out' });
      const moveGlowY = gsap.quickTo(glowRef.current, 'y', { duration: 0.4, ease: 'power3.out' });
      
      const handleMouseMove = (e: MouseEvent) => {
        const bounds = hero.getBoundingClientRect();
        // Calculate relative position (-0.5 to 0.5)
        const relativeX = (e.clientX - bounds.left) / bounds.width - 0.5;
        const relativeY = (e.clientY - bounds.top) / bounds.height - 0.5;
        
        moveX(relativeX * 40);
        moveY(relativeY * 40);
        rotateX(-relativeY * 15); // Tilt up/down
        rotateY(relativeX * 15);  // Tilt left/right
        
        moveGlowX(relativeX * 150);
        moveGlowY(relativeY * 110);
      };
      
      const resetParallax = () => { 
        moveX(0); 
        moveY(0); 
        rotateX(0);
        rotateY(0);
        moveGlowX(0); 
        moveGlowY(0); 
      };
      hero.addEventListener('mousemove', handleMouseMove);
      hero.addEventListener('mouseleave', resetParallax);
      return () => {
        hero.removeEventListener('mousemove', handleMouseMove);
        hero.removeEventListener('mouseleave', resetParallax);
      };

    }, containerRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section ref={containerRef} className="relative bg-[#F8F8F6] text-ink-900 overflow-hidden py-[88px] md:py-[104px]">
      <InteractiveGrid />
      <div ref={glowRef} className="will-change-transform absolute left-1/2 top-1/2 h-[420px] w-[420px] rounded-full bg-blue-400/[.11] blur-[85px] pointer-events-none z-[1]" />
      {/* Background gear */}
      <svg 
        ref={gearRef}
        className="absolute top-1/2 -translate-y-1/2 -right-[18%] w-[900px] h-[900px] opacity-[0.06] pointer-events-none" 
        viewBox="0 0 200 200"
      >
        <circle cx="100" cy="100" r="92" fill="none" stroke="white" strokeWidth="1.2" strokeDasharray="4 7"/>
        <circle cx="100" cy="100" r="70" fill="none" stroke="white" strokeWidth="1"/>
        <circle cx="100" cy="100" r="4" fill="white"/>
      </svg>

      <div className="max-w-[1200px] mx-auto px-5 md:px-7 relative z-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-14 items-center">
        <div>
          <span className="hero-eyebrow eyebrow text-ember-500 block mb-5">Design · Paid clicks · SEO growth</span>
          <h1 className="hero-title font-display text-[clamp(38px,5.3vw,68px)] font-bold leading-[1.04] tracking-[-0.055em]">
            More visibility. Better clicks. <em className="not-italic text-ember-500">Real growth.</em>
          </h1>
          <p className="hero-sub text-[16px] text-ink-600 max-w-[500px] my-7 leading-relaxed">
            We blend standout design with search strategy and paid-media management—turning the attention you earn into qualified demand.
          </p>
          <div className="hero-ctas flex flex-wrap gap-4">
            <a href="#intake" className="btn btn-primary group">
              Get a growth audit
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#process" className="btn btn-ghost">Explore our approach</a>
          </div>
          
          <div className="hero-trustline mt-12 pt-6 border-t border-paper-line flex items-center gap-4 text-ink-600 text-[11.5px] font-mono tracking-[0.04em]">
            <span className="flex gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            </span>
            One partner for creative, clicks, and organic growth
          </div>
        </div>

        {/* Mock Dashboard */}
        <div className="hero-mock bg-navy-950 border border-navy-line rounded-[24px] p-6 md:p-7 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.6)] relative">
          <div className="flex items-center justify-between mb-5">
            <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-navy-800"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-navy-800"></span>
            <span className="w-2.5 h-2.5 rounded-full bg-navy-800"></span>
            </div>
            <span className="signal-pulse inline-flex items-center gap-1.5 text-[10px] font-mono text-[#3DDC97] bg-[#3DDC97]/10 rounded-full px-2.5 py-1"><span className="w-1.5 h-1.5 rounded-full bg-[#3DDC97]" /> LIVE VIEW</span>
          </div>
          <div className="flex gap-1 mb-5 bg-white/[.045] border border-white/[.06] rounded-xl p-1">
            {(Object.keys(signals) as Array<keyof typeof signals>).map((item) => <button key={item} onClick={() => setSignal(item)} className={`relative flex-1 rounded-lg py-2 text-[11px] font-semibold transition-colors ${signal === item ? 'text-white' : 'text-mist-500 hover:text-mist-300'}`}>
              {signal === item && <motion.span layoutId="active-signal" className="absolute inset-0 rounded-lg bg-white/[.10]" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />}
              <span className="relative">{item}</span>
            </button>)}
          </div>
          
          <div className="flex items-baseline gap-3 mb-6">
            <AnimatePresence mode="wait"><motion.span key={current.value} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: .22 }} className="font-mono text-4xl font-semibold text-white">{current.value}</motion.span></AnimatePresence>
            <span className="text-[12.5px] text-mist-500">{current.label}</span>
            <span className="text-[#3DDC97] font-mono text-[13px] font-semibold ml-auto">{current.trend}</span>
          </div>

          <div className="flex items-end gap-2.5 h-[100px] mb-4">
            {current.bars.map((h, i) => (
              <motion.div 
                key={i} 
                className="chart-bar flex-1 rounded-t-md bg-gradient-to-b from-blue-400 to-blue-600 h-[10%]"
                data-h={h}
                animate={{ height: h }} transition={prefersReducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 160, damping: 20, delay: i * .04 }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-white/[0.055] rounded-xl p-3.5 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-mist-500 text-[10px] font-mono mb-2"><Search size={13} /> ORGANIC VISIBILITY</div>
              <div className="text-white font-mono text-lg">{current.seo}</div>
            </div>
            <div className="bg-white/[0.055] rounded-xl p-3.5 border border-white/[0.06]">
              <div className="flex items-center gap-2 text-mist-500 text-[10px] font-mono mb-2"><TrendingUp size={13} /> PAID EFFICIENCY</div>
              <div className="text-white font-mono text-lg">{current.paid}</div>
            </div>
          </div>

          <div className="relative h-9">
            <span className="absolute left-0 top-0 bg-ember-500 text-white text-[12.5px] font-semibold px-4 py-2 rounded-full font-body">Growth signals live</span>
            <MousePointer2 className="absolute w-[22px] h-[22px] text-white -bottom-2 left-[70px] animate-bounce" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
