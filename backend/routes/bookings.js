// // backend/routes/bookings.js
// const express = require("express");
// const jwt = require("jsonwebtoken");
// const db = require("../db");

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// // Middleware: Verify token
// function verifyToken(req, res, next) {
//   const authHeader = req.headers.authorization || "";
//   const token = authHeader.startsWith("Bearer ")
//     ? authHeader.slice(7)
//     : null;

//   if (!token) return res.status(401).json({ error: "No token provided" });

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     return res.status(401).json({ error: "Invalid token" });
//   }
// }

// // Middleware: Check Admin role
// function adminOnly(req, res, next) {
//   if (req.user.role !== "admin") {
//     return res.status(403).json({ error: "Admin access required" });
//   }
//   next();
// }

// /* 🔹 1️⃣ Create Booking */
// router.post("/", verifyToken, async (req, res) => {
//   try {
//     const { destination_id, start_date, travelers, special_requests } =
//       req.body;

//     if (!destination_id || !start_date || !travelers) {
//       return res.status(400).json({ error: "Missing booking fields" });
//     }

//     await db.query(
//       "INSERT INTO bookings (user_id, destination_id, start_date, travelers, special_requests) VALUES (?, ?, ?, ?, ?)",
//       [
//         req.user.id,
//         destination_id,
//         start_date,
//         travelers,
//         special_requests || null,
//       ]
//     );

//     res.json({ message: "Booking created successfully" });
//   } catch (err) {
//     console.error("Booking error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// /* 🔹 2️⃣ Get My Bookings (User Dashboard) */
// router.get("/my", verifyToken, async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       `SELECT b.id, d.name, d.price, b.start_date, b.travelers, b.special_requests
//        FROM bookings b
//        JOIN destinations d ON d.id = b.destination_id
//        WHERE b.user_id = ?
//        ORDER BY b.start_date DESC`,
//       [req.user.id]
//     );

//     res.json(rows);
//   } catch (err) {
//     console.error("My bookings error:", err);
//     res.status(500).json({ error: "Failed to load bookings" });
//   }
// });

// /* 🔹 3️⃣ Admin — View ALL bookings */
// router.get("/all", verifyToken, adminOnly, async (req, res) => {
//   try {
//     const [rows] = await db.query(
//       `SELECT b.id, u.name as user, u.email, d.name as destination,
//               b.start_date, b.travelers, b.special_requests
//        FROM bookings b
//        JOIN users u ON u.id = b.user_id
//        JOIN destinations d ON d.id = b.destination_id
//        ORDER BY b.id DESC`
//     );

//     res.json(rows);
//   } catch (err) {
//     console.error("Admin bookings error:", err);
//     res.status(500).json({ error: "Failed to load all bookings" });
//   }
// });
// /* 🔹 4️⃣ Cancel Booking (User Only) */
// router.delete("/:id", verifyToken, async (req, res) => {
//   try {
//     const bookingId = req.params.id;

//     const [result] = await db.query(
//       "DELETE FROM bookings WHERE id = ? AND user_id = ?",
//       [bookingId, req.user.id]
//     );

//     if (result.affectedRows === 0) {
//       return res.status(403).json({ error: "No permission or booking not found" });
//     }

//     res.json({ message: "Booking canceled successfully" });
//   } catch (err) {
//     console.error("Delete Error:", err);
//     res.status(500).json({ error: "Failed to cancel booking" });
//   }
// });


// module.exports = router;


const express = require("express");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// Middleware: Verify token
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : null;

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
}

// Middleware: Admin only
function adminOnly(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

/* 🔹 1️⃣ Create Booking */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { destination_id, start_date, travelers, special_requests } = req.body;

    if (!destination_id || !start_date || !travelers) {
      return res.status(400).json({ error: "Missing booking fields" });
    }

    await db.query(
      `INSERT INTO bookings (user_id, destination_id, start_date, travelers, special_requests)
       VALUES ($1, $2, $3, $4, $5)`,
      [
        req.user.id,
        destination_id,
        start_date,
        travelers,
        special_requests || null
      ]
    );

    res.json({ message: "Booking created successfully" });
  } catch (err) {
    console.error("Booking error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

/* 🔹 2️⃣ Get My Bookings */
router.get("/my", verifyToken, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT b.id, d.name, d.price, b.start_date, b.travelers, b.special_requests
       FROM bookings b
       JOIN destinations d ON d.id = b.destination_id
       WHERE b.user_id = $1
       ORDER BY b.start_date DESC`,
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("My bookings error:", err);
    res.status(500).json({ error: "Failed to load bookings" });
  }
});

/* 🔹 3️⃣ Admin — View ALL bookings */
router.get("/all", verifyToken, adminOnly, async (req, res) => {
  try {
    const result = await db.query(
      `SELECT b.id, u.name AS user, u.email, d.name AS destination,
              b.start_date, b.travelers, b.special_requests
       FROM bookings b
       JOIN users u ON u.id = b.user_id
       JOIN destinations d ON d.id = b.destination_id
       ORDER BY b.id DESC`
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Admin bookings error:", err);
    res.status(500).json({ error: "Failed to load all bookings" });
  }
});

/* 🔹 4️⃣ Cancel Booking */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const bookingId = req.params.id;

    const result = await db.query(
      "DELETE FROM bookings WHERE id = $1 AND user_id = $2",
      [bookingId, req.user.id]
    );

    if (result.rowCount === 0) {
      return res.status(403).json({ error: "No permission or booking not found" });
    }

    res.json({ message: "Booking canceled successfully" });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: "Failed to cancel booking" });
  }
});

module.exports = router;
