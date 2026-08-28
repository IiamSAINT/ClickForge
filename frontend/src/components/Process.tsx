import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../data/site';

gsap.registerPlugin(ScrollTrigger);

const Process: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-process', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.to('.process-line-fill', {
        scrollTrigger: {
          trigger: '.process-rail',
          start: 'top 75%',
        },
        width: '100%',
        duration: 1.6,
        ease: 'power2.inOut'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={containerRef} className="bg-navy-950 text-white py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[600px] mb-16 reveal-process">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] mb-4">
            From kickoff to launch — no bottlenecks.
          </h2>
          <p className="text-mist-300 text-base">Most engagements go from audit to live asset in under two weeks.</p>
        </div>
        
        <div className="process-rail relative">
          <div className="absolute top-[26px] left-0 right-0 h-[2px] bg-navy-line hidden md:block">
            <div className="process-line-fill absolute top-0 left-0 h-full w-0 bg-ember-500"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-9 relative z-10">
            {processSteps.map((step) => (
              <div key={step.num} className="reveal-process">
                <div className="font-mono w-[52px] h-[52px] rounded-full bg-navy-900 border border-navy-line flex items-center justify-center text-[15px] font-semibold text-ember-500 mb-5 relative z-10">
                  {step.num}
                </div>
                <h3 className="font-display text-[17px] font-bold mb-2">{step.title}</h3>
                <p className="text-[14px] text-mist-300 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
