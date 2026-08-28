import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const LeadIntakeForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    website: '',
    goal: '',
    fullName: '',
    email: '',
    honeypot: ''
  });
  const [error, setError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reveal-intake', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setGoal = (goal: string) => {
    setFormData({ ...formData, goal });
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.companyName.trim() || !formData.website.trim()) {
        setError('Enter your company name and website to continue.');
        return;
      }
    }
    if (step === 2 && !formData.goal) {
      // Optional: enforce selecting a goal, but original let it pass
    }
    setError('');
    setStep(step + 1);
  };

  const prevStep = () => {
    setError('');
    setStep(step - 1);
  };

  const handleSubmit = async () => {
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
    if (!formData.fullName.trim() || !emailOk) {
      setError('Enter a valid name and email to submit.');
      return;
    }
    setError('');
    setStatus('loading');

    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName: formData.companyName,
          website: formData.website,
          goal: formData.goal,
          name: formData.fullName,
          email: formData.email,
          honeypot: formData.honeypot
        })
      });
      if (res.ok) {
        setStatus('success');
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || 'Something went wrong. Please try again.');
        setStatus('idle');
      }
    } catch {
      setError('We could not send your request. Please try again or email us directly.');
      setStatus('idle');
    }
  };

  return (
    <section id="intake" ref={containerRef} className="bg-navy-950 text-white py-24 relative overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1fr] gap-12 items-start">
          
          <div className="reveal-intake">
            <span className="font-mono text-[12px] tracking-[0.14em] uppercase text-ember-500 block mb-4 font-semibold">Free growth audit</span>
            <h2 className="font-display text-[clamp(28px,4.4vw,42px)] font-bold leading-[1.05] tracking-[-0.02em] mb-4">
              Find your clearest next growth move.
            </h2>
            <p className="text-mist-300 text-base max-w-[400px] mb-7 leading-relaxed">
              Share your site and goals. We’ll identify the most valuable opportunities across your design, paid clicks and search presence.
            </p>
            <div className="flex flex-col gap-3.5">
              <div className="flex items-center gap-2.5 text-[14px] text-mist-300">
                <CheckCircle2 className="w-[17px] h-[17px] text-[#3DDC97] flex-shrink-0" /> Takes less than two minutes
              </div>
              <div className="flex items-center gap-2.5 text-[14px] text-mist-300">
                <CheckCircle2 className="w-[17px] h-[17px] text-[#3DDC97] flex-shrink-0" /> Personal response within 24 hours
              </div>
              <div className="flex items-center gap-2.5 text-[14px] text-mist-300">
                <CheckCircle2 className="w-[17px] h-[17px] text-[#3DDC97] flex-shrink-0" /> No obligation, no sales pressure
              </div>
            </div>
          </div>

          <div className="bg-navy-900 border border-navy-line rounded-[20px] p-8 shadow-xl reveal-intake">
            
            {status !== 'success' && (
              <div className="flex gap-1.5 mb-7">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex-1 h-[3px] rounded-full bg-navy-line overflow-hidden">
                    <div className={`h-full bg-ember-500 transition-all duration-500 ${step >= i ? 'w-full' : 'w-0'}`}></div>
                  </div>
                ))}
              </div>
            )}

            <div className="relative min-h-[280px]">
              {status === 'success' ? (
                <div className="flex flex-col items-center justify-center h-full text-center py-5 animate-fade-in">
                  <CheckCircle2 className="w-14 h-14 text-[#3DDC97] mb-4" />
                  <h3 className="font-display text-[20px] font-bold mb-2">Audit requested.</h3>
                  <p className="text-mist-300 text-[14.5px]">Check your inbox — your conversion breakdown lands within 24 hours.</p>
                </div>
              ) : (
                <>
                  {step === 1 && (
                    <div className="animate-fade-in absolute w-full">
                      <div className="mb-4">
                        <label className="block text-[13px] text-mist-300 mb-1.5 font-medium">Company name</label>
                        <input 
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Acme Inc."
                          className="w-full bg-navy-950 border-[1.5px] border-navy-line rounded-lg px-3.5 py-3 text-white font-body text-[15px] focus:border-blue-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-[13px] text-mist-300 mb-1.5 font-medium">Website URL</label>
                        <input 
                          name="website"
                          value={formData.website}
                          onChange={handleChange}
                          type="text" 
                          placeholder="acme.com"
                          className="w-full bg-navy-950 border-[1.5px] border-navy-line rounded-lg px-3.5 py-3 text-white font-body text-[15px] focus:border-blue-400 focus:outline-none transition-colors"
                        />
                      </div>
                      {error && <div className="text-[#FF8A6B] text-[13.5px] mt-1">{error}</div>}
                      <div className="flex justify-between items-center mt-6">
                        <span></span>
                        <button onClick={nextStep} className="btn btn-primary">
                          Continue <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="animate-fade-in absolute w-full">
                      <div className="mb-4">
                        <label className="block text-[13px] text-mist-300 mb-3 font-medium">What's the main goal?</label>
                        <div className="flex flex-wrap gap-2.5">
                          {['More Leads', 'Higher CVR', 'Better Ad Creative', 'Full Rebrand'].map(g => (
                            <button 
                              key={g}
                              onClick={() => setGoal(g)}
                              className={`border-[1.5px] rounded-full px-4 py-2.5 text-[13.5px] transition-all duration-300
                                ${formData.goal === g 
                                  ? 'border-ember-500 bg-ember-500/10 text-white' 
                                  : 'border-navy-line bg-navy-950 text-mist-300 hover:border-mist-500'}`}
                            >
                              {g}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-6">
                        <button onClick={prevStep} className="bg-transparent border-none text-mist-300 text-[14px] hover:text-white transition-colors">Back</button>
                        <button onClick={nextStep} className="btn btn-primary">
                          Continue <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="animate-fade-in absolute w-full">
                      <div className="mb-4">
                        <label className="block text-[13px] text-mist-300 mb-1.5 font-medium">Your name</label>
                        <input 
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          type="text" 
                          placeholder="Jordan Lee"
                          className="w-full bg-navy-950 border-[1.5px] border-navy-line rounded-lg px-3.5 py-3 text-white font-body text-[15px] focus:border-blue-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-[13px] text-mist-300 mb-1.5 font-medium">Work email</label>
                        <input 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          type="email" 
                          placeholder="jordan@acme.com"
                          className="w-full bg-navy-950 border-[1.5px] border-navy-line rounded-lg px-3.5 py-3 text-white font-body text-[15px] focus:border-blue-400 focus:outline-none transition-colors"
                        />
                      </div>
                      <input 
                        name="honeypot" 
                        value={formData.honeypot} 
                        onChange={handleChange} 
                        type="text" 
                        tabIndex={-1} 
                        autoComplete="off" 
                        className="absolute -left-[9999px] w-[1px] h-[1px] overflow-hidden opacity-0"
                      />
                      {error && <div className="text-[#FF8A6B] text-[13.5px] mt-1">{error}</div>}
                      <div className="flex justify-between items-center mt-6">
                        <button onClick={prevStep} className="bg-transparent border-none text-mist-300 text-[14px] hover:text-white transition-colors">Back</button>
                        <button 
                          onClick={handleSubmit} 
                          disabled={status === 'loading'}
                          className="btn btn-primary disabled:opacity-70 disabled:cursor-not-allowed group relative overflow-hidden"
                        >
                          {status === 'loading' ? 'Submitting...' : 'Request my growth audit'}
                          {!status && <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />}
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadIntakeForm;
