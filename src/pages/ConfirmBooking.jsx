
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  MapPin,
  CalendarDays,
  BedDouble,
  Users,
  CreditCard,
  Printer,
} from "lucide-react";
import { money } from "../utils/bookingUtils";

const paymentLabels = {
  upi: "UPI",
  card: "Credit / Debit Card",
  netbanking: "Net Banking",
  wallet: "Wallet",
  hotel: "Pay at Hotel",
};

export default function ConfirmBooking() {
  const { state } = useLocation();
  const booking = state?.bookingDraft;

  if (!booking) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-50 px-5">
        <div className="text-center">
          <h1 className="text-3xl font-black">Booking details unavailable</h1>
          <p className="mt-3 text-slate-500">
            Please open this page by completing a booking.
          </p>
          <Link
            to="/hotels"
            className="mt-6 inline-flex rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white"
          >
            Browse hotels
          </Link>
        </div>
      </main>
    );
  }

  const fullAddress = [
    booking.address,
    booking.city,
    booking.state,
    booking.postalCode,
    booking.country,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="bg-emerald-800 px-6 py-10 text-center text-white sm:px-10">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-white text-emerald-800">
            <CheckCircle2 size={38} />
          </div>
          <h1 className="mt-5 text-3xl font-black sm:text-4xl">
            Booking Confirmed!
          </h1>
          <p className="mt-3 text-emerald-50">
            Thank you, {booking.guestName}. Your reservation has been recorded.
          </p>
          <div className="mx-auto mt-6 inline-block rounded-xl bg-white/10 px-5 py-3">
            <p className="text-xs uppercase tracking-widest text-emerald-100">
              Booking ID
            </p>
            <p className="mt-1 text-xl font-black">{booking.bookingId}</p>
          </div>
        </div>

        <div className="p-5 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row">
            {booking.image ? (
              <img
                src={booking.image}
                alt={booking.hotelName}
                className="h-44 w-full rounded-2xl object-cover sm:w-56"
              />
            ) : (
              <div className="grid h-44 w-full place-items-center rounded-2xl bg-emerald-50 text-emerald-800 sm:w-56">
                <BedDouble size={42} />
              </div>
            )}

            <div>
              <p className="text-sm font-bold text-emerald-800">YOUR HOTEL</p>
              <h2 className="mt-2 text-2xl font-black">{booking.hotelName}</h2>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <MapPin size={16} />
                {booking.location}
              </p>
              <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                <CheckCircle2 size={16} />
                {booking.status}
              </p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <Info
              icon={<CalendarDays size={20} />}
              label="Check-in"
              value={booking.checkIn}
            />
            <Info
              icon={<CalendarDays size={20} />}
              label="Check-out"
              value={booking.checkOut}
            />
            <Info
              icon={<BedDouble size={20} />}
              label="Room"
              value={booking.roomName}
            />
            <Info
              icon={<Users size={20} />}
              label="Guests / nights"
              value={`${booking.guests} guest(s) · ${booking.nights} night(s)`}
            />
          </div>

          <section className="mt-8 border-t border-slate-200 pt-7">
            <h2 className="text-xl font-black">Guest and address details</h2>
            <div className="mt-4 grid gap-5 sm:grid-cols-2">
              <Info label="Guest name" value={booking.guestName} />
              <Info label="Email" value={booking.email} />
              <Info label="Phone" value={booking.phone} />
              <Info label="Address" value={fullAddress} />
            </div>
          </section>

          <section className="mt-8 border-t border-slate-200 pt-7">
            <h2 className="text-xl font-black">Payment details</h2>
            <div className="mt-4 flex gap-3 rounded-2xl border border-slate-200 p-4">
              <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                <CreditCard size={22} />
              </div>
              <div>
                <p className="font-extrabold">
                  {paymentLabels[booking.paymentMethod] || booking.paymentMethod}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {booking.paymentStatus}
                </p>
              </div>
            </div>

            <div className="mt-5 space-y-3 text-sm">
              <PriceRow label="Room subtotal" value={money(booking.subtotal)} />
              <PriceRow label="Service fee" value={money(booking.fee)} />
              <div className="flex justify-between border-t border-slate-200 pt-4">
                <span className="font-extrabold">Total amount</span>
                <span className="text-xl font-black text-emerald-800">
                  {money(booking.total)}
                </span>
              </div>
            </div>
          </section>

          <p className="mt-7 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
            <strong>Payment status:</strong> This is a booking confirmation,
            not a payment receipt. No online payment has been processed.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-bold hover:bg-slate-50"
            >
              <Printer size={18} />
              Print confirmation
            </button>
            <Link
              to="/hotels"
              className="inline-flex flex-1 items-center justify-center rounded-xl bg-emerald-800 px-5 py-3 text-center font-bold text-white hover:bg-emerald-900"
            >
              Browse more hotels
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      {icon && <div className="mb-2 text-emerald-800">{icon}</div>}
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 break-words font-bold">{value || "—"}</p>
    </div>
  );
}

function PriceRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="font-bold">{value}</span>
    </div>
  );
}
