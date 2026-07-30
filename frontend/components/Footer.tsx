import Link from "next/link";

const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://instagram.com/sisoprasmul" },
  { label: "TikTok", href: "https://tiktok.com/@sisoprasmul" },
  { label: "YouTube", href: "https://youtube.com/@sisoprasmul" },
];

const FOOTER_LINKS = [
  { href: "/about", label: "About SISO" },
  { href: "/program-kerja", label: "Program Kerja" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-inner container">
        <div className="footer-brand">
          <p className="footer-logo">SISO Prasmul</p>
          <p className="footer-tagline">
            Himpunan Mahasiswa Ilmu Sosial — Prasmul
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
