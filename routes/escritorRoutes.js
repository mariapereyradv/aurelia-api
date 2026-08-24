const express = require('express');
const router = express.Router();
const {
  crearEscritor,
  obtenerEscritores,
  obtenerEscritor,
  actualizarEscritor,
  eliminarEscritor,
  agregarVinoRecomendado,
  obtenerRecomendaciones
} = require('../controllers/escritorController');
const { protectar, esAdmin } = require('../middleware/authMiddleware');

router.route('/')
  .post(protectar, esAdmin, crearEscritor)
  .get(protectar, obtenerEscritores);

router.route('/:id')
  .get(protectar, obtenerEscritor)
  .put(protectar, esAdmin, actualizarEscritor)
  .delete(protectar, esAdmin, eliminarEscritor);

router.post('/:id/vino-recomendado', protectar, esAdmin, agregarVinoRecomendado);
router.get('/:id/recomendaciones', protectar, obtenerRecomendaciones);

module.exports = router;