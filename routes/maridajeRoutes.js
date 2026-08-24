const express = require("express");
const router = express.Router();
const {
  getMaridajes,
  crearMaridaje,
  actualizarMaridaje,
  eliminarMaridaje
} = require("../controllers/maridajeController");
const { protectar, esAdmin } = require("../middleware/authMiddleware");

router.get("/", protectar, getMaridajes);
router.post("/", protectar, esAdmin, crearMaridaje);
router.put("/:id", protectar, esAdmin, actualizarMaridaje);
router.delete("/:id", protectar, esAdmin, eliminarMaridaje);

module.exports = router;