const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { id_proceso, responsable, detalle } = req.body;
  const query = "INSERT INTO etapa_bloqueo (id_proceso, responsable, detalle) VALUES (?, ?, ?)";

  db.query(query, [id_proceso, responsable, detalle], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Etapa bloqueo registrada", id: result.insertId });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM etapa_bloqueo", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
