const mongoose = require('mongoose');

const vinoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  cepa: {
    type: String,
    required: true,
    enum: ['Malbec', 'Cabernet Sauvignon', 'Merlot', 'Syrah', 'Chardonnay', 'Sauvignon Blanc', 'Pinot Noir', 'Bonarda', 'Tempranillo', 'Carmenere']
  },
  bodega: {
    type: String,
    trim: true
  },
  año: {
    type: Number,
    min: 1900,
    max: new Date().getFullYear()
  },
  descripcion: {
    type: String,
    trim: true
  },
  maridajeLibros: [{
    genero: {
      type: String,
      enum: ['Romance', 'Misterio', 'Acción', 'Fantasía', 'Ciencia Ficción', 'Terror', 'Histórica', 'Biografía', 'Poesía']
    },
    libroId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Libro'
    }
  }],
  escritoresRecomendados: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Escritor'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Vino', vinoSchema);