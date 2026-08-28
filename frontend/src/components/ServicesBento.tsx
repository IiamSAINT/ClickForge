import { useEffect, useRef, useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { services } from '../data/site';
import IconOrb from './IconOrb';

gsap.registerPlugin(ScrollTrigger);

const ServicesBento = () => {
  const containerRef = useRef<HTMLElement>(null);
  const [activeId, setActiveId] = useState<(typeof services)[number]['id']>('design');
  const activeService = services.find((service) => service.id === activeId) ?? services[0];
  const ActiveIcon = activeService.icon;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-service', {
        scrollTrigger: { trigger: containerRef.current, start: 'top 80%', toggleActions: 'play none none none' },
        y: 32, opacity: 0, duration: 0.75, stagger: 0.1, ease: 'power3.out'
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative overflow-hidden bg-paper py-24 md:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent" />
      <div className="max-w-[1200px] mx-auto px-5 md:px-7">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end mb-12 reveal-service">
          <div className="max-w-[610px]">
            <span className="eyebrow text-ember-500 block mb-5">An integrated growth team</span>
            <h2 className="font-display text-[clamp(32px,4.5vw,52px)] font-bold leading-[1.04] tracking-[-.05em]">Choose the signal you need to strengthen.</h2>
          </div>
          <p className="max-w-[330px] text-[14px] leading-relaxed text-ink-600">Explore each discipline to see how we turn isolated activity into a connected growth system.</p>
        </div>

        <div className="grid gap-5 lg:grid-cols-[.82fr_1.18fr]">
          <div className="grid sm:grid-cols-2 lg:grid-cols-1 gap-3 reveal-service" role="tablist" aria-label="ClickForge services">
            {services.map((service, index) => {
              const Icon = service.icon;
              const selected = service.id === activeId;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setActiveId(service.id)}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-all duration-300 ${selected ? 'border-navy-950 bg-navy-950 text-white shadow-[0_18px_38px_-20px_rgba(8,21,38,.7)]' : 'border-paper-line bg-white hover:-translate-y-0.5 hover:border-blue-400'}`}
                >
                  <div className="flex items-center gap-4">
                    <IconOrb icon={Icon} size="sm" inverse={selected} tone={selected ? 'ember' : 'blue'} label={service.title} />
                    <span className="font-display text-[16px] font-bold tracking-[-.025em]">{service.title}</span>
                    <span className={`ml-auto font-mono text-[11px] ${selected ? 'text-mist-500' : 'text-ink-400'}`}>0{index + 1}</span>
                  </div>
                </button>
              );
            })}
          </div>

          <motion.article key={activeService.id} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: 'easeOut' }} className="reveal-service relative overflow-hidden rounded-[28px] bg-navy-950 p-7 text-white md:p-10">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-blue-600/25 blur-3xl" />
            <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-ember-500 via-ember-500 to-blue-400" />
            <div className="relative z-10 grid gap-10 md:grid-cols-[1.15fr_.85fr] md:items-end">
              <div>
                <span className="eyebrow block text-ember-500 mb-7">{activeService.eyebrow}</span>
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[.07] text-blue-400"><ActiveIcon size={26} /></div>
                <h3 className="font-display text-[clamp(27px,3.5vw,42px)] font-bold tracking-[-.045em] leading-[1.05] mb-5">{activeService.outcome}</h3>
                <p className="max-w-[560px] text-[15px] leading-relaxed text-mist-300">{activeService.description}</p>
                <Link to="/contact" className="btn mt-8 bg-white text-ink-900 hover:bg-ember-500 hover:text-white">Build this into my plan <ArrowRight /></Link>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[.045] p-5 md:p-6">
                <p className="font-mono text-[10px] tracking-[.12em] text-mist-500 uppercase mb-5">Signals we improve</p>
                <ul className="space-y-4">
                  {activeService.metrics.map((metric, index) => (
                    <li key={metric} className="flex items-center gap-3 text-[13px] text-mist-300"><CheckCircle2 className="h-4 w-4 shrink-0 text-[#3DDC97]" /><span>{metric}</span><span className="ml-auto font-mono text-[10px] text-mist-500">0{index + 1}</span></li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  );
};

export default ServicesBento;
