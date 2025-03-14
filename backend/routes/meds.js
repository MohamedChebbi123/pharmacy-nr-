const express = require("express");
const router=express.Router();
const db = require("../db");
router.post("/addmeds", (req, res) => {
    const { meds_name, company, age, type, price, image } = req.body;
  
    console.log("Received data:", req.body); 
  
    if (!meds_name || !company || !age || !type || !price || !image) {
      console.error("Missing fields in request");
      return res.status(400).json({ error: "All fields are required." });
    }
    const query ="INSERT INTO meds (meds_name, company, age, type, price, image) VALUES (?, ?, ?, ?, ?, ?)";
  
    db.query(query, [meds_name, company, age, type, price, image], (err, result) => {
      return res.status(201).json({ message: "Medication added successfully" });
    });
  });

module.exports=router;