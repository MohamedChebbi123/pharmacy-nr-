const express = require("express");
const router = express.Router();
const db = require("../db");



router.post("/loginclient", (req, res) => {
    const { phone_number, password } = req.body;
    console.log("Login request:", req.body);

    if (!phone_number || !password) {
        console.log("Missing field in request");
        return res.status(400).json({ error: "All fields are required." });
    }
    const query = "SELECT id_client FROM client WHERE phone_number = ? AND password = ?";
    
    db.query(query, [phone_number, password], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error occurred." });
        }
        if (result.length === 0) {
            return res.status(401).json({ error: "Invalid phone number or password." });
        }
        
        const id_client = result[0].id_client;
        console.log("Client ID:", id_client);
        
        
        res.send({ id_client: id_client });
    });
});


router.post("/insertmedscl", (req, res) => {
    const { id_client, id_meds } = req.body; 

    console.log("Insert meds request:", req.body);

    
    if (!id_client || !id_meds) {
        console.log("Missing field in request");
        return res.status(400).json({ error: "Both client ID and meds ID are required." });
    }

    
    const query = "INSERT INTO inventory (id_client, id_meds) VALUES (?, ?)";
    
    db.query(query, [id_client, id_meds], (err, result) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json({ error: "Database error occurred." });
        }
        console.log("Meds added to inventory:", result);
        return res.status(200).json({ message: "Meds added to inventory successfully." });
    });
});
router.get("/inventory/:id_client", (req, res) => {
    const id_client = req.params.id_client;
    
    const showInventory = 
        `SELECT meds.meds_name, meds.company, meds.age, meds.type, meds.price, 
                meds.description, meds.image, inventory.quantity 
         FROM inventory 
         INNER JOIN meds ON inventory.id_meds = meds.id 
         WHERE inventory.id_client = ?`;

    db.query(showInventory, [id_client], (err, results) => {
        if (err) {
            console.error("Error fetching inventory:", err);
            return res.status(500).json({ error: "Database query failed" });
        }
        res.json(results);
    });
});





module.exports = router;