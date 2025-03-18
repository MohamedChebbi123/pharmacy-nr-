const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/signupclient", async(req, res) => {
    const { name, family_name, phone_number, password, profile_picture } = req.body;
    console.log("received data", req.body);

    if (!name || !family_name || !phone_number || !password || !profile_picture) {
        console.log("missing field in request");
        return res.status(400).json({ error: "All fields are required." });
    }

    const query = "INSERT INTO client (name, family_name, phone_number, password, profile_picture) VALUES (?, ?, ?, ?, ?)";
   try {
       const store=await db.query(query, [name, family_name, phone_number, password, profile_picture]);
      return res.status(201).json({ message: "client added successfully" });

    } catch (error) {
        console.log("database error", error);
        return res.status(500).json({ error: "Database error occurred." });
    }
});

module.exports = router;