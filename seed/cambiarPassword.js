// ==========================
// CAMBIAR CONTRASEÑA DE UN USUARIO EXISTENTE
// ==========================
// A diferencia de seedAdmin.js (que solo crea el admin si no existe),
// este script busca un usuario por email y le actualiza la contraseña.
// (node seed/cambiarPassword.js)

require("dotenv").config();
const mongoose = require("mongoose");
const Usuario = require("../models/usuario");

const EMAIL_A_CAMBIAR = "aurelia@aureliasommelier.com";
const NUEVA_PASSWORD = "CAMBIAR_ANTES_DE_CORRER_EL_SCRIPT";

async function cambiarPassword() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Conectado a MongoDB");

    const usuario = await Usuario.findOne({ email: EMAIL_A_CAMBIAR });

    if (!usuario) {
      console.log(`⚠️  No existe ningún usuario con el email ${EMAIL_A_CAMBIAR}`);
    } else {
      usuario.password = NUEVA_PASSWORD;
      await usuario.save();

      console.log("✅ Contraseña actualizada correctamente:");
      console.log(`   Usuario: ${usuario.email} (rol: ${usuario.rol})`);
    }
  } catch (error) {
    console.error("❌ Error al cambiar la contraseña:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión cerrada.");
  }
}

cambiarPassword();