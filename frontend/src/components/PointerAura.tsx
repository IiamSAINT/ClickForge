import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const PointerAura = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const supportsFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (supportsFinePointer && !prefersReducedMotion) {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const cursor = cursorRef.current;
    const dot = dotRef.current;
    
    if (!cursor || !dot) return;

    // Use GSAP quickTo with 0 duration for instant tracking (no trailing/lag)
    const xMoveCursor = gsap.quickTo(cursor, "x", { duration: 0 });
    const yMoveCursor = gsap.quickTo(cursor, "y", { duration: 0 });
    const xMoveDot = gsap.quickTo(dot, "x", { duration: 0 });
    const yMoveDot = gsap.quickTo(dot, "y", { duration: 0 });

    let isMagnetic = false;
    let magneticTarget: HTMLElement | null = null;

    const handleMove = (e: PointerEvent) => {
      if (isMagnetic && magneticTarget) {
        // Magnetic pull effect
        const rect = magneticTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center
        const distanceX = e.clientX - centerX;
        const distanceY = e.clientY - centerY;
        
        // Move cursor slightly towards the center of the magnetic element
        xMoveCursor(centerX + distanceX * 0.1);
        yMoveCursor(centerY + distanceY * 0.1);
        xMoveDot(e.clientX);
        yMoveDot(e.clientY);
        
        // Slightly move the element itself for a full magnetic effect
        gsap.to(magneticTarget, {
          x: distanceX * 0.2,
          y: distanceY * 0.2,
          duration: 0.3,
          ease: "power2.out"
        });
      } else {
        xMoveCursor(e.clientX);
        yMoveCursor(e.clientY);
        xMoveDot(e.clientX);
        yMoveDot(e.clientY);
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a, button, input, textarea, select, .magnetic') as HTMLElement;
      if (target) {
        setActive(true);
        if (target.classList.contains('btn') || target.classList.contains('magnetic')) {
          isMagnetic = true;
          magneticTarget = target;
        }
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a, button, input, textarea, select, .magnetic') as HTMLElement;
      if (target) {
        setActive(false);
        if (isMagnetic && magneticTarget) {
          gsap.to(magneticTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.3)" });
          isMagnetic = false;
          magneticTarget = null;
        }
      }
    };

    window.addEventListener('pointermove', handleMove);
    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener('pointermove', handleMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className={`pointer-aura fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[120] pointer-events-none rounded-full border border-blue-400/40 bg-white/10 backdrop-blur-[2px] transition-all duration-300 ${
          active ? 'w-[46px] h-[46px] border-ember-500/65 bg-ember-500/10' : 'w-[34px] h-[34px]'
        }`} 
        aria-hidden="true" 
      />
      <div 
        ref={dotRef} 
        className={`pointer-dot fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 z-[120] pointer-events-none rounded-full transition-all duration-200 ${
          active ? 'w-[7px] h-[7px] bg-ember-500' : 'w-[5px] h-[5px] bg-blue-600'
        }`} 
        aria-hidden="true" 
      />
    </>
  );
};

export default PointerAura;
