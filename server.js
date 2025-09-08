const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a MySQL (XAMPP)
const db = mysql.createConnection({
    host: "localhost",
    user: "root", // usuario por defecto de XAMPP
    password: "", // vacío por defecto
    database: "pazysalvo"
});

db.connect(err => {
    if (err) {
        console.error("Error en la conexión a la BD:", err);
        return;
    }
    console.log("Conectado a MySQL (XAMPP)");
});

// Ruta de login
app.post("/login", (req, res) => {
    const { email, password } = req.body;  // usa las mismas claves que mandas en login.js

    const sql = "SELECT * FROM usuarios WHERE correo = ? AND contraseña = ?";
    db.query(sql, [email, password], (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: "Error en servidor" });
        }
        if (results.length > 0) {
            res.json({ success: true, message: "Login exitoso" });
        } else {
            res.json({ success: false, message: "Credenciales incorrectas" });
        }
    });
});

// Importar las rutas
const procesosRoutes = require('./routes/procesos');
app.use('/procesos', procesosRoutes);

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});

// Iniciar servidor
app.listen(3000, () => {
    console.log("Servidor backend corriendo en http://localhost:3000");
});
