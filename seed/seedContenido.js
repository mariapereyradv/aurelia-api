// ==============================================
// SEED DE CONTENIDO — VINOS, LIBROS, ESCRITORES Y MARIDAJES
// ==============================================
// Carga el catálogo base de Aurelia. No crea usuarios (ver seedAdmin.js
// para el admin; el resto de los usuarios se registra por /api/auth/registrar).
//
// Limpia las colecciones de contenido antes de insertar, así que es seguro
// correrlo varias veces en desarrollo. NO limpia usuarios.
//
// Ejecutar con: node seed/seedContenido.js

const mongoose = require("mongoose");
require("dotenv").config();

const Vino = require("../models/vino");
const Libro = require("../models/libro");
const Escritor = require("../models/escritor");
const Maridaje = require("../models/maridaje");

async function seedContenido() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a MongoDB");

    console.log("Limpiando colecciones de contenido...");
    await Vino.deleteMany({});
    await Libro.deleteMany({});
    await Escritor.deleteMany({});
    await Maridaje.deleteMany({});

    const escritoresData = [
      { nombre: "Jorge Luis Borges", nacionalidad: "Argentina", generoPrincipal: "Filosófico" },
      { nombre: "Ernest Hemingway", nacionalidad: "EE.UU.", generoPrincipal: "Realista" },
      { nombre: "Haruki Murakami", nacionalidad: "Japón", generoPrincipal: "Contemporáneo / Onírico" },
      { nombre: "Isabel Allende", nacionalidad: "Chile", generoPrincipal: "Realismo mágico" },
      { nombre: "Alejandra Pizarnik", nacionalidad: "Argentina", generoPrincipal: "Poesía / Existencialismo" },
      { nombre: "Gabriel García Márquez", nacionalidad: "Colombia", generoPrincipal: "Realismo mágico" },
      { nombre: "Julio Cortázar", nacionalidad: "Argentina", generoPrincipal: "Experimental / Surrealismo" },
      { nombre: "Yasunari Kawabata", nacionalidad: "Japón", generoPrincipal: "Minimalismo / Contemplativo" },
      { nombre: "Chimamanda Ngozi Adichie", nacionalidad: "Nigeria", generoPrincipal: "Narrativa social / Identidad" },
      { nombre: "Clarice Lispector", nacionalidad: "Brasil", generoPrincipal: "Introspectivo / Filosófico" },
    ];
    const escritores = await Escritor.insertMany(escritoresData);
    console.log(`Escritores insertados: ${escritores.length}`);

    const vinosData = [
      { nombre: "Malbec Mendoza", cepa: "Malbec", bodega: "Mendoza", anio: 2021, descripcion: "Profundo, amable y persistente, como una conversación larga al atardecer." },
      { nombre: "Cabernet Sauvignon Mendoza", cepa: "Cabernet Sauvignon", bodega: "Mendoza", anio: 2020, descripcion: "Firme, elegante, ideal para pensamientos intensos y libros con peso." },
      { nombre: "Torrontés Salta", cepa: "Torrontés", bodega: "Salta", anio: 2022, descripcion: "Aromático y alegre, perfecto para tardes luminosas y poesía ligera." },
      { nombre: "Pinot Noir Patagonia", cepa: "Pinot Noir", bodega: "Patagonia", anio: 2021, descripcion: "Ligero y melancólico, se abre despacio como los recuerdos." },
      { nombre: "Cabernet Franc Mendoza", cepa: "Cabernet Franc", bodega: "Mendoza", anio: 2020, descripcion: "Sutil y estructurado, con un fondo que se descubre lentamente." },
      { nombre: "Syrah La Rioja", cepa: "Syrah", bodega: "La Rioja", anio: 2019, descripcion: "Con carácter y fuerza, un vino que te hace sentir vivo." },
      { nombre: "Bonarda San Juan", cepa: "Bonarda", bodega: "San Juan", anio: 2021, descripcion: "Frutal, envolvente, con ese calorcito del norte que invita a compartir." },
      { nombre: "Semillón Patagonia", cepa: "Semillón", bodega: "Patagonia", anio: 2022, descripcion: "Delicado, fresco y un poco tímido, como quien observa antes de hablar." },
      { nombre: "Petit Verdot Mendoza", cepa: "Petit Verdot", bodega: "Mendoza", anio: 2020, descripcion: "Complejo y elegante, como un pensamiento bien estructurado." },
      { nombre: "Criolla Chica Catamarca", cepa: "Criolla Chica", bodega: "Catamarca", anio: 2021, descripcion: "Simple y honesto, un vino que sonríe sin presumir." },
      { nombre: "Tannat Salta", cepa: "Tannat", bodega: "Salta", anio: 2020, descripcion: "Fuerte, honesto, con la dignidad tranquila de quien resiste." },
      { nombre: "Merlot San Juan", cepa: "Merlot", bodega: "San Juan", anio: 2021, descripcion: "Suave y emocional, ideal para leer despacio." },
      { nombre: "Pinot Gris Patagonia", cepa: "Pinot Gris", bodega: "Patagonia", anio: 2022, descripcion: "Sutil y sensible, brilla por lo que calla." },
    ];
    const vinos = await Vino.insertMany(vinosData);
    console.log(`Vinos insertados: ${vinos.length}`);

    const buscarEscritor = (nombre) => escritores.find((e) => e.nombre === nombre)._id;

    const librosData = [
      { titulo: "El Aleph", autor: "Jorge Luis Borges", genero: "Filosófico / Fantástico", anioPublicacion: 1945 },
      { titulo: "Ficciones", autor: "Jorge Luis Borges", genero: "Metaficción", anioPublicacion: 1944 },
      { titulo: "El viejo y el mar", autor: "Ernest Hemingway", genero: "Aventura introspectiva", anioPublicacion: 1952 },
      { titulo: "Por quién doblan las campanas", autor: "Ernest Hemingway", genero: "Drama / Bélico", anioPublicacion: 1940 },
      { titulo: "Tokio Blues", autor: "Haruki Murakami", genero: "Drama contemporáneo", anioPublicacion: 1987 },
      { titulo: "Kafka en la orilla", autor: "Haruki Murakami", genero: "Fantasía moderna", anioPublicacion: 2002 },
      { titulo: "La casa de los espíritus", autor: "Isabel Allende", genero: "Realismo mágico", anioPublicacion: 1982 },
      { titulo: "Eva Luna", autor: "Isabel Allende", genero: "Romance / Realismo mágico", anioPublicacion: 1987 },
      { titulo: "Extracción de la piedra de locura", autor: "Alejandra Pizarnik", genero: "Poesía / Existencialismo", anioPublicacion: 1968 },
      { titulo: "Los trabajos y las noches", autor: "Alejandra Pizarnik", genero: "Poesía", anioPublicacion: 1965 },
      { titulo: "Cien años de soledad", autor: "Gabriel García Márquez", genero: "Realismo mágico", anioPublicacion: 1967 },
      { titulo: "El amor en los tiempos del cólera", autor: "Gabriel García Márquez", genero: "Romance / Drama", anioPublicacion: 1985 },
      { titulo: "Rayuela", autor: "Julio Cortázar", genero: "Experimental", anioPublicacion: 1963 },
      { titulo: "Bestiario", autor: "Julio Cortázar", genero: "Surrealismo / Cuento", anioPublicacion: 1951 },
      { titulo: "País de nieve", autor: "Yasunari Kawabata", genero: "Minimalista / Romance", anioPublicacion: 1948 },
      { titulo: "Lo bello y lo triste", autor: "Yasunari Kawabata", genero: "Drama psicológico", anioPublicacion: 1965 },
      { titulo: "Americanah", autor: "Chimamanda Ngozi Adichie", genero: "Narrativa social", anioPublicacion: 2013 },
      { titulo: "Todos deberíamos ser feministas", autor: "Chimamanda Ngozi Adichie", genero: "Ensayo", anioPublicacion: 2014 },
      { titulo: "La hora de la estrella", autor: "Clarice Lispector", genero: "Introspectivo / Filosófico", anioPublicacion: 1977 },
      { titulo: "Agua viva", autor: "Clarice Lispector", genero: "Poético / Filosófico", anioPublicacion: 1973 },
    ].map((libro) => ({ ...libro, escritorId: buscarEscritor(libro.autor) }));

    const libros = await Libro.insertMany(librosData);
    console.log(`Libros insertados: ${libros.length}`);

    const maridajesData = [
      { libro: "El viejo y el mar", cepa: "Tannat", bodega: "Salta", textoAurelia: "Este vino tiene la fuerza tranquila de Santiago. Duro, honesto, pero lleno de dignidad. Me gusta porque, como el viejo pescador, resiste sin perder la calma." },
      { libro: "Kafka en la orilla", cepa: "Pinot Noir", bodega: "Patagonia", textoAurelia: "Ligero y profundo, como un sueño que no sabés si fue real. A veces los vinos y los libros más suaves son los que más te cambian." },
      { libro: "Cien años de soledad", cepa: "Bonarda", bodega: "San Juan", textoAurelia: "Un vino que parece haber nacido con historia. Te envuelve, te cuenta algo y no querés que termine. Como Macondo, tiene magia y memoria." },
      { libro: "Rayuela", cepa: "Malbec", bodega: "Mendoza", textoAurelia: "Rayuela es como un Malbec mendocino: intenso, libre y cambiante. Nunca sabés a dónde te va a llevar, pero disfrutás cada sorbo y cada página." },
      { libro: "La casa de los espíritus", cepa: "Merlot", bodega: "San Juan", textoAurelia: "Suave y emocional, como los recuerdos que se heredan. Ideal para leer despacio, copa en mano." },
      { libro: "El Aleph", cepa: "Cabernet Franc", bodega: "Mendoza", textoAurelia: "Un vino que parece tener infinitas capas. Preciso, elegante, imposible de abarcar del todo. Como el Aleph, encierra un universo en una gota." },
      { libro: "País de nieve", cepa: "Semillón", bodega: "Patagonia", textoAurelia: "Puro, delicado, casi silencioso. Este vino no grita, susurra. Como la nieve de Kawabata, te deja pensando después del último trago." },
      { libro: "Todos deberíamos ser feministas", cepa: "Criolla Chica", bodega: "Catamarca", textoAurelia: "Sencilla y honesta, sin adornos. Este vino dice la verdad sin miedo, igual que el libro de Chimamanda." },
      { libro: "El amor en los tiempos del cólera", cepa: "Malbec", bodega: "Mendoza", textoAurelia: "Una historia que envejece bien, como un buen Malbec. Lenta, persistente y llena de ternura." },
      { libro: "Extracción de la piedra de locura", cepa: "Torrontés", bodega: "Salta", textoAurelia: "Luminoso, con un dejo de tristeza dulce. Se siente como un poema que te abraza y te deja una herida suave." },
      { libro: "Ficciones", cepa: "Cabernet Sauvignon", bodega: "Mendoza", textoAurelia: "Cada cuento es una copa distinta. Este vino, con cuerpo y precisión, acompaña la inteligencia de Borges sin distraerla." },
      { libro: "Bestiario", cepa: "Syrah", bodega: "La Rioja", textoAurelia: "Un vino con carácter, como los cuentos de Cortázar. Lo cotidiano se transforma y cada trago tiene una sorpresa." },
      { libro: "La hora de la estrella", cepa: "Pinot Gris", bodega: "Patagonia", textoAurelia: "Sutil y sensible, como Macabéa. Este vino no brilla por lo que tiene, sino por lo que calla." },
      { libro: "Americanah", cepa: "Cabernet Sauvignon", bodega: "Mendoza", textoAurelia: "Fuerte, honesto, con identidad. Acompaña la voz de Chimamanda con la misma dignidad que sus palabras." },
      { libro: "Agua viva", cepa: "Semillón", bodega: "Patagonia", textoAurelia: "Limpio, ligero y reflexivo. Como la prosa de Lispector: parece simple, pero te atraviesa de forma profunda." },
      { libro: "Por quién doblan las campanas", cepa: "Syrah", bodega: "La Rioja", textoAurelia: "Un vino de guerra y amor. Fuerte, intenso, con un final largo." },
      { libro: "Eva Luna", cepa: "Bonarda", bodega: "San Juan", textoAurelia: "Un vino que sonríe. Dulce, cálido, con alma de cuento. Como Eva, deja una historia en cada sorbo." },
      { libro: "Lo bello y lo triste", cepa: "Pinot Noir", bodega: "Patagonia", textoAurelia: "Un vino que duele y consuela. Suave al principio, profundo al final." },
      { libro: "Los trabajos y las noches", cepa: "Semillón", bodega: "Patagonia", textoAurelia: "Silencioso y dorado, como una lámpara en la oscuridad. Cada verso de Pizarnik tiene un reflejo en este vino claro." },
    ];

    let maridajesCreados = 0;
    for (const m of maridajesData) {
      const libroRelacionado = libros.find((l) => l.titulo === m.libro);
      const vinoRelacionado = vinos.find((v) => v.cepa === m.cepa && v.bodega === m.bodega);

      if (libroRelacionado && vinoRelacionado) {
        await Maridaje.create({
          libro: libroRelacionado._id,
          vino: vinoRelacionado._id,
          textoAurelia: m.textoAurelia,
        });
        maridajesCreados++;
      } else {
        console.warn(`Maridaje omitido: "${m.libro}" (${m.cepa}, ${m.bodega}) no encontrado`);
      }
    }
    console.log(`Maridajes creados: ${maridajesCreados}`);

    for (const escritor of escritores) {
      const vinoRelacionado =
        vinos.find((v) =>
          v.descripcion.toLowerCase().includes(escritor.generoPrincipal.split(" ")[0].toLowerCase())
        ) || vinos[Math.floor(Math.random() * vinos.length)];

      escritor.vinosRecomendados.push({ cepa: vinoRelacionado.cepa, vinoId: vinoRelacionado._id });
      await escritor.save();
    }
    console.log("Escritores vinculados con vinos recomendados");

    console.log("\nUniverso Aurelia cargado correctamente.");
    console.log(`Libros: ${libros.length} | Vinos: ${vinos.length} | Escritores: ${escritores.length} | Maridajes: ${maridajesCreados}`);
  } catch (error) {
    console.error("Error al cargar el contenido:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Conexión cerrada.");
  }
}

seedContenido();