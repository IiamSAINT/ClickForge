import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Hero from '../components/Hero';
import SocialProof from '../components/SocialProof';
import ProblemSolutionBento from '../components/ProblemSolutionBento';
import ServicesBento from '../components/ServicesBento';
import Process from '../components/Process';
import Pricing from '../components/Pricing';
import LeadIntakeForm from '../components/LeadIntakeForm';
import GrowthFramework from '../components/GrowthFramework';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <SocialProof />
      <ProblemSolutionBento />
      <GrowthFramework />
      <ServicesBento />
      <Process />
      <Pricing />
      <section className="relative overflow-hidden bg-white py-24 md:py-32 px-5 md:px-7">
        <div className="absolute left-1/2 top-1/2 h-[460px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember-500/15 blur-[130px] pointer-events-none" />
        <div className="cta-grid relative mx-auto grid max-w-[1060px] gap-10 overflow-hidden rounded-[30px] bg-navy-950 p-8 text-white shadow-[0_34px_72px_-32px_rgba(8,21,38,.7)] md:grid-cols-[1.15fr_.85fr] md:p-12">
          <div className="absolute -right-24 -top-28 h-72 w-72 rounded-full border border-white/10" />
          <div className="relative z-10">
            <span className="eyebrow block text-ember-500 mb-5">Start with an outside perspective</span>
            <h2 className="font-display text-[clamp(34px,4.5vw,54px)] font-bold leading-[1.02] tracking-[-.055em] mb-6">Your next growth move starts with clarity.</h2>
            <p className="max-w-[560px] text-[16px] leading-relaxed text-mist-300">Get a concise expert view of what is helping—or holding back—your design, paid media and search presence.</p>
            <Link to="/contact" className="btn mt-8 bg-ember-500 text-white hover:bg-white hover:text-ink-900">Request your audit <ArrowRight /></Link>
          </div>
          <div className="relative z-10 rounded-2xl border border-white/10 bg-white/[.055] p-6 md:p-7 self-end">
            <p className="font-mono text-[11px] tracking-[.12em] text-mist-500 uppercase mb-5">Your audit includes</p>
            <ul className="space-y-4 text-[14px] text-mist-300">
              {['The biggest conversion leaks on your site', 'One high-confidence growth opportunity', 'A practical next-step recommendation'].map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="h-5 w-5 shrink-0 text-[#3DDC97]" />{item}</li>)}
            </ul>
          </div>
        </div>
      </section>
      <LeadIntakeForm />
    </div>
  );
};

export default Home;
