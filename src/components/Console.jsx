import { forwardRef, useState } from 'react';
import { inr, useCountUp } from '../utils.js';
import { Check } from './ui.jsx';

const invoices = [
  { no: 'INV-1041', party: 'Kochi Spices', value: 160000 },
  { no: 'INV-1042', party: 'Malabar Foods', value: 135000 },
  { no: 'INV-1043', party: 'Thrissur Retail', value: 125000 },
];

const RATE = 0.09;
const ITC_EACH = 27000; // CGST and SGST credit available in the ledger

const newArn = () =>
  'AA321026' + String(Math.floor(Math.random() * 1e7)).padStart(7, '0');

const Console = forwardRef(function Console({ onFiled }, ref) {
  const [included, setIncluded] = useState(invoices.map(() => true));
  const [arn, setArn] = useState(null);
  const filed = arn !== null;

  const taxable = invoices.reduce((s, inv, i) => s + (included[i] ? inv.value : 0), 0);
  const tax = Math.round(taxable * RATE);
  const fromItc = Math.min(ITC_EACH, tax);
  const cash = (tax - fromItc) * 2;
  const itcPct = tax ? (fromItc / tax) * 100 : 0;

  const shownTaxable = useCountUp(taxable, { from: 0, duration: 0.9 });
  const shownTax = useCountUp(tax, { from: 0, duration: 0.9 });
  const shownCash = useCountUp(cash, { from: 0, duration: 1.1 });

  const toggle = (i) => setIncluded((cur) => cur.map((v, j) => (j === i ? !v : v)));

  const file = () => {
    const next = newArn();
    setArn(next);
    onFiled?.({ arn: next, cash, fromItc: fromItc * 2, invoices: included.filter(Boolean).length });
  };

  const reset = () => {
    setArn(null);
    setIncluded(invoices.map(() => true));
  };

  let result;
  if (!tax) result = 'Nil return filed. Nothing to pay, nothing to set off.';
  else if (!cash) result = `${inr(fromItc * 2)} set off entirely from credit. No challan needed.`;
  else result = `${inr(fromItc * 2)} set off from credit, ${inr(cash)} paid in cash. October is locked.`;

  return (
    <div className={`console${filed ? ' is-filed' : ''}`} ref={ref}>
      <div className="console-bar">
        <div className="who">
          <span className="avatar" aria-hidden="true">AT</span>
          <div><strong>Anand Traders</strong><span>GSTIN <span className="code">32AABFA1234K1Z5</span></span></div>
        </div>
        <span className={`pill${filed ? ' filed' : ''}`} role="status">{filed ? 'Filed' : 'Draft'}</span>
      </div>

      <div className="console-body">
        <div className="c-title"><h3>GSTR-3B</h3><span>October 2026</span></div>

        <fieldset className="inv" disabled={filed}>
          <legend className="c-label">Outward supplies from GSTR-1</legend>
          {invoices.map((inv, i) => (
            <label className={`inv-row${included[i] ? '' : ' off'}`} key={inv.no}>
              <input type="checkbox" checked={included[i]} onChange={() => toggle(i)} />
              <span className="box" aria-hidden="true"><Check /></span>
              <span className="inv-no">{inv.no}</span>
              <span className="party">{inv.party}</span>
              <span className="inv-amt num">{inr(inv.value)}</span>
            </label>
          ))}
        </fieldset>

        <div className="split num">
          <div><small>Taxable value</small><b>{inr(shownTaxable)}</b></div>
          <div><small>CGST 9%</small><b>{inr(shownTax)}</b></div>
          <div><small>SGST 9%</small><b>{inr(shownTax)}</b></div>
        </div>

        <div className="setoff">
          <div className="c-label">Payment of tax</div>
          {['CGST', 'SGST'].map((head) => (
            <div className="bar-row num" key={head}>
              <span className="head">{head}</span>
              <div className="bar">
                <i className="itc" style={{ width: `${itcPct}%` }} />
                <i className="cash" style={{ width: `${tax ? 100 - itcPct : 0}%` }} />
              </div>
              <span className="amt">{inr(shownTax)}</span>
            </div>
          ))}
          <div className="legend"><span>From credit</span><span className="cash">In cash</span></div>
        </div>

        <div className="c-foot num">
          <div className="total">
            <small>{filed ? `ARN ${arn}` : 'Cash to pay by challan'}</small>
            <b>{inr(shownCash)}</b>
          </div>
          {filed
            ? <button type="button" className="btn btn-ghost-dark" onClick={reset}>Start over</button>
            : <button type="button" className="btn btn-lime" onClick={file}>File return</button>}
        </div>
        {filed && <p className="c-result" role="status">{result}</p>}
      </div>

      {filed && (
        <div className="stamp" aria-hidden="true">
          <b>FILED</b>
          <span className="code">{arn}</span>
        </div>
      )}
    </div>
  );
});

export default Console;
