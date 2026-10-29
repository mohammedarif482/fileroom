import { useEffect, useRef, useState } from 'react';
import { CtaLink } from './ui.jsx';
import { products } from '../products/index.js';
import PortalIcon from './PortalIcon.jsx';

const tiles = products.map((p) => ({ key: p.key, name: p.label, path: p.path }));

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
              <PortalIcon portal={t.key} />
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
