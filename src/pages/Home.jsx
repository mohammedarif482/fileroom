import { useState } from 'react';
import Nav from '../components/Nav.jsx';
import Hero from '../components/Hero.jsx';
import Compare from '../components/Compare.jsx';
import Modules from '../components/Modules.jsx';
import Instructors from '../components/Instructors.jsx';
import Partners from '../components/Partners.jsx';
import Pricing from '../components/Pricing.jsx';
import Faq from '../components/Faq.jsx';
import Demo from '../components/Demo.jsx';
import Footer from '../components/Footer.jsx';
import FloatDock from '../components/FloatDock.jsx';
import { Scribble } from '../components/ui.jsx';
import { DEMO_MESSAGE, whatsappLink } from '../utils.js';
import { products } from '../products/index.js';
import gst from '../products/gst.jsx';

const ASK = "I'd like to book a demo of Fileroom for our institute";

const compare = {
  title: 'Most practice tools are screenshots',
  dim: 'with buttons.',
  lede: 'Students learn the menus, but nothing they type changes anything. Every Fileroom portal runs a working tax engine underneath, so every entry has a consequence.',
  rows: [
    ['Static pages that look like the portal', 'Live forms that save, validate and file'],
    ['Numbers typed into a form go nowhere', 'Every filing moves a ledger, a challan or a passbook'],
    ['One tool per tax, one login per tool', 'GST, UAE VAT, TDS, income tax and PF behind one login'],
    ["The teacher can't see who did what", 'Every filing, challan and mistake visible per student'],
    ['Out of date after the next budget', 'Rates and forms updated when the law changes'],
  ],
};

const faqs = [
  ['Is Fileroom connected to any real tax portal?', 'No. Fileroom is an independent training platform. Nothing a student files reaches GSTN, the Income Tax Department, EPFO or the UAE Federal Tax Authority, and no real payments, OTP or Aadhaar checks happen.'],
  ['Do we have to take all five portals?', 'No. Each portal is priced on its own. Start with the one your course teaches and add others when a new course needs them.'],
  ['Whose data do students use?', 'Practice data only. Businesses, tax IDs, invoices and bank details are fictitious, either from our case studies or your own uploaded through the instructor panel.'],
  ['What happens when the law changes?', 'We update rates, forms and calculations on our side. Your students see the change the next time they log in, with nothing to install.'],
  ['How long does setup take?', "Most institutes run their first class within a week. Upload your student list, pick a case study, and you're ready."],
];

export default function Home() {
  // The return the visitor filed in the hero, carried down to the demo section
  const [filing, setFiling] = useState(null);
  const demo = { label: 'Book a demo', href: whatsappLink(DEMO_MESSAGE) };

  return (
    <>
      <Nav current="home" cta={demo} />
      <main id="top">
        <Hero
          title={<>Your students will file real returns. Let the first one be <Scribble>practice.</Scribble></>}
          lede="Fileroom is five practice tax portals for institutes and colleges: GST, UAE VAT and corporate tax, TDS, income tax and EPFO. Students file real forms with practice data. You see every return they file."
          sims={products.map((p) => p.sim)}
          facts={[
            ['Five portals', 'behind one login per student'],
            ['Ledgers that move', 'the moment a return is filed'],
            ['Built for batches', 'of 30 to 3,000 students'],
          ]}
          primary={demo}
          onFiled={setFiling}
        />
        <Compare n="01" {...compare} />
        <Modules
          n="02"
          title="One practice room for each tax."
          lede="Each room copies its portal's screens and runs its own tax engine. Start with the one your course teaches."
        />
        <Instructors n="03" {...gst.dash} />
        <Partners n="04" />
        <Pricing
          n="05"
          title="Priced per room, per institute."
          lede="Pick the portals your courses need. Each is priced on its own, and every plan includes the instructor panel and updates when the law changes."
        />
        <Faq n="06" faqs={faqs} />
        <Demo
          title={<>Bring a working tax office to your <Scribble>next batch.</Scribble></>}
          lede="We'll walk you through a full filing on a live practice account, and set up a free trial batch for your faculty."
          points={['A full filing on a live practice account, for any tax you teach', 'A free trial batch set up for your faculty']}
          ask={ASK}
          filing={filing}
        />
      </main>
      <Footer />
      <FloatDock current="home" cta={demo} />
    </>
  );
}
