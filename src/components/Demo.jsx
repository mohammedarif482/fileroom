import { useRef, useState } from 'react';
import { Arrow, Check, Mosaic } from './ui.jsx';
import { whatsappLink } from '../utils.js';

const FIELDS = {
  name: 'Tell us your name',
  org: 'Which institute are you with?',
  contact: 'We need a phone number or email to reach you',
};

// `ask` finishes the WhatsApp message: "...and I'd like to book a demo of ..."
export default function Demo({ title, lede, points, ask, filing }) {
  const formRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);

  // Hands the request to WhatsApp as a pre-filled message
  const onSubmit = (e) => {
    e.preventDefault();
    const form = formRef.current;
    const missing = Object.keys(FIELDS).filter((n) => !form.elements[n].value.trim());
    setErrors(Object.fromEntries(missing.map((n) => [n, FIELDS[n]])));
    if (missing.length) {
      form.elements[missing[0]].focus();
      return;
    }
    const v = (n) => form.elements[n].value.trim();
    const message =
      `Hi Fileroom, I'm ${v('name')} from ${v('org')}. ` +
      `We have ${v('size').toLowerCase()} students a year, and ${ask}. ` +
      `You can reach me at ${v('contact')}.`;
    window.open(whatsappLink(message), '_blank', 'noopener,noreferrer');
    setDone(true);
  };

  const clearError = (e) => {
    const { name } = e.target;
    if (errors[name]) setErrors(({ [name]: _, ...rest }) => rest);
  };

  const field = (name, label, props) => (
    <label className="field">
      {label}
      <input
        name={name} {...props} required onInput={clearError}
        aria-invalid={errors[name] ? true : undefined}
        aria-describedby={errors[name] ? `${name}-err` : undefined}
      />
      {errors[name] && <span className="err" id={`${name}-err`}>{errors[name]}</span>}
    </label>
  );

  return (
    <section className="demo" id="demo" aria-labelledby="demo-title">
      <div className="demo-panel">
        <Mosaic cols={20} rows={9} />
        <div className="wrap demo-grid">
          <div>
            {filing && (
              <p className="demo-callback">{filing.sim.callback}</p>
            )}
            <h2 id="demo-title">{title}</h2>
            <p className="lede">{lede}</p>
            <ul className="demo-points">
              {points.map((p) => <li key={p}><i><Check /></i>{p}</li>)}
            </ul>
          </div>

          <div className="form">
            {done ? (
              <div className="form-done" role="status">
                <span className="ok-badge"><Check /></span>
                <h3>Demo request received</h3>
                <p>Send the message we opened in WhatsApp and we'll reply within one working day. <a href={whatsappLink(`Hi Fileroom, ${ask}.`)} target="_blank" rel="noopener noreferrer">Open WhatsApp again</a></p>
              </div>
            ) : (
              <form ref={formRef} onSubmit={onSubmit} noValidate>
                <h3>Book a demo</h3>
                <p className="sub">We reply within one working day.</p>
                {field('name', 'Your name', { autoComplete: 'name' })}
                {field('org', 'Institute', { autoComplete: 'organization' })}
                <div className="field-row">
                  {field('contact', 'Phone or email', { autoComplete: 'email' })}
                  <label className="field">Students per year
                    <select name="size" defaultValue="100 to 500">
                      <option>Under 100</option>
                      <option>100 to 500</option>
                      <option>500 to 2,000</option>
                      <option>Over 2,000</option>
                    </select>
                  </label>
                </div>
                <button className="btn btn-primary btn-block" type="submit">Book a demo <Arrow /></button>
                <p className="form-note">This opens WhatsApp with your details filled in. We'll only use them to arrange your demo.</p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
