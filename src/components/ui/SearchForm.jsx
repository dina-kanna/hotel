import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, CalendarDays, Users, Search } from "lucide-react";
import { today, addDays } from "../../utils/bookingUtils";

export default function SearchForm() {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(today());
  const [checkOut, setCheckOut] = useState(addDays(today(), 2));
  const [guests, setGuests] = useState("2");

  function submit(e) {
    e.preventDefault();
    const params = new URLSearchParams({
      location,
      checkIn,
      checkOut,
      guests,
    });
    navigate(`/hotels?${params.toString()}`);
  }

  return (
    <form
      onSubmit={submit}
      className="grid gap-3 rounded-3xl border border-slate-100 bg-white p-4 shadow-soft md:grid-cols-[1.3fr_1fr_1fr_.7fr_auto] md:items-end md:p-5"
    >
      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
        Destination
        <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-3">
          <MapPin size={18} className="shrink-0 text-brand-600" />
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Where to?"
            className="w-full min-w-0 py-3 text-sm font-medium normal-case outline-none"
          />
        </span>
      </label>

      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
        Check-in
        <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-3">
          <CalendarDays size={18} className="shrink-0 text-brand-600" />
          <input
            type="date"
            min={today()}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (checkOut <= e.target.value) {
                setCheckOut(addDays(e.target.value, 1));
              }
            }}
            className="w-full min-w-0 py-3 text-sm outline-none"
          />
        </span>
      </label>

      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
        Check-out
        <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-3">
          <CalendarDays size={18} className="shrink-0 text-brand-600" />
          <input
            type="date"
            min={addDays(checkIn, 1)}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="w-full min-w-0 py-3 text-sm outline-none"
          />
        </span>
      </label>

      <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-500">
        Guests
        <span className="mt-2 flex items-center gap-2 rounded-xl border border-slate-200 px-3">
          <Users size={18} className="shrink-0 text-brand-600" />
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="w-full bg-transparent py-3 text-sm outline-none"
          >
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </span>
      </label>

      <button className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3.5 font-bold text-white transition hover:bg-brand-700">
        <Search size={18} />
        Search
      </button>
    </form>
  );
}