import { Logo } from './ui.jsx';
import { products } from '../products/index.js';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <Logo />
            <p>Fileroom is an independent tax training platform. It is not affiliated with GSTN, the Income Tax Department, EPFO, the UAE Federal Tax Authority or any government, and nothing filed on Fileroom is submitted to any tax authority.</p>
          </div>
          <div>
            <h4>Products</h4>
            <nav aria-label="Products">
              {products.map((p) => <a key={p.key} href={p.path}>{p.name}</a>)}
            </nav>
          </div>
          <div>
            <h4>Company</h4>
            <nav aria-label="Company">
              <a href="/#partners">Partners</a>
              <a href="#pricing">Pricing</a>
              <a href="#demo">Contact</a>
            </nav>
          </div>
        </div>
        <div className="foot-base">
          <span>© 2026 Fileroom</span>
          <span>Practice data only. No real filings.</span>
        </div>
      </div>
    </footer>
  );
}
