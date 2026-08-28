import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MousePointerClick, Search, Sparkles } from 'lucide-react';
import IconOrb from './IconOrb';

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  { icon: Sparkles, number: '01', title: 'Make the brand impossible to ignore', copy: 'We clarify your offer, sharpen your visual system and build high-intent pages that give every campaign somewhere strong to land.' },
  { icon: MousePointerClick, number: '02', title: 'Turn attention into efficient clicks', copy: 'From creative testing to search campaigns, we refine the message, audience and journey around the signals that matter.' },
  { icon: Search, number: '03', title: 'Build organic demand that compounds', copy: 'We fix technical friction and create search-led content that helps the right people discover—and trust—your brand.' },
];

const GrowthFramework = () => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.growth-reveal', { scrollTrigger: { trigger: ref.current, start: 'top 78%' }, y: 36, opacity: 0, duration: .75, stagger: .12, ease: 'power3.out' });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-32 bg-white overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-5 md:px-7">
        <div className="grid lg:grid-cols-[.85fr_1.15fr] gap-12 lg:gap-24 items-end mb-16">
          <div className="growth-reveal">
            <span className="eyebrow text-ember-500 block mb-5">The ClickForge growth loop</span>
            <h2 className="font-display text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.04] tracking-[-.05em]">One clear system. Three channels that make each other stronger.</h2>
          </div>
          <p className="growth-reveal text-ink-600 text-[16px] leading-relaxed max-w-[500px]">Great work does not sit in separate silos. Your creative improves click-through; your campaign data improves the website; your SEO insight makes the next campaign smarter.</p>
        </div>

        <div className="grid md:grid-cols-3 border-t border-paper-line">
          {pillars.map(({ icon: Icon, number, title, copy }, index) => (
            <article key={number} className="growth-reveal pt-7 md:px-7 first:pl-0 border-paper-line md:border-r last:border-r-0">
              <div className="flex items-center justify-between mb-12"><IconOrb icon={Icon} size="md" tone={index === 1 ? 'blue' : 'ember'} label={title} /><span className="font-mono text-[12px] text-ink-400">{number}</span></div>
              <h3 className="font-display text-[21px] font-bold tracking-[-.03em] mb-4 max-w-[280px]">{title}</h3>
              <p className="text-[14px] leading-relaxed text-ink-600 max-w-[310px]">{copy}</p>
            </article>
          ))}
        </div>

        <div className="growth-reveal mt-20 bg-navy-950 rounded-[28px] overflow-hidden grid lg:grid-cols-[1fr_.9fr]">
          <div className="p-8 md:p-12 text-white">
            <span className="eyebrow text-ember-500 block mb-5">What a focused quarter can unlock</span>
            <h3 className="font-display text-[clamp(28px,3.6vw,42px)] font-bold tracking-[-.045em] leading-[1.08] mb-5">Less waste. More evidence. A growth engine your team can actually use.</h3>
            <p className="text-mist-300 leading-relaxed max-w-[520px]">Every engagement starts with a practical baseline: where attention is coming from, what happens after the click, and which opportunities are being left behind.</p>
          </div>
          <div className="bg-white/[.045] border-t lg:border-t-0 lg:border-l border-white/10 p-8 md:p-12 grid grid-cols-2 gap-x-8 gap-y-10 content-center">
            {[['3.9×', 'average paid-media return'], ['+64%', 'organic visibility lift'], ['42%', 'conversion-rate improvement'], ['14 days', 'to first focused sprint']].map(([value, label]) => (
              <div key={label}><div className="font-mono text-2xl md:text-3xl text-white mb-2">{value}</div><div className="text-[12px] leading-snug text-mist-500">{label}</div></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GrowthFramework;
