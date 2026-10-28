import { Link } from "react-router-dom";
import {
  CalendarDays,
  MapPin,
  Users,
  XCircle,
  CheckCircle2,
  Eye,
} from "lucide-react";
import {
  formatCurrency,
  formatDate,
} from "../../utils/bookingUtils";

export default function BookingCard({ booking, onCancel }) {
  const cancelled = booking.status === "Cancelled";

  return (
    <article className={`booking-card ${cancelled ? "is-cancelled" : ""}`}>
      <img
        src={booking.hotelImage}
        alt={booking.hotelName}
        className="booking-card-image"
      />

      <div className="booking-card-main">
        <div className="booking-card-top">
          <div>
            <span className="booking-reference">{booking.reference}</span>
            <h3>{booking.hotelName}</h3>
          </div>

          <span className={`status-pill ${cancelled ? "cancelled" : "confirmed"}`}>
            {cancelled ? (
              <XCircle size={15} />
            ) : (
              <CheckCircle2 size={15} />
            )}
            {booking.status}
          </span>
        </div>

        <p className="booking-location">
          <MapPin size={15} />
          {booking.location}
        </p>

        <div className="booking-card-details">
          <span>
            <CalendarDays size={16} />
            {formatDate(booking.checkIn)} – {formatDate(booking.checkOut)}
          </span>

          <span>
            <Users size={16} />
            {booking.guests} guest(s)
          </span>

          <span>{booking.roomName}</span>
        </div>

        <div className="booking-card-bottom">
          <div>
            <small>Total amount</small>
            <strong>{formatCurrency(booking.total)}</strong>
          </div>

          <div className="booking-card-actions">
            <Link
              className="btn btn-outline btn-small"
              to={`/booking-confirmation/${booking.id}`}
            >
              <Eye size={15} />
              Details
            </Link>

            {!cancelled && (
              <button
                className="btn btn-danger-outline btn-small"
                type="button"
                onClick={() => onCancel(booking)}
              >
                Cancel booking
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}