
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  LockKeyhole,
  Hotel,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Compass,
  AlertCircle,
} from "lucide-react";

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  const passwordStrength = (() => {
    const password = form.password;
    if (!password) return 0;

    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
  })();

  const strengthLabel = [
    "",
    "Very weak",
    "Weak",
    "Fair",
    "Strong",
    "Excellent",
  ][passwordStrength];

  function update(event) {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    setError("");
  }

  function submit(event) {
    event.preventDefault();

    if (loading) return;

    setError("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const phone = form.phone.trim();

    if (!name || !email) {
      setError("Please enter your name and email address.");
      return;
    }

    if (form.password.length < 6) {
      setError("Your password must contain at least 6 characters.");
      return;
    }

    if (form.password !== form.confirm) {
      setError("Your passwords do not match. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const storedUsers = JSON.parse(
        localStorage.getItem("stayscape_users") || "[]"
      );

      if (!Array.isArray(storedUsers)) {
        throw new Error("Invalid account data.");
      }

      const exists = storedUsers.some(
        (user) =>
          String(user.email || "").trim().toLowerCase() === email
      );

      if (exists) {
        setError(
          "An account with this email already exists. Please log in."
        );
        setLoading(false);
        return;
      }

      const newUser = {
        name,
        email,
        phone,
        password: form.password,
      };

      // Save the registered account.
      localStorage.setItem(
        "stayscape_users",
        JSON.stringify([...storedUsers, newUser])
      );

      // Save the current logged-in user without exposing the password.
      localStorage.setItem(
        "stayscape_user",
        JSON.stringify({ name, email, phone })
      );

      // Navigate to the registered user's profile.
      navigate("/profile", { replace: true });
    } catch {
      setError(
        "Unable to create your account. Please check browser storage and try again."
      );
      setLoading(false);
    }
  }

  const inputClass =
    "w-full min-w-0 bg-transparent py-3.5 text-sm text-slate-800 outline-none placeholder:text-slate-400";

  const fieldClass =
    "mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 transition focus-within:border-teal-600 focus-within:bg-white focus-within:ring-4 focus-within:ring-teal-500/10";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f4f8f7] px-4 py-8 sm:px-6 sm:py-12 lg:py-14">
      {/* Decorative background */}
      <div className="pointer-events-none absolute -left-32 top-10 size-80 rounded-full bg-teal-300/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 size-96 rounded-full bg-cyan-300/20 blur-[110px]" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-72 -translate-x-1/2 rounded-full bg-emerald-200/20 blur-[100px]" />

      <div className="relative mx-auto grid w-full max-w-full overflow-hidden rounded-3xl border border-white bg-white shadow-[0_25px_100px_-35px_rgba(15,80,70,0.25)] lg:grid-cols-2 lg:rounded-[2rem]">
        {/* Left promotional panel */}
        <section className="relative hidden min-h-[780px] flex-col justify-between overflow-hidden bg-gradient-to-br from-[#092f2b] via-[#0c5a50] to-[#087e75] p-10 text-white lg:flex xl:p-14">
          <div className="pointer-events-none absolute -right-20 top-20 size-72 rounded-full border-[45px] border-white/[0.06]" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 size-80 rounded-full border-[50px] border-white/[0.06]" />

          <div className="relative">
            <Link to="/" className="inline-flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-white/15 shadow-lg backdrop-blur">
                <Hotel size={27} />
              </span>

              <span className="text-2xl font-black tracking-tight">
                Stay<span className="text-teal-200">Scape</span>
              </span>
            </Link>

            <div className="mt-20 max-w-md xl:mt-24">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-teal-100">
                <Sparkles size={14} />
                Your next chapter begins here
              </span>

              <h1 className="mt-7 text-5xl font-black leading-[1.12] tracking-tight xl:text-6xl">
                Travel more.
                <br />
                Discover more.
                <br />
                <span className="text-teal-200">
                  Be somewhere new.
                </span>
              </h1>

              <p className="mt-6 max-w-sm text-base leading-8 text-teal-50/80">
                Create your StayScape account and make planning your
                next unforgettable getaway easier.
              </p>
            </div>
          </div>

          <div className="relative space-y-5">
            <div className="flex items-start gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-200/15 text-teal-100">
                <Compass size={22} />
              </span>

              <div>
                <h3 className="font-bold">Your journey, organised</h3>
                <p className="mt-1 text-sm leading-6 text-teal-50/75">
                  Keep your profile and hotel booking details together.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-xs text-teal-100/70">
              <ShieldCheck size={16} />
              <span>A simpler way to plan your next stay.</span>
            </div>
          </div>
        </section>

        {/* Signup form */}
        <section className="px-5 py-8 sm:px-10 sm:py-12 lg:px-10 xl:px-14 xl:py-14">
          <div className="mx-auto max-w-md">
            {/* Mobile logo */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2.5 lg:hidden"
            >
              <span className="grid size-11 place-items-center rounded-xl bg-teal-800 text-white">
                <Hotel size={24} />
              </span>

              <span className="text-xl font-black tracking-tight text-slate-900">
                Stay<span className="text-teal-700">Scape</span>
              </span>
            </Link>

            <div className="mb-7">
              <div className="mb-5 grid size-14 place-items-center rounded-2xl bg-teal-50 text-teal-800">
                <UserRound size={28} />
              </div>

              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-teal-700">
                Get started for free
              </p>

              <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
                Create account
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Join StayScape and get ready for your next adventure.
              </p>
            </div>

            <form onSubmit={submit} className="space-y-4">
              {/* Full name */}
              <label className="block text-sm font-bold text-slate-700">
                Full name
                <span className={fieldClass}>
                  <UserRound size={18} className="shrink-0 text-slate-400" />
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={form.name}
                    onChange={update}
                    required
                    placeholder="Enter your full name"
                    className={inputClass}
                  />
                </span>
              </label>

              {/* Email */}
              <label className="block text-sm font-bold text-slate-700">
                Email address
                <span className={fieldClass}>
                  <Mail size={18} className="shrink-0 text-slate-400" />
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={update}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </span>
              </label>

              {/* Phone */}
              <label className="block text-sm font-bold text-slate-700">
                Phone number
                <span className={fieldClass}>
                  <Phone size={18} className="shrink-0 text-slate-400" />
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    value={form.phone}
                    onChange={update}
                    placeholder="Your phone number (optional)"
                    className={inputClass}
                  />
                </span>
              </label>

              {/* Password */}
              <label className="block text-sm font-bold text-slate-700">
                Password
                <span className={fieldClass}>
                  <LockKeyhole size={18} className="shrink-0 text-slate-400" />

                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.password}
                    onChange={update}
                    required
                    minLength={6}
                    placeholder="At least 6 characters"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:text-teal-800"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>

                {form.password && (
                  <span className="mt-2 block">
                    <span className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <span
                          key={level}
                          className={`h-1.5 flex-1 rounded-full ${
                            level <= passwordStrength
                              ? passwordStrength <= 2
                                ? "bg-rose-400"
                                : passwordStrength === 3
                                  ? "bg-amber-400"
                                  : "bg-emerald-500"
                              : "bg-slate-200"
                          }`}
                        />
                      ))}
                    </span>

                    <span className="mt-1 block text-xs text-slate-500">
                      Password strength:{" "}
                      <span className="font-bold">{strengthLabel}</span>
                    </span>
                  </span>
                )}
              </label>

              {/* Confirm password */}
              <label className="block text-sm font-bold text-slate-700">
                Confirm password
                <span className={fieldClass}>
                  <LockKeyhole size={18} className="shrink-0 text-slate-400" />

                  <input
                    name="confirm"
                    type={showConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    value={form.confirm}
                    onChange={update}
                    required
                    placeholder="Enter your password again"
                    className={inputClass}
                  />

                  <button
                    type="button"
                    onClick={() => setShowConfirm((value) => !value)}
                    aria-label={
                      showConfirm
                        ? "Hide confirmation"
                        : "Show confirmation"
                    }
                    className="shrink-0 rounded-lg p-1 text-slate-400 transition hover:text-teal-800"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </span>

                {form.confirm && (
                  <span
                    className={`mt-2 flex items-center gap-1.5 text-xs font-semibold ${
                      form.confirm === form.password
                        ? "text-emerald-700"
                        : "text-rose-600"
                    }`}
                  >
                    <CheckCircle2 size={14} />
                    {form.confirm === form.password
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </span>
                )}
              </label>

              {error && (
                <div
                  role="alert"
                  className="flex items-start gap-2 rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-sm text-rose-700"
                >
                  <AlertCircle size={18} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-800 to-emerald-700 px-5 py-4 font-extrabold text-white shadow-lg shadow-teal-900/15 transition hover:-translate-y-0.5 hover:from-teal-900 hover:to-emerald-800 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-500/20 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? "Creating account..." : "Create my account"}
                {!loading && (
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>

              <p className="text-center text-xs leading-5 text-slate-400">
                By creating an account, you agree to use this demo
                responsibly.
              </p>
            </form>

            <div className="my-7 flex items-center gap-4">
              <span className="h-px flex-1 bg-slate-200" />
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Already a member?
              </span>
              <span className="h-px flex-1 bg-slate-200" />
            </div>

            <Link
              to="/login"
              className="flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-900"
            >
              Log in to your account
              <ArrowRight size={17} />
            </Link>

            <p className="mt-6 flex items-start justify-center gap-2 text-center text-xs leading-5 text-slate-400">
              <ShieldCheck size={15} className="mt-0.5 shrink-0" />
              Demo authentication uses local browser storage, not a secure
              server. Avoid using real passwords.
            </p>
          </div>
        </section>
      </div>

      <p className="relative mt-7 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} StayScape · Discover · Stay · Enjoy
      </p>
    </main>
  );
}
