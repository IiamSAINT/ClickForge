import type { LucideIcon } from 'lucide-react';

type IconOrbProps = {
  icon: LucideIcon;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  tone?: 'blue' | 'ember' | 'mint';
  inverse?: boolean;
  className?: string;
};

const IconOrb = ({ icon: Icon, label, size = 'md', tone = 'blue', inverse = false, className = '' }: IconOrbProps) => (
  <span className={`icon-orb icon-orb--${size} icon-orb--${tone} ${inverse ? 'icon-orb--inverse' : ''} ${className}`} aria-label={label} role={label ? 'img' : undefined}>
    <span className="icon-orb__ring" aria-hidden="true" />
    <Icon aria-hidden="true" strokeWidth={1.8} />
    <span className="icon-orb__spark" aria-hidden="true" />
  </span>
);

export default IconOrb;
