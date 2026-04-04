import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router";

const logoImg = "/logopepo.png";

export function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  const navLinks = [
    { to: "/", label: "Ana Sayfa" },
    { to: "https://scan.page/p/8Am7Vr", label: "Menü" },
    { to: "/franchise", label: "Franchise" },
    { to: "/kariyer", label: "Kariyer" },
    { to: "/iletisim", label: "İletişim" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[rgb(var(--pepo-bg))] text-[rgb(var(--pepo-text))]">
      {/* NAV */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-colors duration-300",
          scrolled
            ? "bg-[rgba(26,15,8,0.97)] border-b border-[rgb(var(--pepo-gold))]/15"
            : "bg-transparent border-b border-transparent",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 no-underline">
            <img src={logoImg} alt="PEPO Coffee & Social" className="h-12 w-auto" />
            {/* 
            <div className="leading-[1.1]">
              <div className="text-[rgb(var(--pepo-gold))] text-[1.15rem] tracking-[0.12em]">
                PEPO
              </div>
              <div className="text-[rgb(var(--pepo-text))] text-[0.62rem] tracking-[0.25em] opacity-70">
                COFFEE & SOCIAL
              </div>
            </div> */}
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => {
              const isExternal = link.to.startsWith("http");
              const desktopClass = "no-underline text-[0.9rem] tracking-[0.15em] pb-[2px] border-b transition-colors duration-200";

              if (isExternal) {
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${desktopClass} text-[rgb(var(--pepo-text))] border-transparent hover:text-[rgb(var(--pepo-gold))] hover:border-[rgb(var(--pepo-gold))]`}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    [
                      desktopClass,
                      isActive
                        ? "text-[rgb(var(--pepo-gold))] border-[rgb(var(--pepo-gold))]"
                        : "text-[rgb(var(--pepo-text))] border-transparent hover:text-[rgb(var(--pepo-gold))] hover:border-[rgb(var(--pepo-gold))]",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menüyü aç/kapat"
          >
            <span
              className={[
                "block h-[2px] w-full bg-[rgb(var(--pepo-gold))] transition-all duration-300",
                menuOpen ? "rotate-45 translate-y-[7px]" : "",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-full bg-[rgb(var(--pepo-gold))] transition-opacity duration-300",
                menuOpen ? "opacity-0" : "opacity-100",
              ].join(" ")}
            />
            <span
              className={[
                "block h-[2px] w-full bg-[rgb(var(--pepo-gold))] transition-all duration-300",
                menuOpen ? "-rotate-45 -translate-y-[7px]" : "",
              ].join(" ")}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden px-6 py-6 flex flex-col gap-5 bg-[rgb(var(--pepo-bg))] border-t border-[rgb(var(--pepo-gold))]/20">
            {navLinks.map((link) => {
              const isExternal = link.to.startsWith("http");
              const mobileClass = "no-underline text-[1.1rem] tracking-[0.15em] transition-colors duration-200";

              if (isExternal) {
                return (
                  <a
                    key={link.to}
                    href={link.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${mobileClass} text-[rgb(var(--pepo-text))] hover:text-[rgb(var(--pepo-gold))]`}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    [
                      mobileClass,
                      isActive
                        ? "text-[rgb(var(--pepo-gold))]"
                        : "text-[rgb(var(--pepo-text))] hover:text-[rgb(var(--pepo-gold))]",
                    ].join(" ")
                  }
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>
        )}
      </header>

      {/* PAGE CONTENT */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* FOOTER */}
      <footer className="bg-[rgb(var(--pepo-bg-2))] border-t border-[rgb(var(--pepo-gold))]/20 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img src={logoImg} alt="PEPO Coffee & Social" className="h-10 w-auto" />
                {/* <div className="leading-[1.1]">
                  <div className="text-[rgb(var(--pepo-gold))] text-[1.1rem] tracking-[0.12em]">
                    PEPO
                  </div>
                  <div className="text-[rgb(var(--pepo-text))] text-[0.6rem] tracking-[0.25em] opacity-60">
                    COFFEE & SOCIAL
                  </div>
                </div> */}
              </div>

              <p className="text-[rgba(245,240,232,0.55)] text-[0.88rem] leading-[1.8]">
                Kahvenin sanatını sosyal deneyimle buluşturuyoruz. Her fincan, bir hikâyenin başlangıcı.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-[rgb(var(--pepo-gold))] text-[0.75rem] tracking-[0.25em] mb-4">
                SAYFALAR
              </h4>

              <ul className="flex flex-col gap-3 list-none p-0">
                {navLinks.map((link) => {
                  const isExternal = link.to.startsWith("http");
                  const footerClass = "no-underline text-[rgba(245,240,232,0.65)] hover:text-[rgb(var(--pepo-gold))] transition-colors duration-200 text-[0.88rem] tracking-[0.05em]";

                  return (
                    <li key={link.to}>
                      {isExternal ? (
                        <a
                          href={link.to}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={footerClass}
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.to} className={footerClass}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-[rgb(var(--pepo-gold))] text-[0.75rem] tracking-[0.25em] mb-4">
                İLETİŞİM
              </h4>

              <ul className="flex flex-col gap-3 text-[rgba(245,240,232,0.65)] text-[0.88rem] list-none p-0">
                <li>info@pepocoffee.com</li>
                <li className="leading-[1.7]">
                  İnönü Caddesi No:375/A, İzmir, Türkiye
                </li>
              </ul>

              <div className="flex gap-4 mt-5">
                {[
                  { label: "Instagram", href: "https://www.instagram.com/pepocoffeesocial/" },
                  { label: "Facebook", href: "https://www.facebook.com/p/Pepo-Coffee-Social-61555286991420/" }
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-[rgba(245,240,232,0.55)] hover:text-[rgb(var(--pepo-gold))] transition-colors duration-200 text-[0.75rem] tracking-[0.1em]"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-[rgb(var(--pepo-gold))]/15 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-[rgba(245,240,232,0.35)] text-[0.78rem] tracking-[0.08em]">
              © 2026 PEPO Coffee & Social. Tüm hakları saklıdır.
            </p>
            <p className="text-[rgba(245,240,232,0.25)] text-[0.72rem] tracking-[0.05em]">
              Kahvenin ötesinde bir deneyim.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}