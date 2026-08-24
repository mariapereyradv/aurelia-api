// ==========================
// MODELO DE ESCRITOR
// ==========================
// vinosRecomendados es la única fuente de verdad para la relación
// escritor-vino (el vino no guarda una copia de esta lista).
// Los libros del escritor se consultan con Libro.find({ escritorId }),
// no se duplican acá.

const mongoose = require('mongoose');

const escritorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del escritor es obligatorio']
  },
  nacionalidad: String,
  generoPrincipal: String,
  vinosRecomendados: [
    {
      vinoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Vino' },
      cepa: String
    }
  ]
});

module.exports = mongoose.model('Escritor', escritorSchema);