// ==========================
// RUTAS DE CONSULTAS
// ==========================
// Endpoints para que los usuarios envíen consultas
// y el admin las gestione.

const express = require("express");
const router = express.Router();
const { 
  crearConsulta, 
  obtenerConsultas, 
  actualizarEstado, 
  eliminarConsulta 
} = require("../controllers/consultaController");
const { protectar, esAdmin } = require("../middleware/authMiddleware");

// Ruta pública: enviar consulta (requiere estar logueado)
router.post("/", protectar, crearConsulta);

// Rutas protegidas para admin
router.get("/", protectar, esAdmin, obtenerConsultas);
router.put("/:id/estado", protectar, esAdmin, actualizarEstado);
router.delete("/:id", protectar, esAdmin, eliminarConsulta);

module.exports = router;