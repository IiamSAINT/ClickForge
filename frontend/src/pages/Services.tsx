import React from 'react';
import ServicesBento from '../components/ServicesBento';

const Services: React.FC = () => {
  return (
    <div className="pt-24 bg-paper min-h-[70vh]">
      <div className="max-w-[1160px] mx-auto px-6 mb-16 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-ink-900 mb-6 tracking-[-0.04em]">Our Services</h1>
        <p className="text-ink-600 text-lg md:text-xl max-w-2xl mx-auto">
          We combine data-driven strategy with premium design to forge high-converting experiences that drive measurable growth.
        </p>
      </div>
      <ServicesBento />
    </div>
  );
};

export default Services;
