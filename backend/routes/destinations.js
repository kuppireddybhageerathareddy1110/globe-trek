// // backend/routes/destinations.js



// // backend/routes/destinations.js
// const express = require("express");
// const router = express.Router();
// const db = require("../db");

// // GET /api/destinations?q=paris
// router.get("/", async (req, res) => {
//   try {
//     const q = req.query.q || "";
//     if (q) {
//       const like = `%${q}%`;
//       const [rows] = await db.query(
//         "SELECT * FROM destinations WHERE name LIKE ? OR location LIKE ?",
//         [like, like]
//       );
//       return res.json(rows);
//     }
//     const [rows] = await db.query("SELECT * FROM destinations");
//     res.json(rows);
//   } catch (err) {
//     console.error("Error fetching destinations:", err);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const db = require("../db");

// GET /api/destinations?q=paris
router.get("/", async (req, res) => {
  try {
    const q = req.query.q || "";

    if (q.trim() !== "") {
      const like = `%${q}%`;
      const result = await db.query(
        "SELECT * FROM destinations WHERE name ILIKE $1 OR location ILIKE $2",
        [like, like]
      );
      return res.json(result.rows);
    }

    const result = await db.query("SELECT * FROM destinations");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching destinations:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
