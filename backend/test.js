// test.js
const db = require("./db");

db.query("SELECT NOW()")
  .then(res => console.log("DB Connected:", res.rows))
  .catch(err => console.error("Connection Error:", err));
