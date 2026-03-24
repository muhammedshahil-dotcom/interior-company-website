import { useState } from "react";
import { HiOutlinePhone, HiOutlineMail, HiOutlineArrowRight } from "react-icons/hi";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { API_BASE } from "../config/api";
import { useAuth } from "../context/AuthContext";

const contactInfo = [
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 62825 55875",
    href: "https://wa.me/916282555875?text=Hello%20I%20am%20interested%20in%20your%20interior%20design%20services",
  },
  {
    icon: HiOutlinePhone,
    label: "Phone",
    value: "+91 62825 55875",
    href: "tel:+916282555875",
  },
  {
    icon: HiOutlineMail,
    label: "Email",
    value: "contact.elorainteriors@gmail.com",
    href: "mailto:contact.elorainteriors@gmail.com",
  },
  {
    icon: FaInstagram,
    label: "Instagram",
    value: "@elora_interiors__",
    href: "https://www.instagram.com/elora_interiors__",
  },
];

export default function ContactSection() {
  const { isAuthenticated, authFetch } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setStatus({ type: "error", message: "Please log in to send a message." });
      return;
    }
    setSubmitting(true);
    setStatus({ type: "", message: "" });
    try {
      await authFetch(`${API_BASE}/contact`, {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setStatus({
        type: "success",
        message: "Message sent successfully. We will contact you soon.",
      });
      setFormData({ name: "", email: "", phone: "", projectType: "", message: "" });
    } catch (err) {
      setStatus({ type: "error", message: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative w-full overflow-hidden bg-gray-900 py-16 sm:py-20 text-white">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900 to-gray-800" />
      <div className="absolute -left-20 top-10 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 sm:px-6 lg:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div data-aos="fade-right" className="space-y-6">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">
            Let's talk about your space
          </p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">Tell us about your project</h2>
          <p className="text-base text-gray-200/80">
            Share a few details and we’ll schedule a consultation to understand your goals, budget, and timeline.
          </p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm" htmlFor="contact-name">
                Full name
                <input
                  required
                  type="text"
                  id="contact-name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm" htmlFor="contact-email">
                Email
                <input
                  required
                  type="email"
                  id="contact-email"
                  name="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={(e) => setFormData((f) => ({ ...f, email: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm" htmlFor="contact-phone">
                Phone (optional)
                <input
                  type="tel"
                  id="contact-phone"
                  name="phone"
                  placeholder="Enter your phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData((f) => ({ ...f, phone: e.target.value }))}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
                />
              </label>
            </div>
            <label className="flex flex-col gap-2 text-sm" htmlFor="contact-project-type">
              Project type
              <input
                type="text"
                id="contact-project-type"
                name="projectType"
                placeholder="Select project type (Bedroom, Kitchen, Living Room, Bridal Room)"
                value={formData.projectType}
                onChange={(e) => setFormData((f) => ({ ...f, projectType: e.target.value }))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </label>
            <label className="flex flex-col gap-2 text-sm" htmlFor="contact-message">
              Tell us more
              <textarea
                required
                rows={4}
                id="contact-message"
                name="message"
                placeholder="Tell us about your project requirements"
                value={formData.message}
                onChange={(e) => setFormData((f) => ({ ...f, message: e.target.value }))}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-gray-400 focus:border-blue-400 focus:outline-none"
              />
            </label>
            {status.message && (
              <p className={`text-sm ${status.type === "error" ? "text-red-400" : "text-green-200"}`}>
                {status.message}
              </p>
            )}
            <button
              type="submit"
              disabled={submitting || !isAuthenticated}
              className="inline-flex items-center gap-2 rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/30 transition hover:-translate-y-0.5 hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {submitting ? "Sending..." : isAuthenticated ? "Send message" : "Login to send"}
              <HiOutlineArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>

        <div
          data-aos="fade-left"
          className="flex flex-col gap-6 sm:gap-7 rounded-3xl border border-white/10 bg-white/5 p-5 sm:p-6 backdrop-blur"
        >
          <div className="space-y-5 sm:space-y-6">
            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-blue-200">Direct contact</p>
            <div className="grid gap-4">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-white/5 bg-white/5 px-4 py-3 transition hover:-translate-y-0.5 hover:border-blue-400 hover:bg-white/10"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-200">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-gray-200/80">{label}</p>
                    <p className="text-sm font-semibold text-white">{value}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-gray-100">
            <p className="font-semibold text-white">Elora Interiors • Interior Design Studio</p>
            <p className="mt-1 text-gray-200/80">
              Elora Interiors creates modern and elegant living spaces through remote consultations and personalized on-site design services.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

