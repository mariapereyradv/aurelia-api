const express = require('express');
const router = express.Router();
const {
  crearLibro,
  obtenerLibros,
  buscarPorGenero,
  agregarMaridajeVino
} = require('../controllers/libroController');

// Rutas CRUD básicas
router.route('/')
  .post(crearLibro)
  .get(obtenerLibros);

// Rutas específicas
router.get('/genero/:genero', buscarPorGenero);
router.post('/:id/maridaje/vino', agregarMaridajeVino);

module.exports = router;