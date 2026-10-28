import { useState } from 'react';
import { Tag } from './ui.jsx';

const faqs = [
  ['Is Fileroom connected to the real GST portal?', 'No. Fileroom is an independent training platform. Nothing a student files reaches the government, and no real payments, Aadhaar or OTP checks happen.'],
  ['Whose data do students use?', 'Practice data only. Businesses, GSTINs, invoices and bank details are fictitious, either from our case studies or your own uploaded through the instructor panel.'],
  ['What happens when GST rules or rates change?', 'We update rates, forms and calculations on our side. Your students see the change the next time they log in, with nothing to install.'],
  ['Can students practise from home?', 'Yes. Fileroom runs in the browser on any laptop or desktop. Each student has their own account, so their work is waiting where they left it.'],
  ['How long does setup take?', "Most institutes run their first class within a week. Upload your student list, pick a case study, and you're ready."],
];

export default function Faq() {
  const [open, setOpen] = useState(0);

  return (
    <section aria-labelledby="faq-title" className="faq">
      <div className="wrap faq-grid">
        <div className="faq-aside">
          <Tag n="07">FAQ</Tag>
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
