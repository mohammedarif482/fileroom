import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Amount, Tag } from './ui.jsx';

gsap.registerPlugin(ScrollTrigger);

// Scroll-driven walk through one filing cycle. Each step has a matching
// `state` holding the ledger values, which row is hot, which statuses are done and a note.
export default function Cycle({ n, title, lede, entity, steps, states, rows, statuses, fmt }) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);
  const s = states[active];

  useEffect(() => {
    const triggers = stepRefs.current.map((el, i) =>
      ScrollTrigger.create({
        trigger: el, start: 'top 60%', end: 'bottom 60%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      })
    );
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <section id="how" aria-labelledby="how-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Tag n={n}>How it works</Tag>
            <h2 id="how-title">{title}</h2>
          </div>
          <p className="lede">{lede}</p>
        </div>
        <div className="cycle-grid">
          <ol className="steps">
            {steps.map((step, i) => (
              <li
                key={step.title}
                className={`step${i === active ? ' active' : ''}${i < active ? ' done' : ''}`}
                ref={(el) => { stepRefs.current[i] = el; }}
              >
                <span className="step-n">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <aside className="ledger num" aria-live="polite" aria-label={`Ledger balances for ${entity.name}`}>
            <div className="ledger-head">
              <div className="who">
                <span className="avatar" aria-hidden="true">{entity.initials}</span>
                <div><h3>{entity.name}</h3><span>{entity.period}</span></div>
              </div>
              <span className="step-count">Step {active + 1} of {steps.length}</span>
            </div>
            <div className="progress-seg" aria-hidden="true" style={{ gridTemplateColumns: `repeat(${steps.length},1fr)` }}>
              {steps.map((_, i) => <i key={i} className={i <= active ? 'on' : ''} />)}
            </div>
            <div className="l-rows">
              {rows.map(([k, label, sub]) => (
                <div className={`l-row${s.hot === k ? ' hot' : ''}`} key={k}>
                  <div><small>{label}</small><span>{sub}</span></div>
                  <b><Amount value={s.values[k]} fmt={fmt} /></b>
                </div>
              ))}
            </div>
            <div className="l-status">
              {statuses.map(([on, off], i) => (
                <span key={on} className={`pill${s.done[i] ? ' filed' : ''}`}>{s.done[i] ? on : off}</span>
              ))}
            </div>
            <p className="l-note">{s.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
