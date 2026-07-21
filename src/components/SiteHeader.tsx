import { List, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Contact", to: "/contact" }
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="site-header">
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="site-header__inner shell">
        <Link className="site-wordmark" to="/" aria-label="C&C Detailing home">
          <img src="/images/cc-wordmark.jpg" alt="C&C Detailing" />
        </Link>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === "/"}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <Link className="button button--primary site-header__quote" to="/contact">
          Get a quote
        </Link>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={24} weight="bold" /> : <List size={26} weight="bold" />}
        </button>
      </div>

      <nav
        className={`mobile-nav ${menuOpen ? "mobile-nav--open" : ""}`}
        id="mobile-navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        {navItems.map((item) => (
          <NavLink key={item.to} to={item.to} end={item.to === "/"} tabIndex={menuOpen ? 0 : -1}>
            {item.label}
          </NavLink>
        ))}
        <Link className="button button--primary" to="/contact" tabIndex={menuOpen ? 0 : -1}>
          Get a quote
        </Link>
      </nav>
    </header>
  );
}
