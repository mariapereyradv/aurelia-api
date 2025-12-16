const Libro = require('../models/libro');

// Crear nuevo libro
exports.crearLibro = async (req, res) => {
  try {
    const libro = new Libro(req.body);
    await libro.save();
    res.status(201).json({ success: true, data: libro });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Obtener todos los libros
exports.obtenerLibros = async (req, res) => {
  try {
    const libros = await Libro.find()
      .populate('maridajeVinos.vinoId', 'nombre cepa')
      .populate('escritorId', 'nombre nacionalidad');
    res.status(200).json({ success: true, data: libros });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Buscar libros por género
exports.buscarPorGenero = async (req, res) => {
  try {
    const libros = await Libro.find({ genero: req.params.genero })
      .populate('maridajeVinos.vinoId');
    res.status(200).json({ success: true, data: libros });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Agregar vino a maridaje
exports.agregarMaridajeVino = async (req, res) => {
  try {
    const libro = await Libro.findById(req.params.id);
    if (!libro) {
      return res.status(404).json({ success: false, error: 'Libro no encontrado' });
    }
    
    libro.maridajeVinos.push(req.body);
    await libro.save();
    
    res.status(200).json({ success: true, data: libro });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};