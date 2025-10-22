const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

// Conexión a la BD (igual que en server.js)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "pazysalvo"
});

// Ruta para registrar datos de etapa inicial
router.post("/", (req, res) => {
    const { identificador, nombre, apellido, correo, cargo, organizacion } = req.body;

    const sql = `
        INSERT INTO etapa_inicial (identificador, nombre, apellido, correo, cargo, organizacion)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [identificador, nombre, apellido, correo, cargo, organizacion], (err, result) => {
        if (err) {
            console.error("Error al insertar etapa inicial:", err);
            return res.status(500).json({ success: false, message: "Error en la BD" });
        }
        res.json({ success: true, message: "Etapa inicial guardada correctamente" });
    });
});

module.exports = router;
