import { useEffect, useState } from "react";
import "./style.css";

// const API_BASE = "http://localhost:5000/api";
const API_BASE = "https://globe-trek.onrender.com/api";

function App() {
  const [destinations, setDestinations] = useState([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState("dark"); // "dark" | "light"
  const [view, setView] = useState("home"); // "home" | "booking" | "login" | "register"
  const [selectedDestination, setSelectedDestination] = useState(null);

  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // smooth scroll
  const handleNavScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // theme handling
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // load destinations (with search)
  const loadDestinations = () => {
    const url =
      search.trim().length > 0
        ? `${API_BASE}/destinations?q=${encodeURIComponent(search)}`
        : `${API_BASE}/destinations`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => setDestinations(data))
      .catch((err) => console.error("Error fetching destinations:", err));
  };

  useEffect(() => {
    loadDestinations();
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    loadDestinations();
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Subscribed!");
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setView("home");
  };

  const goToBooking = (destination) => {
    setSelectedDestination(destination);
    setView("booking");
  };

  return (
    <div className={`app-root ${theme === "light" ? "light" : "dark"}`}>
      {/* HEADER / HERO */}
      <header className="header" id="home">
        <div className="hero-animated-bg">
          <div className="planet planet-1"></div>
          <div className="planet planet-2"></div>
          <div className="planet planet-3"></div>
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
          <div className="bubble bubble-4"></div>
        </div>

        <nav className="navbar navbar-expand-lg navbar-dark position-relative">
          <div className="container">
            <a
              className="navbar-brand d-flex align-items-center"
              href="#home"
              onClick={(e) => handleNavScroll(e, "home")}
            >
              <div className="logo-circle me-2">GT</div>
              <span className="fw-bold">GlobeTrek</span>
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav me-3">
                <li className="nav-item">
                  <a
                    className="nav-link active"
                    href="#home"
                    onClick={(e) => handleNavScroll(e, "home")}
                  >
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#destinations"
                    onClick={(e) => handleNavScroll(e, "destinations")}
                  >
                    Destinations
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#gallery"
                    onClick={(e) => handleNavScroll(e, "gallery")}
                  >
                    Gallery
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#whyus"
                    onClick={(e) => handleNavScroll(e, "whyus")}
                  >
                    Why Us
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="#contact"
                    onClick={(e) => handleNavScroll(e, "contact")}
                  >
                    Contact
                  </a>
                </li>
              </ul>

              {/* Theme toggle */}
              <button
                className="btn btn-outline-light me-2"
                onClick={() =>
                  setTheme((prev) => (prev === "dark" ? "light" : "dark"))
                }
              >
                {theme === "dark" ? "☀ Light" : "🌙 Dark"}
              </button>

              {user ? (
  <>
    <button
      className="btn btn-outline-light me-2"
      onClick={() =>
        setView(user.role === "admin" ? "admin" : "dashboard")
      }
    >
      Dashboard
    </button>

    <span className="me-2 small">Hi, {user.name}</span>

    <button
      className="btn btn-outline-light login-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  </>
) : (
  <button
    className="btn btn-outline-light login-btn"
    onClick={() => setView("login")}
  >
    Login
  </button>
)}

            </div>
          </div>
        </nav>

        <div className="hero-content text-center text-white position-relative">
          <div className="container">
            <h1 className="display-4 fw-bold mb-3">Travel Across The Globe</h1>
            <p className="lead mb-4">
              Discover handpicked destinations, exclusive deals and easy
              booking.
            </p>

            {/* SEARCH BAR */}
            <form className="search-bar mx-auto" onSubmit={handleSearchSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search country or city"
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <button className="btn btn-search" type="submit">
                  <i className="fa-solid fa-magnifying-glass me-1"></i> Search
                </button>
              </div>
            </form>

            {/* QUICK STATS */}
            <div className="row mt-5 g-3 justify-content-center hero-stats">
              <div className="col-6 col-md-3">
                <div className="stat-box">
                  <h3>120+</h3>
                  <p>Destinations</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-box">
                  <h3>15K+</h3>
                  <p>Happy Travelers</p>
                </div>
              </div>
              <div className="col-6 col-md-3">
                <div className="stat-box">
                  <h3>4.8★</h3>
                  <p>Average Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONDITIONAL VIEWS */}
      {view === "booking" && selectedDestination ? (
        <BookingSection
          destination={selectedDestination}
          token={token}
          user={user}
          onBack={() => setView("home")}
        />
      ) : null}

      {view === "login" && (
        <AuthSection
          mode="login"
          setView={setView}
          setUser={setUser}
          setToken={setToken}
        />
      )}

      {view === "register" && (
        <AuthSection
          mode="register"
          setView={setView}
          setUser={setUser}
          setToken={setToken}
        />
      )}
       {view === "dashboard" && user && user.role === "user" && (
  <UserDashboard token={token} />
)}

{view === "admin" && user && user.role === "admin" && (
  <AdminDashboard token={token} />
)}

      {/* MAIN SECTIONS still show under hero, ignore view for them */}
      <DestinationsSection
        destinations={destinations}
        goToBooking={goToBooking}
      />
      <WhyUsSection />
      <GallerySection />
      <NewsletterSection onSubmit={handleSubscribe} />
      <FooterSection />
    </div>
  );
}

/* ---- Subcomponents ---- */

function DestinationsSection({ destinations, goToBooking }) {
  return (
    <section className="features" id="destinations">
      <div className="container">
        <h2 className="section-title">Featured Destinations</h2>
        <p className="section-subtitle">
          Explore our most popular travel packages curated just for you.
        </p>

        <div className="row g-4 mt-3">
          {destinations.map((d) => (
            <div className="col-md-4" key={d.id}>
              <div className="feature-box">
                <div className="feature-visual">
                  
                  <img src={d.image} alt={d.name} className="destination-img" />
                  <div className="price">
                    <p>${d.price}</p>
                  </div>
                  <div className="rating">
                    <span>{d.rating}★</span>
                  </div>
                </div>
                <div className="feature-details">
                  <h4>{d.name}</h4>
                  <p>{d.description}</p>
                  <div className="meta">
                    <span>
                      <i className="fa-solid fa-location-dot me-1"></i>
                      {d.location}
                    </span>
                    <span>
                      <i className="fa-regular fa-sun me-1"></i>
                      {d.days} Days
                    </span>
                    <span>
                      <i className="fa-regular fa-moon me-1"></i>
                      {d.nights} Nights
                    </span>
                  </div>
                  <button
                    className="btn btn-sm btn-primary w-100 mt-3"
                    onClick={() => goToBooking(d)}
                  >
                    Book This Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
          {destinations.length === 0 && (
            <p className="text-center text-muted mt-4">
              No destinations match your search.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function BookingSection({ destination, token, user, onBack }) {
  const [startDate, setStartDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [notes, setNotes] = useState("");

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!user || !token) {
      alert("Please login to book.");
      return;
    }

    fetch(`${API_BASE}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        destination_id: destination.id,
        start_date: startDate,
        travelers,
        special_requests: notes,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(`Error: ${data.error}`);
        } else {
          alert("Booking successful!");
          onBack();
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Booking failed");
      });
  };

  return (
    <section className="booking-section">
      <div className="container">
        <button className="btn btn-sm btn-outline-light mb-3" onClick={onBack}>
          ← Back
        </button>
        <h2 className="section-title">Book: {destination.name}</h2>
        <p className="section-subtitle">
          Complete your booking details below. Logged in as{" "}
          <strong>{user ? user.email : "Guest"}</strong>
        </p>

        <form className="booking-form" onSubmit={handleBookingSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label text-light">Start Date</label>
              <input
                type="date"
                className="form-control"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="col-md-4">
              <label className="form-label text-light">Travelers</label>
              <input
                type="number"
                min="1"
                className="form-control"
                value={travelers}
                onChange={(e) => setTravelers(parseInt(e.target.value || "1"))}
                required
              />
            </div>
            <div className="col-12">
              <label className="form-label text-light">
                Special Requests / Notes
              </label>
              <textarea
                className="form-control"
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-subscribe mt-3">
            Confirm Booking
          </button>
        </form>
      </div>
    </section>
  );
}

function AuthSection({ mode, setView, setUser, setToken }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isLogin = mode === "login";

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    fetch(`${API_BASE}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(
        isLogin ? { email, password } : { name, email, password }
      ),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else if (isLogin) {
          setUser(data.user);
          setToken(data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          localStorage.setItem("token", data.token);
          setView("home");
        } else {
          alert("Registered successfully. You can now login.");
          setView("login");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Request failed");
      });
  };

  return (
    <section className="auth-section">
      <div className="container auth-card">
        <h2 className="section-title">
          {isLogin ? "Login to GlobeTrek" : "Create an account"}
        </h2>
        <p className="section-subtitle">
          {isLogin ? "Access your trips and bookings." : "Start your journeys with us."}
        </p>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="mb-3">
              <label className="form-label text-light">Name</label>
              <input
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <label className="form-label text-light">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label text-light">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-subscribe w-100 mt-2">
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center mt-3 small">
          {isLogin ? "New here?" : "Already have an account?"}{" "}
          <button
            type="button"
            className="btn btn-link p-0 align-baseline"
            onClick={() => setView(isLogin ? "register" : "login")}
          >
            {isLogin ? "Create account" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
}
function UserDashboard({ token }) {
  const [bookings, setBookings] = useState([]);

  const loadBookings = () => {
    fetch(`${API_BASE}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setBookings)
      .catch(err =>
        console.error("User bookings fetch failed:", err)
      );
  };

  useEffect(() => {
    loadBookings();
  }, [token]);

  const handleCancel = (id) => {
    if (!window.confirm("Cancel this booking?")) return;

    fetch(`${API_BASE}/bookings/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Booking canceled!");
          loadBookings(); // Refresh UI
        }
      })
      .catch(err =>
        alert("Failed to cancel booking")
      );
  };

  return (
    <section className="dashboard-section">
      <div className="container">
        <h2 className="section-title mb-4">My Bookings</h2>

        {bookings.length === 0 && <p>No bookings found.</p>}

        {bookings.map(b => (
          <div key={b.id} className="dashboard-card d-flex justify-content-between align-items-center">
            
            <div>
              <h4>{b.name}</h4>
              <p><strong>Date:</strong> {new Date(b.start_date).toLocaleDateString()}</p>
              <p><strong>Travelers:</strong> {b.travelers}</p>
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

function AdminDashboard({ token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`${API_BASE}/bookings/all`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(setBookings)
      .catch(err => console.error("Admin bookings error:", err));
  }, [token]);

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


function WhyUsSection() {
  return (
    <section className="why-us" id="whyus">
      <div className="container">
        <h2 className="section-title">Why Travel With Us?</h2>
        <p className="section-subtitle">
          We handle everything so you can simply enjoy your journey.
        </p>

        <div className="row g-4 mt-3">
          <div className="col-md-4">
            <div className="info-card">
              <i className="fa-solid fa-hand-holding-dollar mb-3"></i>
              <h5>Best Price Guarantee</h5>
              <p>Transparent pricing, no hidden charges on your trips.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card">
              <i className="fa-solid fa-headset mb-3"></i>
              <h5>24/7 Support</h5>
              <p>We are here anytime, before and during your travel.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="info-card">
              <i className="fa-solid fa-shield-heart mb-3"></i>
              <h5>Safe &amp; Secure Trips</h5>
              <p>Curated partners and stays for your comfort.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  const galleryImages = [
    {
      city: "Los Angeles",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&q=80"
    },
    {
      city: "Paris",
      img: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=500&q=80"
    },
    {
      city: "Bali",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&q=80"
    },
    {
      city: "Dubai",
      img: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=500&q=80"
    }
  ];

  return (
    <section className="gallery" id="gallery">
      <div className="container">
        <h2 className="section-title">Travelling Gallery</h2>
        <p className="section-subtitle">
          A glimpse of the unforgettable moments from our travelers.
        </p>

        <div className="row g-4 mt-3">
          {galleryImages.map((item) => (
            <div className="col-6 col-md-3" key={item.city}>
              <div className="gallery-box">
                <img src={item.img} alt={item.city} className="gallery-img" />
                <div className="gallery-overlay">
                  <h4>{item.city}</h4>
                </div>
                <span className="gallery-orbit"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NewsletterSection({ onSubmit }) {
  return (
    <section className="newsletter">
      <div className="container">
        <div className="row align-items-center gy-3">
          <div className="col-md-6">
            <h3>Get Exclusive Offers in Your Inbox</h3>
            <p>Subscribe to receive updates on discounts, new trips and more.</p>
          </div>
          <div className="col-md-6">
            <form
              className="newsletter-form d-flex flex-column flex-sm-row gap-2"
              onSubmit={onSubmit}
            >
              <input
                type="email"
                className="form-control"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="btn btn-subscribe">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="footer" id="contact">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h5>GlobeTrek</h5>
            <p>
              Your trusted partner for memorable journeys, curated experiences,
              and handpicked stays.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Contact</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <i className="fa-solid fa-envelope me-2"></i>
                support@globetrek.com
              </li>
              <li>
                <i className="fa-solid fa-phone me-2"></i>
                +1-234-567-890
              </li>
              <li>
                <i className="fa-solid fa-location-dot me-2"></i>
                New York, USA
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="#">
                <i className="fa-brands fa-facebook-f"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-x-twitter"></i>
              </a>
              <a href="#">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
        </div>

        <hr className="mt-4" />
        <p className="text-center small mb-0">
          © 2025 GlobeTrek. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default App;
