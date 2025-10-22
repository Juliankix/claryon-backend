const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", (req, res) => {
  const { id_proceso, responsable, plataformas } = req.body;
  const query = "INSERT INTO etapa_plataformas (id_proceso, responsable, plataformas) VALUES (?, ?, ?)";

  db.query(query, [id_proceso, responsable, plataformas], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ mensaje: "Etapa plataformas registrada", id: result.insertId });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM etapa_plataformas", (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
                        