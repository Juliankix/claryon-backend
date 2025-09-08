const express = require('express');
const router = express.Router();
const connection = require('../db');

// Crear un nuevo proceso
router.post('/', (req, res) => {
  const { identificador, nombre, apellido, correo, cargo, organizacion } = req.body;

  const sql = `INSERT INTO procesos (identificador, nombre, apellido, correo, cargo, organizacion)
               VALUES (?, ?, ?, ?, ?, ?)`;

  connection.query(sql, [identificador, nombre, apellido, correo, cargo, organizacion], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Proceso creado correctamente', identificador });
  });
});

module.exports = router;
