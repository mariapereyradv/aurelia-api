const express = require('express');
const router = express.Router();
const {
  crearLibro,
  obtenerLibros,
  obtenerLibro,
  actualizarLibro,
  eliminarLibro,
  buscarPorGenero,
  obtenerMaridajesDeLibro
} = require('../controllers/libroController');
const { protectar, esAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protectar, esAdmin, crearLibro)
  .get(protectar, obtenerLibros);

router.route('/:id')
  .get(protectar, obtenerLibro)
  .put(protectar, esAdmin, actualizarLibro)
  .delete(protectar, esAdmin, eliminarLibro);

router.get('/genero/:genero', protectar, buscarPorGenero);
router.get('/:id/maridajes', protectar, obtenerMaridajesDeLibro);

module.exports = router;