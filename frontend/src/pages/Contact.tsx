import React from 'react';
import LeadIntakeForm from '../components/LeadIntakeForm';

const Contact: React.FC = () => {
  return (
    <div className="pt-24 bg-paper">
      <div className="max-w-[1160px] mx-auto px-6 mb-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-ink-900 mb-6 tracking-[-0.04em]">Let's Talk</h1>
        <p className="text-ink-600 text-lg md:text-xl max-w-2xl mx-auto">
          Book a free CRO audit to see exactly how much revenue you're leaving on the table.
        </p>
      </div>
      <LeadIntakeForm />
    </div>
  );
};

export default Contact;
