import { useState } from 'react';
import { Arrow, Check, Tag } from './ui.jsx';

const plans = [
  {
    name: 'Classroom',
    monthly: 2999,
    blurb: 'For a single batch or a coaching centre.',
    features: ['Up to 60 students', '1 instructor', 'Email support'],
    cta: 'Start with Classroom',
  },
  {
    name: 'Institute',
    monthly: 9999,
    blurb: 'For colleges and institutes running several batches.',
    features: ['Up to 300 students', 'Unlimited instructors', 'Your logo on the portal', 'Priority support'],
    cta: 'Start with Institute',
    featured: true,
  },
  {
    name: 'Network',
    monthly: null,
    blurb: 'For universities and multi-branch training networks.',
    features: ['Unlimited students and branches', 'Your own domain', 'Onboarding for faculty'],
    cta: 'Talk to us',
  },
];

const fmt = (n) => '₹' + n.toLocaleString('en-IN');

export default function Pricing({ n, title = 'Priced per institute, not per click.', lede }) {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" aria-labelledby="price-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Tag n={n}>Pricing</Tag>
            <h2 id="price-title">{title}</h2>
          </div>
          <div>
            <p className="lede">{lede}</p>
            <div className="seg billing" role="group" aria-label="Billing period">
              <button type="button" aria-pressed={!annual} onClick={() => setAnnual(false)}>Monthly</button>
              <button type="button" aria-pressed={annual} onClick={() => setAnnual(true)}>Annual<em>2 months free</em></button>
            </div>
          </div>
        </div>
        <div className="plans">
          {plans.map((p) => (
            <div className={`plan${p.featured ? ' featured' : ''}`} key={p.name}>
              <h3>{p.name}</h3>
              {p.monthly === null ? (
                <>
                  <div className="price">Custom</div>
                  <div className="price-sub">Quoted per network</div>
                </>
              ) : (
                <>
                  <div className="price num">
                    {fmt(annual ? p.monthly * 10 : p.monthly)}<small>/ {annual ? 'year' : 'month'}</small>
                  </div>
                  <div className="price-sub num">
                    {annual ? `Saves ${fmt(p.monthly * 2)} a year` : 'Billed monthly'}
                  </div>
                </>
              )}
              <p>{p.blurb}</p>
              <ul>
                {p.features.map((f) => <li key={f}><i><Check /></i>{f}</li>)}
              </ul>
              <a href="#demo" className={`btn ${p.featured ? 'btn-lime' : 'btn-ghost'}`}>{p.cta} <Arrow /></a>
            </div>
          ))}
        </div>
        <p className="price-note">Prices are per module and exclude GST.</p>
      </div>
    </section>
  );
}
