const mongoose = require('mongoose');
require('dotenv').config();
const Vino = require('./models/vino');
const Libro = require('./models/libro');
const Escritor = require('./models/escritor');

mongoose.connect(process.env.MONGODB_URI);

const seedDatabase = async () => {
  try {
    // Limpiar colecciones
    await Vino.deleteMany({});
    await Libro.deleteMany({});
    await Escritor.deleteMany({});
    
    console.log('📦 Insertando datos de prueba...');
    
    // Crear escritores
    const escritor1 = await Escritor.create({
      nombre: 'Isabel Allende',
      nacionalidad: 'Chilena',
      generoPrincipal: 'Romance'
    });
    
    const escritor2 = await Escritor.create({
      nombre: 'Stephen King',
      nacionalidad: 'Estadounidense',
      generoPrincipal: 'Terror'
    });
    
    const escritor3 = await Escritor.create({
      nombre: 'J.K. Rowling',
      nacionalidad: 'Británica',
      generoPrincipal: 'Fantasía'
    });
    
    // Crear libros
    const libro1 = await Libro.create({
      titulo: 'La Casa de los Espíritus',
      autor: 'Isabel Allende',
      genero: 'Romance',
      añoPublicacion: 1982,
      escritorId: escritor1._id
    });
    
    const libro2 = await Libro.create({
      titulo: 'It',
      autor: 'Stephen King',
      genero: 'Terror',
      añoPublicacion: 1986,
      escritorId: escritor2._id
    });
    
    const libro3 = await Libro.create({
      titulo: 'Harry Potter y la Piedra Filosofal',
      autor: 'J.K. Rowling',
      genero: 'Fantasía',
      añoPublicacion: 1997,
      escritorId: escritor3._id
    });
    
    // Crear vinos
    const vino1 = await Vino.create({
      nombre: 'Catena Zapata Malbec',
      cepa: 'Malbec',
      bodega: 'Catena Zapata',
      año: 2020,
      descripcion: 'Vino intenso y estructurado'
    });
    
    const vino2 = await Vino.create({
      nombre: 'Concha y Toro Cabernet',
      cepa: 'Cabernet Sauvignon',
      bodega: 'Concha y Toro',
      año: 2019,
      descripcion: 'Vino robusto con taninos presentes'
    });
    
    const vino3 = await Vino.create({
      nombre: 'Santa Rita Chardonnay',
      cepa: 'Chardonnay',
      bodega: 'Santa Rita',
      año: 2021,
      descripcion: 'Vino fresco y afrutado'
    });
    
    // Actualizar relaciones
    escritor1.libros.push(libro1._id);
    escritor2.libros.push(libro2._id);
    escritor3.libros.push(libro3._id);
    
    escritor1.vinosRecomendados.push({ cepa: 'Malbec', vinoId: vino1._id });
    escritor2.vinosRecomendados.push({ cepa: 'Cabernet Sauvignon', vinoId: vino2._id });
    escritor3.vinosRecomendados.push({ cepa: 'Chardonnay', vinoId: vino3._id });
    
    await escritor1.save();
    await escritor2.save();
    await escritor3.save();
    
    libro1.maridajeVinos.push({ cepa: 'Malbec', vinoId: vino1._id });
    libro2.maridajeVinos.push({ cepa: 'Cabernet Sauvignon', vinoId: vino2._id });
    libro3.maridajeVinos.push({ cepa: 'Chardonnay', vinoId: vino3._id });
    
    await libro1.save();
    await libro2.save();
    await libro3.save();
    
    vino1.maridajeLibros.push({ genero: 'Romance', libroId: libro1._id });
    vino2.maridajeLibros.push({ genero: 'Terror', libroId: libro2._id });
    vino3.maridajeLibros.push({ genero: 'Fantasía', libroId: libro3._id });
    
    vino1.escritoresRecomendados.push(escritor1._id);
    vino2.escritoresRecomendados.push(escritor2._id);
    vino3.escritoresRecomendados.push(escritor3._id);
    
    await vino1.save();
    await vino2.save();
    await vino3.save();
    
    console.log('✅ Datos de prueba insertados correctamente');
    console.log('📚 Libros:', [libro1.titulo, libro2.titulo, libro3.titulo]);
    console.log('🍷 Vinos:', [vino1.nombre, vino2.nombre, vino3.nombre]);
    console.log('✍️ Escritores:', [escritor1.nombre, escritor2.nombre, escritor3.nombre]);
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
};

seedDatabase();