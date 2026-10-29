import gst from './gst.jsx';
import uaeVat from './uae-vat.jsx';
import tds from './tds.jsx';
import incomeTax from './income-tax.jsx';
import epfo from './epfo.jsx';

// Order here is the order everywhere: nav, footer, module cards, hero tabs
export const products = [gst, uaeVat, tds, incomeTax, epfo];

// A filing console takes on the colour of the portal it belongs to
products.forEach((p) => { p.sim.portal = p.key; });
