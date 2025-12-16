const express = require('express');
const router = express.Router();
const {
  crearVino,
  obtenerVinos,
  obtenerVino,
  actualizarVino,
  eliminarVino,
  buscarPorCepa,
  agregarMaridajeLibro
} = require('../controllers/vinoController');

// Rutas CRUD básicas
router.route('/')
  .post(crearVino)
  .get(obtenerVinos);

router.route('/:id')
  .get(obtenerVino)
  .put(actualizarVino)
  .delete(eliminarVino);

// Rutas específicas
router.get('/cepa/:cepa', buscarPorCepa);
router.post('/:id/maridaje/libro', agregarMaridajeLibro);

module.exports = router;