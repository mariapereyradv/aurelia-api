const Usuario = require("../models/usuario");
const jwt = require("jsonwebtoken");

// Se usa para crear un token de sesión que identifica al usuario y expira en 7 días.
const generarToken = (id, rol) => {
  return jwt.sign({ id, rol }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

exports.registrar = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({
        success: false,
        error: "El email ya está registrado",
      });
    }

    // El rol siempre es "usuario": el rol "admin" no se asigna por registro,
    // se crea una única vez mediante el script de seed (ver /seed/seedAdmin.js)
    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      rol: "usuario",
    });

    const token = generarToken(usuario._id, usuario.rol);
    res.status(201).json({
      success: true,
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          avatar: usuario.avatar,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      return res.status(401).json({
        success: false,
        error: "Credenciales incorrectas",
      });
    }

    const passwordCorrecto = await usuario.compararPassword(password);
    if (!passwordCorrecto) {
      return res.status(401).json({
        success: false,
        error: "Credenciales incorrectas",
      });
    }

    const token = generarToken(usuario._id, usuario.rol);

    res.status(200).json({
      success: true,
      data: {
        usuario: {
          id: usuario._id,
          nombre: usuario.nombre,
          email: usuario.email,
          rol: usuario.rol,
          avatar: usuario.avatar,
        },
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

exports.obtenerPerfil = async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.usuario.id).select("-password");

    res.status(200).json({
      success: true,
      data: usuario,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
