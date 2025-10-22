const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { id_proceso, responsable, numero } = req.body;
  const query = "INSERT INTO etapa_telefono (id_proceso, responsable, numero) VALUES (?, ?, ?)";

  db.query(query, [id_proceso, responsable, numero], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Etapa teléfono registrada", id: result.insertId });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM etapa_telefono", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
