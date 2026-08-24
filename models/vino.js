// ==========================
// MODELO DE VINO
// ==========================
// El maridaje con libros vive en la colección Maridaje (models/maridaje.js),
// no acá: evita tener la misma relación guardada en dos lugares.
// Igual con las recomendaciones de escritores: la fuente de verdad es
// escritor.vinosRecomendados (models/escritor.js). Para saber qué
// escritores recomiendan un vino, se consulta desde ese lado.

const mongoose = require("mongoose");

const vinoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, "El nombre del vino es obligatorio"],
  },
  cepa: {
    type: String,
    required: [true, "La cepa es obligatoria"],
  },
  bodega: String,
  anio: Number,
  descripcion: String,
});

module.exports = mongoose.model("Vino", vinoSchema);