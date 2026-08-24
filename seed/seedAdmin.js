// ==========================
// SEED: CREACIÓN DEL USUARIO ADMIN
// ==========================
// Este script se corre UNA SOLA VEZ para crear al usuario administrador
// (la sommelier virtual Aurelia) directamente en la base de datos.
//
// Por qué existe este archivo:
// El rol "admin" ya no se asigna automáticamente por email en el registro
// (ver controllers/authController.js). El admin se crea acá, como dato
// inicial del sistema, igual que cualquier otro dato semilla.
//
// Por qué usa el modelo Usuario en vez de insertar directo en MongoDB:
// El modelo tiene un hook pre('save') que hashea el password con bcrypt
// antes de guardarlo (ver models/usuario.js). Si insertáramos el usuario
// a mano en la base (por ejemplo, desde MongoDB Atlas), el password
// quedaría en texto plano y el login fallaría, porque compararPassword()
// espera comparar contra un hash, no contra texto plano.
//
// Cómo se ejecuta (una sola vez, al desplegar o preparar el entorno):
//   node seed/seedAdmin.js

require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("../models/usuario");

// -------------------------------------------
// DATOS DEL ADMIN A CREAR
// -------------------------------------------
// Cambiar estos valores antes de correr el script si hace falta.
// El password se define acá solo para esta única ejecución;
// después de correr el script, no queda guardado en ningún lado
// más que en el hash dentro de la base de datos.
const ADMIN_DATA = {
  nombre: "Aurelia",
  email: "aurelia@aureliasommelier.com",
  password: "admin123",
  rol: "admin"
};

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    const existente = await Usuario.findOne({ email: ADMIN_DATA.email });

    if (existente) {
      console.log("⚠️  Ya existe un usuario con ese email. No se creó ningún admin nuevo.");
      console.log(`   Usuario existente: ${existente.email} (rol: ${existente.rol})`);
    } else {
      const admin = await Usuario.create(ADMIN_DATA);
      console.log("✅ Usuario admin creado correctamente:");
      console.log(`   Nombre: ${admin.nombre}`);
      console.log(`   Email: ${admin.email}`);
      console.log(`   Rol: ${admin.rol}`);
    }
  } catch (error) {
    console.error("❌ Error al crear el admin:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión cerrada.");
  }
}

seedAdmin();