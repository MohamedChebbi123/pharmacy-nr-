const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/signupadmin", (req, res) => {
    const { name, family_name, phone_number, password, profile_picture } = req.body;
    console.log("received data", req.body);

    // Validate required fields
    if (!name || !family_name || !phone_number || !password || !profile_picture) {
        console.log("missing field in request");
        return res.status(400).json({ error: "All fields are required." });
    }

    // Insert into database
    const query = "INSERT INTO admin (name, family_name, phone_number, password, profile_picture) VALUES (?, ?, ?, ?, ?)";
    db.query(query, [name, family_name, phone_number, password, profile_picture], (err, result) => {
        if (err) {
            console.log("database error", err);
            return res.status(500).json({ error: "Database error occurred." });
        }
        // Success response
        res.status(201).json({ message: "Admin added successfully" });
    });
});

module.exports = router;