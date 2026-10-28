
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Hotel,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sparkles,
  CheckCircle2,
  MapPin,
  FlaskConical,
} from "lucide-react";

const DEMO_EMAIL = "demo@stayscape.com";
const DEMO_PASSWORD = "Demo123";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  function fillDemoAccount() {
    setEmail(DEMO_EMAIL);
    setPassword(DEMO_PASSWORD);
    setError("");
  }

  function submit(event) {
    event.preventDefault();

    if (loading) return;

    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please enter your email address and password.");
      return;
    }

    setLoading(true);

    try {
      const storedUsers = JSON.parse(
        localStorage.getItem("stayscape_users") || "[]"
      );

      const users = Array.isArray(storedUsers) ? storedUsers : [];

      let found = users.find(
        (user) =>
          user.email?.trim().toLowerCase() === normalizedEmail &&
          user.password === password
      );

      // Create or repair the demo account when necessary.
      if (
        !found &&
        normalizedEmail === DEMO_EMAIL &&
        password === DEMO_PASSWORD
      ) {
        found = {
          name: "Demo Traveller",
          email: DEMO_EMAIL,
          phone: "",
          password: DEMO_PASSWORD,
        };

        const demoExists = users.some(
          (user) =>
            user.email?.trim().toLowerCase() === DEMO_EMAIL
        );

        const updatedUsers = demoExists
          ? users.map((user) =>
              user.email?.trim().toLowerCase() === DEMO_EMAIL
                ? found
                : user
            )
          : [...users, found];

        localStorage.setItem(
          "stayscape_users",
          JSON.stringify(updatedUsers)
        );
      }

      if (!found) {
        setError(
          "Invalid email or password. Please try again or create an account."
        );
        return;
      }

      const currentUser = {
        name: found.name || "Traveller",
        email: found.email,
        phone: found.phone || "",
      };

      localStorage.setItem(
        "stayscape_user",
        JSON.stringify(currentUser)
      );

      if (rememberMe) {
        localStorage.setItem("stayscape_remember", "true");
      } else {
        localStorage.removeItem("stayscape_remember");
      }

      // Preserve protected-page redirects and booking information.
      const destination = location.state?.from || "/profile";
      const bookingDraft = location.state?.bookingDraft;

      navigate(destination, {
        replace: true,
        ...(bookingDraft ? { state: { bookingDraft } } : {}),
      });
    } catch {
      setError(
        "Unable to sign in using browser storage. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative isolate min-h-[calc(100vh-80px)] overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-8 sm:px-6 sm:py-12 lg:py-16">
      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 size-80 rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-96 rounded-full bg-teal-200/40 blur-3xl" />

      <div className="mx-auto grid w-full max-w-full items-center gap-8 lg:grid-cols-2 lg:gap-14 xl:gap-20">
        {/* Left introduction */}
        <section className="hidden lg:block">
          <Link
            to="/"
            className="inline-flex items-center gap-3"
            aria-label="StayScape home"
          >
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-xl">
              <Hotel size={29} />
            </span>

            <span>
              <span className="block text-2xl font-black tracking-tight text-slate-900">
                Stay<span className="text-emerald-600">Scape</span>
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Discover · Stay · Enjoy
              </span>
            </span>
          </Link>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-emerald-100 bg-white/80 px-4 py-2 text-sm font-bold text-emerald-800 shadow-sm xl:mt-14">
            <Sparkles size={16} />
            Your next adventure awaits
          </div>

          <h1 className="mt-6 max-w-xl text-4xl font-black leading-[1.12] tracking-tight text-slate-900 xl:text-6xl">
            Every great journey begins with a{" "}
            <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent">
              beautiful stay.
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-8 text-slate-600">
            Welcome back to StayScape. Find your favourite places,
            manage your reservations, and discover somewhere wonderful.
          </p>

          <div className="mt-8 space-y-4">
            {[
              "Your trips, all in one place",
              "Discover somewhere new",
              "A smoother booking experience",
            ].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                  <CheckCircle2 size={16} />
                </span>
                <p className="font-bold text-slate-800">{item}</p>
              </div>
            ))}
          </div>

          <div className="mt-9 flex max-w-md items-center gap-4 rounded-2xl border border-white bg-white/80 p-4 shadow-lg backdrop-blur">
            <div className="grid size-14 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">
              <Compass size={28} />
            </div>

            <div>
              <p className="font-extrabold text-slate-900">
                Your next chapter starts here
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Log in and keep exploring.
              </p>
            </div>

            <MapPin
              className="ml-auto shrink-0 text-emerald-600"
              size={20}
            />
          </div>
        </section>

        {/* Login form */}
        <section className="mx-auto w-full max-w-md min-w-0">
          {/* Mobile and tablet logo */}
          <Link
            to="/"
            className="mb-6 flex items-center justify-center gap-3 lg:hidden"
            aria-label="StayScape home"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 text-white shadow-lg sm:size-12 sm:rounded-2xl">
              <Hotel size={25} />
            </span>

            <span className="text-2xl font-black tracking-tight text-slate-900">
              Stay<span className="text-emerald-600">Scape</span>
            </span>
          </Link>

          <div className="overflow-hidden rounded-3xl border border-white bg-white/95 shadow-2xl shadow-slate-900/10 backdrop-blur-xl sm:rounded-[2rem]">
            {/* Form header */}
            <div className="relative overflow-hidden bg-gradient-to-br from-[#073c35] via-emerald-800 to-teal-700 px-6 py-7 text-white sm:px-9 sm:py-8">
              <div className="pointer-events-none absolute -right-10 -top-14 size-44 rounded-full border-[24px] border-white/[0.06]" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold text-emerald-50">
                  <Sparkles size={14} />
                  Welcome back
                </span>

                <h2 className="mt-5 text-3xl font-black tracking-tight sm:text-4xl">
                  Sign in
                </h2>

                <p className="mt-2 text-sm leading-6 text-emerald-50/80">
                  Pick up where your next adventure begins.
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              {/* Demo account */}
              <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 font-extrabold text-emerald-900">
                  <FlaskConical size={18} />
                  Demo account
                </div>

                <p className="mt-2 break-all text-sm text-emerald-800">
                  Email: <strong>{DEMO_EMAIL}</strong>
                </p>
                <p className="mt-1 text-sm text-emerald-800">
                  Password: <strong>{DEMO_PASSWORD}</strong>
                </p>

                <button
                  type="button"
                  onClick={fillDemoAccount}
                  className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-emerald-300 bg-white px-4 py-2.5 text-sm font-extrabold text-emerald-800 transition hover:bg-emerald-100 focus:outline-none focus:ring-4 focus:ring-emerald-500/15"
                >
                  <CheckCircle2 size={16} />
                  Use demo account
                </button>
              </div>

              <form onSubmit={submit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="login-email"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Email address
                  </label>

                  <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <Mail
                      size={19}
                      className="shrink-0 text-slate-400"
                    />

                    <input
                      id="login-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError("");
                      }}
                      placeholder="you@example.com"
                      required
                      className="w-full min-w-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="login-password"
                    className="mb-2 block text-sm font-bold text-slate-700"
                  >
                    Password
                  </label>

                  <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/70 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                    <LockKeyhole
                      size={19}
                      className="shrink-0 text-slate-400"
                    />

                    <input
                      id="login-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(event) => {
                        setPassword(event.target.value);
                        setError("");
                      }}
                      placeholder="Enter your password"
                      required
                      className="w-full min-w-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((value) => !value)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="shrink-0 rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) =>
                      setRememberMe(event.target.checked)
                    }
                    className="size-4 rounded accent-emerald-600"
                  />
                  Remember me
                </label>

                {/* Error message */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-rose-100 bg-rose-50 p-3.5 text-sm leading-6 text-rose-700"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 px-5 py-3.5 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {loading ? "Signing in..." : "Sign in to StayScape"}

                  {!loading && (
                    <ArrowRight
                      size={18}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  )}
                </button>
              </form>

              <div className="my-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="shrink-0 text-[10px] font-medium text-slate-400 sm:text-xs">
                  NEW TO STAYSCAPE?
                </span>
                <div className="h-px flex-1 bg-slate-100" />
              </div>

              <Link
                to="/signup"
                className="flex min-h-12 w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
              >
                Create your account
              </Link>

              <div className="mt-6 flex items-start gap-2 rounded-xl bg-slate-50 p-3.5">
                <ShieldCheck
                  size={17}
                  className="mt-0.5 shrink-0 text-emerald-600"
                />
                <p className="text-xs leading-5 text-slate-500">
                  This demo uses browser storage for authentication.
                  Do not use a real password or sensitive personal
                  information.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-5 text-center text-xs text-slate-400">
            By continuing, you agree to use StayScape responsibly.
          </p>
        </section>
      </div>
    </main>
  );
}
