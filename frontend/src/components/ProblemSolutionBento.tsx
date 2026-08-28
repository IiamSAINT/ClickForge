import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2, Clock, Activity, Users, MonitorPlay } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const ProblemSolutionBento: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-fix', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="fix" ref={containerRef} className="bg-white py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[640px] mx-auto mb-16 text-center reveal-fix">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold text-ink-900 leading-[1.05] tracking-[-0.02em]">
            Most agencies sell you design. We sell you growth.
          </h2>
        </div>
        
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-paper-line rounded-2xl overflow-hidden shadow-sm">
          {/* Old Agency Model */}
          <div className="bg-paper p-9 md:p-11 opacity-85 reveal-fix grayscale-[0.5]">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-ink-400 mb-6 block">The Old Agency Model</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 py-4 border-t border-black/5 text-[15px] text-ink-600">
                <Clock className="w-5 h-5 text-ink-400" /> 6–8 week timelines
              </div>
              <div className="flex items-center gap-3 py-4 border-t border-black/5 text-[15px] text-ink-600">
                <Activity className="w-5 h-5 text-ink-400" /> Deliverables, not data
              </div>
              <div className="flex items-center gap-3 py-4 border-t border-black/5 text-[15px] text-ink-600">
                <Users className="w-5 h-5 text-ink-400" /> One designer, no strategist
              </div>
              <div className="flex items-center gap-3 py-4 border-t border-black/5 text-[15px] text-ink-600">
                <MonitorPlay className="w-5 h-5 text-ink-400" /> Static creative, no motion
              </div>
            </div>
          </div>
          
          {/* The ClickForge Fix */}
          <div className="bg-navy-950 text-white p-9 md:p-11 reveal-fix">
            <span className="font-mono text-xs tracking-[0.1em] uppercase text-ember-500 mb-6 block">The ClickForge Fix</span>
            <div className="flex flex-col">
              <div className="flex items-center gap-3 py-4 border-t border-navy-line text-[15px]">
                <CheckCircle2 className="w-5 h-5 text-[#3DDC97]" /> 5–10 day sprints
              </div>
              <div className="flex items-center gap-3 py-4 border-t border-navy-line text-[15px]">
                <CheckCircle2 className="w-5 h-5 text-[#3DDC97]" /> Every asset tied to a KPI
              </div>
              <div className="flex items-center gap-3 py-4 border-t border-navy-line text-[15px]">
                <CheckCircle2 className="w-5 h-5 text-[#3DDC97]" /> Full CRO + motion team per project
              </div>
              <div className="flex items-center gap-3 py-4 border-t border-navy-line text-[15px]">
                <CheckCircle2 className="w-5 h-5 text-[#3DDC97]" /> Motion-first, scroll-aware design
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-12 reveal-fix">
          <a href="#process" className="btn btn-primary bg-navy-950 group">
            See How We're Different
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolutionBento;
