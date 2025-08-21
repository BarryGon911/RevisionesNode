// seeders/populateDB.js
import { sequelize } from "../config/database.js";
import { Autor, Libro, Usuario, Resena } from "../models/index.js";

const autores = [
  { id: 1,  nombre: "Gabriel Garc�a M�rquez", nacionalidad: "Colombiana", fechaNacimiento: "1927-03-06" },
  { id: 2,  nombre: "Isabel Allende",         nacionalidad: "Chilena",    fechaNacimiento: "1942-08-02" },
  { id: 3,  nombre: "Jorge Luis Borges",      nacionalidad: "Argentina",  fechaNacimiento: "1899-08-24" },
  { id: 4,  nombre: "Mario Vargas Llosa",     nacionalidad: "Peruana",    fechaNacimiento: "1936-03-28" },
  { id: 5,  nombre: "Julio Cort�zar",         nacionalidad: "Argentina",  fechaNacimiento: "1914-08-26" },
  { id: 6,  nombre: "Carlos Fuentes",         nacionalidad: "Mexicana",   fechaNacimiento: "1928-11-11" },
  { id: 7,  nombre: "Laura Esquivel",         nacionalidad: "Mexicana",   fechaNacimiento: "1950-09-30" },
  { id: 8,  nombre: "Juan Rulfo",             nacionalidad: "Mexicana",   fechaNacimiento: "1917-05-16" },
  { id: 9,  nombre: "Rosario Castellanos",    nacionalidad: "Mexicana",   fechaNacimiento: "1925-05-25" },
  { id: 10, nombre: "Elena Poniatowska",      nacionalidad: "Mexicana",   fechaNacimiento: "1932-05-19" },
  { id: 11, nombre: "Arturo P�rez-Reverte",   nacionalidad: "Espa�ola",   fechaNacimiento: "1951-11-25" },
  { id: 12, nombre: "Javier Mar�as",          nacionalidad: "Espa�ola",   fechaNacimiento: "1951-09-20" },
  { id: 13, nombre: "Carlos Ruiz Zaf�n",      nacionalidad: "Espa�ola",   fechaNacimiento: "1964-09-25" },
  { id: 14, nombre: "Miguel de Cervantes",    nacionalidad: "Espa�ola",   fechaNacimiento: "1547-09-29" },
  { id: 15, nombre: "Federico Garc�a Lorca",  nacionalidad: "Espa�ola",   fechaNacimiento: "1898-06-05" },
  { id: 16, nombre: "Ana Mar�a Matute",       nacionalidad: "Espa�ola",   fechaNacimiento: "1925-07-26" },
  { id: 17, nombre: "Eduardo Galeano",        nacionalidad: "Uruguaya",   fechaNacimiento: "1940-09-03" },
  { id: 18, nombre: "Roberto Bola�o",         nacionalidad: "Chilena",    fechaNacimiento: "1953-04-28" },
  { id: 19, nombre: "Clarice Lispector",      nacionalidad: "Brasile�a",  fechaNacimiento: "1920-12-10" },
  { id: 20, nombre: "Pablo Neruda",           nacionalidad: "Chilena",    fechaNacimiento: "1904-07-12" },
];

const libros = [
  { id: 1,  titulo: "Cien A�os de Soledad",                 genero: "Realismo M�gico", fechaPublicacion: "1967-05-30", autorId: 1  },
  { id: 2,  titulo: "El Amor en los Tiempos del C�lera",    genero: "Romance",         fechaPublicacion: "1985-09-05", autorId: 1  },
  { id: 3,  titulo: "La Casa de los Esp�ritus",             genero: "Realismo M�gico", fechaPublicacion: "1982-01-01", autorId: 2  },
  { id: 4,  titulo: "Ficciones",                            genero: "Cuentos",         fechaPublicacion: "1944-01-01", autorId: 3  },
  { id: 5,  titulo: "La Ciudad y los Perros",               genero: "Ficci�n",         fechaPublicacion: "1963-01-01", autorId: 4  },
  { id: 6,  titulo: "Rayuela",                              genero: "Ficci�n",         fechaPublicacion: "1963-01-01", autorId: 5  },
  { id: 7,  titulo: "La Muerte de Artemio Cruz",            genero: "Ficci�n",         fechaPublicacion: "1962-01-01", autorId: 6  },
  { id: 8,  titulo: "Como Agua para Chocolate",             genero: "Romance",         fechaPublicacion: "1989-01-01", autorId: 7  },
  { id: 9,  titulo: "Pedro P�ramo",                         genero: "Ficci�n",         fechaPublicacion: "1955-01-01", autorId: 8  },
  { id: 10, titulo: "Bal�n Can�n",                          genero: "Ficci�n",         fechaPublicacion: "1957-01-01", autorId: 9  },
  { id: 11, titulo: "La Noche de Tlatelolco",               genero: "Cr�nica",         fechaPublicacion: "1971-01-01", autorId: 10 },
  { id: 12, titulo: "La Reina del Sur",                     genero: "Novela Negra",    fechaPublicacion: "2002-01-01", autorId: 11 },
  { id: 13, titulo: "Coraz�n Tan Blanco",                   genero: "Ficci�n",         fechaPublicacion: "1992-01-01", autorId: 12 },
  { id: 14, titulo: "La Sombra del Viento",                 genero: "Misterio",        fechaPublicacion: "2001-01-01", autorId: 13 },
  { id: 15, titulo: "Don Quijote de la Mancha",             genero: "Cl�sico",         fechaPublicacion: "1605-01-16", autorId: 14 },
  { id: 16, titulo: "Bodas de Sangre",                      genero: "Teatro",          fechaPublicacion: "1933-01-01", autorId: 15 },
  { id: 17, titulo: "Primera Memoria",                      genero: "Ficci�n",         fechaPublicacion: "1959-01-01", autorId: 16 },
  { id: 18, titulo: "Las Venas Abiertas de Am�rica Latina", genero: "Ensayo",          fechaPublicacion: "1971-01-01", autorId: 17 },
  { id: 19, titulo: "Los Detectives Salvajes",              genero: "Ficci�n",         fechaPublicacion: "1998-01-01", autorId: 18 },
  { id: 20, titulo: "La Hora de la Estrella",               genero: "Ficci�n",         fechaPublicacion: "1977-01-01", autorId: 19 },
];

const usuarios = [
  { id: 1,  nombre: "Juan Camaney Shing�n",  email: "jcamaney@mail.com",   password: "misuperpassword1" },
  { id: 2,  nombre: "Mauricio Garc�s El�",   email: "mgarces@mail.com",    password: "misuperpassword2" },
  { id: 3,  nombre: "Lupita Gonz�lez",       email: "lgonzalez@mail.com",  password: "pwd3"  },
  { id: 4,  nombre: "Carlos M�ndez",         email: "cmendez@mail.com",    password: "pwd4"  },
  { id: 5,  nombre: "Ana Rodr�guez",         email: "arodriguez@mail.com", password: "pwd5"  },
  { id: 6,  nombre: "Pedro Hern�ndez",       email: "phernandez@mail.com", password: "pwd6"  },
  { id: 7,  nombre: "Mar�a Fernanda Ruiz",   email: "mfruiz@mail.com",     password: "pwd7"  },
  { id: 8,  nombre: "Jorge Castillo",        email: "jcastillo@mail.com",  password: "pwd8"  },
  { id: 9,  nombre: "Sof�a Morales",         email: "smorales@mail.com",   password: "pwd9"  },
  { id: 10, nombre: "Ricardo P�rez",         email: "rperez@mail.com",     password: "pwd10" },
  { id: 11, nombre: "Daniela L�pez",         email: "dlopez@mail.com",     password: "pwd11" },
  { id: 12, nombre: "Arturo S�nchez",        email: "asanchez@mail.com",   password: "pwd12" },
  { id: 13, nombre: "Paola Jim�nez",         email: "pjimenez@mail.com",   password: "pwd13" },
  { id: 14, nombre: "H�ctor Flores",         email: "hflores@mail.com",    password: "pwd14" },
  { id: 15, nombre: "Claudia Navarro",       email: "cnavarro@mail.com",   password: "pwd15" },
  { id: 16, nombre: "Diego Torres",          email: "dtorres@mail.com",    password: "pwd16" },
  { id: 17, nombre: "Fernanda Salas",        email: "fsalas@mail.com",     password: "pwd17" },
  { id: 18, nombre: "Emilio Ramos",          email: "eramos@mail.com",     password: "pwd18" },
  { id: 19, nombre: "Ximena Ch�vez",         email: "xchavez@mail.com",    password: "pwd19" },
  { id: 20, nombre: "Rodrigo Mart�nez",      email: "rmartinez@mail.com",  password: "pwd20" },
];

const resenas = [
  { id: 1,  contenido: "Una obra maestra",               calificacion: 5, fecha: "2025-07-01", libroId: 1,  usuarioId: 1  },
  { id: 2,  contenido: "Muy imaginativa",                calificacion: 5, fecha: "2025-07-10", libroId: 2,  usuarioId: 2  },
  { id: 3,  contenido: "Hipn�tica y entra�able",         calificacion: 4, fecha: "2025-07-12", libroId: 3,  usuarioId: 3  },
  { id: 4,  contenido: "Brillante colecci�n de cuentos", calificacion: 5, fecha: "2025-07-14", libroId: 4,  usuarioId: 4  },
  { id: 5,  contenido: "Cruda y poderosa",               calificacion: 4, fecha: "2025-07-15", libroId: 5,  usuarioId: 5  },
  { id: 6,  contenido: "Innovadora estructura narrativa",calificacion: 5, fecha: "2025-07-16", libroId: 6,  usuarioId: 6  },
  { id: 7,  contenido: "Profunda y cr�tica",             calificacion: 4, fecha: "2025-07-18", libroId: 7,  usuarioId: 7  },
  { id: 8,  contenido: "Tierna y deliciosa",             calificacion: 5, fecha: "2025-07-19", libroId: 8,  usuarioId: 8  },
  { id: 9,  contenido: "Po�tica y fantasmag�rica",       calificacion: 5, fecha: "2025-07-21", libroId: 9,  usuarioId: 9  },
  { id: 10, contenido: "Retrato social contundente",     calificacion: 4, fecha: "2025-07-22", libroId: 10, usuarioId: 10 },
  { id: 11, contenido: "Testimonio imprescindible",      calificacion: 5, fecha: "2025-07-24", libroId: 11, usuarioId: 11 },
  { id: 12, contenido: "�gil y adictiva",                calificacion: 4, fecha: "2025-07-25", libroId: 12, usuarioId: 12 },
  { id: 13, contenido: "Intrigante y elegante",          calificacion: 4, fecha: "2025-07-27", libroId: 13, usuarioId: 13 },
  { id: 14, contenido: "Atmosf�rica y emotiva",          calificacion: 5, fecha: "2025-07-28", libroId: 14, usuarioId: 14 },
  { id: 15, contenido: "Cl�sico eterno",                 calificacion: 5, fecha: "2025-07-30", libroId: 15, usuarioId: 15 },
  { id: 16, contenido: "Tr�gica y luminosa",             calificacion: 4, fecha: "2025-08-01", libroId: 16, usuarioId: 16 },
  { id: 17, contenido: "Madura y sensible",              calificacion: 4, fecha: "2025-08-03", libroId: 17, usuarioId: 17 },
  { id: 18, contenido: "Ensayo imprescindible",          calificacion: 5, fecha: "2025-08-05", libroId: 18, usuarioId: 18 },
  { id: 19, contenido: "Vibrante y audaz",               calificacion: 5, fecha: "2025-08-07", libroId: 19, usuarioId: 19 },
  { id: 20, contenido: "Breve y poderosa",               calificacion: 4, fecha: "2025-08-10", libroId: 20, usuarioId: 20 },
];

const poblarBaseDeDatos = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.transaction(async (t) => {
      // Desactivar FKs (MySQL/MariaDB)
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 0", { transaction: t });

      // Limpiar tablas en orden seguro (o con FK off da igual el orden)
      await Resena.truncate({ transaction: t });
      await Libro.truncate({ transaction: t });
      await Usuario.truncate({ transaction: t });
      await Autor.truncate({ transaction: t });

      // Reactivar FKs
      await sequelize.query("SET FOREIGN_KEY_CHECKS = 1", { transaction: t });

      // Insertar exactamente lo del SQL (con los mismos IDs)
      await Autor.bulkCreate(autores, { validate: true, transaction: t });
      await Usuario.bulkCreate(usuarios, { validate: true, transaction: t });
      await Libro.bulkCreate(libros, { validate: true, transaction: t });
      await Resena.bulkCreate(resenas, { validate: true, transaction: t });
    });

    console.log("? Base de datos poblada exactamente como en poblar_db.sql");
    process.exit(0);
  } catch (error) {
    console.error("? Error al poblar:", error);
    process.exit(1);
  }
};

poblarBaseDeDatos();