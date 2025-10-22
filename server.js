const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

//---------------------------------------------------------------------------//

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

app.use(cors());
app.use(bodyParser.json());

// Importar rutas
const procesosRoutes = require('./routes/procesos');
const loginRoutes = require('./routes/login');
const etapaInicialRoutes = require('./routes/etapa_inicial');
const etapaBloqueoRoutes = require('./routes/etapa_bloqueo');
const etapaEquiposRoutes = require('./routes/etapa_equipos');
const etapaPlataformasRoutes = require('./routes/etapa_plataformas');
const etapaTelefonoRoutes = require('./routes/etapa_telefono');
const etapaAntivirusRoutes = require('./routes/etapa_antivirus');

// Middleware de autenticación
const { verificarToken, logout } = require('./middleware/auth');

// Prefijos de rutas públicas
app.use('/login', loginRoutes);

// Rutas protegidas con verificarToken
app.use('/procesos', verificarToken, procesosRoutes);
app.use('/etapa_inicial', verificarToken, etapaInicialRoutes);  
app.use('/etapa_bloqueo', verificarToken, etapaBloqueoRoutes);
app.use('/etapa_equipos', verificarToken, etapaEquiposRoutes);
app.use('/etapa_plataformas', verificarToken, etapaPlataformasRoutes);
app.use('/etapa_telefono', verificarToken, etapaTelefonoRoutes);
app.use('/etapa_antivirus', verificarToken, etapaAntivirusRoutes);

// Ruta para cerrar sesión
app.post('/logout', logout);

// Iniciar servidor
app.listen(3000, () => {
    //console.log("Servidor backend corriendo en http://localhost:3000");
});


/*
(async function() {

    // Configuration
    cloudinary.config({ 
        cloud_name: 'dlt6mllsz', 
        api_key: '458517279894261', 
        api_secret: 'xk86up8SLp5GfI5rQODpunKNM8Y' // Click 'View API Keys' above to copy your API secret
    });
    
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload(
           'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
               public_id: 'shoes',
           }
       )
       .catch((error) => {
           console.log(error);
       });
    
    console.log(uploadResult);
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
    
})();
*/
