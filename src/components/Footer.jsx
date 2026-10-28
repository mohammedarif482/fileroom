export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot">
          <div>
            <a href="#top" className="logo">
              <svg className="logo-mark" viewBox="0 0 28 28" aria-hidden="true">
                <rect width="28" height="28" rx="8" fill="#0D111C" />
                <path d="M8.5 9.5h11M8.5 14h11M8.5 18.5h6" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                <circle cx="19.5" cy="19" r="3.6" fill="#D4F55A" />
              </svg>
              Fileroom
            </a>
            <p>Fileroom is an independent GST training platform. It is not affiliated with GSTN or the Government of India, and nothing filed on Fileroom is submitted to any tax authority.</p>
          </div>
          <div>
            <h4>Product</h4>
            <nav aria-label="Product">
              <a href="#how">How it works</a>
              <a href="#forms">Coverage</a>
              <a href="#instructors">For instructors</a>
            </nav>
          </div>
          <div>
            <h4>Company</h4>
            <nav aria-label="Company">
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
