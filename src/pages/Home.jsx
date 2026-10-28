import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Heart,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Users,
  BedDouble,
  Mountain,
  Waves,
  Building2,
  Trees,
  Star,
  Wallet,
  Headphones,
  Globe2,
  Compass,
  Plane,
  Mail,
  ChevronRight,
  Hotel as HotelIcon,
  X,
  Minus,
  Plus,
} from "lucide-react";

import HotelCard from "../components/ui/HotelCard";
import { hotels as hotelData } from "../data/hotels";

const destinations = [
  {
    name: "Goa",
    subtitle: "Beaches & sunshine",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Jaipur",
    subtitle: "Royal heritage",
    image:
      "https://images.unsplash.com/photo-1599661046827-dacff0c0f09a?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Manali",
    subtitle: "Mountain escapes",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Mumbai",
    subtitle: "A city full of life",
    image:
      "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kerala",
    subtitle: "Backwaters & nature",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Udaipur",
    subtitle: "Lakeside romance",
    image:
      "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Shimla",
    subtitle: "Fresh mountain air",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Agra",
    subtitle: "History & wonder",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=900&q=85",
  },
];

const stayTypes = [
  {
    title: "Beach escapes",
    subtitle: "Wake up beside the sea",
    icon: Waves,
    color: "bg-cyan-100 text-cyan-700",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=800&q=85",
    query: "Goa",
  },
  {
    title: "Mountain retreats",
    subtitle: "Find your peaceful place",
    icon: Mountain,
    color: "bg-emerald-100 text-emerald-700",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=800&q=85",
    query: "Manali",
  },
  {
    title: "City stays",
    subtitle: "Be close to everything",
    icon: Building2,
    color: "bg-violet-100 text-violet-700",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=85",
    query: "Mumbai",
  },
  {
    title: "Nature hideaways",
    subtitle: "Slow down and recharge",
    icon: Trees,
    color: "bg-amber-100 text-amber-700",
    image:
      "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=85",
    query: "Kerala",
  },
];

const benefits = [
  {
    icon: ShieldCheck,
    title: "Book with confidence",
    description:
      "Review your hotel, room, dates, and booking details before confirming.",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    icon: Wallet,
    title: "Options for your budget",
    description:
      "Compare hotel prices and choose a stay that fits your travel plans.",
    color: "bg-amber-100 text-amber-700",
  },
  {
    icon: Headphones,
    title: "A simpler experience",
    description:
      "Keep your hotel discovery and reservation details organized.",
    color: "bg-violet-100 text-violet-700",
  },
  {
    icon: CalendarDays,
    title: "Flexible trip planning",
    description:
      "Choose your travel dates, guests, and rooms before exploring hotels.",
    color: "bg-sky-100 text-sky-700",
  },
];

const travelSteps = [
  {
    number: "01",
    title: "Search your destination",
    description:
      "Enter a city, select travel dates, and choose how many guests and rooms you need.",
    color: "text-emerald-700",
    background: "bg-emerald-100",
  },
  {
    number: "02",
    title: "Select a hotel and room",
    description:
      "Compare available hotel options and select a room that suits your trip.",
    color: "text-violet-700",
    background: "bg-violet-100",
  },
  {
    number: "03",
    title: "Review and confirm",
    description:
      "Enter your booking details, choose a payment option, and review your reservation.",
    color: "text-orange-700",
    background: "bg-orange-100",
  },
];

function getHotelName(hotel) {
  return String(hotel?.name ?? hotel?.title ?? "Hotel");
}

function getHotelLocation(hotel) {
  const location =
    hotel?.location ?? hotel?.city ?? hotel?.address ?? "";

  return typeof location === "string" ? location : "";
}

function getHotelPrice(hotel) {
  const value =
    hotel?.price ??
    hotel?.pricePerNight ??
    hotel?.price_per_night ??
    hotel?.startingPrice ??
    hotel?.rooms?.[0]?.price ??
    0;

  const parsed = Number(String(value).replace(/[^\d.]/g, ""));

  return Number.isFinite(parsed) ? parsed : 0;
}

function getHotelRating(hotel) {
  const value = Number(hotel?.rating ?? hotel?.stars ?? 0);

  return Number.isFinite(value) ? value : 0;
}

function getDateString(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(dateString, days) {
  const date = new Date(`${dateString}T12:00:00`);
  date.setDate(date.getDate() + days);

  return getDateString(date);
}

function formatDate(dateString) {
  if (!dateString) return "";

  return new Date(`${dateString}T12:00:00`).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );
}

export default function Home() {
  const navigate = useNavigate();

  const today = getDateString(new Date());
  const tomorrow = addDays(today, 1);

  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);
  const [rooms, setRooms] = useState(1);
  const [searchError, setSearchError] = useState("");

  const [guestPanelOpen, setGuestPanelOpen] = useState(false);

  const [email, setEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");

  const [hotelSearch, setHotelSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState("Any");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("recommended");

  const validHotels = useMemo(
    () =>
      Array.isArray(hotelData)
        ? hotelData.filter(
            (hotel) =>
              hotel &&
              typeof hotel === "object" &&
              hotel.id !== undefined &&
              hotel.id !== null
          )
        : [],
    []
  );

  const featuredHotels = useMemo(() => {
    let results = [...validHotels];

    const term = hotelSearch.trim().toLowerCase();

    if (term) {
      results = results.filter((hotel) => {
        const amenities = Array.isArray(hotel.amenities)
          ? hotel.amenities
          : [];

        const searchable = [
          getHotelName(hotel),
          getHotelLocation(hotel),
          hotel.description ?? "",
          ...amenities,
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(term);
      });
    }

    if (maxPrice !== "Any") {
      results = results.filter((hotel) => {
        const price = getHotelPrice(hotel);

        return price > 0 && price <= Number(maxPrice);
      });
    }

    if (Number(minRating) > 0) {
      results = results.filter(
        (hotel) => getHotelRating(hotel) >= Number(minRating)
      );
    }

    if (sortBy === "price-low") {
      results.sort(
        (a, b) => getHotelPrice(a) - getHotelPrice(b)
      );
    } else if (sortBy === "price-high") {
      results.sort(
        (a, b) => getHotelPrice(b) - getHotelPrice(a)
      );
    } else if (sortBy === "rating") {
      results.sort(
        (a, b) => getHotelRating(b) - getHotelRating(a)
      );
    } else if (sortBy === "name") {
      results.sort((a, b) =>
        getHotelName(a).localeCompare(getHotelName(b))
      );
    }

    return results.slice(0, 6);
  }, [validHotels, hotelSearch, maxPrice, minRating, sortBy]);

  function handleSearch(event) {
    event.preventDefault();
    setSearchError("");

    if (!location.trim()) {
      setSearchError("Please enter a destination to search.");
      return;
    }

    if (!checkIn || checkIn < today) {
      setSearchError("Please select a valid check-in date.");
      return;
    }

    if (!checkOut || checkOut <= checkIn) {
      setSearchError("Check-out must be after check-in.");
      return;
    }

    const params = new URLSearchParams({
      location: location.trim(),
      checkIn,
      checkOut,
      guests: String(guests),
      rooms: String(rooms),
    });

    navigate(`/hotels?${params.toString()}`);
  }

  function searchDestination(destination) {
    navigate(
      `/hotels?${new URLSearchParams({
        location: destination,
        checkIn,
        checkOut,
        guests: String(guests),
        rooms: String(rooms),
      }).toString()}`
    );
  }

  function updateCheckIn(value) {
    setCheckIn(value);
    setSearchError("");

    if (value && checkOut <= value) {
      setCheckOut(addDays(value, 1));
    }
  }

  function handleNewsletterSubmit(event) {
    event.preventDefault();

    setNewsletterMessage(
      "Newsletter registration needs to be connected to your backend."
    );
  }

  function resetHotelFilters() {
    setHotelSearch("");
    setMaxPrice("Any");
    setMinRating("0");
    setSortBy("recommended");
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f9f7] text-slate-900">
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-[#102d2b] text-white">
        <img
          src="https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=2000&q=85"
          alt=""
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />

        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#092522]/95 via-[#102d2b]/80 to-[#102d2b]/35" />

        <div className="mx-auto grid max-w-full items-center gap-14 px-5 pb-24 pt-16 sm:px-8 sm:pb-32 sm:pt-24 lg:grid-cols-2 lg:py-28">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-emerald-200 backdrop-blur-sm">
              <Sparkles size={15} />
              Travel beautifully
            </div>

            <h1 className="mt-7 max-w-2xl text-4xl font-black leading-[1.12] tracking-tight sm:text-5xl lg:text-7xl">
              Find a place
              <span className="block text-emerald-300">
                worth the journey.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base leading-7 text-slate-200 sm:text-lg">
              Discover beautiful stays, choose your room, and plan
              your next adventure with StayScape.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#booking-search"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-300 px-6 py-3.5 font-extrabold text-emerald-950 transition hover:bg-white"
              >
                Book a stay <ArrowRight size={18} />
              </a>

              <Link
                to="/hotels"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                Explore hotels
              </Link>
            </div>

            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-4 text-sm text-slate-200">
              <span className="flex items-center gap-2">
                <ShieldCheck size={18} className="text-emerald-300" />
                Easy booking
              </span>
              <span className="flex items-center gap-2">
                <Heart size={18} className="text-pink-300" />
                Memorable stays
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 size={18} className="text-sky-300" />
                Organized reservations
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:ml-auto">
            <div className="absolute -left-5 top-12 z-10 hidden rounded-2xl border border-white/50 bg-white/95 p-4 text-slate-900 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="grid size-11 place-items-center rounded-xl bg-amber-100 text-amber-700">
                  <Compass size={23} />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Your next adventure</p>
                  <p className="font-extrabold">Starts with a stay</p>
                </div>
              </div>
            </div>

            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=1100&q=85"
              alt="Beautiful resort with a swimming pool"
              className="h-[320px] w-full rounded-[2rem] object-cover shadow-2xl sm:h-[440px]"
            />

            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl bg-white p-5 text-slate-900 shadow-xl sm:left-8 sm:right-8 sm:p-6">
              <div className="flex items-center gap-4">
                <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-emerald-50 text-emerald-800">
                  <MapPin size={25} />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-emerald-800">
                    Your next chapter
                  </p>
                  <h2 className="mt-1 text-lg font-extrabold sm:text-xl">
                    A new destination awaits.
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    Choose your destination and travel dates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UPDATED ROOM BOOKING SEARCH */}
      <section
        id="booking-search"
        className="relative z-10 mx-auto max-w-full scroll-mt-27 px-5 sm:px-8"
      >
        <div className="rounded-3xl border border-slate-200/80 bg-white p-5 shadow-xl sm:p-8">
          <div className="mb-7">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-800">
              Plan your stay
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
              Find your perfect room
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Select a destination, dates, guests, and the number of rooms.
            </p>
          </div>

          <form onSubmit={handleSearch}>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
              <div className="lg:col-span-2">
                <label
                  htmlFor="destination"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Destination or hotel
                </label>

                <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-3 transition focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-100">
                  <MapPin size={18} className="shrink-0 text-emerald-700" />

                  <input
                    id="destination"
                    value={location}
                    onChange={(event) => {
                      setLocation(event.target.value);
                      setSearchError("");
                    }}
                    placeholder="Where do you want to go?"
                    className="w-full min-w-0 bg-transparent text-sm outline-none"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="check-in"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Check-in
                </label>

                <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-emerald-600">
                  <CalendarDays size={17} className="shrink-0 text-emerald-700" />

                  <input
                    id="check-in"
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(event) => updateCheckIn(event.target.value)}
                    required
                    className="w-full min-w-0 bg-transparent text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="check-out"
                  className="mb-2 block text-sm font-bold text-slate-700"
                >
                  Check-out
                </label>

                <div className="flex h-12 items-center gap-2 rounded-xl border border-slate-200 px-3 focus-within:border-emerald-600">
                  <CalendarDays size={17} className="shrink-0 text-emerald-700" />

                  <input
                    id="check-out"
                    type="date"
                    min={addDays(checkIn || today, 1)}
                    value={checkOut}
                    onChange={(event) => {
                      setCheckOut(event.target.value);
                      setSearchError("");
                    }}
                    required
                    className="w-full min-w-0 bg-transparent text-xs outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-bold text-slate-700">
                  Guests and rooms
                </label>

                <button
                  type="button"
                  onClick={() => setGuestPanelOpen((open) => !open)}
                  aria-expanded={guestPanelOpen}
                  className="flex h-12 w-full items-center gap-2 rounded-xl border border-slate-200 px-3 text-left transition hover:border-emerald-600"
                >
                  <Users size={17} className="shrink-0 text-emerald-700" />

                  <span className="min-w-0 flex-1 truncate text-xs font-semibold">
                    {guests} guests · {rooms} rooms
                  </span>

                  <ChevronRight
                    size={16}
                    className={`shrink-0 text-slate-400 transition ${
                      guestPanelOpen ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {guestPanelOpen && (
              <div className="mt-5 grid gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/70 p-4 sm:grid-cols-2 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-white text-emerald-800">
                      <Users size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold">Guests</p>
                      <p className="text-xs text-slate-500">
                        Total travelers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Remove one guest"
                      disabled={guests <= 1}
                      onClick={() => setGuests((value) => Math.max(1, value - 1))}
                      className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white transition hover:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-5 text-center font-black">
                      {guests}
                    </span>

                    <button
                      type="button"
                      aria-label="Add one guest"
                      disabled={guests >= 10}
                      onClick={() => setGuests((value) => Math.min(10, value + 1))}
                      className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white transition hover:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-white text-emerald-800">
                      <BedDouble size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold">Rooms</p>
                      <p className="text-xs text-slate-500">
                        Rooms required
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Remove one room"
                      disabled={rooms <= 1}
                      onClick={() => setRooms((value) => Math.max(1, value - 1))}
                      className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white transition hover:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Minus size={15} />
                    </button>

                    <span className="w-5 text-center font-black">
                      {rooms}
                    </span>

                    <button
                      type="button"
                      aria-label="Add one room"
                      disabled={rooms >= 6}
                      onClick={() => setRooms((value) => Math.min(6, value + 1))}
                      className="grid size-9 place-items-center rounded-full border border-slate-200 bg-white transition hover:border-emerald-700 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
              <button
                type="submit"
                className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-800 px-7 py-3 font-extrabold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-900 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <Search size={18} />
                Search available hotels
                <ArrowRight size={17} />
              </button>

              <p className="text-center text-xs text-slate-500 sm:max-w-48 sm:text-left">
                {formatDate(checkIn)} – {formatDate(checkOut)}
              </p>
            </div>

            {searchError && (
              <p
                role="alert"
                className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-600"
              >
                {searchError}
              </p>
            )}
          </form>
        </div>
      </section>

      {/* STAY CATEGORIES */}
      <section className="mx-auto max-w-full px-5 pb-6 pt-16 sm:px-8 sm:pt-20">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-700">
              Find your kind of getaway
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              What does your trip look like?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
              Whether you want adventure or relaxation, discover a stay that
              suits your style.
            </p>
          </div>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 self-start font-extrabold text-emerald-800 hover:text-emerald-600 sm:self-auto"
          >
            Explore stays <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stayTypes.map((stay) => {
            const Icon = stay.icon;

            return (
              <button
                type="button"
                key={stay.title}
                onClick={() => searchDestination(stay.query)}
                className="group overflow-hidden rounded-3xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={stay.image}
                    alt={stay.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`inline-flex size-11 items-center justify-center rounded-2xl ${stay.color}`}>
                      <Icon size={22} />
                    </span>
                  </div>
                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-white/90 text-slate-800 transition group-hover:bg-emerald-300">
                    <ArrowUpRight size={18} />
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-extrabold">{stay.title}</h3>
                  <p className="mt-1 text-sm text-slate-500">{stay.subtitle}</p>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section
        id="featured-stays"
        className="mx-auto max-w-full scroll-mt-29 px-5 py-16 sm:px-8 sm:py-24"
      >
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-800">
              Carefully selected
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
              Stays worth discovering
            </h2>
            <p className="mt-3 max-w-xl leading-7 text-slate-500">
              Find a hotel that matches your destination, budget, and preferred
              rating.
            </p>
          </div>

          <Link
            to="/hotels"
            className="inline-flex items-center gap-2 self-start font-extrabold text-emerald-800 transition hover:text-emerald-600 sm:self-auto"
          >
            View all hotels <ArrowRight size={18} />
          </Link>
        </div>

        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_200px_200px_200px]">
            <div>
              <label
                htmlFor="featured-search"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Search hotels
              </label>
              <div className="flex h-12 items-center gap-3 rounded-xl border border-slate-200 px-3 focus-within:border-emerald-600">
                <Search size={18} className="shrink-0 text-emerald-700" />
                <input
                  id="featured-search"
                  type="search"
                  value={hotelSearch}
                  onChange={(event) => setHotelSearch(event.target.value)}
                  placeholder="Hotel, city, or amenity"
                  className="w-full min-w-0 bg-transparent text-sm outline-none"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="max-price"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Maximum price
              </label>
              <select
                id="max-price"
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
              >
                <option value="Any">Any price</option>
                <option value="2000">Up to ₹2,000</option>
                <option value="4000">Up to ₹4,000</option>
                <option value="6000">Up to ₹6,000</option>
                <option value="10000">Up to ₹10,000</option>
                <option value="20000">Up to ₹20,000</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="min-rating"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Minimum rating
              </label>
              <select
                id="min-rating"
                value={minRating}
                onChange={(event) => setMinRating(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
              >
                <option value="0">All ratings</option>
                <option value="3">3+ stars</option>
                <option value="4">4+ stars</option>
                <option value="4.5">4.5+ stars</option>
                <option value="5">5 stars</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="hotel-sort"
                className="mb-2 block text-sm font-bold text-slate-700"
              >
                Sort by
              </label>
              <select
                id="hotel-sort"
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                className="h-12 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-emerald-600"
              >
                <option value="recommended">Recommended</option>
                <option value="price-low">Lowest price</option>
                <option value="price-high">Highest price</option>
                <option value="rating">Highest rating</option>
                <option value="name">Name A–Z</option>
              </select>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-sm text-slate-500">
              Showing{" "}
              <span className="font-extrabold text-slate-900">
                {featuredHotels.length}
              </span>{" "}
              {featuredHotels.length === 1 ? "hotel" : "hotels"}
            </p>

            <button
              type="button"
              onClick={resetHotelFilters}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-bold text-emerald-800 transition hover:bg-emerald-50"
            >
              <X size={15} />
              Reset filters
            </button>
          </div>
        </div>

        {featuredHotels.length > 0 ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
            <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-800">
              <HotelIcon size={30} />
            </div>
            <h3 className="mt-5 text-xl font-extrabold">
              No matching hotels found
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Try another search term or relax your price and rating filters.
            </p>
            <button
              type="button"
              onClick={resetHotelFilters}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-5 py-3 font-bold text-white transition hover:bg-emerald-900"
            >
              Reset filters <ArrowRight size={17} />
            </button>
          </div>
        )}
      </section>

      {/* DESTINATIONS */}
      <section
        id="destinations"
        className="scroll-mt-24 border-y border-slate-100 bg-white py-16 sm:py-24"
      >
        <div className="mx-auto max-w-full px-5 sm:px-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-800">
                Go somewhere wonderful
              </p>
              <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
                Pick your next destination
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-slate-500">
              From sunlit shores to cool mountain air, discover a place that
              matches your mood.
            </p>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {destinations.map((destination) => (
              <button
                key={destination.name}
                type="button"
                onClick={() => searchDestination(destination.name)}
                className="group relative h-60 overflow-hidden rounded-3xl bg-slate-200 text-left shadow-sm sm:h-80"
              >
                <img
                  src={destination.image}
                  alt={destination.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-4 text-white sm:p-6">
                  <p className="text-xs font-semibold text-white/85 sm:text-sm">
                    {destination.subtitle}
                  </p>
                  <div className="mt-2 flex items-center justify-between gap-2">
                    <h3 className="text-xl font-black sm:text-2xl">
                      {destination.name}
                    </h3>
                    <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/20 transition group-hover:bg-white group-hover:text-slate-900">
                      <ArrowUpRight size={18} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/hotels"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-bold text-slate-800 transition hover:border-emerald-700 hover:text-emerald-800"
            >
              Discover all stays <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY STAYSCAPE */}
      <section className="mx-auto max-w-full px-5 py-16 sm:px-8 sm:py-24">
        <div className="text-center">
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-violet-700">
            A better way to get away
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">
            Why explore with StayScape?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Discover hotel options, compare prices, and organize your next trip
            from the first search to the reservation details.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl"
              >
                <div className={`grid size-14 place-items-center rounded-2xl ${benefit.color}`}>
                  <Icon size={26} />
                </div>
                <h3 className="mt-5 text-lg font-extrabold">
                  {benefit.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="border-y border-slate-100 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-full px-5 sm:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-orange-700">
                Your trip, made simple
              </p>
              <h2 className="mt-3 text-3xl font-black leading-tight tracking-tight sm:text-4xl">
                Three simple steps to your next getaway.
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                Spend less time figuring out where to stay and more time
                planning the experiences that matter.
              </p>

              <div className="mt-8 space-y-6">
                {travelSteps.map((step) => (
                  <div key={step.number} className="flex gap-4">
                    <div className={`grid size-12 shrink-0 place-items-center rounded-2xl text-sm font-black ${step.background} ${step.color}`}>
                      {step.number}
                    </div>
                    <div>
                      <h3 className="font-extrabold">{step.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/hotels"
                className="mt-9 inline-flex items-center gap-2 rounded-full bg-emerald-800 px-6 py-3.5 font-extrabold text-white transition hover:bg-emerald-900"
              >
                Start exploring <ArrowRight size={18} />
              </Link>
            </div>

            <div className="relative pb-5">
              <img
                src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=85"
                alt="Scenic travel destination beside a lake"
                loading="lazy"
                className="h-[350px] w-full rounded-[2rem] object-cover shadow-xl sm:h-[500px]"
              />
              <div className="absolute -bottom-1 left-4 right-4 rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:left-8 sm:right-8">
                <div className="flex items-center gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sky-100 text-sky-700">
                    <Plane size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-extrabold">The world is waiting</p>
                    <p className="mt-1 text-sm text-slate-500">
                      Your next favorite place is out there.
                    </p>
                  </div>
                  <Globe2 size={27} className="shrink-0 text-emerald-700" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="border-t border-slate-100 bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-full px-5 sm:px-8">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-emerald-800 via-teal-800 to-slate-900 px-6 py-10 text-center text-white sm:px-12 sm:py-14">
            <div className="absolute -right-16 -top-20 size-64 rounded-full bg-emerald-300/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-16 size-64 rounded-full bg-sky-300/10 blur-3xl" />

            <div className="relative z-10 mx-auto max-w-2xl">
              <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-white/10 text-emerald-200">
                <Mail size={27} />
              </div>

              <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.2em] text-emerald-200">
                Travel inspiration
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Let your next adventure find you.
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Get travel inspiration and discover destinations for your next
                getaway.
              </p>

              <form
                onSubmit={handleNewsletterSubmit}
                className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setNewsletterMessage("");
                  }}
                  placeholder="Enter your email address"
                  aria-label="Email address"
                  required
                  className="min-h-12 min-w-0 flex-1 rounded-full border border-white/20 bg-white/10 px-5 text-sm text-white outline-none placeholder:text-white/60 focus:border-emerald-300 focus:ring-2 focus:ring-emerald-300/30"
                />

                <button
                  type="submit"
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-300 px-6 font-extrabold text-emerald-950 transition hover:bg-white"
                >
                  Join us <ArrowRight size={17} />
                </button>
              </form>

              {newsletterMessage && (
                <p role="status" className="mt-4 text-sm font-semibold text-emerald-100">
                  {newsletterMessage}
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#f7f9f7] py-8">
        <div className="mx-auto flex max-w-full flex-col items-center justify-between gap-4 px-5 text-center sm:flex-row sm:px-8 sm:text-left">
          <div>
            <p className="flex items-center justify-center gap-2 font-extrabold sm:justify-start">
              <span className="grid size-9 place-items-center rounded-xl bg-emerald-800 text-white">
                <Globe2 size={19} />
              </span>
              StayScape
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Discover places. Create memories.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 text-sm font-semibold text-slate-600">
            <Link to="/hotels" className="transition hover:text-emerald-800">
              Hotels
            </Link>
            <a href="#destinations" className="transition hover:text-emerald-800">
              Destinations
            </a>
            <a href="#featured-stays" className="transition hover:text-emerald-800">
              Featured stays
            </a>
            <a href="#booking-search" className="transition hover:text-emerald-800">
              Book a room
            </a>
          </div>

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} StayScape
          </p>
        </div>
      </footer>
    </main>
  );
}