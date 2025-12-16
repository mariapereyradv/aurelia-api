const mongoose = require('mongoose');

const escritorSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  nacionalidad: {
    type: String,
    trim: true
  },
  generoPrincipal: {
    type: String,
    enum: ['Romance', 'Misterio', 'Acción', 'Fantasía', 'Ciencia Ficción', 'Terror', 'Histórica', 'Biografía', 'Poesía', 'Varios']
  },
  biografia: {
    type: String,
    trim: true
  },
  vinosRecomendados: [{
    cepa: {
      type: String,
      enum: ['Malbec', 'Cabernet Sauvignon', 'Merlot', 'Syrah', 'Chardonnay', 'Sauvignon Blanc', 'Pinot Noir', 'Bonarda', 'Tempranillo', 'Carmenere']
    },
    vinoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Vino'
    }
  }],
  libros: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Libro'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Escritor', escritorSchema);