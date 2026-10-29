import { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import Compare from '../components/Compare.jsx';
import PortalMatch from '../components/PortalMatch.jsx';
import Cycle from '../components/Cycle.jsx';
import FormsWall from '../components/FormsWall.jsx';
import Instructors from '../components/Instructors.jsx';
import Pricing from '../components/Pricing.jsx';
import Faq from '../components/Faq.jsx';
import Demo from '../components/Demo.jsx';
import Modules from '../components/Modules.jsx';
import Footer from '../components/Footer.jsx';
import FloatDock from '../components/FloatDock.jsx';
import { whatsappLink } from '../utils.js';

// The landing page for one practice portal, driven by its config in src/products
export default function Product({ product: p }) {
  // The return the visitor filed in the hero, carried down to the demo section
  const [filing, setFiling] = useState(null);
  const demo = { label: 'Book a demo', href: whatsappLink(`Hi Fileroom, ${p.ask}.`) };

  let n = 0;
  const next = () => String(++n).padStart(2, '0');

  return (
    <>
      <Nav current={p.key} cta={demo} />
      <main id="top">
        <Hero {...p.hero} sims={[p.sim]} primary={demo} onFiled={setFiling} />
        <Compare n={next()} {...p.compare} />
        {p.portal && <PortalMatch n={next()} />}
        <Cycle n={next()} {...p.cycle} />
        <FormsWall n={next()} {...p.coverage} />
        <Instructors n={next()} {...p.dash} />
        <Pricing n={next()} lede={p.pricing} />
        <Faq n={next()} faqs={p.faqs} />
        <Demo {...p.demo} ask={p.ask} filing={filing} />
        <Modules exclude={p.key} title="The other rooms." />
      </main>
      <Footer />
      <FloatDock current={p.key} cta={demo} />
    </>
  );
}
