const Maridaje = require("../models/maridaje");

// Obtener todos los maridajes
exports.getMaridajes = async (req, res) => {
  try {
    const maridajes = await Maridaje.find()
      .populate("libro")
      .populate("vino");
    res.json({ success: true, data: maridajes });
  } catch (error) {
    res.status(500).json({ success: false, mensaje: "Error obteniendo maridajes", error: error.message });
  }
};

// Crear nuevo maridaje
exports.crearMaridaje = async (req, res) => {
  try {
    const maridaje = await Maridaje.create(req.body);
    const maridajePopulado = await Maridaje.findById(maridaje._id).populate("libro").populate("vino");
    res.status(201).json({ success: true, data: maridajePopulado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Actualizar maridaje
exports.actualizarMaridaje = async (req, res) => {
  try {
    const maridaje = await Maridaje.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
      .populate("libro")
      .populate("vino");
    if (!maridaje) {
      return res.status(404).json({ success: false, error: "Maridaje no encontrado" });
    }
    res.status(200).json({ success: true, data: maridaje });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Eliminar maridaje
exports.eliminarMaridaje = async (req, res) => {
  try {
    const maridaje = await Maridaje.findByIdAndDelete(req.params.id);
    if (!maridaje) {
      return res.status(404).json({ success: false, error: "Maridaje no encontrado" });
    }
    res.status(200).json({ success: true, message: "Maridaje eliminado" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};