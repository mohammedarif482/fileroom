import { Tag } from './ui.jsx';

const icon = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={d} /></svg>
);

const groups = [
  {
    key: 'month',
    title: 'Monthly and quarterly',
    icon: icon('M4 5h16v15H4zM4 10h16M9 3v4M15 3v4'),
    forms: [
      ['GSTR-1 / IFF', 'Outward supplies'],
      ['GSTR-2A / 2B', 'Inward supplies and ITC'],
      ['GSTR-3B', 'Summary return and payment'],
      ['IMS', 'Accept or reject supplier invoices'],
      ['CMP-08', 'Composition payment'],
    ],
  },
  {
    key: 'reg',
    title: 'Registration',
    icon: icon('M6 3h9l4 4v14H6zM14 3v5h5M9 13h7M9 17h5'),
    forms: [
      ['REG-01', 'New registration and GSTIN'],
      ['REG-06', 'Registration certificate'],
      ['REG-16', 'Cancellation'],
      ['Amendments', 'Core and non-core fields'],
    ],
  },
  {
    key: 'annual',
    title: 'Annual and special',
    icon: icon('M12 3v18M5 8l7-5 7 5M5 21h14'),
    forms: [
      ['GSTR-9 / 9C', 'Annual return and reconciliation'],
      ['GSTR-4', 'Composition annual return'],
      ['GSTR-7 / 8', 'TDS and TCS returns'],
      ['GSTR-10', 'Final return'],
    ],
  },
  {
    key: 'pay',
    title: 'Payments, refunds and movement',
    icon: icon('M3 7h18v11H3zM3 11h18M7 15h3'),
    forms: [
      ['PMT-06', 'Challan and payment'],
      ['RFD-01', 'Refund application'],
      ['EWB-01', 'e-Way Bill'],
      ['e-Invoice', 'IRN and signed QR'],
      ['DRC-03', 'Voluntary payment'],
    ],
  },
];

export default function FormsWall() {
  return (
    <section className="forms" id="forms" aria-labelledby="forms-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <Tag n="04">Coverage</Tag>
            <h2 id="forms-title">Every form a student will meet at work.</h2>
          </div>
          <p className="lede">From the day a business registers to the year-end reconciliation, across every kind of taxpayer.</p>
        </div>
        <div className="bento">
          {groups.map((g) => (
            <div className={`b-card c-${g.key}`} key={g.key}>
              <div className="b-top">
                <span className="b-icon">{g.icon}</span>
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
