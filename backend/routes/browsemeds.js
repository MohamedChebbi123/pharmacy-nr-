const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/browsemeds", (req, res) => {
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

router.delete("/browsemeds/:id", (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM meds WHERE id = ?";
    
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Medicine not found" });
        }
        res.json({ message: "Medication deleted successfully" });
    });
});

module.exports = router;
