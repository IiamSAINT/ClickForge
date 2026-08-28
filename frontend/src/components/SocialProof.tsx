import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SocialProof: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate stats on scroll
      gsap.utils.toArray('.stat-number').forEach((el: any) => {
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const decimal = parseInt(el.dataset.decimal || '0');

        gsap.to(el, {
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          innerHTML: target,
          duration: 1.5,
          ease: 'power2.out',
          snap: { innerHTML: decimal === 0 ? 1 : 0.1 },
          onUpdate: function() {
            el.innerHTML = Number(this.targets()[0].innerHTML).toFixed(decimal) + suffix;
          }
        });
      });
      
      // Reveal stats container
      gsap.from('.stats-container', {
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top 85%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="bg-paper py-16 border-b border-paper-line">
      <div className="max-w-[1160px] mx-auto px-6">
        <span className="eyebrow block text-center text-ink-400 mb-9">Creative performance, not creative guesswork</span>
        
        {/* Infinite Marquee */}
        <div className="overflow-hidden marquee-mask">
          <div className="flex gap-16 w-max animate-scroll-x">
            {['NORTHPEAK', 'VERDANT', 'LUMENARY', 'ORBITAL', 'STRATA', 'HAVENLY', 'PIXELROOT', 'QUORUM'].map((brand, i) => (
              <span key={i} className="font-display font-bold text-[22px] text-ink-400 tracking-[0.02em] opacity-55 whitespace-nowrap">
                {brand}
              </span>
            ))}
            {/* Duplicate for infinite effect */}
            {['NORTHPEAK', 'VERDANT', 'LUMENARY', 'ORBITAL', 'STRATA', 'HAVENLY', 'PIXELROOT', 'QUORUM'].map((brand, i) => (
              <span key={`dup-${i}`} className="font-display font-bold text-[22px] text-ink-400 tracking-[0.02em] opacity-55 whitespace-nowrap">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="stats-container grid grid-cols-2 md:grid-cols-4 gap-[1px] bg-paper-line mt-12 border border-paper-line rounded-xl overflow-hidden shadow-sm">
          <div className="bg-white p-7 text-center">
            <div className="stat-number font-mono text-[clamp(26px,4vw,36px)] font-semibold text-blue-600" data-count="187" data-suffix="%">0%</div>
            <div className="text-[13px] text-ink-600 mt-2">Avg. conversion-rate lift</div>
          </div>
          <div className="bg-white p-7 text-center">
            <div className="stat-number font-mono text-[clamp(26px,4vw,36px)] font-semibold text-blue-600" data-count="3.2" data-suffix="×" data-decimal="1">0×</div>
            <div className="text-[13px] text-ink-600 mt-2">Avg. paid-media return</div>
          </div>
          <div className="bg-white p-7 text-center">
            <div className="stat-number font-mono text-[clamp(26px,4vw,36px)] font-semibold text-blue-600" data-count="48" data-suffix="HR">0HR</div>
            <div className="text-[13px] text-ink-600 mt-2">First sprint turnaround</div>
          </div>
          <div className="bg-white p-7 text-center">
            <div className="stat-number font-mono text-[clamp(26px,4vw,36px)] font-semibold text-blue-600" data-count="40" data-suffix="+">0+</div>
            <div className="text-[13px] text-ink-600 mt-2">Growth systems launched</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
