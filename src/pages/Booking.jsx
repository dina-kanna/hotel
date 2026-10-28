
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  MapPin,
  ShieldCheck,
  Smartphone,
  Wallet,
} from "lucide-react";
import { hotels } from "../data/hotels";

const money = (value) =>
  `₹${Number(value || 0).toLocaleString("en-IN")}`;

function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const difference = Math.round((end - start) / 86400000);

  return difference > 0 ? difference : 1;
}

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  postalCode: "",
  country: "India",
};

const paymentOptions = [
  {
    id: "upi",
    title: "UPI",
    description: "Pay using your UPI app when online payments are connected.",
    Icon: Smartphone,
  },
  {
    id: "card",
    title: "Credit / Debit Card",
    description: "Card payments require a secure payment gateway.",
    Icon: CreditCard,
  },
  {
    id: "hotel",
    title: "Pay at the hotel",
    description: "Pay the property directly, subject to its payment policy.",
    Icon: Wallet,
  },
];

export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const hotel = hotels.find((item) => String(item.id) === String(id));
  const roomId = params.get("roomId");

  const room = hotel?.rooms?.find(
    (item) => String(item.id) === String(roomId)
  );

  const guests = Math.max(1, Number(params.get("guests")) || 2);
  const rooms = Math.max(1, Number(params.get("rooms")) || 1);
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const nights = nightsBetween(checkIn, checkOut);

  const [form, setForm] = useState(initialForm);
  const [paymentMethod, setPaymentMethod] = useState("upi");
  const [error, setError] = useState("");

  const roomPrice = Number(room?.price ?? hotel?.price ?? 0);
  const subtotal = roomPrice * rooms * nights;
  const taxes = Math.round(subtotal * 0.12);
  const total = subtotal + taxes;

  const today = new Date();
  const todayString = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");

  const dateError = useMemo(() => {
    if (!checkIn || !checkOut) return "Select check-in and check-out dates before confirming.";
    if (checkIn < todayString) return "Check-in date cannot be in the past.";
    if (checkOut <= checkIn) return "Check-out must be after check-in.";
    return "";
  }, [checkIn, checkOut, todayString]);

  if (!hotel || !room) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-[#f7f9f7] px-5">
        <div className="text-center">
          <h1 className="text-3xl font-black">Booking details unavailable</h1>
          <p className="mt-3 text-slate-500">
            Please select a hotel and room before continuing.
          </p>
          <Link
            to="/hotels"
            className="mt-6 inline-flex rounded-full bg-emerald-800 px-5 py-3 font-bold text-white"
          >
            Browse hotels
          </Link>
        </div>
      </main>
    );
  }

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (dateError) {
      setError(dateError);
      return;
    }

    const requiredFields = [
      "fullName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "postalCode",
      "country",
    ];

    const missingField = requiredFields.some(
      (field) => !String(form[field]).trim()
    );

    if (missingField) {
      setError("Please complete all guest and address fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!/^[0-9+\-\s()]{7,20}$/.test(form.phone)) {
      setError("Please enter a valid phone number.");
      return;
    }

    if (!/^[0-9A-Za-z\s-]{3,12}$/.test(form.postalCode)) {
      setError("Please enter a valid PIN or postal code.");
      return;
    }

    const bookingId = `SS${Date.now().toString().slice(-9)}`;

    const booking = {
      bookingId,
      status: "Confirmed",
      createdAt: new Date().toISOString(),
      hotel: {
        id: hotel.id,
        name: hotel.name,
        location: hotel.location,
        image: hotel.image || hotel.images?.[0] || "",
      },
      room: {
        id: room.id,
        name: room.name,
        price: roomPrice,
      },
      guest: { ...form },
      guests,
      rooms,
      checkIn,
      checkOut,
      nights,
      paymentMethod,
      paymentStatus:
        paymentMethod === "hotel"
          ? "Pay at hotel"
          : "Pending payment gateway integration",
      subtotal,
      taxes,
      total,
      currency: "INR",
    };

    try {
      const existing = JSON.parse(
        localStorage.getItem("stayscapeBookings") || "[]"
      );
      const bookings = Array.isArray(existing) ? existing : [];

      bookings.push(booking);
      localStorage.setItem("stayscapeBookings", JSON.stringify(bookings));
      localStorage.setItem(
        `stayscapeBooking_${bookingId}`,
        JSON.stringify(booking)
      );

      navigate(`/booking-confirmation/${bookingId}`);
    } catch {
      setError(
        "Your booking could not be saved in this browser. Check browser storage settings and try again."
      );
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f9f7] px-4 py-8 text-slate-900 sm:px-8">
      <div className="mx-auto max-w-7xl">
        <Link
          to={`/hotels/${hotel.id}?${params.toString()}`}
          className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600"
        >
          <ArrowLeft size={17} />
          Back to hotel
        </Link>

        <div className="mt-6">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-800">
            StayScape reservation
          </p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">
            Complete your booking
          </h1>
          <p className="mt-3 text-slate-600">
            Enter your details, provide your address, and choose a payment method.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]"
        >
          <div className="space-y-6">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                  <CheckCircle2 size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black">Guest details</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Who will be staying at the hotel?
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field label="Full name" name="fullName" value={form.fullName} onChange={updateField} autoComplete="name" />
                <Field label="Email address" name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" />
                <Field label="Phone number" name="phone" type="tel" value={form.phone} onChange={updateField} autoComplete="tel" />
                <div className="rounded-xl bg-slate-50 p-4">
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
                    Guests
                  </p>
                  <p className="mt-2 font-extrabold">{guests} guest(s)</p>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                  <MapPin size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black">Address details</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Enter your billing/contact address.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <Field
                  label="Street address"
                  name="address"
                  value={form.address}
                  onChange={updateField}
                  autoComplete="street-address"
                  placeholder="House number, street, area"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="City" name="city" value={form.city} onChange={updateField} autoComplete="address-level2" />
                  <Field label="State" name="state" value={form.state} onChange={updateField} autoComplete="address-level1" />
                  <Field label="PIN / postal code" name="postalCode" value={form.postalCode} onChange={updateField} autoComplete="postal-code" />
                  <Field label="Country" name="country" value={form.country} onChange={updateField} autoComplete="country-name" />
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-800">
                  <CreditCard size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-black">Payment method</h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Select how you plan to pay.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {paymentOptions.map(({ id: methodId, title, description, Icon }) => (
                  <label
                    key={methodId}
                    className={`flex cursor-pointer gap-4 rounded-2xl border p-4 transition ${
                      paymentMethod === methodId
                        ? "border-emerald-700 bg-emerald-50 ring-2 ring-emerald-100"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={methodId}
                      checked={paymentMethod === methodId}
                      onChange={() => setPaymentMethod(methodId)}
                      className="mt-1 accent-emerald-800"
                    />
                    <Icon size={23} className="mt-0.5 shrink-0 text-emerald-800" />
                    <div>
                      <p className="font-extrabold">{title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {description}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              <div className="mt-5 flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                <ShieldCheck size={20} className="shrink-0 text-emerald-800" />
                <p>
                  This demo does not process or collect card details. UPI and
                  card payments must be completed through a secure payment
                  provider before you mark them as paid.
                </p>
              </div>
            </section>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-semibold text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-6 py-4 font-extrabold text-white transition hover:bg-emerald-900"
            >
              Confirm booking
              <CheckCircle2 size={19} />
            </button>
            <p className="text-center text-xs leading-5 text-slate-500">
              Confirming this demo booking saves the reservation in this browser.
              It does not charge your payment method.
            </p>
          </div>

          <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:sticky lg:top-24">
            {hotel.image || hotel.images?.[0] ? (
              <img
                src={hotel.image || hotel.images[0]}
                alt={hotel.name}
                className="h-44 w-full rounded-2xl object-cover"
              />
            ) : null}

            <p className="mt-5 text-sm font-bold text-emerald-800">
              YOUR STAY
            </p>
            <h2 className="mt-2 text-xl font-black">{hotel.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{hotel.location}</p>

            <div className="mt-5 space-y-4 border-t border-slate-100 pt-5 text-sm">
              <SummaryRow label="Room" value={room.name} />
              <SummaryRow label="Rooms" value={rooms} />
              <SummaryRow label="Guests" value={guests} />
              <SummaryRow label="Check-in" value={checkIn} />
              <SummaryRow label="Check-out" value={checkOut} />
              <SummaryRow label="Nights" value={nights} />
            </div>

            <div className="mt-6 space-y-3 border-t border-slate-100 pt-5 text-sm">
              <SummaryRow label={`Room × ${rooms} × ${nights} night(s)`} value={money(subtotal)} />
              <SummaryRow label="Estimated taxes (12%)" value={money(taxes)} />
            </div>

            <div className="mt-5 flex items-end justify-between gap-3 border-t border-slate-100 pt-5">
              <div>
                <p className="text-sm text-slate-500">Total amount</p>
                <p className="mt-1 text-xs text-slate-400">Including estimated taxes</p>
              </div>
              <p className="text-2xl font-black text-emerald-800">
                {money(total)}
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  autoComplete,
  placeholder,
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>
      <input
        required
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
        placeholder={placeholder || label}
        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none transition placeholder:text-slate-400 focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
      />
    </label>
  );
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="text-right font-bold text-slate-800">{value || "—"}</span>
    </div>
  );
}
