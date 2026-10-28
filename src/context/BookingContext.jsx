import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { KEY, read } from "../utils/bookingUtils";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(read);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(bookings));
  }, [bookings]);

  const value = useMemo(
    () => ({
      bookings,
      addBooking: (booking) =>
        setBookings((current) => [booking, ...current]),
      cancelBooking: (id) =>
        setBookings((current) =>
          current.map((booking) =>
            booking.id === id
              ? { ...booking, status: "Cancelled" }
              : booking
          )
        ),
    }),
    [bookings]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);

  if (!context) {
    throw new Error("useBookings needs BookingProvider");
  }

  return context;
}