import { Hotel } from "lucide-react";

export default function Loader({ message = "Finding your perfect stay..." }) {
  return (
    <div className="loader-screen" role="status" aria-live="polite">
      <div className="loader-content">
        <div className="loader-icon">
          <Hotel size={34} />
        </div>

        <div className="loader-spinner" />

        <h2>StayScape</h2>
        <p>{message}</p>
      </div>
    </div>
  );
}