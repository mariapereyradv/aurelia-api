// ==========================
// MODELO DE LIBRO
// ==========================
// El maridaje con vinos vive en la colección Maridaje (models/maridaje.js),
// no acá: evita tener la misma relación guardada en dos lugares.

const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es obligatorio']
  },
  autor: {
    type: String,
    required: [true, 'El autor es obligatorio']
  },
  genero: {
    type: String,
    required: [true, 'El género es obligatorio']
  },
  anioPublicacion: {
    type: Number
  },
  escritorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Escritor'
  }
});

module.exports = mongoose.model('Libro', libroSchema);