// middleware/auth.js
const jwt = require('jsonwebtoken');
const SECRET_KEY = "clave_secreta_super_segura";

let tokenBlacklist = [];

function verificarToken(req, res, next) {
    const token = req.headers['authorization']?.split(" ")[1];

    if (!token) {
        return res.status(403).json({ message: "Token requerido" });
    }

    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: "Token inválido (logout)" });
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token inválido o expirado" });
    }
}

function logout(req, res) {
    const token = req.headers['authorization']?.split(" ")[1];
    if (token) {
        tokenBlacklist.push(token);
    }
    res.json({ message: "Sesión cerrada correctamente" });
}

module.exports = { verificarToken, logout };
