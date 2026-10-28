import { CalendarDays, Users, BedDouble } from "lucide-react";
import {
  calculateBookingTotal,
  formatCurrency,
  formatDate,
} from "../../utils/bookingUtils";

export default function BookingSummary({
  hotel,
  room,
  checkIn,
  checkOut,
  guests,
  rooms = 1,
}) {
  const nights = Math.max(
    0,
    Math.round(
      (new Date(`${checkOut}T00:00:00`) -
        new Date(`${checkIn}T00:00:00`)) /
        86400000
    )
  );

  const pricing = calculateBookingTotal({
    roomPrice: room.price,
    nights,
    rooms,
    guests,
  });

  return (
    <aside className="booking-summary card-surface">
      <img className="summary-image" src={hotel.image} alt={hotel.name} />

      <div className="summary-hotel-info">
        <span className="eyebrow">{hotel.category} stay</span>
        <h3>{hotel.name}</h3>
        <p>{hotel.location}</p>
      </div>

      <div className="summary-divider" />

      <div className="summary-detail">
        <CalendarDays size={18} />
        <div>
          <small>Stay dates</small>
          <strong>
            {formatDate(checkIn)} – {formatDate(checkOut)}
          </strong>
          <span>{nights} night(s)</span>
        </div>
      </div>

      <div className="summary-detail">
        <BedDouble size={18} />
        <div>
          <small>Room</small>
          <strong>{room.name}</strong>
          <span>{rooms} room(s)</span>
        </div>
      </div>

      <div className="summary-detail">
        <Users size={18} />
        <div>
          <small>Guests</small>
          <strong>{guests} guest(s)</strong>
        </div>
      </div>

      <div className="summary-divider" />

      <div className="price-row">
        <span>
          {formatCurrency(room.price)} × {nights} night(s) × {rooms} room(s)
        </span>
        <strong>{formatCurrency(pricing.subtotal)}</strong>
      </div>

      <div className="price-row">
        <span>Service fee</span>
        <strong>{formatCurrency(pricing.serviceFee)}</strong>
      </div>

      <div className="price-row">
        <span>Taxes (12%)</span>
        <strong>{formatCurrency(pricing.tax)}</strong>
      </div>

      <div className="summary-divider" />

      <div className="price-row price-total">
        <span>Total amount</span>
        <strong>{formatCurrency(pricing.total)}</strong>
      </div>

      <p className="summary-note">
        This is a demo booking. No actual payment will be collected.
      </p>
    </aside>
  );
}