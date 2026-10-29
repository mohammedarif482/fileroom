import { useEffect, useRef, useState } from 'react';
import { CtaLink, Logo } from './ui.jsx';
import { products } from '../products/index.js';

const links = [
  ['#instructors', 'For instructors'],
  ['/#partners', 'Partners'],
  ['#pricing', 'Pricing'],
];

export default function Nav({ current, cta }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const productsRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open && !productsOpen) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      setOpen(false);
      setProductsOpen(false);
    };
    const onDown = (e) => {
      if (!productsRef.current?.contains(e.target)) setProductsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onDown);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onDown);
    };
  }, [open, productsOpen]);

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}${open ? ' menu-open' : ''}`}>
      <div className="wrap">
        <div className="nav-inner">
          <Logo />
          <nav className="nav-links" aria-label="Main">
            <div className="has-menu" ref={productsRef}>
              <button
                type="button" className="products-btn"
                aria-expanded={productsOpen} aria-controls="products-panel"
                onClick={() => setProductsOpen((o) => !o)}
              >
                Products
                <svg viewBox="0 0 12 8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true"><path d="M1 1.5l5 5 5-5" /></svg>
              </button>
              <div id="products-panel" className="products-panel" hidden={!productsOpen}>
                {products.map((p) => (
                  <a key={p.key} href={p.path} aria-current={p.key === current ? 'page' : undefined}>
                    <strong>{p.name}</strong>
                    <span>{p.sub}</span>
                  </a>
                ))}
              </div>
            </div>
            {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
          </nav>
          <div className="nav-cta">
            <CtaLink className="btn btn-dark" {...cta} />
            <button
              type="button" className="menu-btn" aria-label="Menu"
              aria-expanded={open} aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            ><span /></button>
          </div>
        </div>
        <nav id="mobile-menu" className="mobile-menu" hidden={!open} aria-label="Mobile">
          <h4>Products</h4>
          {products.map((p) => (
            <a key={p.key} href={p.path} aria-current={p.key === current ? 'page' : undefined} onClick={() => setOpen(false)}>{p.name}</a>
          ))}
          <hr />
          {links.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
