const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Importar rutas
const vinoRoutes = require('./routes/vinoRoutes');
const libroRoutes = require('./routes/libroRoutes');
const escritorRoutes = require('./routes/escritorRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error MongoDB:', err));

// Rutas
app.use('/api/vinos', vinoRoutes);
app.use('/api/libros', libroRoutes);
app.use('/api/escritores', escritorRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ 
    message: 'API de Maridaje Vinos-Libros funcionando',
    rutas: {
      vinos: '/api/vinos',
      libros: '/api/libros',
      escritores: '/api/escritores'
    }
  });
});

// Manejo de errores 404
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Ruta no encontrada' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});