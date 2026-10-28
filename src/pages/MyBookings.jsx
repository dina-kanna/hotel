import { Link, useLocation } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  ReceiptText,
  CalendarX2,
  ArrowRight,
  Hotel,
  CheckCircle2,
} from "lucide-react";
import { useBookings } from "../context/BookingContext";
import { money, dateLabel } from "../utils/bookingUtils";

export default function MyBookings() {
  const { bookings, cancelBooking } = useBookings();
  const location = useLocation();

  return (
    <div className="enter">
      <section className="bg-[#eaf7f3] py-12">
        <div className="shell">
          <p className="text-xs font-extrabold uppercase tracking-widest text-brand-600">
            Your travel plans
          </p>
          <h1 className="mt-2 font-display text-3xl font-extrabold sm:text-4xl">
            My bookings
          </h1>
          <p className="mt-3 text-slate-600">
            All your upcoming stays, together in one place.
          </p>

          {location.state?.message && (
            <p
              role="status"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-bold text-brand-700"
            >
              <CheckCircle2 size={18} />
              {location.state.message}
            </p>
          )}
        </div>
      </section>

      <section className="shell py-10">
        {bookings.length ? (
          <div className="grid gap-5">
            {bookings.map((booking) => (
              <article
                key={booking.id}
                className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-sm"
              >
                <div className="grid md:grid-cols-[240px_1fr]">
                  <img
                    src={booking.image}
                    alt={booking.hotelName}
                    className="h-52 w-full object-cover md:h-full"
                  />

                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col justify-between gap-3 sm:flex-row">
                      <div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-extrabold ${
                            booking.status === "Cancelled"
                              ? "bg-rose-50 text-rose-600"
                              : "bg-emerald-50 text-emerald-700"
                          }`}
                        >
                          {booking.status}
                        </span>
                        <h2 className="mt-3 font-display text-xl font-extrabold">
                          {booking.hotelName}
                        </h2>
                        <p className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                          <MapPin size={14} />
                          {booking.location}
                        </p>
                      </div>

                      <div className="sm:text-right">
                        <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Booking reference
                        </p>
                        <p className="mt-1 font-extrabold text-brand-700">
                          {booking.id}
                        </p>
                        <p className="mt-2 text-lg font-extrabold">
                          {money(booking.total)}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 grid gap-4 border-t pt-5 sm:grid-cols-3">
                      <div className="flex gap-2.5">
                        <CalendarDays
                          size={17}
                          className="mt-0.5 text-brand-600"
                        />
                        <div>
                          <p className="text-xs text-slate-400">
                            Check-in / Check-out
                          </p>
                          <p className="mt-1 text-sm font-bold">
                            {dateLabel(booking.checkIn)} –{" "}
                            {dateLabel(booking.checkOut)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {booking.nights} nights
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <Users size={17} className="mt-0.5 text-brand-600" />
                        <div>
                          <p className="text-xs text-slate-400">
                            Guests & room
                          </p>
                          <p className="mt-1 text-sm font-bold">
                            {booking.guests} guests
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {booking.roomName}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <ReceiptText
                          size={17}
                          className="mt-0.5 text-brand-600"
                        />
                        <div>
                          <p className="text-xs text-slate-400">
                            Total incl. fee
                          </p>
                          <p className="mt-1 text-sm font-bold">
                            {money(booking.total)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            Created{" "}
                            {dateLabel(booking.createdAt?.slice(0, 10))}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-wrap gap-3 border-t pt-4">
                      {booking.status !== "Cancelled" && (
                        <button
                          onClick={() => {
                            if (window.confirm("Cancel this booking?")) {
                              cancelBooking(booking.id);
                            }
                          }}
                          className="inline-flex items-center gap-2 rounded-full border border-rose-200 px-4 py-2.5 text-sm font-bold text-rose-600 hover:bg-rose-50"
                        >
                          <CalendarX2 size={16} />
                          Cancel booking
                        </button>
                      )}

                      <Link
                        to={`/hotels/${booking.hotelId}`}
                        className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-4 py-2.5 text-sm font-bold text-brand-700"
                      >
                        View stay <ArrowRight size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
            <Hotel className="mx-auto text-brand-600" size={32} />
            <h2 className="mt-5 font-display text-2xl font-extrabold">
              No bookings just yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Explore available stays and your confirmed bookings will appear
              here.
            </p>
            <Link
              to="/hotels"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-3 text-sm font-bold text-white"
            >
              Explore stays <ArrowRight size={16} />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}