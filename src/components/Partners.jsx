import { Check, CtaLink, Tag } from './ui.jsx';
import { whatsappLink } from '../utils.js';

const programs = [
  {
    name: 'Training partner',
    line: 'Teach on Fileroom, under our name.',
    body: "You already run accounting courses. Add the portals to them. We set up your batches, train your faculty and keep every form current.",
    points: ['Case studies and practice data ready to use', 'Faculty training before your first class', 'WhatsApp and phone support during class hours'],
    message: "Hi Fileroom, I'd like to know more about becoming a training partner.",
  },
  {
    name: 'White-label partner',
    line: 'Put your name on it.',
    body: "Your logo, your company name and your domain on every screen. Your students never see ours. We still run the servers and ship the updates.",
    points: ['Your brand across every portal', 'Your own domain', 'We keep the tax engine updated behind it'],
    message: "Hi Fileroom, I'd like to know more about the white-label partner program.",
    dark: true,
  },
];

export default function Partners({ n }) {
  return (
    <section className="partners" id="partners" aria-labelledby="partners-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Tag n={n}>Partners</Tag>
            <h2 id="partners-title">Run it as Fileroom, or as you.</h2>
          </div>
          <p className="lede">Most institutes start with a batch or two. Some want it inside their own brand from day one. Both work.</p>
        </div>
        <div className="p-grid">
          {programs.map((p) => (
            <div className={`p-card${p.dark ? ' dark' : ''}`} key={p.name}>
              <span className="m-form code">{p.name}</span>
              <h3>{p.line}</h3>
              <p>{p.body}</p>
              <ul className="p-list">
                {p.points.map((pt) => <li key={pt}><i><Check /></i>{pt}</li>)}
              </ul>
              <CtaLink className={`btn ${p.dark ? 'btn-lime' : 'btn-ghost'}`} href={whatsappLink(p.message)} label="Talk to us" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
