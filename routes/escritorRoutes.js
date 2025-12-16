const express = require('express');
const router = express.Router();
const {
  crearEscritor,
  obtenerEscritores,
  agregarVinoRecomendado,
  obtenerRecomendaciones
} = require('../controllers/escritorController');

// Rutas CRUD básicas
router.route('/')
  .post(crearEscritor)
  .get(obtenerEscritores);

// Rutas específicas
router.post('/:id/vino-recomendado', agregarVinoRecomendado);
router.get('/:id/recomendaciones', obtenerRecomendaciones);

module.exports = router;