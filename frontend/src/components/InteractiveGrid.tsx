import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from 'framer-motion';

const InteractiveGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const maskGridRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current || !glowRef.current) return;

    const container = containerRef.current;
    const glow = glowRef.current;
    const maskGrid = maskGridRef.current;

    // Use GSAP quickTo for highly performant mouse tracking
    const moveGlowX = gsap.quickTo(glow, "x", { duration: 0.15, ease: "power3.out" });
    const moveGlowY = gsap.quickTo(glow, "y", { duration: 0.15, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate position relative to viewport
      moveGlowX(e.clientX);
      moveGlowY(e.clientY);
      
      if (maskGrid) {
        maskGrid.style.setProperty('--mouse-x', `${e.clientX}px`);
        maskGrid.style.setProperty('--mouse-y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [prefersReducedMotion]);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-[0]"
      style={{
        maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)'
      }}
    >
      {/* 
        The static grid pattern. 
        We use a CSS linear-gradient to draw a grid.
      */}
      <div 
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(11, 18, 32, 1) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(11, 18, 32, 1) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px'
        }}
      />

      {/* 
        The interactive glow that follows the cursor.
        It acts as a mask over a more prominent grid, or simply a highlight.
        Here we use a radial gradient that follows the mouse to illuminate the grid.
      */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none opacity-40 mix-blend-multiply"
        style={{
          background: 'radial-gradient(circle, rgba(17,73,222,0.15) 0%, rgba(251,97,0,0.05) 40%, rgba(0,0,0,0) 70%)',
        }}
      />
      
      {/* 
        An additional overlay grid that is only visible where the glow is.
        This gives a cool "revealing the grid" effect.
      */}
      <div 
        className="absolute inset-0 opacity-100"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17,73,222, 0.15) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(17,73,222, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '44px 44px',
          maskImage: 'radial-gradient(circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 20%)',
          WebkitMaskImage: 'radial-gradient(circle at var(--mouse-x, 50vw) var(--mouse-y, 50vh), black 0%, transparent 20%)'
        }}
        ref={maskGridRef}
      />
    </div>
  );
};

export default InteractiveGrid;
