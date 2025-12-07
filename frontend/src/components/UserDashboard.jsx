import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function UserDashboard({ token }) {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    fetch(`${API_BASE}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setBookings);
  };

  useEffect(() => {
    loadBookings();
  }, [token]);

  const handleCancel = (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    fetch(`${API_BASE}/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) alert(data.error);
        else loadBookings(); // refresh list
      })
      .catch(() => alert("Failed to cancel"));
  };

  return (
    <section className="dashboard-section">
      <div className="container">
        <h2 className="section-title mb-4">My Bookings</h2>

        {bookings.length === 0 && (
          <p className="text-muted">No bookings found.</p>
        )}

        {bookings.map(b => (
          <div key={b.id} className="dashboard-card d-flex justify-content-between align-items-start">
            <div>
              <h4>{b.name}</h4>
              <p><strong>Date:</strong> {new Date(b.start_date).toLocaleDateString()}</p>
              <p><strong>Travelers:</strong> {b.travelers}</p>
              <p><strong>Total Price:</strong> ₹{(b.price * b.travelers).toLocaleString()}</p>
            </div>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleCancel(b.id)}
            >
              Cancel
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
