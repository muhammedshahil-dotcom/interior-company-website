import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

export default function Hero() {
  return (
    <section className="relative isolate flex items-center overflow-hidden bg-gray-900 min-h-[90vh]">
      <img
        src="/assets/hero.jpg"
        alt="Modern living room designed by Elora Interiors"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/25" />
      <div className="absolute -left-40 -bottom-32 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:px-8 pt-28 pb-16 sm:pb-20 md:grid md:grid-cols-2 md:items-center md:gap-14 md:pt-32 md:pb-24">
        <div data-aos="fade-up" data-aos-delay="50" className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-blue-200 ring-1 ring-white/15 backdrop-blur">
            Modern • Minimal • Lux
          </span>

          <h1 className="text-3xl leading-[1.05] font-semibold text-white sm:text-4xl md:text-5xl lg:text-6xl">
            We craft spaces that feel{" "}
            <span className="text-blue-400">effortlessly luxurious.</span>
          </h1>

          <p className="max-w-xl text-base sm:text-lg text-gray-100/85">
            Elora Interiors delivers thoughtful interior design solutions for homes, offices, and personalized living spaces.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              to="/projects"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200/30 transition hover:-translate-y-0.5 hover:bg-blue-700 w-full sm:w-auto"
            >
              View Projects
              <HiOutlineArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-blue-400 hover:text-blue-200 w-full sm:w-auto"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}


