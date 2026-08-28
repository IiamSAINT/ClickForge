import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const Pricing: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-pricing', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="pricing" ref={containerRef} className="bg-paper py-24">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="max-w-[600px] mx-auto mb-16 text-center reveal-pricing">
          <h2 className="font-display text-[clamp(28px,4vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] mb-4">
            Engagement models built for momentum.
          </h2>
          <p className="text-ink-600 text-base">One high-impact sprint, or an always-on creative engine — pick your velocity.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Sprint Tier */}
          <div className="bg-white border border-paper-line rounded-2xl p-8 reveal-pricing">
            <h3 className="font-display text-[20px] font-bold mb-1.5">Sprint</h3>
            <p className="text-[13.5px] text-ink-600 mb-6">Best for a single launch or campaign</p>
            <ul className="flex flex-col gap-3 text-[14px] mb-8">
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> One asset or campaign set
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> 5–10 business day turnaround
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> No lock-in — pay per sprint
              </li>
            </ul>
            <Link to="/contact" className="btn bg-navy-950 text-white w-full justify-center hover:bg-blue-600 transition-colors">Book a Sprint</Link>
          </div>

          {/* Retainer Tier (Popular) */}
          <div className="bg-navy-950 text-white rounded-2xl p-8 relative lg:-translate-y-3 shadow-[0_30px_60px_-24px_rgba(8,21,38,0.35)] reveal-pricing">
            <span className="absolute -top-3 left-7 bg-ember-500 text-white font-mono text-[11px] font-semibold tracking-[0.06em] px-3 py-1.5 rounded-full uppercase">Most Popular</span>
            <h3 className="font-display text-[20px] font-bold mb-1.5">Growth Retainer</h3>
            <p className="text-[13.5px] text-mist-300 mb-6">Best for ongoing pages + ad creative</p>
            <ul className="flex flex-col gap-3 text-[14px] mb-8">
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> 2–4 assets per month + revisions
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> Continuous sprint cadence
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> Cancel anytime after month one
              </li>
            </ul>
            <Link to="/contact" className="btn btn-primary w-full justify-center">Start Retainer</Link>
          </div>

          {/* Partner Tier */}
          <div className="bg-white border border-paper-line rounded-2xl p-8 reveal-pricing">
            <h3 className="font-display text-[20px] font-bold mb-1.5">Scale Partner</h3>
            <p className="text-[13.5px] text-ink-600 mb-6">Best for multi-brand, high-volume teams</p>
            <ul className="flex flex-col gap-3 text-[14px] mb-8">
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> Unlimited requests, prioritized
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> Same-week priority queue
              </li>
              <li className="flex gap-2.5 items-start">
                <Check className="w-4 h-4 text-ember-500 mt-0.5 flex-shrink-0" /> Dedicated creative pod
              </li>
            </ul>
            <Link to="/contact" className="btn bg-navy-950 text-white w-full justify-center hover:bg-blue-600 transition-colors">Talk to Sales</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
