import { Tag } from './ui.jsx';

const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

export const ICONS = {
  calendar: icon('M4 5h16v15H4zM4 10h16M9 3v4M15 3v4'),
  doc: icon('M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5'),
  pillar: icon('M12 3v18M5 8l7-5 7 5M5 21h14'),
  card: icon('M3 7h18v11H3zM3 11h18M7 15h3'),
};

// Bento positions, in order: wide blue, narrow white, narrow dark, wide white
const LOOKS = ['month', 'reg', 'annual', 'pay'];

export default function FormsWall({ n, title, lede, groups }) {
  return (
    <section className="forms" id="forms" aria-labelledby="forms-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Tag n={n}>Coverage</Tag>
            <h2 id="forms-title">{title}</h2>
          </div>
          <p className="lede">{lede}</p>
        </div>
        <div className="bento">
          {groups.map((g, i) => (
            <div className={`b-card c-${LOOKS[i]}`} key={g.title}>
              <div className="b-top">
                <span className="b-icon">{ICONS[g.icon]}</span>
                <span className="b-count">{String(g.forms.length).padStart(2, '0')}</span>
              </div>
              <h3>{g.title}</h3>
              <ul className="f-list">
                {g.forms.map(([code, desc]) => (
                  <li key={code}><b>{code}</b><span>{desc}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
