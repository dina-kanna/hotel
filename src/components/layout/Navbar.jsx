
import { useCallback, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Hotel,
  Menu,
  X,
  UserRound,
  LogOut,
  ChevronDown,
  MapPin,
  CalendarCheck,
  House,
  Sparkles,
  ArrowUpRight,
  Star,
  Compass,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const navItems = [
  { label: "Home", to: "/", icon: House, type: "page" },
  {
    label: "Featured Stays",
    to: "/#featured-stays",
    icon: Star,
    type: "section",
    sectionId: "featured-stays",
  },
  {
    label: "Destinations",
    to: "/#destinations",
    icon: MapPin,
    type: "section",
    sectionId: "destinations",
  },
  {
    label: "My Bookings",
    to: "/my-bookings",
    icon: CalendarCheck,
    type: "page",
    authOnly: true,
  },
];

export default function Navbar() {
  const { user, logout } = useAuth() || {};
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const isHome = location.pathname === "/";
  const activeSection = location.hash.replace("#", "");

  const visibleItems = navItems.filter(
    (item) => !item.authOnly || user
  );

  const initial = (user?.name || user?.email || "G")
    .trim()
    .charAt(0)
    .toUpperCase();

  const closeMenus = useCallback(() => {
    setMobileOpen(false);
    setAccountOpen(false);
  }, []);

  // Close menus after route or hash changes.
  useEffect(() => {
    closeMenus();
  }, [location.pathname, location.hash, closeMenus]);

  // Scroll to a section after its page has rendered.
  const scrollToSection = useCallback((sectionId) => {
    let attempts = 0;
    let animationFrame;

    const findSection = () => {
      const section = document.getElementById(sectionId);

      if (section) {
        const navbar = document.querySelector("[data-navbar-root]");
        const navbarHeight = navbar?.getBoundingClientRect().height || 90;

        const top =
          section.getBoundingClientRect().top +
          window.scrollY -
          navbarHeight -
          16;

        window.scrollTo({
          top: Math.max(0, top),
          behavior: "smooth",
        });

        return;
      }

      // Give React time to render the destination page.
      if (attempts < 30) {
        attempts += 1;
        animationFrame = window.requestAnimationFrame(findSection);
      }
    };

    animationFrame = window.requestAnimationFrame(findSection);

    return () => window.cancelAnimationFrame(animationFrame);
  }, []);

  // Handle direct links such as /#destinations and
  // links to sections clicked from another page.
  useEffect(() => {
    if (!isHome || !location.hash) return;

    let sectionId;

    try {
      sectionId = decodeURIComponent(location.hash.slice(1));
    } catch {
      sectionId = location.hash.slice(1);
    }

    return scrollToSection(sectionId);
  }, [
    isHome,
    location.pathname,
    location.hash,
    scrollToSection,
  ]);

  // Close menus with Escape or an outside click.
  useEffect(() => {
    if (!mobileOpen && !accountOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") closeMenus();
    };

    const handleOutsideClick = (event) => {
      if (!event.target.closest("[data-navbar-root]")) {
        closeMenus();
      }
    };

    window.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [mobileOpen, accountOpen, closeMenus]);

  function handleHomeClick(event) {
    closeMenus();

    if (isHome) {
      event.preventDefault();
      navigate("/", { replace: location.hash !== "" });
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleSectionClick(event, item) {
    closeMenus();

    if (isHome) {
      event.preventDefault();

      const hash = `#${item.sectionId}`;

      if (location.hash !== hash) {
        navigate(`/${hash}`, { replace: false });
      } else {
        scrollToSection(item.sectionId);
      }
    }
    // On other pages, the Link navigates to /#sectionId.
    // The section-scrolling effect runs after the homepage loads.
  }

  function handleLogout() {
    closeMenus();
    logout?.();
    navigate("/");
  }

  function isActive(item) {
    if (item.type === "section") {
      return isHome && activeSection === item.sectionId;
    }

    if (item.to === "/") {
      return isHome && !activeSection;
    }

    return (
      location.pathname === item.to ||
      location.pathname.startsWith(`${item.to}/`)
    );
  }

  function renderNavLink(item, mobile = false) {
    const Icon = item.icon;
    const active = isActive(item);

    return (
      <Link
        key={item.to}
        to={item.to}
        onClick={(event) => {
          if (item.type === "section") {
            handleSectionClick(event, item);
          } else if (item.to === "/") {
            handleHomeClick(event);
          } else {
            closeMenus();
          }
        }}
        aria-current={active ? "page" : undefined}
        className={[
          "group flex items-center gap-2.5 rounded-xl font-bold",
          "transition-all duration-200",
          mobile
            ? "min-h-12 w-full px-3 py-3 text-sm"
            : "whitespace-nowrap px-2.5 py-3 text-xs xl:px-3 xl:text-[13px]",
          active
            ? "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200"
            : "text-slate-600 hover:bg-slate-50 hover:text-emerald-800",
        ].join(" ")}
      >
        <span
          className={[
            "grid shrink-0 place-items-center rounded-lg transition",
            mobile ? "size-9" : "size-8",
            active
              ? "bg-white shadow-sm"
              : "bg-slate-100 group-hover:bg-emerald-100",
          ].join(" ")}
        >
          <Icon
            size={mobile ? 19 : 17}
            strokeWidth={2.2}
            className={
              active
                ? "text-emerald-700"
                : "text-slate-500 group-hover:text-emerald-700"
            }
          />
        </span>

        <span className="min-w-0 flex-1">{item.label}</span>

        {active && (
          <span className="size-2 shrink-0 rounded-full bg-emerald-500" />
        )}
      </Link>
    );
  }

  function renderAccountLinks(mobile = false) {
    const links = [
      {
        to: "/profile",
        label: "My Profile",
        icon: UserRound,
        color: "bg-violet-100 text-violet-700",
      },
      {
        to: "/my-bookings",
        label: "My Bookings",
        icon: CalendarCheck,
        color: "bg-emerald-100 text-emerald-700",
      },
    ];

    if (mobile) {
      links.push({
        to: "/hotels",
        label: "Explore Hotels",
        icon: Compass,
        color: "bg-amber-100 text-amber-700",
      });
    }

    return links.map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.to}
          to={item.to}
          onClick={closeMenus}
          className="flex min-h-12 items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-emerald-50 hover:text-emerald-800"
        >
          <span
            className={`grid size-9 shrink-0 place-items-center rounded-xl ${item.color}`}
          >
            <Icon size={18} />
          </span>

          <span className="flex-1">{item.label}</span>

          <ArrowUpRight size={16} className="text-slate-400" />
        </Link>
      );
    });
  }

  return (
    <header data-navbar-root className="sticky top-0 z-50 w-full">
      {/* Announcement bar */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-700 to-cyan-800 text-white">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-3 px-3 py-2 sm:px-6 lg:px-8">
          <p className="flex min-w-0 items-center gap-2 text-[10px] font-semibold sm:text-xs">
            <Sparkles
              size={14}
              className="shrink-0 text-amber-300"
            />
            <span className="truncate">
              Find your perfect place to stay
            </span>
          </p>

          <span className="flex shrink-0 items-center gap-1.5 text-[10px] font-bold sm:text-xs">
            <span className="size-2 animate-pulse rounded-full bg-lime-300" />
            <span className="hidden min-[360px]:inline">
              Travel starts here
            </span>
            <span className="min-[360px]:hidden">Explore</span>
          </span>
        </div>
      </div>

      {/* Main navbar */}
      <div className="border-b border-slate-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto flex min-h-[68px] max-w-screen-2xl items-center justify-between gap-2 px-3 sm:min-h-[76px] sm:gap-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/"
            onClick={handleHomeClick}
            aria-label="StayScape home"
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
          >
            <span className="relative grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-emerald-500 via-teal-600 to-cyan-700 text-white shadow-md shadow-emerald-900/20 transition duration-300 group-hover:scale-105 sm:size-12 sm:rounded-2xl">
              <Hotel size={23} className="sm:hidden" />
              <Hotel size={27} className="hidden sm:block" />

              <span className="absolute -right-1 -top-1 grid size-4 place-items-center rounded-full border-2 border-white bg-amber-400 text-amber-950 sm:size-5">
                <Sparkles size={9} />
              </span>
            </span>

            <span className="min-w-0">
              <span className="block text-[19px] font-black leading-none tracking-tight text-slate-900 sm:text-[23px]">
                Stay<span className="text-emerald-600">Scape</span>
              </span>

              <span className="mt-1.5 hidden text-[9px] font-bold uppercase tracking-[0.16em] text-slate-500 min-[360px]:block sm:text-[10px] sm:tracking-[0.2em]">
                Discover · Stay · Enjoy
              </span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-0.5 lg:flex xl:gap-1"
          >
            {visibleItems.map((item) => renderNavLink(item))}
          </nav>

          {/* Desktop account */}
          <div className="hidden shrink-0 items-center gap-2 lg:flex">
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setAccountOpen((open) => !open)}
                  aria-expanded={accountOpen}
                  aria-label="Open account menu"
                  className={[
                    "flex items-center gap-2 rounded-xl border p-1.5 pr-2.5 transition sm:rounded-2xl sm:pr-3",
                    accountOpen
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-slate-200 bg-white hover:border-emerald-300 hover:bg-emerald-50/50",
                  ].join(" ")}
                >
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-sm font-black text-white">
                    {initial}
                  </span>

                  <span className="hidden max-w-24 text-left xl:block">
                    <span className="block truncate text-sm font-extrabold text-slate-800">
                      {user.name || "My Account"}
                    </span>
                    <span className="mt-0.5 block text-[10px] text-slate-500">
                      Welcome back
                    </span>
                  </span>

                  <ChevronDown
                    size={15}
                    className={`text-slate-500 transition-transform ${
                      accountOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {accountOpen && (
                  <div className="absolute right-0 top-full mt-3 w-64 max-w-[calc(100vw-1.5rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-2xl shadow-slate-900/15">
                    <div className="rounded-xl bg-gradient-to-r from-emerald-800 to-teal-700 px-4 py-4 text-white">
                      <p className="truncate text-sm font-extrabold">
                        {user.name || "My Account"}
                      </p>
                      <p className="mt-1 truncate text-xs text-emerald-100">
                        {user.email || "Welcome back"}
                      </p>
                    </div>

                    <div className="mt-2">{renderAccountLinks()}</div>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold text-rose-600 transition hover:bg-rose-50"
                    >
                      <span className="grid size-9 place-items-center rounded-xl bg-rose-100">
                        <LogOut size={17} />
                      </span>
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={closeMenus}
                  className="rounded-xl px-3 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-100 hover:text-emerald-800"
                >
                  Log in
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMenus}
                  className="flex min-h-11 items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-3 py-2.5 text-xs font-extrabold text-white shadow-md shadow-emerald-900/15 transition hover:-translate-y-0.5 hover:from-emerald-700 hover:to-teal-700 xl:px-4 xl:text-sm"
                >
                  Get Started
                  <ArrowUpRight size={15} />
                </Link>
              </>
            )}
          </div>

          {/* Mobile / tablet menu button */}
          <button
            type="button"
            onClick={() => {
              setMobileOpen((open) => !open);
              setAccountOpen(false);
            }}
            aria-label={
              mobileOpen ? "Close navigation" : "Open navigation"
            }
            aria-expanded={mobileOpen}
            aria-controls="stayscape-mobile-menu"
            className="grid size-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-800 transition hover:border-emerald-300 hover:bg-emerald-50 focus:outline-none focus:ring-4 focus:ring-emerald-500/15 lg:hidden sm:size-11"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile / tablet menu */}
        <div
          id="stayscape-mobile-menu"
          className={[
            "overflow-y-auto border-t border-slate-200 bg-white px-3 shadow-xl sm:px-6 lg:px-8 lg:hidden",
            "transition-[max-height,opacity,padding] duration-300 ease-in-out",
            mobileOpen
              ? "max-h-[calc(100dvh-80px)] py-4 opacity-100"
              : "pointer-events-none max-h-0 py-0 opacity-0",
          ].join(" ")}
          aria-hidden={!mobileOpen}
        >
          <div className="mx-auto max-w-screen-2xl">
            {user && (
              <div className="mb-4 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-800 to-teal-700 p-4 text-white">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-lg font-black">
                  {initial}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-extrabold">
                    Welcome, {user.name || "Traveller"}
                  </span>
                  <span className="mt-1 block truncate text-xs text-emerald-100">
                    {user.email || "Manage your StayScape account"}
                  </span>
                </span>

                <Sparkles size={19} className="shrink-0 text-amber-300" />
              </div>
            )}

            <nav
              aria-label="Mobile navigation"
              className="grid gap-2 sm:grid-cols-2"
            >
              {visibleItems.map((item) => renderNavLink(item, true))}
            </nav>

            <div className="mt-4 border-t border-slate-100 pt-4">
              {user ? (
                <>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {renderAccountLinks(true)}
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="mt-3 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-rose-100 bg-rose-50 px-4 py-3 text-sm font-extrabold text-rose-700 transition hover:bg-rose-100"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <Link
                    to="/login"
                    onClick={closeMenus}
                    className="flex min-h-12 items-center justify-center rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-700 transition hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800"
                  >
                    Log In
                  </Link>

                  <Link
                    to="/signup"
                    onClick={closeMenus}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 px-4 py-3 text-sm font-extrabold text-white shadow-md shadow-emerald-900/10 transition hover:from-emerald-700 hover:to-teal-700"
                  >
                    <Sparkles size={16} />
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <Link
              to="/hotels"
              onClick={closeMenus}
              className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 transition hover:bg-emerald-50"
            >
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-white text-emerald-700 shadow-sm">
                <Compass size={20} />
              </span>

              <span className="min-w-0 flex-1">
                <span className="block text-sm font-extrabold text-slate-900">
                  Find your next stay
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  Explore hotels and destinations
                </span>
              </span>

              <ArrowUpRight size={18} className="shrink-0 text-emerald-700" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
