// // backend/routes/auth.js
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const db = require("../db");

// const router = express.Router();
// const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// // Register
// router.post("/register", async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const [existing] = await db.query("SELECT id FROM users WHERE email = ?", [
//       email,
//     ]);
//     if (existing.length > 0) {
//       return res.status(400).json({ error: "Email already registered" });
//     }

//     const hash = await bcrypt.hash(password, 10);

//     await db.query(
//       "INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, 'user')",
//       [name, email, hash]
//     );

//     res.json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Register error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// // Login
// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ error: "Email and password required" });

//     const [rows] = await db.query(
//       "SELECT id, name, email, role, password_hash FROM users WHERE email = ?",
//       [email]
//     );

//     if (rows.length === 0)
//       return res.status(400).json({ error: "Invalid credentials" });

//     const user = rows[0];

//     const isMatch = await bcrypt.compare(password, user.password_hash);
//     if (!isMatch)
//       return res.status(400).json({ error: "Invalid credentials" });

//     const token = jwt.sign(
//       { id: user.id, email: user.email, name: user.name, role: user.role },
//       JWT_SECRET,
//       { expiresIn: "2h" }
//     );

//     res.json({
//       token,
//       user: {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;


// backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../db");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "dev_secret_change_me";

// Register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existing = await db.query(
      "SELECT id FROM users WHERE email = $1",
      [email]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hash = await bcrypt.hash(password, 10);

    const insertUser = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, 'user') RETURNING id, name, email, role",
      [name, email, hash]
    );

    res.json({
      message: "User registered successfully",
      user: insertUser.rows[0],
    });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ error: "Email and password required" });

    const result = await db.query(
      "SELECT id, name, email, role, password FROM users WHERE email = $1",
      [email]
    );

    if (result.rows.length === 0)
      return res.status(400).json({ error: "Invalid credentials" });

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
