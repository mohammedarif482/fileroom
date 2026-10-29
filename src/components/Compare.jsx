import { Check, Tag } from './ui.jsx';

const Cross = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" /></svg>
);

export default function Compare({ n, title, dim, lede, rows }) {
  return (
    <section className="compare" aria-labelledby="cmp-title">
      <div className="panel-dark">
        <div className="wrap">
          <div className="section-head center">
            <Tag n={n} dark>The problem</Tag>
            <h2 id="cmp-title">{title} <span className="dim">{dim}</span></h2>
            <p className="lede">{lede}</p>
          </div>
          <div className="cmp" style={{ '--rows': rows.length + 1 }}>
            <div className="cmp-card cmp-old">
              <header><h3>Typical practice tool</h3></header>
              {rows.map(([before]) => (
                <div className="cmp-row" key={before}><span className="mark"><Cross /></span>{before}</div>
              ))}
            </div>
            <div className="cmp-card cmp-new">
              <header><h3>Fileroom</h3></header>
              {rows.map(([, after]) => (
                <div className="cmp-row" key={after}><span className="mark"><Check /></span>{after}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
