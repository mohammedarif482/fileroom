import { useState } from 'react';
import { Tag } from './ui.jsx';

export default function Faq({ n, faqs }) {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="faq-title" className="faq">
      <div className="wrap faq-grid">
        <div className="faq-aside">
          <Tag n={n}>FAQ</Tag>
          <h2 id="faq-title">Questions institutes ask first.</h2>
          <p className="lede" style={{ marginTop: 20 }}>Something else? <a href="#demo">Ask us on the demo call.</a></p>
        </div>
        <div className="faq-list">
          {faqs.map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <div className={`faq-item${isOpen ? ' open' : ''}`} key={q}>
                <h3>
                  <button
                    type="button" className="faq-q" id={`faq-q-${i}`}
                    aria-expanded={isOpen} aria-controls={`faq-a-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    {q}
                    <span className="plus" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M8 3v10M3 8h10" /></svg>
                    </span>
                  </button>
                </h3>
                <div className="faq-a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} inert={isOpen ? undefined : ''}>
                  <div><p>{a}</p></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
