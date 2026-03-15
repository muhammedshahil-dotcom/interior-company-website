import { Link } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Categories", href: "/#categories" },
  { label: "Contact", href: "/#contact" },
];

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-4 sm:px-6 lg:px-8 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm space-y-3">
          <p className="text-xs uppercase tracking-[0.25em] text-blue-200">Elora Interiors</p>
          <p className="text-lg font-semibold">Modern interiors that feel calm, intentional, and beautifully lived in.</p>
          <div className="flex items-center gap-3">
            {[
              { Icon: FaInstagram, href: "https://www.instagram.com/elysian_casa", label: "Instagram" },
              { Icon: FaWhatsapp, href: "https://wa.me/916282555875", label: "WhatsApp" },
              { Icon: HiOutlineMail, href: "mailto:contact.elorainteriors@gmail.com", label: "Email" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white transition hover:-translate-y-0.5 hover:bg-blue-500/90"
                aria-label={label}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 sm:gap-12">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Navigate</p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-gray-200">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="transition hover:text-blue-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-200">Contact</p>
            <div className="mt-4 space-y-2 text-sm text-gray-200">
              <p>contact.elorainteriors@gmail.com</p>
              <p>+91 62825 555875</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start gap-2 px-4 sm:px-6 lg:px-8 py-4 text-xs text-gray-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Elora Interiors. All rights reserved.</p>
          <p className="text-gray-500">Made with intention & detail.</p>
        </div>
      </div>
    </footer>
  );
}



