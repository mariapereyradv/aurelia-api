const Vino = require('../models/vino');
const Maridaje = require('../models/maridaje');
const Escritor = require('../models/escritor');

exports.crearVino = async (req, res) => {
  try {
    const vino = new Vino(req.body);
    await vino.save();
    res.status(201).json({ success: true, data: vino });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

exports.obtenerVinos = async (req, res) => {
  try {
    const vinos = await Vino.find();
    res.status(200).json({ success: true, data: vinos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

exports.obtenerVino = async (req, res) => {
  try {
    const vino = await Vino.findById(req.params.id);

    if (!vino) {
      return res.status(404).json({ success: false, error: 'Vino no encontrado' });
    }

    res.status(200).json({ success: true, data: vino });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

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

exports.buscarPorCepa = async (req, res) => {
  try {
    const vinos = await Vino.find({ cepa: req.params.cepa });
    res.status(200).json({ success: true, data: vinos });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reemplaza al viejo vino.maridajeLibros: el maridaje vive en la
// colección Maridaje, así que se consulta filtrando por vino.
exports.obtenerMaridajesDeVino = async (req, res) => {
  try {
    const maridajes = await Maridaje.find({ vino: req.params.id }).populate('libro');
    res.status(200).json({ success: true, data: maridajes });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Reemplaza al viejo vino.escritoresRecomendados: la relación vive
// del lado del escritor (escritor.vinosRecomendados), así que se
// consulta de forma inversa.
exports.obtenerEscritoresQueRecomiendan = async (req, res) => {
  try {
    const escritores = await Escritor.find(
      { 'vinosRecomendados.vinoId': req.params.id },
      'nombre nacionalidad'
    );
    res.status(200).json({ success: true, data: escritores });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};