const mongoose = require("mongoose");

const consultaSchema = new mongoose.Schema({
  
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"]
  },
  email: {
    type: String,
    required: [true, "El email es obligatorio"]
  },
  servicio: {
    type: String,
    required: [true, "El servicio es obligatorio"]
  }, 
  mensaje: {
    type: String,
    required: [true, "El mensaje es obligatorio"]
  },
   usuarioId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario"
  },
  estado: {
    type: String,
    enum: ["nuevo", "leido", "respondido"],
    default: "nuevo"
  }, 
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Consulta", consultaSchema);