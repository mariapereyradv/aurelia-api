const Libro = require('../models/libro');
const Maridaje = require('../models/maridaje');

exports.crearLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json({ success: true, data: libro });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find().populate('escritorId', 'nombre nacionalidad');
    res.status(200).json({ success: true, data: libros });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerLibro = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id).populate('escritorId', 'nombre nacionalidad');

    if (!libro) {
      return res.status(404).json({ success: false, error: 'Libro no encontrado' });
    }

    res.status(200).json({ success: true, data: libro });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.buscarPorGenero = async (req, res) => {
  try {
    const libros = await Libro.find({ genero: req.params.genero });
    res.status(200).json({ success: true, data: libros });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('escritorId', 'nombre nacionalidad');

    if (!libro) {
      return res.status(404).json({ success: false, error: 'Libro no encontrado' });
    }

    res.status(200).json({ success: true, data: libro });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.eliminarLibro = async (req, res) => {
  try {
    const libro = await Libro.findByIdAndDelete(req.params.id);

    if (!libro) {
      return res.status(404).json({ success: false, error: 'Libro no encontrado' });
    }

    res.status(200).json({
      success: true,
      message: 'Libro eliminado correctamente',
      data: libro
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reemplaza al viejo libro.maridajeVinos: el maridaje vive en la
// colección Maridaje, así que se consulta filtrando por libro.
exports.obtenerMaridajesDeLibro = async (req, res) => {
  try {
    const maridajes = await Maridaje.find({ libro: req.params.id }).populate('vino');
    res.status(200).json({ success: true, data: maridajes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};