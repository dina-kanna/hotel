import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Hotel,
  ArrowUpRight,
  ArrowRight,
  Mail,
  Heart,
  Send,
  Sparkles,
  Compass,
  ShieldCheck,
  MoveUpRight,
  Globe2,
  CheckCircle2,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubscribe(event) {
    event.preventDefault();

    if (!email.trim()) {
      setMessage("Please enter your email address.");
      setSuccess(false);
      return;
    }

    // Connect your newsletter API or backend here.
    setMessage(
      "Thanks for your interest! Newsletter registration needs to be connected to your backend."
    );
    setSuccess(true);
    setEmail("");
  }

  const linkClass =
    "inline-flex items-center gap-2 text-sm text-slate-400 transition duration-200 hover:translate-x-1 hover:text-emerald-300";

  function scrollToTop(event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <footer
      id="footer"
      className="relative mt-20 overflow-hidden bg-[#071b1a] text-white"
    >
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-20 size-80 rounded-full bg-emerald-500/10 blur-[100px]" />
      <div className="pointer-events-none absolute -right-32 bottom-10 size-96 rounded-full bg-teal-500/10 blur-[120px]" />

      {/* Newsletter */}
      <section className="relative border-b border-white/10 px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto max-w-full">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-[#11665b] to-teal-800 p-7 shadow-2xl shadow-black/20 sm:p-10 lg:p-12">
            <div className="pointer-events-none absolute -right-10 -top-16 size-64 rounded-full border-[35px] border-white/[0.06]" />
            <div className="pointer-events-none absolute -bottom-24 right-36 size-72 rounded-full border-[45px] border-white/[0.05]" />

            <div className="relative grid gap-9 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-emerald-100 backdrop-blur">
                  <Sparkles size={14} />
                  The StayScape journal
                </div>

                <h2 className="mt-5 max-w-xl text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                  Your next great escape starts here.
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-7 text-emerald-50/80 sm:text-base">
                  Get destination inspiration, travel ideas and beautiful
                  places to stay delivered to your inbox.
                </p>
              </div>

              <div className="rounded-2xl border border-white/15 bg-black/10 p-4 backdrop-blur-md sm:p-5">
                <p className="mb-3 text-sm font-bold text-white">
                  A little inspiration, straight to you
                </p>

                <form
                  onSubmit={handleSubscribe}
                  className="flex flex-col gap-3 sm:flex-row"
                >
                  <label className="flex min-w-0 flex-1 items-center gap-3 rounded-xl bg-white px-4">
                    <Mail
                      size={19}
                      className="shrink-0 text-emerald-800"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setMessage("");
                        setSuccess(false);
                      }}
                      required
                      placeholder="Your email address"
                      aria-label="Newsletter email address"
                      className="w-full min-w-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </label>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#092c27] px-5 py-3.5 text-sm font-extrabold text-white transition hover:bg-[#061f1b] focus:outline-none focus:ring-4 focus:ring-white/30"
                  >
                    Join us
                    <Send size={15} />
                  </button>
                </form>

                {message && (
                  <p
                    role="status"
                    className={`mt-3 flex items-center gap-2 text-xs ${
                      success ? "text-emerald-100" : "text-amber-100"
                    }`}
                  >
                    {success && <CheckCircle2 size={15} />}
                    {message}
                  </p>
                )}

                <p className="mt-3 text-xs text-emerald-50/70">
                  No spam. Just a little wanderlust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main footer */}
      <div className="relative mx-auto max-w-full px-5 py-14 sm:px-8 sm:py-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link
              to="/"
              aria-label="StayScape home"
              className="group inline-flex items-center gap-2.5"
            >
              <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white shadow-lg shadow-emerald-900/20 transition duration-300 group-hover:-rotate-3 group-hover:scale-105">
                <Hotel size={26} strokeWidth={2.2} />

                <span className="absolute -right-1 -top-1 grid size-5 place-items-center rounded-full border-2 border-[#071b1a] bg-amber-400 text-amber-950">
                  <Sparkles size={10} />
                </span>
              </span>

              <span>
                <span className="block text-[22px] font-black leading-none tracking-tight text-white">
                  Stay<span className="text-emerald-300">Scape</span>
                </span>
                <span className="mt-1.5 block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  Discover · Stay · Enjoy
                </span>
              </span>
            </Link>

            <p className="mt-6 max-w-sm text-sm leading-7 text-slate-400">
              Not just a place to stay. A place to slow down, discover
              something new and make memories that stay with you.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm text-slate-400">
              <Globe2 size={17} className="text-emerald-300" />
              <span>Discover the world, your way.</span>
            </div>

            {/* Social links */}
            <div className="mt-7 flex gap-3">
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-pink-300/40 hover:bg-pink-300/10 hover:text-pink-200"
              >
                {/* Inline Instagram SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-blue-300/10 hover:text-blue-200"
              >
                {/* Inline Facebook SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 21v-8.2h2.8l.4-3.2h-3.2V7.5c0-.9.3-1.6 1.6-1.6H17V3.1c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.3H7.5v3.2h2.8V21h3.2Z" />
                </svg>
              </a>

              <a
                href="mailto:support@stayscape.example"
                aria-label="Email StayScape"
                className="grid size-11 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition duration-300 hover:-translate-y-1 hover:border-emerald-300/40 hover:bg-emerald-300/10 hover:text-emerald-200"
              >
                <Mail size={19} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-extrabold">
              <Compass size={17} className="text-emerald-300" />
              Explore
            </h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/hotels" className={linkClass}>
                  All hotels <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/hotels?location=Goa" className={linkClass}>
                  Beach getaways <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/hotels?location=Manali" className={linkClass}>
                  Mountain escapes <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/hotels?location=Jaipur" className={linkClass}>
                  Heritage stays <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/hotels?location=Mumbai" className={linkClass}>
                  City adventures <ArrowUpRight size={14} />
              </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-extrabold">Your account</h3>

            <ul className="mt-6 space-y-4">
              <li>
                <Link to="/profile" className={linkClass}>
                  My profile <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/my-bookings" className={linkClass}>
                  My bookings <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/login" className={linkClass}>
                  Log in <ArrowUpRight size={14} />
                </Link>
              </li>
              <li>
                <Link to="/signup" className={linkClass}>
                  Create an account <ArrowUpRight size={14} />
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-sm font-extrabold">Need a hand?</h3>

            <p className="mt-6 text-sm leading-7 text-slate-400">
              Questions about your next getaway? Reach out to our support
              contact.
            </p>

            <a
              href="mailto:support@stayscape.example"
              className="mt-4 inline-flex items-center gap-2 break-all text-sm font-semibold text-emerald-300 transition hover:text-white"
            >
              <Mail size={17} className="shrink-0" />
              support@stayscape.example
            </a>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <div className="flex items-center gap-2 text-sm font-bold text-slate-200">
                <ShieldCheck size={18} className="text-emerald-300" />
                Travel with confidence
              </div>
              <p className="mt-2 text-xs leading-6 text-slate-400">
                Explore hotel options and review your booking details before
                confirming your plans.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 flex flex-col justify-between gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:p-6">
          <div>
            <h3 className="text-lg font-extrabold">
              Ready for somewhere new?
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              Your next favourite stay is waiting to be discovered.
            </p>
          </div>

          <Link
            to="/hotels"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-emerald-400 px-5 py-3 font-extrabold text-[#07201c] transition hover:bg-emerald-300"
          >
            Explore stays
            <ArrowRight size={17} />
          </Link>
        </div>

        {/* Copyright */}
        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} StayScape. All rights reserved.</p>

          <p className="flex items-center gap-1.5">
            Made for travellers with
            <Heart
              size={13}
              className="fill-emerald-300 text-emerald-300"
            />
          </p>

          <a
            href="#top"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 font-semibold transition hover:text-emerald-300"
          >
            Back to top
            <MoveUpRight size={14} />
          </a>
        </div>
      </div>
    </footer>
  );
}