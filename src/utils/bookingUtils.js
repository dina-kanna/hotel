export const KEY = "stayscape_bookings_v1";

export function today() {
  const date = new Date();
  return new Date(date.getTime() - date.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, 10);
}

export function addDays(value, numberOfDays) {
  const date = new Date(`${value}T12:00:00`);
  date.setDate(date.getDate() + numberOfDays);

  return `${date.getFullYear()}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function nights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;

  return Math.max(
    0,
    Math.round(
      (new Date(`${checkOut}T12:00:00`) -
        new Date(`${checkIn}T12:00:00`)) /
        86400000
    )
  );
}

export function money(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

export function dateLabel(value) {
  if (!value) return "—";

  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00`));
}

export function read() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}