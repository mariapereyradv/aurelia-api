const mongoose = require("mongoose");

const maridajeSchema = new mongoose.Schema(
  {
    libro: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Libro",
      required: true,
    },
    vino: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vino",
      required: true,
    },
    textoAurelia: {
      type: String,
      required: true,
      trim: true,
    },
    etiquetas: [
      {
        type: String,
        trim: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Maridaje", maridajeSchema);
