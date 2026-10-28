
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  MapPin,
  CalendarDays,
  Users,
  BedDouble,
  CreditCard,
  Printer,
  Home,
} from "lucide-react";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

const paymentLabels = {
  upi: "UPI",
  card: "Credit / Debit Card",
  hotel: "Pay at the hotel",
};

export default function BookingConfirmation() {
  const { bookingId } = useParams();

  let booking = null;

  try {
    const saved = localStorage.getItem(`stayscapeBooking_${bookingId}`);
    booking = saved ? JSON.parse(saved) : null;
  } catch {
    booking = null;
  }

  if (!booking) {
    return (
      <main className="grid min-h-[75vh] place-items-center bg-[#f7f9f7] px-5">
        <div className="max-w-md text-center">
          <div className="mx-auto grid size-16 place-items-center rounded-full bg-amber-100 text-amber-700">
            <CalendarDays size={30} />
          </div>
          <h1 className="mt-5 text-3xl font-black">
            Booking not found
          </h1>
          <p className="mt-3 leading-7 text-slate-600">
            This booking is not available in this browser. It may have been
            cleared or created in another browser.
          </p>
          <Link
            to="/hotels"
            className="mt-6 inline-flex rounded-xl bg-emerald-800 px-6 py-3 font-bold text-white hover:bg-emerald-900"
          >
            Browse hotels
          </Link>
        </div>
      </main>
    );
  }

  const guest = booking.guest || {};
  const address = [
    guest.address,
    guest.city,
    guest.state,
    guest.postalCode,
    guest.country,
  ].filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f7f9f7] px-4 py-10 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-full">
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-emerald-800 px-6 py-10 text-center text-white sm:px-10">
            <div className="mx-auto grid size-16 place-items-center rounded-full bg-white text-emerald-800">
              <CheckCircle2 size={36} />
            </div>
            <h1 className="mt-5 text-3xl font-black sm:text-4xl">
              Booking confirmed!
            </h1>
            <p className="mx-auto mt-3 max-w-xl leading-7 text-emerald-50">
              Thank you, {guest.fullName}. Your reservation details are shown
              below. Keep your booking reference for your records.
            </p>
            <div className="mx-auto mt-6 inline-block rounded-xl bg-white/10 px-5 py-3">
              <p className="text-xs font-bold uppercase tracking-widest text-emerald-100">
                Booking reference
              </p>
              <p className="mt-1 text-xl font-black tracking-wide">
                {booking.bookingId}
              </p>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <div className="flex flex-col gap-5 sm:flex-row">
              {booking.hotel?.image ? (
                <img
                  src={booking.hotel.image}
                  alt={booking.hotel.name}
                  className="h-48 w-full rounded-2xl object-cover sm:w-56"
                />
              ) : (
                <div className="grid h-40 w-full place-items-center rounded-2xl bg-emerald-50 text-emerald-800 sm:w-56">
                  <Home size={42} />
                </div>
              )}

              <div className="flex-1">
                <p className="text-sm font-bold text-emerald-800">
                  YOUR HOTEL
                </p>
                <h2 className="mt-2 text-2xl font-black">
                  {booking.hotel?.name}
                </h2>
                <p className="mt-2 flex items-start gap-2 text-sm text-slate-500">
                  <MapPin size={17} className="mt-0.5 shrink-0" />
                  {booking.hotel?.location}
                </p>
                <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-800">
                  <CheckCircle2 size={16} />
                  {booking.status || "Confirmed"}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <InfoCard
                icon={<CalendarDays size={20} />}
                label="Check-in"
                value={booking.checkIn}
              />
              <InfoCard
                icon={<CalendarDays size={20} />}
                label="Check-out"
                value={booking.checkOut}
              />
              <InfoCard
                icon={<BedDouble size={20} />}
                label="Room"
                value={`${booking.room?.name || "Room"} × ${booking.rooms || 1}`}
              />
              <InfoCard
                icon={<Users size={20} />}
                label="Guests and nights"
                value={`${booking.guests || 1} guest(s) · ${booking.nights || 1} night(s)`}
              />
            </div>

            <section className="mt-8 border-t border-slate-200 pt-7">
              <h2 className="text-xl font-black">Guest and address details</h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-slate-500">Guest name</p>
                  <p className="mt-1 font-bold">{guest.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email address</p>
                  <p className="mt-1 break-words font-bold">{guest.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Phone number</p>
                  <p className="mt-1 font-bold">{guest.phone}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Address</p>
                  <p className="mt-1 leading-6 font-bold">
                    {address.join(", ")}
                  </p>
                </div>
              </div>
            </section>

            <section className="mt-8 border-t border-slate-200 pt-7">
              <h2 className="text-xl font-black">Payment details</h2>
              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                  <CreditCard size={21} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-extrabold">
                    {paymentLabels[booking.paymentMethod] ||
                      booking.paymentMethod}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {booking.paymentStatus}
                  </p>
                </div>
              </div>

              <div className="mt-5 space-y-3 text-sm">
                <PriceRow label="Room subtotal" value={money(booking.subtotal)} />
                <PriceRow label="Estimated taxes" value={money(booking.taxes)} />
                <div className="flex justify-between gap-4 border-t border-slate-200 pt-4">
                  <span className="font-extrabold">Total amount</span>
                  <span className="text-xl font-black text-emerald-800">
                    {money(booking.total)}
                  </span>
                </div>
              </div>
            </section>

            <div className="mt-7 rounded-xl bg-amber-50 p-4 text-sm leading-6 text-amber-900">
              <strong>Payment reminder:</strong> This demo saves a booking
              confirmation locally. UPI and card selections are not payment
              receipts, and no money has been collected. Connect a payment
              gateway and a backend to verify payment and manage real bookings.
            </div>

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
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white hover:bg-emerald-900"
              >
                <Home size={18} />
                Browse more hotels
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-4">
      <div className="flex items-center gap-2 text-emerald-800">
        {icon}
        <span className="text-sm font-semibold text-slate-500">{label}</span>
      </div>
      <p className="mt-3 font-extrabold">{value || "Not provided"}</p>
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
