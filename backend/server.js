// backend/server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const destinationsRoute = require("./routes/destinations");
const authRoute = require("./routes/auth");
const bookingsRoute = require("./routes/bookings");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://globetrek-lac.vercel.app",  // Vercel frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS: " + origin), false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("GlobeTrek API is running");
});

app.use("/api/destinations", destinationsRoute);
app.use("/api/auth", authRoute);
app.use("/api/bookings", bookingsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
