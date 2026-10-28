import { Link } from "react-router-dom";
import { MapPin, Star, ArrowUpRight } from "lucide-react";

export default function HotelCard({ hotel }) {
  const image =
    hotel.image ||
    hotel.images?.[0] ||
    "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80";

  return (
    <article className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <Link to={`/hotels/${hotel.id}`} className="relative block h-56 overflow-hidden">
        <img
          src={image}
          alt={hotel.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-bold shadow">
          <Star size={15} className="fill-amber-400 text-amber-400" />
          {Number(hotel.rating || 0).toFixed(1)}
        </span>
      </Link>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-extrabold text-slate-900">
              {hotel.name}
            </h3>

            <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-500">
              <MapPin size={15} className="shrink-0 text-emerald-700" />
              {hotel.location}
            </p>
          </div>

          <ArrowUpRight size={19} className="shrink-0 text-emerald-800" />
        </div>

        <p className="mt-3 text-sm text-slate-500">
          {hotel.reviews ?? 0} guest reviews
        </p>

        <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs text-slate-500">Starting from</p>
            <p className="mt-1 text-xl font-black text-emerald-800">
              ₹{Number(hotel.price || 0).toLocaleString("en-IN")}
              <span className="text-xs font-medium text-slate-500"> / night</span>
            </p>
          </div>

          <Link
            to={`/hotels/${hotel.id}`}
            className="rounded-full bg-emerald-800 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-emerald-900"
          >
            View stay
          </Link>
        </div>
      </div>
    </article>
  );
}