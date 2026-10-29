import { useEffect, useRef, useState } from 'react';
import { CtaLink } from './ui.jsx';
import { products } from '../products/index.js';

const glyph = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

// Our own marks for each portal. Government logos and the State Emblem stay off the site.
const ICONS = {
  gst: glyph('M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3'),
  'uae-vat': glyph('M3 21h18M6 21V11h4v10M14 21V5l4 3v13M10 14h4'),
  tds: glyph('M18 6L6 18M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'),
  'income-tax': glyph('M6 3h9l4 4v14H6zM14 3v5h5M12.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 17c.6-1.8 2-2.7 3.5-2.7S15.4 15.2 16 17'),
  epfo: glyph('M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6zM9 12l2 2 4-4'),
};

const tiles = products.map((p) => ({ key: p.key, name: p.short === 'UAE' ? 'UAE VAT' : p.name, path: p.path }));

// Bottom-right dock: an apps-style launcher for every portal, and the demo button.
// Shows once the hero is scrolled past, and steps aside while the demo form is on screen.
export default function FloatDock({ current, cta }) {
  const [shown, setShown] = useState(false);
  const [open, setOpen] = useState(false);
  const dockRef = useRef(null);

  useEffect(() => {
    let pastHero = false;
    let atDemo = false;
    const update = () => setShown(pastHero && !atDemo);
    const onScroll = () => { pastHero = window.scrollY > window.innerHeight * 0.8; update(); };
    const demo = document.getElementById('demo');
    const io = demo && new IntersectionObserver(([e]) => { atDemo = e.isIntersecting; update(); }, { threshold: 0.25 });
    io?.observe(demo);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      io?.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!shown) setOpen(false);
  }, [shown]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const onDown = (e) => { if (!dockRef.current?.contains(e.target)) setOpen(false); };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open]);

  return (
    <div className={`dock${shown ? ' shown' : ''}`} ref={dockRef} inert={shown ? undefined : ''}>
      <div id="dock-apps" className="dock-apps" hidden={!open}>
        <p>Fileroom portals</p>
        <div className="dock-grid">
          {tiles.map((t) => (
            <a key={t.key} href={t.path} className="dock-tile" aria-current={t.key === current ? 'page' : undefined}>
              <span className="dock-icon" aria-hidden="true">{ICONS[t.key]}</span>
              {t.name}
            </a>
          ))}
        </div>
      </div>
      <CtaLink className="btn btn-primary dock-cta" {...cta} />
      <button
        type="button" className="dock-btn" aria-label="All Fileroom portals"
        aria-expanded={open} aria-controls="dock-apps"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="dots9" aria-hidden="true">{Array.from({ length: 9 }, (_, i) => <i key={i} />)}</span>
      </button>
    </div>
  );
}
