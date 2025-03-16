const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/addmeds", (req, res) => {
  const { meds_name, company, age, type, price, quantity, description, image } = req.body;

  console.log("Received data:", req.body);

  if (!meds_name || !company || !age || !type || !price || !quantity || !description || !image) {
    console.error("Missing fields in request");
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = "INSERT INTO meds (meds_name, company, age, type, price, quantity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(query, [meds_name, company, age, type, price, quantity, description, image], (err, res) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ error: "Database error occurred." });
    }
    res.status(201).json({ message: "Medication added successfully" });
  });
});

module.exports = router;
