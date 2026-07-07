"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { API_BASE, fallbackDestinations, fetchDestinations } from "@/lib/api";

const navItems = ["Destinations", "Planner", "Stories", "Dashboard"];
const tripMoods = ["All", "Luxury", "Adventure", "Culture", "Wellness"];

function money(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

function Icon({ name }) {
  const icons = {
    compass: "M12 3l3.5 7.5L12 21 8.5 10.5 12 3Zm0 5.2-1.2 3.7 1.2 3.9 1.2-3.9L12 8.2Z",
    plane: "M3 11.2 21 3l-5.2 18-4.1-7.2-7.4 3.1 3.2-5.1L3 11.2Z",
    spark: "M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7L12 2Z",
    shield:
      "M12 3l7 3v5c0 4.4-2.8 8.4-7 10-4.2-1.6-7-5.6-7-10V6l7-3Z",
    route: "M6 5a3 3 0 1 0 0 6h12a3 3 0 1 1 0 6H7",
  };
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
      <path d={icons[name]} />
    </svg>
  );
}

export default function GlobeTrekExperience() {
  const [theme, setTheme] = useState("dark");
  const [destinations, setDestinations] = useState(fallbackDestinations);
  const [query, setQuery] = useState("");
  const [mood, setMood] = useState("All");
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [travelers, setTravelers] = useState(2);
  const [days, setDays] = useState(6);
  const [activeStory, setActiveStory] = useState(0);
  const [savedTrips, setSavedTrips] = useState(() => {
    if (typeof window === "undefined") return [];
    const storedTrips = localStorage.getItem("globetrek:savedTrips");
    return storedTrips ? JSON.parse(storedTrips) : [];
  });
  const [view, setView] = useState("home");
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    const storedUser = localStorage.getItem("globetrek:user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("globetrek:token") || "";
  });
  const [notice, setNotice] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem("globetrek:savedTrips", JSON.stringify(savedTrips));
  }, [savedTrips]);

  useEffect(() => {
    const timer = setInterval(
      () => setActiveStory((current) => (current + 1) % 3),
      4200
    );
    return () => clearInterval(timer);
  }, []);

  async function handleSearch(event) {
    event.preventDefault();
    const data = await fetchDestinations(query);
    setDestinations(data);
    setSelectedDestination(data[0] || null);
  }

  const filteredDestinations = useMemo(() => {
    return destinations.filter((destination) => {
      return mood === "All" || destination.vibe === mood;
    });
  }, [destinations, mood]);

  const featured = selectedDestination || filteredDestinations[0] || fallbackDestinations[0];
  const tripTotal = Number(featured.price || 0) * travelers;
  const dayRate = Math.round(tripTotal / Math.max(days, 1));

  function toggleSaved(destination) {
    setSavedTrips((current) => {
      const exists = current.some((trip) => trip.id === destination.id);
      if (exists) return current.filter((trip) => trip.id !== destination.id);
      return [...current, destination];
    });
  }

  function handleLogin(nextUser, nextToken) {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem("globetrek:user", JSON.stringify(nextUser));
    localStorage.setItem("globetrek:token", nextToken);
    setView("dashboard");
  }

  function handleLogout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("globetrek:user");
    localStorage.removeItem("globetrek:token");
    setView("home");
  }

  return (
    <main className="site-shell">
      <div className="aurora aurora-one" />
      <div className="aurora aurora-two" />

      <header className="nav glass-panel">
        <a className="brand" href="#home" aria-label="GlobeTrek home">
          <span className="brand-mark">GT</span>
          <span>GlobeTrek</span>
        </a>
        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="nav-actions">
          <button className="ghost-button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "Light" : "Dark"}
          </button>
          {user ? (
            <button className="brutal-button small" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <button className="brutal-button small" onClick={() => setView("auth")}>
              Login
            </button>
          )}
        </div>
      </header>

      <section className="hero section" id="home">
        <div className="hero-copy reveal">
          <p className="label">Book smarter journeys</p>
          <h1>Plan cinematic trips without spreadsheet chaos.</h1>
          <p className="hero-text">
            GlobeTrek blends curated destinations, quick booking, budget planning,
            saved itineraries, and dashboard control into one fast travel surface.
          </p>
          <form className="search-dock glass-panel" onSubmit={handleSearch}>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Bali, Kyoto, adventure..."
              aria-label="Search destinations"
            />
            <button className="brutal-button" type="submit">
              Search trips
            </button>
          </form>
          <div className="proof-strip">
            <span>120+ routes</span>
            <span>4.9 avg rating</span>
            <span>24/7 support</span>
          </div>
        </div>

        <div className="hero-stage reveal delay-one">
          <div className="passport-card glass-panel">
            <span className="stamp">LIVE ROUTE</span>
            <Image
              src={featured.image}
              alt={featured.name}
              width={900}
              height={620}
              priority
              unoptimized
            />
            <div className="passport-content">
              <div>
                <h2>{featured.name}</h2>
                <p>{featured.location}</p>
              </div>
              <strong>{money(featured.price)}</strong>
            </div>
          </div>
          <div className="floating-ticket brutal-card">
            <Icon name="plane" />
            <span>{featured.days || days} days</span>
            <strong>{featured.rating || 4.8}★</strong>
          </div>
          <div className="orbit-ring" />
        </div>
      </section>

      <section className="section destination-section" id="destinations">
        <div className="section-heading">
          <p className="label">Curated inventory</p>
          <h2>Destinations that feel selected, not dumped.</h2>
          <p>
            Search the live API when available; the UI keeps useful fallback trips
            for local demos and offline development.
          </p>
        </div>
        <div className="mood-tabs" role="tablist" aria-label="Trip mood filters">
          {tripMoods.map((item) => (
            <button
              key={item}
              className={mood === item ? "active" : ""}
              onClick={() => setMood(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="destination-grid">
          {filteredDestinations.map((destination, index) => {
            const saved = savedTrips.some((trip) => trip.id === destination.id);
            return (
              <article
                className="destination-card glass-panel"
                key={destination.id}
                style={{ "--delay": `${index * 70}ms` }}
              >
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={720}
                  height={420}
                  unoptimized
                />
                <div className="card-body">
                  <div className="card-meta">
                    <span>{destination.vibe || "Signature"}</span>
                    <span>{destination.rating || 4.7}★</span>
                  </div>
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <div className="trip-line">
                    <span>{destination.location}</span>
                    <strong>{money(destination.price)}</strong>
                  </div>
                  <div className="card-actions">
                    <button onClick={() => setSelectedDestination(destination)}>
                      Preview
                    </button>
                    <button onClick={() => toggleSaved(destination)}>
                      {saved ? "Saved" : "Save"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section planner-grid" id="planner">
        <div className="planner-copy">
          <p className="label">Interactive planner</p>
          <h2>Budget, pace, and book from one glass cockpit.</h2>
          <p>
            Tune travelers and trip length, preview daily spend, then send the
            booking to the existing Express API when authenticated.
          </p>
          <div className="feature-list">
            <span><Icon name="route" /> Smart itinerary pacing</span>
            <span><Icon name="shield" /> JWT booking protection</span>
            <span><Icon name="spark" /> Saved-trip shortlist</span>
          </div>
        </div>
        <BookingConsole
          destination={featured}
          travelers={travelers}
          setTravelers={setTravelers}
          days={days}
          setDays={setDays}
          tripTotal={tripTotal}
          dayRate={dayRate}
          token={token}
          setNotice={setNotice}
        />
      </section>

      <section className="section story-section" id="stories">
        <div className="section-heading">
          <p className="label">Traveler stories</p>
          <h2>Motion-rich social proof without clutter.</h2>
        </div>
        <div className="story-board">
          {[
            ["Maya", "Booked Kyoto in 8 minutes and had every day paced perfectly."],
            ["Arjun", "The budget preview helped my group agree before we paid."],
            ["Elena", "Saved trips made it easy to compare Iceland and Patagonia."],
          ].map(([name, quote], index) => (
            <button
              className={`story-card brutal-card ${activeStory === index ? "active" : ""}`}
              key={name}
              onClick={() => setActiveStory(index)}
            >
              <span>0{index + 1}</span>
              <p>“{quote}”</p>
              <strong>{name}</strong>
            </button>
          ))}
        </div>
      </section>

      <section className="section dashboard-panel glass-panel" id="dashboard">
        <div>
          <p className="label">Account workspace</p>
          <h2>{user ? `Welcome back, ${user.name}` : "Sign in to manage bookings."}</h2>
          <p>
            User dashboards show saved trips and protected booking actions. Admins
            can connect to the existing `/api/bookings/all` endpoint.
          </p>
        </div>
        {view === "auth" && <AuthPanel onLogin={handleLogin} setNotice={setNotice} />}
        {view !== "auth" && (
          <DashboardSnapshot user={user} savedTrips={savedTrips} token={token} />
        )}
      </section>

      {notice && (
        <div className="toast" role="status">
          {notice}
          <button onClick={() => setNotice("")}>×</button>
        </div>
      )}

      <footer className="footer">
        <strong>GlobeTrek</strong>
        <span>Next.js frontend · Express API · PostgreSQL persistence</span>
      </footer>
    </main>
  );
}

function BookingConsole({
  destination,
  travelers,
  setTravelers,
  days,
  setDays,
  tripTotal,
  dayRate,
  token,
  setNotice,
}) {
  const [startDate, setStartDate] = useState("");
  const [notes, setNotes] = useState("");

  async function submitBooking(event) {
    event.preventDefault();
    if (!token) {
      setNotice("Login is required before confirming a booking.");
      return;
    }
    try {
      const response = await fetch(`${API_BASE}/bookings`, {
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
      });
      const data = await response.json();
      setNotice(data.error || "Booking confirmed.");
    } catch {
      setNotice("Booking API unavailable. Try again when backend is running.");
    }
  }

  return (
    <form className="booking-console glass-panel" onSubmit={submitBooking}>
      <div className="console-top">
        <span>Selected route</span>
        <strong>{destination.name}</strong>
      </div>
      <label>
        Start date
        <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} required />
      </label>
      <label>
        Travelers: {travelers}
        <input type="range" min="1" max="8" value={travelers} onChange={(event) => setTravelers(Number(event.target.value))} />
      </label>
      <label>
        Trip length: {days} days
        <input type="range" min="3" max="14" value={days} onChange={(event) => setDays(Number(event.target.value))} />
      </label>
      <label>
        Notes
        <textarea value={notes} onChange={(event) => setNotes(event.target.value)} placeholder="Diet, pace, rooms, arrival time..." />
      </label>
      <div className="estimate brutal-card">
        <span>Total estimate</span>
        <strong>{money(tripTotal)}</strong>
        <small>{money(dayRate)} per day</small>
      </div>
      <button className="brutal-button" type="submit">
        Confirm booking
      </button>
    </form>
  );
}

function AuthPanel({ onLogin, setNotice }) {
  const [mode, setMode] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitAuth(event) {
    event.preventDefault();
    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    try {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          mode === "login" ? { email, password } : { name, email, password }
        ),
      });
      const data = await response.json();
      if (data.error) {
        setNotice(data.error);
        return;
      }
      if (mode === "register") {
        setNotice("Account created. Login with the same credentials.");
        setMode("login");
        return;
      }
      onLogin(data.user, data.token);
      setNotice("Logged in successfully.");
    } catch {
      setNotice("Auth API unavailable. Start backend or use deployed API.");
    }
  }

  return (
    <form className="auth-panel brutal-card" onSubmit={submitAuth}>
      <h3>{mode === "login" ? "Login" : "Create account"}</h3>
      {mode === "register" && (
        <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" required />
      )}
      <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required />
      <button className="brutal-button" type="submit">
        {mode === "login" ? "Login" : "Register"}
      </button>
      <button className="link-button" type="button" onClick={() => setMode(mode === "login" ? "register" : "login")}>
        {mode === "login" ? "Need an account?" : "Already registered?"}
      </button>
    </form>
  );
}

function DashboardSnapshot({ user, savedTrips, token }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (!token) return;
    fetch(`${API_BASE}/bookings/my`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => setBookings(Array.isArray(data) ? data : []))
      .catch(() => setBookings([]));
  }, [token]);

  return (
    <div className="dashboard-grid">
      <div className="metric-card brutal-card">
        <span>Saved trips</span>
        <strong>{savedTrips.length}</strong>
      </div>
      <div className="metric-card brutal-card">
        <span>Active bookings</span>
        <strong>{bookings.length}</strong>
      </div>
      <div className="saved-list">
        {(savedTrips.length ? savedTrips : fallbackDestinations.slice(0, 2)).map((trip) => (
          <div className="saved-row" key={trip.id}>
            <span>{trip.name}</span>
            <strong>{money(trip.price)}</strong>
          </div>
        ))}
        {!user && <small>Login to sync real booking data.</small>}
      </div>
    </div>
  );
}
