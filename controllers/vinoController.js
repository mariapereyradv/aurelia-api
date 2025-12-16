const Vino = require('../models/vino');

// Crear nuevo vino
exports.crearVino = async (req, res) => {
  try {
    const vino = new Vino(req.body);
    await vino.save();
    res.status(201).json({ success: true, data: vino });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Obtener todos los vinos
exports.obtenerVinos = async (req, res) => {
  try {
    const vinos = await Vino.find()
      .populate('maridajeLibros.libroId', 'titulo autor')
      .populate('escritoresRecomendados', 'nombre nacionalidad');
    res.status(200).json({ success: true, data: vinos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Obtener vino por ID
exports.obtenerVino = async (req, res) => {
  try {
    const vino = await Vino.findById(req.params.id)
      .populate('maridajeLibros.libroId')
      .populate('escritoresRecomendados');
    
    if (!vino) {
      return res.status(404).json({ success: false, error: 'Vino no encontrado' });
    }
    res.status(200).json({ success: true, data: vino });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Actualizar vino
exports.actualizarVino = async (req, res) => {
  try {
    const vino = await Vino.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!vino) {
      return res.status(404).json({ success: false, error: 'Vino no encontrado' });
    }
    res.status(200).json({ success: true, data: vino });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Eliminar vino
exports.eliminarVino = async (req, res) => {
  try {
    const vino = await Vino.findByIdAndDelete(req.params.id);
    
    if (!vino) {
      return res.status(404).json({ success: false, error: 'Vino no encontrado' });
    }
    res.status(200).json({ success: true, message: 'Vino eliminado' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar vinos por cepa
exports.buscarPorCepa = async (req, res) => {
  try {
    const vinos = await Vino.find({ cepa: req.params.cepa })
      .populate('maridajeLibros.libroId');
    res.status(200).json({ success: true, data: vinos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Agregar libro a maridaje
exports.agregarMaridajeLibro = async (req, res) => {
  try {
    const vino = await Vino.findById(req.params.id);
    if (!vino) {
      return res.status(404).json({ success: false, error: 'Vino no encontrado' });
    }
    
    vino.maridajeLibros.push(req.body);
    await vino.save();
    
    res.status(200).json({ success: true, data: vino });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};