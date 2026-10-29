import { useRef, useState } from 'react';
import Console from './Console.jsx';
import { CtaLink, Mosaic } from './ui.jsx';
import { prefersReducedMotion } from '../utils.js';

export default function Hero({ title, lede, sims, facts, primary, onFiled }) {
  const consoleRef = useRef(null);
  const [tab, setTab] = useState(0);
  const sim = sims[tab];

  const tryIt = () => {
    const c = consoleRef.current;
    c.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => c.querySelector('input')?.focus({ preventScroll: true }), 500);
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-top">
          <h1 id="hero-title">{title}</h1>
          <div className="hero-side">
            <p className="lede">{lede}</p>
            <div className="hero-ctas">
              <CtaLink className="btn btn-primary" {...primary} />
              <button type="button" className="btn btn-ghost" onClick={tryIt}>File one yourself</button>
            </div>
          </div>
        </div>

        <div className="stage">
          <Mosaic />
          <div className="stage-inner">
            {sims.length > 1 && (
              <div className="sim-tabs" role="group" aria-label="Choose a return to file">
                {sims.map((s, i) => (
                  <button key={s.tab} type="button" aria-pressed={i === tab} onClick={() => setTab(i)}>
                    {s.tab}
                  </button>
                ))}
              </div>
            )}
            <Console key={sim.tab} ref={consoleRef} sim={sim} onFiled={onFiled} />
            <p className="stage-hint">{sim.hint}</p>
          </div>
        </div>

        <ul className="hero-facts">
          {facts.map(([b, rest]) => <li key={b}><b>{b}</b> {rest}</li>)}
        </ul>
      </div>
    </section>
  );
}
