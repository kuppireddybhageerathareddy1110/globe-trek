import { useEffect, useState } from "react";

const API_BASE = "http://localhost:5000/api";

export default function AdminDashboard({ token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/bookings/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setBookings);
  }, []);

  return (
    <section className="dashboard-section admin">
      <div className="container">
        <h2>Admin Dashboard</h2>
        <p>Manage users, bookings and destinations.</p>

        <table className="table table-dark table-striped mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Destination</th>
              <th>Date</th>
              <th>Travelers</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(b => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.user}</td>
                <td>{b.destination}</td>
                <td>{b.start_date}</td>
                <td>{b.travelers}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
