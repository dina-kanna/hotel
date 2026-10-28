
import { Routes, Route } from "react-router-dom";

import Layout from "./components/layout/Layout";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import ConfirmBooking from "./pages/ConfirmBooking";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        {/* Home */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        {/* Hotel listing and details */}
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotels/:id" element={<HotelDetails />} />

        {/* Booking flow */}
        <Route path="/booking/:id" element={<Booking />} />
        <Route
          path="/booking-confirmation/:bookingId"
          element={<BookingConfirmation />}
        />

        {/* Existing pages */}
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
<Route path="/confirm-booking" element={<ConfirmBooking />} />
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
