import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiOutlineMenuAlt3, HiX } from "react-icons/hi";
import { useAuth } from "../context/AuthContext";

const links = [
  { label: "Home", href: "/" },
  { label: "Categories", href: "/#categories" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "/#reviews" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Track scroll to toggle background/blur for readability
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyles =
    scrolled || open
      ? "bg-white/95 shadow-lg backdrop-blur-xl border-b border-gray-100"
      : "bg-white border-b border-gray-100";

  // Scrolls to in-page sections when hash links are clicked; falls back to navigation for other routes.
  const handleAnchor = (href) => {
    setOpen(false);
    if (href.includes("#")) {
      const id = href.split("#")[1];
      if (location.pathname !== "/") {
        window.location.href = href;
      } else {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navStyles}`}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3 sm:py-4">
          <Link
            to="/"
            className="flex items-center gap-3 text-gray-900 group"
            onClick={() => setOpen(false)}
          >
            <img
              src="/assets/logo.jpg"
              alt="Elora Interiors logo"
              loading="lazy"
              className="h-11 w-auto rounded-full object-cover"
            />
            <div className="leading-tight">
              <p className="text-[15px] sm:text-lg font-bold uppercase tracking-[0.28em] text-black">
                Elora
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-900">Interiors</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => handleAnchor(link.href)}
                className="text-sm font-medium text-gray-700 transition hover:text-blue-500"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            {!isAuthenticated ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-500 transition"
                  onClick={() => setOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-100 transition hover:-translate-y-0.5 hover:bg-blue-500"
                  onClick={() => setOpen(false)}
                >
                  Join
                </Link>
              </>
            ) : (
              <>
                <span className="text-sm font-semibold text-gray-900">
                  Hi, {user?.name?.split(" ")[0] || "Guest"}
                </span>
                <button
                  type="button"
                  onClick={logout}
                  className="rounded-full border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700 transition hover:border-blue-400 hover:text-blue-500"
                >
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            aria-label="Toggle navigation"
            className="lg:hidden text-gray-800 hover:text-blue-500 transition"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <HiX className="h-7 w-7" /> : <HiOutlineMenuAlt3 className="h-7 w-7" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden absolute left-0 top-full w-full bg-white shadow-md border-b border-gray-100">
            <div className="flex flex-col gap-1 px-4 py-3">
              {links.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleAnchor(link.href)}
                  className="rounded-lg px-3 py-2 text-base font-medium text-gray-800 transition hover:bg-gray-50"
                >
                  {link.label}
                </Link>
              ))}
              {!isAuthenticated ? (
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <Link
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold text-center text-gray-800 transition hover:border-blue-400 hover:text-blue-500"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
                  >
                    Join
                  </Link>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-3 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-blue-500"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

