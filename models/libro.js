const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  autor: {
    type: String,
    required: true,
    trim: true
  },
  genero: {
    type: String,
    required: true,
    enum: ['Romance', 'Misterio', 'Acción', 'Fantasía', 'Ciencia Ficción', 'Terror', 'Histórica', 'Biografía', 'Poesía']
  },
  añoPublicacion: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear()
  },
  sinopsis: {
    type: String,
    trim: true
  },
  maridajeVinos: [{
    cepa: {
      type: String,
      enum: ['Malbec', 'Cabernet Sauvignon', 'Merlot', 'Syrah', 'Chardonnay', 'Sauvignon Blanc', 'Pinot Noir', 'Bonarda', 'Tempranillo', 'Carmenere']
    },
    vinoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vino'
    }
  }],
  escritorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Escritor'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Libro', libroSchema);