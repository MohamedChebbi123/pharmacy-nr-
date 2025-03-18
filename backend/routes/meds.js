const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/addmeds", async(req, res) => {
  const { meds_name, company, age, type, price, quantity, description, image } = req.body;

  console.log("Received data:", req.body);

  if (!meds_name || !company || !age || !type || !price || !quantity || !description || !image) {
    console.error("Missing fields in request");
    return res.status(400).json({ error: "All fields are required." });
  }

  const query = "INSERT INTO meds (meds_name, company, age, type, price, quantity, description, image) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
try {
  const store=await db.query(query, [meds_name, company, age, type, price, quantity, description, image])
    return res.status(201).json({ message: "Medication added successfully" });
  
} catch (error) {
  console.error("Database error:", error);
      return res.status(500).json({ error: "Database error occurred." });
}
});

module.exports = router;
