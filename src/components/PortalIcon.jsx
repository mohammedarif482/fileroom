const glyph = (d) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
);

// Our own marks for each portal. Government logos and the State Emblem stay off the site.
const ICONS = {
  gst: glyph('M6 3h12v18l-3-2-3 2-3-2-3 2zM9 8h6M9 12h6M9 16h3'),
  'uae-vat': glyph('M3 21h18M6 21V11h4v10M14 21V5l4 3v13M10 14h4'),
  tds: glyph('M18 6L6 18M7.5 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM16.5 18a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'),
  'income-tax': glyph('M6 3h9l4 4v14H6zM14 3v5h5M12.5 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM9 17c.6-1.8 2-2.7 3.5-2.7S15.4 15.2 16 17'),
  epfo: glyph('M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6zM9 12l2 2 4-4'),
};

// A portal's glyph on a glass tile in that portal's colour
export default function PortalIcon({ portal }) {
  return <span className="portal-icon" data-portal={portal} aria-hidden="true">{ICONS[portal]}</span>;
}
