const express = require('express');
const router = express.Router();
const {
  crearVino,
  obtenerVinos,
  obtenerVino,
  actualizarVino,
  eliminarVino,
  buscarPorCepa,
  obtenerMaridajesDeVino,
  obtenerEscritoresQueRecomiendan
} = require('../controllers/vinoController');
const { protectar, esAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protectar, esAdmin, crearVino)
  .get(protectar, obtenerVinos);

router.route('/:id')
  .get(protectar, obtenerVino)
  .put(protectar, esAdmin, actualizarVino)
  .delete(protectar, esAdmin, eliminarVino);

router.get('/cepa/:cepa', protectar, buscarPorCepa);
router.get('/:id/maridajes', protectar, obtenerMaridajesDeVino);
router.get('/:id/escritores-recomendantes', protectar, obtenerEscritoresQueRecomiendan);

module.exports = router;