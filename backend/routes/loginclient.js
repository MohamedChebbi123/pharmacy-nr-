const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/loginclient", (req, res) => {
    const { phone_number, password } = req.body;
    console.log("login", req.body);

    if (!phone_number || !password) {
        console.log("missing field in request");
        return res.status(400).json({ error: "All fields are required." });
    }

    const query = "SELECT * FROM client WHERE phone_number = ? AND password = ?";
    db.query(query, [phone_number, password], (err, result) => {
        if (err) {
            console.log("database error", err);
            return res.status(500).json({ error: "Database error occurred." });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid phone number or password." });
        }
        res.json({ message: "Login successful" });
    });
});

module.exports = router;