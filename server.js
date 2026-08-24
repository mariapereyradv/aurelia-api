const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// -------------------------------------------
// VALIDACIÓN DE VARIABLES DE ENTORNO OBLIGATORIAS
// -------------------------------------------
// Si falta alguna, el servidor no arranca. Es preferible que falle acá,
// con un mensaje claro, a que arranque "a medias" y falle más tarde
// en medio de una petición real (por ejemplo, al firmar un JWT sin secreto).
const variablesRequeridas = ["MONGODB_URI", "JWT_SECRET"];
const faltantes = variablesRequeridas.filter((variable) => !process.env[variable]);

if (faltantes.length > 0) {
  console.error(`❌ Faltan variables de entorno obligatorias: ${faltantes.join(", ")}`);
  console.error("   Revisá el archivo .env antes de iniciar el servidor.");
  process.exit(1);
}

const vinoRoutes = require("./routes/vinoRoutes");
const libroRoutes = require("./routes/libroRoutes");
const escritorRoutes = require("./routes/escritorRoutes");
const authRoutes = require("./routes/authRoutes");
const maridajeRoutes = require("./routes/maridajeRoutes");
const consultaRoutes = require("./routes/consultaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ Conectado a MongoDB Atlas");

    app.use("/api/vinos", vinoRoutes);
    app.use("/api/libros", libroRoutes);
    app.use("/api/escritores", escritorRoutes);
    app.use("/api/auth", authRoutes);
    app.use("/api/maridajes", maridajeRoutes);
    app.use("/api/consultas", consultaRoutes);

    app.get("/", (req, res) => {
      res.json({
        message: "API Aurelia funcionando",
        version: "1.0.0",
      });
    });

    // Middleware 404 (siempre al final de las rutas)
    app.use((req, res) => {
      res.status(404).json({
        success: false,
        mensaje: "Ruta no encontrada",
      });
    });

    // Middleware de errores (siempre al final de todo)
    app.use((err, req, res, next) => {
      console.error(err);
      res.status(500).json({ success: false, mensaje: "Error interno del servidor" });
    });

    app.listen(PORT, () => {
      console.log(`🚀 Servidor activo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ No se pudo conectar a MongoDB:", err.message);
    process.exit(1);
  });