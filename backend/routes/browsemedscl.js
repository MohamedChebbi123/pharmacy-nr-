const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/browsemeds",  (req, res) => {
   
    
    const search = req.query.search || "";
    const searchp = `%${search}%`;
    const sql = "SELECT * FROM meds WHERE meds_name LIKE ?";

    db.query(sql, [searchp], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
});

module.exports = router;