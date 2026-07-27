import { ArrowUpRight, List, Phone, X } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { businessProfile } from "../app/site-data";

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

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

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

        <Link
          className="button button--primary button--quote site-header__quote"
          to="/contact"
          aria-label="Get a quote"
        >
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
        <div className="mobile-nav__routes">
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              aria-label={item.label}
              tabIndex={menuOpen ? 0 : -1}
            >
              <span className="mobile-nav__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="mobile-nav__label">{item.label}</span>
              <ArrowUpRight className="mobile-nav__route-arrow" size={24} weight="bold" aria-hidden="true" />
            </NavLink>
          ))}
        </div>

        <div className="mobile-nav__utility">
          <div className="mobile-nav__meta">
            <span>{businessProfile.location}</span>
            <a
              href={`tel:${businessProfile.collin.tel}`}
              aria-label={`Call ${businessProfile.collin.name} at ${businessProfile.collin.phone}`}
              tabIndex={menuOpen ? 0 : -1}
            >
              <Phone size={18} weight="bold" aria-hidden="true" />
              <span>{businessProfile.collin.phone}</span>
            </a>
          </div>

          <Link
            className="button button--primary button--quote"
            to="/contact"
            aria-label="Get a quote"
            tabIndex={menuOpen ? 0 : -1}
          >
            Get a quote
          </Link>
        </div>
      </nav>
    </header>
  );
}
