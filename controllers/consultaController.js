const Consulta = require("../models/consulta");

// Solo el admin puede ver, actualizar y eliminar consultas (ver routes/consultaRoutes.js)

exports.crearConsulta = async (req, res) => {
  try {
    // req.usuario lo deja disponible el middleware "protectar".
    // Se agrega acá porque el modelo espera guardar quién hizo la consulta.
    const consulta = await Consulta.create({
      ...req.body,
      usuarioId: req.usuario.id
    });
    res.status(201).json({
      success: true,
      message: "Tu consulta fue enviada. Aurelia te responderá pronto.",
      data: consulta
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.obtenerConsultas = async (req, res) => {
  try {
    const consultas = await Consulta.find()
      .populate("usuarioId", "nombre email")
      .sort({ fecha: -1 });
    res.status(200).json({ success: true, data: consultas });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarEstado = async (req, res) => {
  try {
    const { estado } = req.body;
    if (!["nuevo", "leido", "respondido"].includes(estado)) {
      return res.status(400).json({ success: false, error: "Estado no válido" });
    }

    const consulta = await Consulta.findByIdAndUpdate(
      req.params.id,
      { estado },
      { new: true }
    );

    if (!consulta) {
      return res.status(404).json({ success: false, error: "Consulta no encontrada" });
    }
    res.status(200).json({ success: true, data: consulta });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.eliminarConsulta = async (req, res) => {
  try {
    const consulta = await Consulta.findByIdAndDelete(req.params.id);
    if (!consulta) {
      return res.status(404).json({ success: false, error: "Consulta no encontrada" });
    }
    res.status(200).json({ success: true, message: "Consulta eliminada" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};