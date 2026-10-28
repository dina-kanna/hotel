
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Star,
  Check,
  CheckCircle2,
  ImageOff,
  CreditCard,
  Smartphone,
  Landmark,
  Wallet,
  Mail,
  Phone,
  UserRound,
  CalendarDays,
  BedDouble,
  ShieldCheck,
} from "lucide-react";

import { hotels } from "../data/hotels";
import { today, addDays, nights, money } from "../utils/bookingUtils";

const paymentOptions = [
  {
    value: "upi",
    label: "UPI",
    detail: "Google Pay, PhonePe, etc. — payment not processed here.",
    icon: Smartphone,
  },
  {
    value: "card",
    label: "Credit / Debit Card",
    detail: "Payment must be arranged separately.",
    icon: CreditCard,
  },
  {
    value: "netbanking",
    label: "Net Banking",
    detail: "Payment must be arranged separately.",
    icon: Landmark,
  },
  {
    value: "wallet",
    label: "Wallet",
    detail: "Payment must be arranged separately.",
    icon: Wallet,
  },
  {
    value: "hotel",
    label: "Pay at Hotel",
    detail: "Pay directly at the property.",
    icon: BedDouble,
  },
];

function normalizeImages(...sources) {
  const result = [];

  for (const source of sources) {
    const items = Array.isArray(source) ? source : [source];

    for (const item of items) {
      const url =
        typeof item === "string"
          ? item
          : item?.url || item?.src || item?.imageUrl || item?.image;

      if (
        typeof url === "string" &&
        url.trim() &&
        !result.includes(url.trim())
      ) {
        result.push(url.trim());
      }
    }
  }

  return result;
}

function ImageFallback({ className = "" }) {
  return (
    <div
      className={`flex min-h-32 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ${className}`}
    >
      <div className="flex flex-col items-center gap-2">
        <ImageOff size={30} />
        <span className="text-xs font-semibold">Image unavailable</span>
      </div>
    </div>
  );
}

export default function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [params] = useSearchParams();

  const hotel = hotels.find((item) => String(item.id) === String(id));
  const minDate = today();
  const rooms = Array.isArray(hotel?.rooms) ? hotel.rooms : [];

  const hotelImages = useMemo(
    () =>
      normalizeImages(
        hotel?.images,
        hotel?.image,
        hotel?.imageUrl,
        hotel?.thumbnail,
        hotel?.photo
      ),
    [hotel]
  );

  const [checkIn, setCheckIn] = useState(
    params.get("checkIn") || minDate
  );

  const [checkOut, setCheckOut] = useState(
    params.get("checkOut") || addDays(minDate, 2)
  );

  const [guests, setGuests] = useState(
    Math.min(4, Math.max(1, Number(params.get("guests")) || 2))
  );

  const [roomId, setRoomId] = useState(
    rooms[0]?.id != null ? String(rooms[0].id) : ""
  );

  const [photo, setPhoto] = useState(0);
  const [brokenImages, setBrokenImages] = useState({});
  const [error, setError] = useState("");

  const [guestName, setGuestName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("hotel");
  const [confirming, setConfirming] = useState(false);

  const room =
    rooms.find((item) => String(item.id) === roomId) ||
    rooms[0] ||
    null;

  const roomImages = useMemo(
    () =>
      normalizeImages(
        room?.images,
        room?.image,
        room?.imageUrl,
        room?.photo
      ),
    [room]
  );

  const totalNights = nights(checkIn, checkOut);

  const validNights =
    Number.isFinite(totalNights) && totalNights > 0
      ? totalNights
      : 0;

  const parsedPrice = Number(room?.price ?? hotel?.price ?? 0);

  const roomPrice =
    Number.isFinite(parsedPrice) && parsedPrice >= 0
      ? parsedPrice
      : 0;

  const subtotal = roomPrice * validNights;
  const fee = Math.round(subtotal * 0.1);
  const total = subtotal + fee;

  const selectedImage = hotelImages[photo] || hotelImages[0] || "";

  function markImageBroken(src) {
    if (!src) return;

    setBrokenImages((previous) => ({
      ...previous,
      [src]: true,
    }));
  }

  function changeCheckIn(value) {
    setCheckIn(value);

    if (value && checkOut <= value) {
      setCheckOut(addDays(value, 1));
    }

    setError("");
  }

  function validateBooking() {
    if (!room) {
      return "No rooms are available for this hotel.";
    }

    if (!guestName.trim()) {
      return "Please enter the guest's full name.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return "Please enter a valid email address.";
    }

    const digits = phone.replace(/\D/g, "");

    if (digits.length < 10 || digits.length > 15) {
      return "Please enter a valid phone number.";
    }

    if (!checkIn || checkIn < minDate) {
      return "Check-in cannot be in the past.";
    }

    if (!checkOut || checkOut <= checkIn || validNights < 1) {
      return "Check-out must be after check-in.";
    }

    if (!Number.isInteger(guests) || guests < 1 || guests > 4) {
      return "Please select between 1 and 4 guests.";
    }

    const capacityMatch = String(room.detail || "").match(/^\s*(\d+)/);
    const capacity = Number(room.capacity || capacityMatch?.[1] || 4);

    if (guests > capacity) {
      return `This room supports up to ${capacity} guests. Please choose another room.`;
    }

    return "";
  }

  function submit(event) {
    event.preventDefault();
    setError("");

    const validationError = validateBooking();

    if (validationError) {
      setError(validationError);
      return;
    }

    setConfirming(true);

    const bookingId = `SS${Date.now().toString().slice(-9)}`;

    const bookingDraft = {
      bookingId,
      status: "Confirmed",
      createdAt: new Date().toISOString(),

      hotelId: hotel.id,
      hotelName: hotel.name,
      location: hotel.location || hotel.city || "",
      image: brokenImages[selectedImage] ? "" : selectedImage,

      roomId: room.id,
      roomName: room.name || "Standard Room",
      roomImage: roomImages[0] || "",

      checkIn,
      checkOut,
      guests,
      nights: validNights,

      subtotal,
      fee,
      total,

      guestName: guestName.trim(),
      email: email.trim(),
      phone: phone.trim(),

      paymentMethod,
      paymentStatus:
        paymentMethod === "hotel"
          ? "Pay at hotel — payment pending"
          : "Payment method selected — payment not processed",
    };

    try {
      const previous = JSON.parse(
        localStorage.getItem("stayscapeBookings") || "[]"
      );

      const bookings = Array.isArray(previous) ? previous : [];

      bookings.push(bookingDraft);

      localStorage.setItem(
        "stayscapeBookings",
        JSON.stringify(bookings)
      );

      localStorage.setItem(
        `stayscapeBooking_${bookingId}`,
        JSON.stringify(bookingDraft)
      );

      navigate("/confirm-booking", {
        state: { bookingDraft },
      });
    } catch {
      setError(
        "Could not save your booking. Please check your browser storage."
      );
      setConfirming(false);
    }
  }

  if (!hotel) {
    return (
      <main className="grid min-h-[70vh] place-items-center bg-slate-50 px-5">
        <div className="text-center">
          <h1 className="text-3xl font-black">Stay not found</h1>

          <p className="mt-3 text-slate-500">
            This hotel may no longer be available.
          </p>

          <Link
            to="/hotels"
            className="mt-6 inline-flex rounded-xl bg-emerald-800 px-5 py-3 font-bold text-white"
          >
            Browse stays
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 pb-12 text-slate-900">
      <section className="bg-gradient-to-br from-emerald-950 via-teal-900 to-slate-900 text-white">
        <div className="mx-auto max-w-screen-2xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-100 hover:text-white"
          >
            <ArrowLeft size={17} />
            Back to stays
          </Link>

          <div className="mt-7 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="flex items-center gap-2 text-sm text-emerald-100">
                <MapPin size={16} />
                {hotel.location || hotel.city || "Location not specified"}
              </p>

              <h1 className="mt-3 text-3xl font-black sm:text-5xl">
                {hotel.name}
              </h1>

              <div className="mt-4 flex items-center gap-3 text-sm">
                <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-2">
                  <Star size={15} className="fill-amber-400 text-amber-400" />
                  {hotel.rating ?? "N/A"}
                </span>

                <span className="text-emerald-100">
                  {hotel.reviews ?? 0} guest reviews
                </span>
              </div>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/10 p-4">
              <p className="text-xs font-semibold uppercase text-emerald-100">
                Starting from
              </p>

              <p className="mt-1 text-2xl font-black">
                {money(Number(hotel.price) || 0)}
                <span className="text-sm font-medium text-emerald-100">
                  {" "}/ night
                </span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-screen-2xl px-4 sm:px-6 lg:px-8">
        <section className="mt-6">
          {hotelImages.length ? (
            <>
              {selectedImage && !brokenImages[selectedImage] ? (
                <img
                  src={selectedImage}
                  alt={hotel.name}
                  onError={() => markImageBroken(selectedImage)}
                  className="h-64 w-full rounded-3xl object-cover sm:h-[420px]"
                />
              ) : (
                <ImageFallback className="h-64 sm:h-[420px]" />
              )}

              {hotelImages.length > 1 && (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {hotelImages.map((src, index) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setPhoto(index)}
                      className={`h-16 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${
                        photo === index
                          ? "border-emerald-600"
                          : "border-transparent"
                      }`}
                    >
                      {brokenImages[src] ? (
                        <ImageFallback className="h-full" />
                      ) : (
                        <img
                          src={src}
                          alt={`Hotel view ${index + 1}`}
                          onError={() => markImageBroken(src)}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <ImageFallback className="h-64 sm:h-80" />
          )}
        </section>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div className="min-w-0">
            <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-2xl font-black">About this stay</h2>

              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600 sm:text-base">
                {hotel.description ||
                  "Enjoy a comfortable stay with StayScape."}
              </p>
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-2xl font-black">Amenities</h2>

              {hotel.amenities?.length ? (
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {hotel.amenities.map((amenity, index) => (
                    <div
                      key={`${amenity}-${index}`}
                      className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 text-sm font-medium"
                    >
                      <Check size={16} className="text-emerald-700" />
                      {amenity}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  Amenities are not listed.
                </p>
              )}
            </section>

            <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-7">
              <h2 className="text-2xl font-black">Choose your room</h2>

              <div className="mt-5 space-y-4">
                {rooms.map((item) => {
                  const selected = String(item.id) === roomId;

                  const images = normalizeImages(
                    item.images,
                    item.image,
                    item.imageUrl,
                    item.photo
                  );

                  return (
                    <label
                      key={item.id}
                      className={`flex cursor-pointer flex-col gap-4 rounded-2xl border p-4 sm:flex-row ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-200"
                          : "border-slate-200 hover:border-emerald-300"
                      }`}
                    >
                      <input
                        type="radio"
                        name="room"
                        checked={selected}
                        onChange={() => {
                          setRoomId(String(item.id));
                          setError("");
                        }}
                        className="sr-only"
                      />

                      {images[0] && !brokenImages[images[0]] ? (
                        <img
                          src={images[0]}
                          alt={item.name || "Room"}
                          onError={() => markImageBroken(images[0])}
                          className="h-36 w-full rounded-xl object-cover sm:w-36"
                        />
                      ) : (
                        <ImageFallback className="h-36 sm:w-36" />
                      )}

                      <div className="min-w-0 flex-1">
                        <h3 className="font-extrabold">
                          {item.name || "Standard Room"}
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                          {item.detail || "Comfortable room for your stay."}
                        </p>

                        {selected && (
                          <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-emerald-700">
                            <CheckCircle2 size={14} />
                            Selected
                          </span>
                        )}
                      </div>

                      <div className="shrink-0 sm:text-right">
                        <p className="font-black">
                          {money(Number(item.price ?? hotel.price) || 0)}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          per night
                        </p>
                      </div>
                    </label>
                  );
                })}

                {!rooms.length && (
                  <p className="rounded-xl bg-amber-50 p-4 text-sm text-amber-800">
                    No rooms are configured for this hotel.
                  </p>
                )}
              </div>
            </section>
          </div>

          <aside className="min-w-0 rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-900/5 lg:sticky lg:top-24">
            <div className="rounded-t-3xl bg-gradient-to-r from-emerald-800 to-teal-700 p-5 text-white">
              <p className="text-sm text-emerald-100">Reserve your stay</p>

              <p className="mt-1 text-3xl font-black">
                {money(roomPrice)}
                <span className="text-sm font-medium text-emerald-100">
                  {" "}/ night
                </span>
              </p>
            </div>

            <form onSubmit={submit} className="space-y-6 p-5 sm:p-6">
              <section>
                <h3 className="flex items-center gap-2 font-extrabold">
                  <CalendarDays size={18} className="text-emerald-700" />
                  Dates and guests
                </h3>

                <div className="mt-4 grid grid-cols-1 gap-3 min-[400px]:grid-cols-2">
                  <label className="text-xs font-bold text-slate-500">
                    CHECK-IN
                    <input
                      type="date"
                      required
                      min={minDate}
                      value={checkIn}
                      onChange={(event) => changeCheckIn(event.target.value)}
                      className="mt-2 min-h-11 w-full min-w-0 rounded-xl border border-slate-200 p-2 text-sm"
                    />
                  </label>

                  <label className="text-xs font-bold text-slate-500">
                    CHECK-OUT
                    <input
                      type="date"
                      required
                      min={addDays(checkIn || minDate, 1)}
                      value={checkOut}
                      onChange={(event) => {
                        setCheckOut(event.target.value);
                        setError("");
                      }}
                      className="mt-2 min-h-11 w-full min-w-0 rounded-xl border border-slate-200 p-2 text-sm"
                    />
                  </label>
                </div>

                <label className="mt-4 block text-xs font-bold text-slate-500">
                  NUMBER OF GUESTS
                  <select
                    value={guests}
                    onChange={(event) => {
                      setGuests(Number(event.target.value));
                      setError("");
                    }}
                    className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm"
                  >
                    {[1, 2, 3, 4].map((count) => (
                      <option key={count} value={count}>
                        {count} {count === 1 ? "guest" : "guests"}
                      </option>
                    ))}
                  </select>
                </label>
              </section>

              <section className="border-t border-slate-100 pt-5">
                <h3 className="flex items-center gap-2 font-extrabold">
                  <UserRound size={18} className="text-emerald-700" />
                  Guest information
                </h3>

                <Field
                  label="Full name"
                  icon={<UserRound size={17} />}
                  value={guestName}
                  onChange={setGuestName}
                  placeholder="Enter full name"
                  autoComplete="name"
                />

                <Field
                  label="Email address"
                  icon={<Mail size={17} />}
                  type="email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  autoComplete="email"
                />

                <Field
                  label="Phone number"
                  icon={<Phone size={17} />}
                  type="tel"
                  value={phone}
                  onChange={setPhone}
                  placeholder="Enter phone number"
                  autoComplete="tel"
                />
              </section>

              <section className="border-t border-slate-100 pt-5">
                <h3 className="flex items-center gap-2 font-extrabold">
                  <CreditCard size={18} className="text-emerald-700" />
                  Payment method
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Choose a preferred payment method. This demo does not process
                  online payments or charge your account.
                </p>

                <div className="mt-4 space-y-2">
                  {paymentOptions.map((option) => {
                    const Icon = option.icon;
                    const selected = paymentMethod === option.value;

                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 ${
                          selected
                            ? "border-emerald-500 bg-emerald-50"
                            : "border-slate-200 hover:border-emerald-300"
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={option.value}
                          checked={selected}
                          onChange={() => setPaymentMethod(option.value)}
                          className="size-4 accent-emerald-700"
                        />

                        <Icon
                          size={20}
                          className="shrink-0 text-emerald-700"
                        />

                        <span className="min-w-0 flex-1">
                          <span className="block text-sm font-bold">
                            {option.label}
                          </span>

                          <span className="mt-1 block text-xs text-slate-500">
                            {option.detail}
                          </span>
                        </span>
                      </label>
                    );
                  })}
                </div>
              </section>

              <section className="border-t border-slate-100 pt-5">
                <h3 className="font-extrabold">Price summary</h3>

                <div className="mt-4 space-y-3 text-sm">
                  <PriceRow
                    label={`${money(roomPrice)} × ${validNights} night(s)`}
                    value={money(subtotal)}
                  />

                  <PriceRow
                    label="Service fee (10%)"
                    value={money(fee)}
                  />

                  <div className="flex justify-between border-t border-dashed border-slate-200 pt-4 text-base font-black">
                    <span>Total</span>
                    <span className="text-xl text-emerald-800">
                      {money(total)}
                    </span>
                  </div>
                </div>
              </section>

              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                disabled={!room || validNights < 1 || confirming}
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-800 px-5 py-4 font-extrabold text-white transition hover:bg-emerald-900 disabled:opacity-50"
              >
                <CheckCircle2 size={19} />
                {confirming ? "Confirming..." : "Confirm Booking"}
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-xs leading-5 text-slate-400">
                <ShieldCheck size={15} />
                Booking confirmation only. No payment is charged.
              </p>
            </form>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
  autoComplete,
}) {
  return (
    <label className="mt-4 block text-xs font-bold text-slate-500">
      {label.toUpperCase()}

      <span className="mt-2 flex min-h-11 items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-emerald-500">
        {icon && (
          <span className="shrink-0 text-slate-400">{icon}</span>
        )}

        <input
          required
          type={type}
          autoComplete={autoComplete}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder || label}
          className="w-full min-w-0 bg-transparent py-2 text-sm font-normal text-slate-800 outline-none"
        />
      </span>
    </label>
  );
}

function PriceRow({ label, value }) {
  return (
    <div className="flex justify-between gap-3 text-slate-500">
      <span>{label}</span>
      <span className="shrink-0 font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}
