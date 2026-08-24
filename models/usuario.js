const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definimos el esquema de usuario
const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'La contraseña es obligatoria'],
    minlength: 6
  },
  rol: {
    type: String,
    enum: ['usuario', 'admin'],
    default: 'usuario'
  },
  avatar: {
    type: String,
    default: '/imagenes/default-avatar.jpg'
  }
});


// ENCRIPTAR CONTRASEÑA ANTES DE GUARDAR
usuarioSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // si no se modificó, no se vuelve a encriptar
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// COMPARAR CONTRASEÑA, para validar el login
usuarioSchema.methods.compararPassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
