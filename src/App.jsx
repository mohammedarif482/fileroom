import { useState } from 'react';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Compare from './components/Compare.jsx';
import PortalMatch from './components/PortalMatch.jsx';
import Cycle from './components/Cycle.jsx';
import FormsWall from './components/FormsWall.jsx';
import Instructors from './components/Instructors.jsx';
import Pricing from './components/Pricing.jsx';
import Faq from './components/Faq.jsx';
import Demo from './components/Demo.jsx';
import Footer from './components/Footer.jsx';

export default function App() {
  // The return the visitor filed in the hero, carried down to the demo section
  const [filing, setFiling] = useState(null);

  return (
    <>
      <Nav />
      <main id="top">
        <Hero onFiled={setFiling} />
        <Compare />
        <PortalMatch />
        <Cycle />
        <FormsWall />
        <Instructors />
        <Pricing />
        <Faq />
        <Demo filing={filing} />
      </main>
      <Footer />
    </>
  );
}
