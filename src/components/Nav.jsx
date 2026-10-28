import { useEffect, useState } from 'react';
import { Arrow } from './ui.jsx';
import { whatsappLink } from '../utils.js';

const links = [
  ['#how', 'How it works'],
  ['#forms', 'Coverage'],
  ['#instructors', 'For instructors'],
  ['#pricing', 'Pricing'],
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="wrap">
        <div className="nav-inner">
          <a href="#top" className="logo" aria-label="Fileroom home">
            <svg className="logo-mark" viewBox="0 0 28 28" aria-hidden="true">
              <rect width="28" height="28" rx="8" fill="#0D111C" />
              <path d="M8.5 9.5h11M8.5 14h11M8.5 18.5h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
              <circle cx="19.5" cy="19" r="3.6" fill="#D4F55A" />
            </svg>
            Fileroom
          </a>
          <nav className="nav-links" aria-label="Main">
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="nav-cta">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-dark">Book a demo <Arrow /></a>
            <button
              type="button" className="menu-btn" aria-label="Menu"
              aria-expanded={open} aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            ><span /></button>
          </div>
        </div>
        <nav id="mobile-menu" className="mobile-menu" hidden={!open} aria-label="Mobile">
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
