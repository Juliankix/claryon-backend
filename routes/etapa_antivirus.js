const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { id_proceso, responsable, estado } = req.body;
  const query = "INSERT INTO etapa_antivirus (id_proceso, responsable, estado) VALUES (?, ?, ?)";

  db.query(query, [id_proceso, responsable, estado], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Etapa antivirus registrada", id: result.insertId });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM etapa_antivirus", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
