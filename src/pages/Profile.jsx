
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Mail,
  Phone,
  Save,
  CalendarDays,
  ArrowRight,
  LogOut,
  ShieldCheck,
  Hotel,
  CheckCircle2,
  Clock3,
  MapPin,
  Settings,
  Compass,
  Sparkles,
  CircleUserRound,
  ChevronRight,
  Wallet,
} from "lucide-react";
import { useBookings } from "../context/BookingContext";

export default function Profile() {
  const navigate = useNavigate();
  const { bookings = [] } = useBookings();

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("stayscape_user") || "null"
      );
    } catch {
      return null;
    }
  });

  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <main className="relative grid min-h-[75vh] place-items-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-emerald-50 px-4 py-12 sm:px-6 sm:py-16">
        <div className="pointer-events-none absolute -left-20 top-10 size-72 rounded-full bg-emerald-200/40 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 size-72 rounded-full bg-teal-200/40 blur-3xl" />

        <section className="relative w-full max-w-md rounded-3xl border border-white bg-white/90 p-6 text-center shadow-2xl shadow-slate-900/10 backdrop-blur sm:rounded-[2rem] sm:p-10">
          <div className="mx-auto grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-800 text-white shadow-lg shadow-emerald-900/20">
            <CircleUserRound size={38} />
          </div>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800">
            <Sparkles size={14} />
            Your StayScape account
          </span>

          <h1 className="mt-4 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
            Your next adventure awaits
          </h1>

          <p className="mt-3 text-sm leading-7 text-slate-500">
            Sign in to manage your profile, review your reservations,
            and discover your next favourite destination.
          </p>

          <Link
            to="/login"
            state={{ from: "/profile" }}
            className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 px-5 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-teal-800"
          >
            Sign in to StayScape
            <ArrowRight size={18} />
          </Link>

          <p className="mt-5 text-sm text-slate-500">
            New traveller?{" "}
            <Link
              to="/signup"
              className="font-extrabold text-emerald-800 hover:text-emerald-600"
            >
              Create an account
            </Link>
          </p>
        </section>
      </main>
    );
  }

  const activeBookings = bookings.filter(
    (booking) =>
      String(booking.status || "").toLowerCase() !== "cancelled"
  ).length;

  const cancelledBookings = bookings.filter(
    (booking) =>
      String(booking.status || "").toLowerCase() === "cancelled"
  ).length;

  const firstName =
    (user.name || "Traveller").trim().split(/\s+/)[0] ||
    "Traveller";

  const initial = firstName.charAt(0).toUpperCase();

  function updateField(event) {
    const { name, value } = event.target;

    setUser((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSaved(false);
    setError("");
  }

  function saveProfile(event) {
    event.preventDefault();
    setSaved(false);
    setError("");

    const name = String(user.name || "").trim();
    const email = String(user.email || "").trim().toLowerCase();
    const phone = String(user.phone || "").trim();

    if (!name || !email) {
      setError("Please enter your full name and email address.");
      return;
    }

    try {
      const storedUsers = JSON.parse(
        localStorage.getItem("stayscape_users") || "[]"
      );

      if (!Array.isArray(storedUsers)) {
        throw new Error("Invalid account data.");
      }

      const oldEmail = String(user.email || "")
        .trim()
        .toLowerCase();

      // Prevent changing the profile to another account's email.
      const emailTaken = storedUsers.some(
        (item) =>
          String(item.email || "").trim().toLowerCase() === email &&
          email !== oldEmail
      );

      if (emailTaken) {
        setError("This email address is already used by another account.");
        return;
      }

      const nextUser = {
        ...user,
        name,
        email,
        phone,
      };

      const accountExists = storedUsers.some(
        (item) =>
          String(item.email || "").trim().toLowerCase() === oldEmail
      );

      const updatedUsers = accountExists
        ? storedUsers.map((item) =>
            String(item.email || "").trim().toLowerCase() === oldEmail
              ? { ...item, name, email, phone }
              : item
          )
        : [...storedUsers, { ...nextUser }];

      localStorage.setItem(
        "stayscape_user",
        JSON.stringify(nextUser)
      );

      localStorage.setItem(
        "stayscape_users",
        JSON.stringify(updatedUsers)
      );

      setUser(nextUser);
      setSaved(true);
    } catch {
      setError("Unable to save your profile. Please try again.");
    }
  }

  function logout() {
    localStorage.removeItem("stayscape_user");
    localStorage.removeItem("stayscape_remember");
    setUser(null);
    navigate("/", { replace: true });
  }

  const statCards = [
    {
      label: "Active bookings",
      value: activeBookings,
      note: "Your upcoming stays",
      icon: CalendarDays,
      iconStyle: "bg-emerald-50 text-emerald-700",
    },
    {
      label: "Cancelled bookings",
      value: cancelledBookings,
      note: "Cancelled reservations",
      icon: Clock3,
      iconStyle: "bg-amber-50 text-amber-700",
    },
  ];

  return (
    <main className="min-h-screen bg-[#f5f8f7] pb-12 sm:pb-16">
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#062f2b] via-[#105b50] to-[#087e70] text-white">
        <div className="pointer-events-none absolute -right-20 -top-32 size-96 rounded-full border-[55px] border-white/[0.05]" />
        <div className="pointer-events-none absolute -bottom-40 left-1/3 size-96 rounded-full bg-emerald-300/10 blur-3xl" />
        <div className="pointer-events-none absolute right-1/4 top-12 size-40 rounded-full bg-teal-300/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-full px-4 pb-12 pt-8 sm:px-6 sm:pb-16 sm:pt-12 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-7">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-emerald-100 backdrop-blur sm:tracking-[0.2em]">
                <Sparkles size={14} />
                Your personal dashboard
              </div>

              <h1 className="mt-5 break-words text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                Hello, {firstName}!
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-emerald-50/80 sm:text-base">
                Your journey, your reservations, your next great
                escape. Everything you need is right here.
              </p>
            </div>

            <button
              type="button"
              onClick={logout}
              className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-white/20 bg-white/5 px-4 py-3 text-sm font-bold text-white transition hover:border-white/40 hover:bg-white/10 sm:self-auto"
            >
              <LogOut size={17} />
              Sign out
            </button>
          </div>

          {/* Profile identity */}
          <div className="mt-8 flex min-w-0 flex-col gap-4 rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-md sm:mt-9 sm:flex-row sm:items-center sm:p-6">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/20 bg-gradient-to-br from-emerald-300 to-teal-500 text-2xl font-black text-[#073c35] shadow-lg sm:size-16">
              {initial}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="break-words text-lg font-extrabold sm:text-xl">
                  {user.name || "Guest traveller"}
                </h2>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-300/15 px-2.5 py-1 text-xs font-bold text-emerald-100">
                  <ShieldCheck size={13} />
                  Traveller
                </span>
              </div>

              <p className="mt-1 break-all text-sm text-emerald-50/75">
                {user.email}
              </p>

              <p className="mt-2 flex items-center gap-1.5 text-xs text-emerald-100/70">
                <MapPin size={13} />
                Your StayScape account
              </p>
            </div>

            <Link
              to="/my-bookings"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50"
            >
              View bookings
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Statistics */}
        <section className="relative mt-5 grid gap-4 sm:grid-cols-2 lg:-mt-5 lg:grid-cols-3">
          {statCards.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-sm font-bold text-slate-500">
                    {stat.label}
                  </p>

                  <span
                    className={`grid size-11 shrink-0 place-items-center rounded-xl ${stat.iconStyle}`}
                  >
                    <Icon size={21} />
                  </span>
                </div>

                <p className="mt-4 text-4xl font-black tracking-tight text-slate-900">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  {stat.note}
                </p>
              </div>
            );
          })}

          <Link
            to="/hotels"
            className="group min-w-0 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-md sm:col-span-2 sm:p-6 lg:col-span-1"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold text-slate-500">
                Time for a getaway?
              </p>

              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet-700">
                <Hotel size={21} />
              </span>
            </div>

            <p className="mt-4 text-xl font-black text-slate-900">
              Find your next stay
            </p>

            <p className="mt-2 inline-flex items-center gap-1.5 text-sm font-bold text-emerald-800">
              Explore hotels
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </p>
          </Link>
        </section>

        {/* Main content */}
        <section className="mt-6 grid min-w-0 items-start gap-6 lg:mt-8 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_350px]">
          {/* Edit profile */}
          <div className="min-w-0 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-8">
            <div className="flex items-start gap-4 border-b border-slate-100 pb-6">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-800">
                <Settings size={22} />
              </div>

              <div className="min-w-0">
                <h2 className="text-xl font-black text-slate-900">
                  Personal information
                </h2>

                <p className="mt-1 text-sm leading-6 text-slate-500">
                  Keep your contact details up to date for your trips.
                </p>
              </div>
            </div>

            <form onSubmit={saveProfile} className="mt-6 space-y-5">
              <div>
                <label
                  htmlFor="profile-name"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Full name
                </label>

                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                  <UserRound size={19} className="shrink-0 text-slate-400" />

                  <input
                    id="profile-name"
                    name="name"
                    value={user.name || ""}
                    onChange={updateField}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    required
                    className="w-full min-w-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-email"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Email address
                </label>

                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                  <Mail size={19} className="shrink-0 text-slate-400" />

                  <input
                    id="profile-email"
                    name="email"
                    type="email"
                    value={user.email || ""}
                    onChange={updateField}
                    autoComplete="email"
                    placeholder="Enter your email address"
                    required
                    className="w-full min-w-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="profile-phone"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Phone number
                  <span className="ml-2 font-normal text-slate-400">
                    Optional
                  </span>
                </label>

                <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50/60 px-4 transition focus-within:border-emerald-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-emerald-500/10">
                  <Phone size={19} className="shrink-0 text-slate-400" />

                  <input
                    id="profile-phone"
                    name="phone"
                    type="tel"
                    value={user.phone || ""}
                    onChange={updateField}
                    autoComplete="tel"
                    placeholder="Enter your phone number"
                    className="w-full min-w-0 bg-transparent py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium leading-6 text-rose-700"
                >
                  {error}
                </div>
              )}

              {saved && (
                <div
                  role="status"
                  className="flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"
                >
                  <CheckCircle2 size={18} />
                  Your profile has been updated successfully.
                </div>
              )}

              <div className="flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-slate-400">
                  Your changes are saved in this browser.
                </p>

                <button
                  type="submit"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-700 to-teal-700 px-6 py-3.5 text-sm font-extrabold text-white shadow-md shadow-emerald-900/10 transition hover:-translate-y-0.5 hover:from-emerald-800 hover:to-teal-800 focus:outline-none focus:ring-4 focus:ring-emerald-500/20"
                >
                  <Save size={17} />
                  Save changes
                </button>
              </div>
            </form>
          </div>

          {/* Sidebar */}
          <aside className="min-w-0 space-y-5">
            <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-3">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-teal-50 text-teal-800">
                  <Compass size={22} />
                </div>

                <div>
                  <h2 className="font-black text-slate-900">
                    Quick access
                  </h2>
                  <p className="mt-0.5 text-xs text-slate-500">
                    Your travel shortcuts
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <Link
                  to="/my-bookings"
                  className="group flex min-w-0 items-center gap-3 rounded-xl p-3 transition hover:bg-emerald-50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-50 text-emerald-800 group-hover:bg-white">
                    <CalendarDays size={19} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-slate-800">
                      My bookings
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      View your reservations
                    </span>
                  </span>

                  <ChevronRight size={17} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                </Link>

                <Link
                  to="/hotels"
                  className="group flex min-w-0 items-center gap-3 rounded-xl p-3 transition hover:bg-emerald-50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-50 text-emerald-800 group-hover:bg-white">
                    <Hotel size={19} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-slate-800">
                      Explore hotels
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      Find your next destination
                    </span>
                  </span>

                  <ChevronRight size={17} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                </Link>

                <Link
                  to="/"
                  className="group flex min-w-0 items-center gap-3 rounded-xl p-3 transition hover:bg-emerald-50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-slate-50 text-emerald-800 group-hover:bg-white">
                    <ArrowRight size={19} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-slate-800">
                      Home page
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      Return to StayScape
                    </span>
                  </span>

                  <ChevronRight size={17} className="shrink-0 text-slate-400 transition group-hover:translate-x-0.5 group-hover:text-emerald-700" />
                </Link>
              </div>
            </div>

            {/* Security card */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#073c35] to-teal-800 p-6 text-white">
              <div className="pointer-events-none absolute -right-10 -top-10 size-36 rounded-full border-[24px] border-white/[0.06]" />

              <div className="relative">
                <div className="grid size-12 place-items-center rounded-2xl bg-white/10 text-emerald-200">
                  <ShieldCheck size={25} />
                </div>

                <h3 className="mt-4 text-lg font-black">
                  Your account, your way
                </h3>

                <p className="mt-2 text-sm leading-6 text-emerald-50/75">
                  Review your personal details and manage your trips from
                  your StayScape dashboard.
                </p>

                <Link
                  to="/my-bookings"
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-emerald-200"
                >
                  Manage reservations
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            {/* Discover card */}
            <Link
              to="/hotels"
              className="group flex min-w-0 items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-emerald-200 hover:shadow-md"
            >
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-700">
                <Wallet size={22} />
              </div>

              <div className="min-w-0 flex-1">
                <p className="font-extrabold text-slate-900">
                  Plan your next escape
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Discover hotels and compare available stays.
                </p>
              </div>

              <ArrowRight
                size={18}
                className="shrink-0 text-slate-400 transition group-hover:translate-x-1 group-hover:text-emerald-700"
              />
            </Link>
          </aside>
        </section>

        {/* Bottom note */}
        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-slate-200/70 bg-white/70 p-4 text-xs leading-5 text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="flex items-center gap-2">
            <ShieldCheck size={16} className="shrink-0 text-emerald-700" />
            StayScape account information
          </p>

          <p>
            Demo mode: account data is stored in local browser storage,
            not a secure server.
          </p>
        </div>
      </div>
    </main>
  );
}
