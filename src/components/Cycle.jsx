import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { inr, useCountUp } from '../utils.js';
import { Tag } from './ui.jsx';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { title: "Raise the month's invoices", body: "Sales and purchases come from the instructor's case study. Purchase tax lands in the credit ledger as input tax credit." },
  { title: 'File GSTR-1', body: 'Sales go into B2B, B2C and HSN tables. Once filed, the tax on those sales is drafted straight into GSTR-3B.' },
  { title: 'Pay the gap by challan', body: "Credit covers part of the tax. Students create a challan for the rest, and the cash ledger is credited once it's paid." },
  { title: 'File GSTR-3B', body: 'Credit is set off in the legal order, cash clears the balance, the return gets an ARN, and the period locks.' },
];

const states = [
  { payable: 0,     credit: 54000, cash: 0,     hot: 'credit',  r1: false, r3: false, note: '12 purchase invoices booked. ₹54,000 of input tax credit available.' },
  { payable: 75600, credit: 54000, cash: 0,     hot: 'payable', r1: true,  r3: false, note: 'GSTR-1 filed. ₹75,600 of output tax drafted into GSTR-3B.' },
  { payable: 75600, credit: 54000, cash: 21600, hot: 'cash',    r1: true,  r3: false, note: 'Challan paid. ₹21,600 credited to the cash ledger.' },
  { payable: 0,     credit: 0,     cash: 0,     hot: null,      r1: true,  r3: true,  note: 'GSTR-3B filed with ARN AA3210260483127. October is locked.' },
];

const rows = [
  ['payable', 'Tax payable', 'CGST + SGST'],
  ['credit', 'Credit ledger', 'IGST, CGST, SGST'],
  ['cash', 'Cash ledger', 'Paid by challan'],
];

export default function Cycle() {
  const [active, setActive] = useState(0);
  const stepRefs = useRef([]);
  const s = states[active];
  const shown = {
    payable: useCountUp(s.payable),
    credit: useCountUp(s.credit),
    cash: useCountUp(s.cash),
  };

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
            <Tag n="03">How it works</Tag>
            <h2 id="how-title">A month of compliance, start to finish.</h2>
          </div>
          <p className="lede">The cycle every accountant runs twelve times a year. Students run it on their own practice business and see each step land in the ledgers.</p>
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

          <aside className="ledger num" aria-live="polite" aria-label="Ledger balances for Anand Traders">
            <div className="ledger-head">
              <div className="who">
                <span className="avatar" aria-hidden="true">AT</span>
                <div><h3>Anand Traders</h3><span>October 2026</span></div>
              </div>
              <span className="step-count">Step {active + 1} of 4</span>
            </div>
            <div className="progress-seg" aria-hidden="true">
              {steps.map((_, i) => <i key={i} className={i <= active ? 'on' : ''} />)}
            </div>
            <div className="l-rows">
              {rows.map(([k, label, sub]) => (
                <div className={`l-row${s.hot === k ? ' hot' : ''}`} key={k}>
                  <div><small>{label}</small><span>{sub}</span></div>
                  <b>{inr(shown[k])}</b>
                </div>
              ))}
            </div>
            <div className="l-status">
              <span className={`pill${s.r1 ? ' filed' : ''}`}>{s.r1 ? 'GSTR-1 filed' : 'GSTR-1 not filed'}</span>
              <span className={`pill${s.r3 ? ' filed' : ''}`}>{s.r3 ? 'GSTR-3B filed' : 'GSTR-3B not filed'}</span>
            </div>
            <p className="l-note">{s.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
