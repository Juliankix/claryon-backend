const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "db-claryon.cromckmmkg4n.us-east-2.rds.amazonaws.com",
    user: "sistemas", // usuario por defecto de XAMPP
    password: "Atica2025*", // vacío por defecto
    database: "db_claryon",
    port: 3306
});

connection.connect(err => {
    if (err) {
        console.error("Error en la conexión a la BD:", err);
        return;
    }
    console.log("Conectado a DB");
});

module.exports = connection;