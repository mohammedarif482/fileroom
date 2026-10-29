import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tag } from './ui.jsx';

gsap.registerPlugin(ScrollTrigger);

// Regions are percentages of the screenshot (1735 × 1316)
const points = [
  {
    title: 'Same menus',
    body: 'Dashboard, Services, Returns. Students learn the portal\'s navigation, not a different one.',
    at: { left: '0%', top: '0%', width: '100%', height: '4.8%' },
    badge: 'below',
  },
  {
    title: 'Same returns calendar',
    body: 'Filed and pending periods for GSTR-1 and 3B, shown the way the portal shows them.',
    at: { left: '9.4%', top: '23.4%', width: '58.3%', height: '17.4%' },
  },
  {
    title: 'Same buttons, same order',
    body: 'Return dashboard, create challan, file. What they practise is what they will click at work.',
    at: { left: '6.4%', top: '69.6%', width: '61.9%', height: '19.4%' },
  },
];

export default function PortalMatch({ n }) {
  const [active, setActive] = useState(0);
  const gridRef = useRef(null);
  const itemRefs = useRef([]);
  const pinRef = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    // Desktop: pin the section and step through the points as you scroll
    mm.add('(min-width: 1001px)', () => {
      const grid = gridRef.current;
      pinRef.current = ScrollTrigger.create({
        trigger: grid,
        start: () => (grid.offsetHeight + 120 > window.innerHeight ? 'top top+=96' : 'center center'),
        end: () => '+=' + window.innerHeight * 1.5,
        pin: true,
        onUpdate: (self) => setActive(Math.min(points.length - 1, Math.floor(self.progress * points.length))),
      });
      return () => { pinRef.current = null; };
    });

    // Mobile: the screenshot sticks, each point takes over as it scrolls past
    mm.add('(max-width: 1000px)', () => {
      itemRefs.current.forEach((el, i) => ScrollTrigger.create({
        trigger: el, start: 'top 75%', end: 'bottom 75%',
        onEnter: () => setActive(i),
        onEnterBack: () => setActive(i),
      }));
    });

    return () => mm.revert();
  }, []);

  const jumpTo = (i) => {
    const st = pinRef.current;
    if (!st) { setActive(i); return; }
    const y = st.start + ((i + 0.5) / points.length) * (st.end - st.start);
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <section className="portal" id="portal" aria-labelledby="portal-title">
      <div className="wrap portal-grid" ref={gridRef}>
        <div>
          <Tag n={n}>Looks like the real thing</Tag>
          <h2 id="portal-title">Same screens they'll see on the GST Portal.</h2>
          <p className="lede">Fileroom follows the GST Portal's layout, menus and form tables. The first time students log in at work, they already know where everything is.</p>
          <ol className="portal-points">
            {points.map((p, i) => (
              <li key={p.title} ref={(el) => { itemRefs.current[i] = el; }}>
                <button
                  type="button"
                  className={i === active ? 'active' : ''}
                  aria-pressed={i === active}
                  onClick={() => jumpTo(i)}
                >
                  <span className="pin-n">{i + 1}</span>
                  <span><strong>{p.title}</strong>{p.body}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <figure className="portal-shot">
          <div className="browser">
            <div className="browser-bar" aria-hidden="true">
              <span className="dots"><i /><i /><i /></span>
              <span className="url">gst.gov.in</span>
            </div>
            <div className="shot">
              <img
                src="/gst-portal-dashboard.jpg"
                width="1735" height="1316" loading="lazy"
                alt="The real GST Portal taxpayer dashboard: top menu, a returns calendar showing GSTR-1 and GSTR-3B filed for May to September 2024, and buttons for Return Dashboard and Create Challan."
              />
              {points.map((p, i) => (
                <span
                  key={p.title}
                  className={`region${i === active ? ' active' : ''}${p.badge ? ` badge-${p.badge}` : ''}`}
                  style={p.at}
                  aria-hidden="true"
                ><b>{i + 1}</b></span>
              ))}
            </div>
          </div>
          <figcaption>
            The real GST Portal dashboard, from GSTN's official user manual at tutorial.gst.gov.in. Fileroom is not affiliated with GSTN.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
