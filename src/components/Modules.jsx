import { Arrow, Tag } from './ui.jsx';
import { products } from '../products/index.js';

// One card per practice portal. On a product page, pass `exclude` to list the others.
export default function Modules({ n, title, lede, exclude }) {
  const shown = products.filter((p) => p.key !== exclude);

  return (
    <section className={`modules${exclude ? ' compact' : ''}`} id="modules" aria-labelledby="modules-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            {n && <Tag n={n}>The rooms</Tag>}
            <h2 id="modules-title">{title}</h2>
          </div>
          {lede && <p className="lede">{lede}</p>}
        </div>
        <div className="m-grid">
          {shown.map((p) => (
            <a href={p.path} className={`m-card${p.featured ? ' featured' : ''}`} key={p.key}>
              <div className="m-top">
                <span className="m-form code">{p.chips[0]}</span>
                <span className="b-count">{p.region}</span>
              </div>
              <h3>{p.name}</h3>
              <p>{p.blurb}</p>
              <ul className="chips">
                {p.chips.map((c) => <li key={c}>{c}</li>)}
              </ul>
              <span className="m-go">See the {p.short} room <Arrow /></span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
