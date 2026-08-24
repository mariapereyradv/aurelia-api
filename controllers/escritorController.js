const Escritor = require('../models/escritor');
const Libro = require('../models/libro');

exports.crearEscritor = async (req, res) => {
  try {
    const escritor = new Escritor(req.body);
    await escritor.save();
    res.status(201).json({ success: true, data: escritor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.obtenerEscritores = async (req, res) => {
  try {
    const escritores = await Escritor.find()
      .populate('vinosRecomendados.vinoId', 'nombre cepa');
    res.status(200).json({ success: true, data: escritores });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerEscritor = async (req, res) => {
  try {
    const escritor = await Escritor.findById(req.params.id)
      .populate('vinosRecomendados.vinoId', 'nombre cepa bodega');

    if (!escritor) {
      return res.status(404).json({ success: false, error: 'Escritor no encontrado' });
    }

    res.status(200).json({ success: true, data: escritor });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reemplaza al viejo escritor.libros: la relación vive del lado del
// libro (libro.escritorId), así que se consulta de forma inversa.
exports.obtenerRecomendaciones = async (req, res) => {
  try {
    const escritor = await Escritor.findById(req.params.id)
      .populate('vinosRecomendados.vinoId');

    if (!escritor) {
      return res.status(404).json({ success: false, error: 'Escritor no encontrado' });
    }

    const libros = await Libro.find({ escritorId: escritor._id });

    res.status(200).json({
      success: true,
      data: {
        escritor: escritor.nombre,
        vinosRecomendados: escritor.vinosRecomendados,
        libros
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.actualizarEscritor = async (req, res) => {
  try {
    const escritor = await Escritor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('vinosRecomendados.vinoId');

    if (!escritor) {
      return res.status(404).json({ success: false, error: 'Escritor no encontrado' });
    }

    res.status(200).json({ success: true, data: escritor });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.eliminarEscritor = async (req, res) => {
  try {
    const escritor = await Escritor.findByIdAndDelete(req.params.id);

    if (!escritor) {
      return res.status(404).json({ success: false, error: 'Escritor no encontrado' });
    }

    res.status(200).json({
      success: true,
      message: 'Escritor eliminado correctamente',
      data: escritor
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.agregarVinoRecomendado = async (req, res) => {
  try {
    const escritor = await Escritor.findById(req.params.id);
    if (!escritor) {
      return res.status(404).json({ success: false, error: 'Escritor no encontrado' });
    }

    escritor.vinosRecomendados.push(req.body);
    await escritor.save();

    const escritorActualizado = await Escritor.findById(escritor._id)
      .populate('vinosRecomendados.vinoId', 'nombre cepa bodega');

    res.status(200).json({ success: true, data: escritorActualizado });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};