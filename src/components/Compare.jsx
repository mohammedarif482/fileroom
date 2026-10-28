import { Check, Tag } from './ui.jsx';

const rows = [
  ['Static pages that look like the portal', 'Live forms that save, validate and file'],
  ['Numbers typed into a form go nowhere', 'GSTR-1 fills 3B, 3B moves the ledgers, the year rolls into GSTR-9'],
  ['One kind of taxpayer', 'Regular, QRMP, composition, TDS deductor and e-commerce operator'],
  ["The teacher can't see who did what", 'Every filing, challan and mistake visible per student'],
  ['No emails, so students never see what the portal sends', 'Real emails for every ARN, challan and acknowledgement, just like the GST Portal'],
  ['Out of date after the next rate change', 'Rates and forms updated as GST changes'],
];

const Cross = () => (
  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4.5 4.5l7 7M11.5 4.5l-7 7" /></svg>
);

export default function Compare() {
  return (
    <section className="compare" aria-labelledby="cmp-title">
      <div className="panel-dark">
        <div className="wrap">
          <div className="section-head center">
            <Tag n="01" dark>The problem</Tag>
            <h2 id="cmp-title">Most practice tools are screenshots <span className="dim">with buttons.</span></h2>
            <p className="lede">Students learn the menus, but nothing they type changes anything. Fileroom runs a working tax engine underneath, so every entry has a consequence.</p>
          </div>
          <div className="cmp">
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
