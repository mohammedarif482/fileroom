import { useRef } from 'react';
import Console from './Console.jsx';
import { Arrow, Mosaic, Scribble } from './ui.jsx';
import { prefersReducedMotion, whatsappLink } from '../utils.js';

export default function Hero({ onFiled }) {
  const consoleRef = useRef(null);

  const tryIt = () => {
    const c = consoleRef.current;
    c.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'center' });
    setTimeout(() => c.querySelector('input')?.focus({ preventScroll: true }), 500);
  };

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="wrap">
        <div className="hero-top">
          <h1 id="hero-title">The first real GST return your students file shouldn't <Scribble>fail.</Scribble></h1>
          <div className="hero-side">
            <p className="lede">Fileroom is a practice GST portal for institutes and colleges. Students register a business, raise invoices, file GSTR-1 and 3B, pay challans and watch their ledgers update, all with practice data.</p>
            <div className="hero-ctas">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Book a demo <Arrow /></a>
              <button type="button" className="btn btn-ghost" onClick={tryIt}>File one yourself</button>
            </div>
          </div>
        </div>

        <div className="stage">
          <Mosaic />
          <div className="stage-inner">
            <Console ref={consoleRef} onFiled={onFiled} />
            <p className="stage-hint">Untick an invoice and the tax, credit and challan all recalculate. Then file it.</p>
          </div>
        </div>

        <ul className="hero-facts">
          <li><b>Every return</b> a regular, QRMP, composition or TDS/TCS taxpayer files</li>
          <li><b>Ledgers that move</b> the moment a return is filed</li>
          <li><b>Built for batches</b> of 30 to 3,000 students</li>
        </ul>
      </div>
    </section>
  );
}
