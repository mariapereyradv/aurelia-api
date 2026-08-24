// ==========================
// RUTAS DE AUTENTICACIÓN
// ==========================

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

// Rutas públicas
router.post('/registrar', authController.registrar);
router.post('/login', authController.login);

// Ruta protegida
router.get('/perfil', authMiddleware.protectar, authController.obtenerPerfil);

module.exports = router;