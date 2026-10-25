import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/siso.prasmul" },
  { label: "TikTok", href: "https://tiktok.com/@siso.prasmul" },
  { label: "LinkedIn", href: "https://linkedin.com/company/siso-prasetiya-mulya" },
];

const FOOTER_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About SISO" },
  { href: "/program-kerja", label: "Programs & Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/articles-and-achieve", label: "Articles & Achievements" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <p className="footer-logo">SISO Prasmul</p>
          <p className="footer-tagline">
            STEM Prasetiya Mulya Innovation Student Organization — With STEM We Can
          </p>
          <p className="footer-tagline" style={{ marginTop: "0.5rem", opacity: 0.8, fontSize: "0.8rem" }}>
            Kampus BSD Kavling Edutown I.1, Jl. BSD Raya Utama, BSD City, Tangerang 15339
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="footer-nav" role="list">
            {FOOTER_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="footer-link">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer-socials">
          {SOCIAL_LINKS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-link"
              aria-label={`SISO Prasmul on ${s.label}`}
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <p className="footer-copy">
        © {currentYear} SISO Prasmul. All rights reserved.
      </p>
    </footer>
  );
}

