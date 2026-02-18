import { useState, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router";


const logoImg = "/logo.jpeg";


export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Ana Sayfa" },
    { to: "/menu", label: "Menü" },
    { to: "/franchise", label: "Franchise" },
    { to: "/kariyer", label: "Kariyer" },
  ];

  return (
    <div
      style={{ fontFamily: "'Forum', serif", backgroundColor: "#1A0F08", color: "#F5F0E8" }}
      className="min-h-screen flex flex-col"
    >
      {/* NAV */}
      <header
        style={{
          backgroundColor: scrolled ? "rgba(26,15,8,0.97)" : "transparent",
          borderBottom: scrolled ? "1px solid rgba(196,154,42,0.15)" : "1px solid transparent",
          transition: "background-color 0.4s ease, border-color 0.4s ease",
        }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img src={logoImg} alt="PEPO Coffee & Social" className="h-12 w-auto" />
            <div style={{ lineHeight: 1.1 }}>
              <div style={{ color: "#C49A2A", fontSize: "1.15rem", letterSpacing: "0.12em" }}>
                PEPO
              </div>
              <div style={{ color: "#F5F0E8", fontSize: "0.62rem", letterSpacing: "0.25em", opacity: 0.7 }}>
                COFFEE & SOCIAL
              </div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                style={({ isActive }) => ({
                  color: isActive ? "#C49A2A" : "#F5F0E8",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  letterSpacing: "0.15em",
                  borderBottom: isActive ? "1px solid #C49A2A" : "1px solid transparent",
                  paddingBottom: "2px",
                  transition: "color 0.2s ease, border-color 0.2s ease",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menüyü aç/kapat"
          >
            <span
              style={{
                backgroundColor: "#C49A2A",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
              }}
              className="block h-[2px] w-full"
            />
            <span
              style={{
                backgroundColor: "#C49A2A",
                transition: "opacity 0.3s ease",
                opacity: menuOpen ? 0 : 1,
              }}
              className="block h-[2px] w-full"
            />
            <span
              style={{
                backgroundColor: "#C49A2A",
                transition: "transform 0.3s ease, opacity 0.3s ease",
                transform: menuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
              }}
              className="block h-[2px] w-full"
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div
            style={{ backgroundColor: "#1A0F08", borderTop: "1px solid rgba(196,154,42,0.2)" }}
            className="md:hidden px-6 py-6 flex flex-col gap-5"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                style={({ isActive }) => ({
                  color: isActive ? "#C49A2A" : "#F5F0E8",
                  fontSize: "1.1rem",
                  letterSpacing: "0.15em",
                  textDecoration: "none",
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      
    </div>
  );
}
