import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About SISO" },
  { href: "/program-kerja", label: "Program Kerja" },
  { href: "/articles", label: "Articles" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  return (
    <header className="site-header">
      <nav className="site-nav container">
        <Link href="/" className="site-logo" aria-label="SISO Prasmul — Home">
          SISO Prasmul
        </Link>
        <ul className="nav-list" role="list">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="nav-link">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
