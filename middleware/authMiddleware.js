const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

// para verificar si el request contiene un token válido.

exports.protectar = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        error: 'No autorizado. Token requerido.'
      });
    }

    try {      
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aurelia_secreto');
      
      req.usuario = await Usuario.findById(decoded.id).select('-password');
      
      if (!req.usuario) {
        return res.status(401).json({
          success: false,
          error: 'Usuario no encontrado'
        });
      }
      
      next();
    } catch (error) {     
      return res.status(401).json({
        success: false,
        error: 'Token inválido o expirado'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// capa adicional para rutas del administrador.
exports.esAdmin = (req, res, next) => {
  if (req.usuario && req.usuario.rol === 'admin') {
    next();
  } else {
    res.status(403).json({
      success: false,
      error: 'Acceso denegado. Sólo para admin.'
    });
  }
};
