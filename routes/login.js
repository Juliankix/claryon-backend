const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connection = require('../db');

const SECRET_KEY = "clave_secreta_super_segura"; // cámbiala y guárdala en .env

// Ruta de login
router.post('/', (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?";
    connection.query(sql, [email, password], (err, results) => {
        if (err) {
            console.error("Error en consulta SQL:", err); // 👈 Log para debug
            return res.status(500).json({ success: false, message: "Error en servidor" });
        }

        if (results.length > 0) {
            // Crear token válido por 1h
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });
            res.json({ success: true, token });
        } else {
            res.json({ success: false, message: "Credenciales incorrectas" });
        }
    });
});

module.exports = router;
