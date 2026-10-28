
import { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  X,
  Hotel as HotelIcon,
  MapPin,
  Star,
  ArrowUpDown,
  ArrowRight,
  Sparkles,
  RotateCcw,
  Check,
  Wallet,
  LayoutGrid,
  Compass,
} from "lucide-react";

import { hotels } from "../data/hotels";
import HotelCard from "../components/ui/HotelCard";
import SearchForm from "../components/ui/SearchForm";

export default function HotelListing() {
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const initialLocation = params.get("location") || "";

  const [search, setSearch] = useState(initialLocation);
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [mobileSearch, setMobileSearch] = useState("");

  // Keep destination search in sync with URL query parameters.
  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const destination = query.get("location") || "";

    setSearch(destination);
    setMobileSearch(destination);
  }, [location.search]);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    let list = hotels.filter((hotel) => {
      const searchableText = [
        hotel.name,
        hotel.city,
        hotel.location,
        hotel.category,
        hotel.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query || searchableText.includes(query);

      const price = Number(hotel.price) || 0;
      const rating = Number(hotel.rating) || 0;

      return (
        matchesSearch &&
        price <= maxPrice &&
        rating >= Number(minRating)
      );
    });

    list = [...list];

    if (sort === "low") {
      list.sort(
        (a, b) => (Number(a.price) || 0) - (Number(b.price) || 0)
      );
    } else if (sort === "high") {
      list.sort(
        (a, b) => (Number(b.price) || 0) - (Number(a.price) || 0)
      );
    } else if (sort === "rating") {
      list.sort(
        (a, b) => (Number(b.rating) || 0) - (Number(a.rating) || 0)
      );
    }

    return list;
  }, [search, maxPrice, minRating, sort]);

  const hasActiveFilters =
    search.trim() !== "" ||
    maxPrice !== 50000 ||
    minRating !== "0";

  function resetFilters() {
    setSearch("");
    setMobileSearch("");
    setMaxPrice(50000);
    setMinRating("0");
    setSort("recommended");
  }

  function applyDestinationSearch(event) {
    event.preventDefault();
    setSearch(mobileSearch.trim());
  }

  const popularDestinations = [
    "Chennai",
    "Goa",
    "Mumbai",
    "Bangalore",
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero section */}
      <section className="relative isolate overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-900 to-cyan-950 text-white">
        <div className="pointer-events-none absolute -right-24 -top-24 size-80 rounded-full bg-emerald-400/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-cyan-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-screen-2xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold text-emerald-100 backdrop-blur">
                <Sparkles size={15} className="text-amber-300" />
                YOUR NEXT GETAWAY STARTS HERE
              </div>

              <h1 className="mt-5 max-w-2xl text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                Find a stay that
                <span className="block text-emerald-300">
                  feels like yours.
                </span>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-emerald-50/80 sm:text-base">
                Discover beautiful hotels, compare prices, and find
                the right place for your next memorable trip.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-xs font-semibold text-emerald-50/90 sm:text-sm">
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-300" />
                  Handpicked stays
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-300" />
                  Easy booking
                </span>
                <span className="flex items-center gap-2">
                  <Check size={16} className="text-emerald-300" />
                  Compare your options
                </span>
              </div>
            </div>

            {/* Search panel */}
            <div className="rounded-3xl border border-white/15 bg-white p-4 text-slate-900 shadow-2xl shadow-black/20 sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
                  <Search size={21} />
                </div>
                <div>
                  <h2 className="font-extrabold">Where to next?</h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Find a destination you will love.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-100 bg-slate-50 p-2 sm:p-3">
                <SearchForm />
              </div>

              <div className="mt-4">
                <p className="mb-2 text-xs font-bold text-slate-500">
                  POPULAR DESTINATIONS
                </p>

                <div className="flex flex-wrap gap-2">
                  {popularDestinations.map((destination) => (
                    <button
                      key={destination}
                      type="button"
                      onClick={() => {
                        setSearch(destination);
                        setMobileSearch(destination);
                      }}
                      className={[
                        "rounded-full border px-3 py-2 text-xs font-bold transition",
                        search.toLowerCase() === destination.toLowerCase()
                          ? "border-emerald-600 bg-emerald-600 text-white"
                          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800",
                      ].join(" ")}
                    >
                      {destination}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Listing content */}
      <section className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-6 flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-400">
          <Link to="/" className="transition hover:text-emerald-700">
            Home
          </Link>
          <span>/</span>
          <span className="text-slate-700">Explore stays</span>
        </div>

        {/* Heading and controls */}
        <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-sm font-bold text-emerald-700">
              <Compass size={17} />
              YOUR NEXT ADVENTURE
            </div>

            <h2 className="mt-2 text-3xl font-black tracking-tight text-slate-900 sm:text-4xl">
              {search.trim()
                ? `Stays in ${search.trim()}`
                : "Explore all stays"}
            </h2>

            <p className="mt-2 text-sm text-slate-500 sm:text-base">
              Find the right stay for your travel style and budget.
            </p>

            <p className="mt-3 text-sm font-semibold text-slate-600">
              <span className="text-emerald-700">{results.length}</span>{" "}
              {results.length === 1 ? "stay" : "stays"} found
            </p>
          </div>

          <div className="flex flex-col gap-3 min-[420px]:flex-row">
            <button
              type="button"
              onClick={() => setShowFilters((value) => !value)}
              aria-expanded={showFilters}
              className={[
                "flex min-h-12 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-bold transition",
                showFilters
                  ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300",
              ].join(" ")}
            >
              <SlidersHorizontal size={17} />
              Filters
              {hasActiveFilters && (
                <span className="grid size-5 place-items-center rounded-full bg-emerald-600 text-[10px] text-white">
                  !
                </span>
              )}
            </button>

            <label className="flex min-h-12 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5">
              <ArrowUpDown size={16} className="shrink-0 text-slate-400" />
              <span className="shrink-0 text-xs text-slate-500">Sort by</span>
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm font-bold text-slate-800 outline-none"
              >
                <option value="recommended">Recommended</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="rating">Top rated</option>
              </select>
            </label>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  Refine your search
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Adjust the filters to find your ideal stay.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowFilters(false)}
                aria-label="Close filters"
                className="grid size-9 shrink-0 place-items-center rounded-xl text-slate-500 transition hover:bg-slate-100"
              >
                <X size={19} />
              </button>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {/* Destination */}
              <form onSubmit={applyDestinationSearch}>
                <label
                  htmlFor="listing-destination"
                  className="flex items-center gap-2 text-sm font-bold text-slate-800"
                >
                  <MapPin size={17} className="text-emerald-700" />
                  Destination or hotel
                </label>

                <div className="mt-3 flex rounded-xl border border-slate-200 p-1 focus-within:border-emerald-500">
                  <input
                    id="listing-destination"
                    value={mobileSearch}
                    onChange={(event) => setMobileSearch(event.target.value)}
                    placeholder="Enter a city or hotel"
                    className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm outline-none"
                  />
                  <button
                    type="submit"
                    aria-label="Search destination"
                    className="grid size-10 shrink-0 place-items-center rounded-lg bg-emerald-600 text-white transition hover:bg-emerald-700"
                  >
                    <Search size={17} />
                  </button>
                </div>
              </form>

              {/* Price */}
              <div>
                <div className="flex items-center justify-between gap-3">
                  <label
                    htmlFor="listing-max-price"
                    className="flex items-center gap-2 text-sm font-bold text-slate-800"
                  >
                    <Wallet size={17} className="text-emerald-700" />
                    Maximum price
                  </label>
                  <span className="text-sm font-extrabold text-emerald-700">
                    ₹{maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <input
                  id="listing-max-price"
                  type="range"
                  min="4000"
                  max="50000"
                  step="1000"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(Number(event.target.value))
                  }
                  className="mt-5 block w-full cursor-pointer accent-emerald-700"
                />

                <div className="mt-2 flex justify-between text-xs text-slate-400">
                  <span>₹4,000</span>
                  <span>₹50,000+</span>
                </div>
              </div>

              {/* Rating */}
              <div>
                <label
                  htmlFor="listing-rating"
                  className="flex items-center gap-2 text-sm font-bold text-slate-800"
                >
                  <Star size={17} className="text-amber-500" />
                  Minimum guest rating
                </label>

                <select
                  id="listing-rating"
                  value={minRating}
                  onChange={(event) => setMinRating(event.target.value)}
                  className="mt-3 min-h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-500"
                >
                  <option value="0">All ratings</option>
                  <option value="4">4.0 and above</option>
                  <option value="4.5">4.5 and above</option>
                  <option value="4.7">4.7 and above</option>
                  <option value="4.9">4.9 and above</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <p className="text-sm text-slate-500">
                Showing{" "}
                <b className="text-slate-800">{results.length}</b>{" "}
                matching stays
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-bold text-slate-600 transition hover:bg-slate-100 hover:text-emerald-800"
              >
                <RotateCcw size={15} />
                Reset all filters
              </button>
            </div>
          </div>
        )}

        {/* Active filter chips */}
        {hasActiveFilters && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-xs font-bold text-slate-500">
              ACTIVE FILTERS
            </span>

            {search.trim() && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setMobileSearch("");
                }}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800"
              >
                <MapPin size={13} />
                {search}
                <X size={13} />
              </button>
            )}

            {maxPrice !== 50000 && (
              <button
                type="button"
                onClick={() => setMaxPrice(50000)}
                className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-800"
              >
                Up to ₹{maxPrice.toLocaleString("en-IN")}
                <X size={13} />
              </button>
            )}

            {minRating !== "0" && (
              <button
                type="button"
                onClick={() => setMinRating("0")}
                className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-2 text-xs font-bold text-amber-800"
              >
                <Star size={13} />
                {minRating}+ rating
                <X size={13} />
              </button>
            )}

            <button
              type="button"
              onClick={resetFilters}
              className="px-2 py-2 text-xs font-bold text-slate-500 underline underline-offset-4 hover:text-rose-600"
            >
              Clear all
            </button>
          </div>
        )}

        {/* Results */}
        {results.length > 0 ? (
          <>
            <div className="mt-7 flex items-center justify-between gap-3">
              <h3 className="flex items-center gap-2 text-sm font-extrabold text-slate-800">
                <LayoutGrid size={17} className="text-emerald-700" />
                Available stays
              </h3>

              <span className="text-xs text-slate-400">
                {sort === "low"
                  ? "Lowest price first"
                  : sort === "high"
                    ? "Highest price first"
                    : sort === "rating"
                      ? "Highest rated first"
                      : "Recommended for you"}
              </span>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
              {results.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8 overflow-hidden rounded-3xl border border-slate-200 bg-white px-5 py-14 text-center sm:px-10">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-700">
              <HotelIcon size={30} />
            </div>

            <h3 className="mt-5 text-xl font-extrabold text-slate-900 sm:text-2xl">
              No stays found this time
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try another destination, increase your budget, or change
              the rating to discover more places to stay.
            </p>

            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-extrabold text-white transition hover:bg-emerald-700"
            >
              <RotateCcw size={16} />
              Reset filters
            </button>

            <div className="mt-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-emerald-700"
              >
                Back to home
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        )}

        {/* Bottom call to action */}
        {results.length > 0 && (
          <div className="mt-12 overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900 via-teal-800 to-cyan-900 p-6 text-white sm:p-8 lg:p-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-200">
                  <Sparkles size={15} />
                  Your next journey
                </div>
                <h3 className="mt-3 text-2xl font-black sm:text-3xl">
                  The perfect stay is out there.
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-emerald-50/80">
                  Keep exploring until you find the place that feels
                  right for your next adventure.
                </p>
              </div>

              <Link
                to="/"
                className="inline-flex min-h-12 shrink-0 items-center justify-center gap-2 self-start rounded-xl bg-white px-5 py-3 text-sm font-extrabold text-emerald-900 transition hover:bg-emerald-50 sm:self-center"
              >
                Explore home
                <ArrowRight size={17} />
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
