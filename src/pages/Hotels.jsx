import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { hotels } from "../data/hotels";
import HotelCard from "../components/ui/HotelCard";

export default function Hotels() {
  const [params, setParams] = useSearchParams();

  const [location, setLocation] = useState(params.get("location") || "");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(20000);
  const [minRating, setMinRating] = useState("0");
  const [sort, setSort] = useState("recommended");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = Number(params.get("guests") || 2);
  const rooms = Number(params.get("rooms") || 1);

  const filteredHotels = useMemo(() => {
    const normalizedLocation = location.trim().toLowerCase();

    const result = hotels.filter((hotel) => {
      const matchesLocation =
        !normalizedLocation ||
        `${hotel.name} ${hotel.location}`
          .toLowerCase()
          .includes(normalizedLocation);

      const price = Number(hotel.price || 0);
      const rating = Number(hotel.rating || 0);

      return (
        matchesLocation &&
        price >= minPrice &&
        price <= maxPrice &&
        rating >= Number(minRating)
      );
    });

    if (sort === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sort === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [location, minPrice, maxPrice, minRating, sort]);

  function handleSearch(event) {
    event.preventDefault();

    const nextParams = new URLSearchParams(params);

    if (location.trim()) {
      nextParams.set("location", location.trim());
    } else {
      nextParams.delete("location");
    }

    setParams(nextParams);
    setMobileFiltersOpen(false);
  }

  function clearFilters() {
    setLocation("");
    setMinPrice(0);
    setMaxPrice(20000);
    setMinRating("0");
    setSort("recommended");
    setParams({});
  }

  const filters = (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-extrabold">Filters</h2>
        <button
          type="button"
          onClick={clearFilters}
          className="text-sm font-bold text-emerald-800 hover:text-emerald-600"
        >
          Reset all
        </button>
      </div>

      <form onSubmit={handleSearch}>
        <label htmlFor="hotel-location" className="mb-2 block text-sm font-bold">
          Destination or hotel
        </label>
        <div className="flex items-center gap-2 rounded-xl border border-slate-200 px-3">
          <MapPin size={17} className="shrink-0 text-emerald-800" />
          <input
            id="hotel-location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            placeholder="Search destination"
            className="h-11 min-w-0 w-full bg-transparent text-sm outline-none"
          />
        </div>
        <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-4 py-3 text-sm font-bold text-white hover:bg-emerald-900">
          <Search size={16} />
          Search destination
        </button>
      </form>

      <div>
        <label className="block text-sm font-bold">Minimum price per night</label>
        <p className="mt-2 text-sm text-slate-600">
          ₹{minPrice.toLocaleString("en-IN")}
        </p>
        <input
          type="range"
          min="0"
          max={20000}
          step="500"
          value={minPrice}
          onChange={(event) =>
            setMinPrice(Math.min(Number(event.target.value), maxPrice))
          }
          className="mt-2 w-full accent-emerald-800"
        />
      </div>

      <div>
        <label className="block text-sm font-bold">Maximum price per night</label>
        <p className="mt-2 text-sm text-slate-600">
          ₹{maxPrice.toLocaleString("en-IN")}
        </p>
        <input
          type="range"
          min="0"
          max="20000"
          step="500"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(Math.max(Number(event.target.value), minPrice))
          }
          className="mt-2 w-full accent-emerald-800"
        />
      </div>

      <div>
        <label htmlFor="rating-filter" className="block text-sm font-bold">
          Minimum guest rating
        </label>
        <select
          id="rating-filter"
          value={minRating}
          onChange={(event) => setMinRating(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-700"
        >
          <option value="0">All ratings</option>
          <option value="3">3+ stars</option>
          <option value="4">4+ stars</option>
          <option value="4.5">4.5+ stars</option>
        </select>
      </div>

      <div>
        <label htmlFor="hotel-sort" className="block text-sm font-bold">
          Sort results
        </label>
        <select
          id="hotel-sort"
          value={sort}
          onChange={(event) => setSort(event.target.value)}
          className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-700"
        >
          <option value="recommended">Recommended</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="rating">Highest rated</option>
        </select>
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-[#f7f9f7] text-slate-900">
      <section className="bg-[#102d2b] px-5 py-10 text-white sm:px-8 sm:py-14">
        <div className="mx-auto max-w-full">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-emerald-200 hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>

          <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-300">
            Find your next stay
          </p>
          <h1 className="mt-3 text-3xl font-black sm:text-5xl">
            Explore hotels and resorts
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Compare hotel options, explore guest ratings, and choose a stay
            that suits your trip.
          </p>

          {(checkIn || checkOut) && (
            <p className="mt-4 text-sm text-emerald-100">
              {checkIn || "Check-in not selected"} →{" "}
              {checkOut || "Check-out not selected"} · {guests} guests ·{" "}
              {rooms} {rooms === 1 ? "room" : "rooms"}
            </p>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-12">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-black sm:text-2xl">
              {filteredHotels.length}{" "}
              {filteredHotels.length === 1 ? "stay" : "stays"} found
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {location ? `Showing results for "${location}"` : "Browse all destinations"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold lg:hidden"
          >
            <SlidersHorizontal size={17} />
            Filters
          </button>
        </div>

        <div className="grid items-start gap-7 lg:grid-cols-[270px_minmax(0,1fr)]">
          <aside className="sticky top-24 hidden rounded-2xl border border-slate-200 bg-white p-5 lg:block">
            {filters}
          </aside>

          <div>
            {filteredHotels.length ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
                <Search size={36} className="mx-auto text-slate-400" />
                <h3 className="mt-4 text-xl font-extrabold">No stays found</h3>
                <p className="mt-2 text-sm text-slate-500">
                  Try another destination or relax your filters.
                </p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-5 rounded-full bg-emerald-800 px-5 py-3 font-bold text-white hover:bg-emerald-900"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/50"
          />
          <aside className="absolute inset-y-0 right-0 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-black">Filter stays</h2>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                aria-label="Close"
                className="rounded-full p-2 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>
            {filters}
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(false)}
              className="mt-8 w-full rounded-xl bg-emerald-800 px-4 py-3 font-bold text-white"
            >
              Show {filteredHotels.length} results
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}