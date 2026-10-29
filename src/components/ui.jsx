import { useEffect, useRef, useState } from 'react';
import { useCountUp } from '../utils.js';

export function Tag({ n, children, dark }) {
  return (
    <span className={`tag${dark ? ' on-dark' : ''}`}>
      <b>{n}</b>{children}
    </span>
  );
}

export function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  );
}

export function Logo() {
  return (
    <a href="/" className="logo" aria-label="Fileroom home">
      <svg className="logo-mark" viewBox="0 0 28 28" aria-hidden="true">
        <rect width="28" height="28" rx="8" fill="#0D111C" />
        <path d="M8.5 9.5h11M8.5 14h11M8.5 18.5h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
        <circle cx="19.5" cy="19" r="3.6" fill="#D4F55A" />
      </svg>
      Fileroom
    </a>
  );
}

// A formatted amount that tweens whenever its value changes
export function Amount({ value, fmt, from = value, duration }) {
  return fmt(useCountUp(value, { from, duration }));
}

// Internal links stay in the tab, WhatsApp opens a new one
export function CtaLink({ href, label, className }) {
  const external = href.startsWith('http');
  return (
    <a href={href} className={className} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {label} <Arrow />
    </a>
  );
}

// Hand-drawn ellipse that draws itself once the word scrolls into view
export function Scribble({ children }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setOn(true); io.disconnect(); }
    }, { threshold: 0.8 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <span ref={ref} className={`scribble${on ? ' on' : ''}`}>
      {children}
      <svg viewBox="0 0 200 60" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M14 36C8 18 60 6 112 7c52 1 86 12 82 28-4 17-62 21-104 19C44 52 6 44 9 28 12 16 40 9 70 8" />
      </svg>
    </span>
  );
}

// Pixel mosaic texture for the blue panels, deterministic so it doesn't shift between renders
export function Mosaic({ cols = 18, rows = 8 }) {
  const cells = [];
  for (let i = 0; i < cols * rows; i++) {
    const x = (i % cols) / (cols - 1);
    const r = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    const centre = 1 - Math.abs(x - 0.5) * 2;
    cells.push(<i key={i} style={{ opacity: (r * 0.14 + centre * 0.1).toFixed(3) }} />);
  }
  return (
    <div className="mosaic" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${cols},1fr)` }}>
      {cells}
    </div>
  );
}
