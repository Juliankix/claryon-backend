const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { id_proceso, responsable, descripcion } = req.body;
  const query = "INSERT INTO etapa_equipos (id_proceso, responsable, descripcion) VALUES (?, ?, ?)";

  db.query(query, [id_proceso, responsable, descripcion], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Etapa equipos registrada", id: result.insertId });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM etapa_equipos", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
