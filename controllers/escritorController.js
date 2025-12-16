const Escritor = require('../models/escritor');

// Crear nuevo escritor
exports.crearEscritor = async (req, res) => {
  try {
    const escritor = new Escritor(req.body);
    await escritor.save();
    res.status(201).json({ success: true, data: escritor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Obtener todos los escritores
exports.obtenerEscritores = async (req, res) => {
  try {
    const escritores = await Escritor.find()
      .populate('vinosRecomendados.vinoId', 'nombre cepa')
      .populate('libros', 'titulo genero');
    res.status(200).json({ success: true, data: escritores });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Agregar vino recomendado a escritor
exports.agregarVinoRecomendado = async (req, res) => {
  try {
    const escritor = await Escritor.findById(req.params.id);
    if (!escritor) {
      return res.status(404).json({ success: false, error: 'Escritor no encontrado' });
    }
    
    escritor.vinosRecomendados.push(req.body);
    await escritor.save();
    
    res.status(200).json({ success: true, data: escritor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// Obtener recomendaciones cruzadas
exports.obtenerRecomendaciones = async (req, res) => {
  try {
    const escritor = await Escritor.findById(req.params.id)
      .populate('vinosRecomendados.vinoId')
      .populate('libros');
    
    if (!escritor) {
      return res.status(404).json({ success: false, error: 'Escritor no encontrado' });
    }
    
    res.status(200).json({
      success: true,
      data: {
        escritor: escritor.nombre,
        vinosRecomendados: escritor.vinosRecomendados,
        libros: escritor.libros
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};