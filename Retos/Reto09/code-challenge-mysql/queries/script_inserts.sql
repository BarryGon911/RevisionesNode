-- =========================================
-- AUTORES (20)
-- =========================================
INSERT INTO Autor (id, nombre, nacionalidad, fechaNacimiento)
VALUES
  (1,  'Gabriel García Márquez', 'Colombiana', '1927-03-06'),
  (2,  'Isabel Allende',         'Chilena',    '1942-08-02'),
  (3,  'Jorge Luis Borges',      'Argentina',  '1899-08-24'),
  (4,  'Mario Vargas Llosa',     'Peruana',    '1936-03-28'),
  (5,  'Julio Cortázar',         'Argentina',  '1914-08-26'),
  (6,  'Carlos Fuentes',         'Mexicana',   '1928-11-11'),
  (7,  'Laura Esquivel',         'Mexicana',   '1950-09-30'),
  (8,  'Juan Rulfo',             'Mexicana',   '1917-05-16'),
  (9,  'Rosario Castellanos',    'Mexicana',   '1925-05-25'),
  (10, 'Elena Poniatowska',      'Mexicana',   '1932-05-19'),
  (11, 'Arturo Pérez-Reverte',   'Española',   '1951-11-25'),
  (12, 'Javier Marías',          'Española',   '1951-09-20'),
  (13, 'Carlos Ruiz Zafón',      'Española',   '1964-09-25'),
  (14, 'Miguel de Cervantes',    'Española',   '1547-09-29'),
  (15, 'Federico García Lorca',  'Española',   '1898-06-05'),
  (16, 'Ana María Matute',       'Española',   '1925-07-26'),
  (17, 'Eduardo Galeano',        'Uruguaya',   '1940-09-03'),
  (18, 'Roberto Bolaño',         'Chilena',    '1953-04-28'),
  (19, 'Clarice Lispector',      'Brasileña',  '1920-12-10'),
  (20, 'Pablo Neruda',           'Chilena',    '1904-07-12');

-- =========================================
-- LIBROS (20)
-- =========================================
INSERT INTO Libro (id, titulo, genero, fechaPublicacion, autorId)
VALUES
  (1,  'Cien Años de Soledad',                 'Realismo Mágico', '1967-05-30', 1),
  (2,  'El Amor en los Tiempos del Cólera',    'Romance',         '1985-09-05', 1),
  (3,  'La Casa de los Espíritus',             'Realismo Mágico', '1982-01-01', 2),
  (4,  'Ficciones',                            'Cuentos',         '1944-01-01', 3),
  (5,  'La Ciudad y los Perros',               'Ficción',         '1963-01-01', 4),
  (6,  'Rayuela',                              'Ficción',         '1963-01-01', 5),
  (7,  'La Muerte de Artemio Cruz',            'Ficción',         '1962-01-01', 6),
  (8,  'Como Agua para Chocolate',             'Romance',         '1989-01-01', 7),
  (9,  'Pedro Páramo',                         'Ficción',         '1955-01-01', 8),
  (10, 'Balún Canán',                          'Ficción',         '1957-01-01', 9),
  (11, 'La Noche de Tlatelolco',               'Crónica',         '1971-01-01', 10),
  (12, 'La Reina del Sur',                     'Novela Negra',    '2002-01-01', 11),
  (13, 'Corazón Tan Blanco',                   'Ficción',         '1992-01-01', 12),
  (14, 'La Sombra del Viento',                 'Misterio',        '2001-01-01', 13),
  (15, 'Don Quijote de la Mancha',             'Clásico',         '1605-01-16', 14),
  (16, 'Bodas de Sangre',                      'Teatro',          '1933-01-01', 15),
  (17, 'Primera Memoria',                      'Ficción',         '1959-01-01', 16),
  (18, 'Las Venas Abiertas de América Latina', 'Ensayo',          '1971-01-01', 17),
  (19, 'Los Detectives Salvajes',              'Ficción',         '1998-01-01', 18),
  (20, 'La Hora de la Estrella',               'Ficción',         '1977-01-01', 19);

-- =========================================
-- USUARIOS (20)
-- =========================================
INSERT INTO Usuario (id, nombre, email, password)
VALUES
  (1,  'Juan Camaney Shingón',  'jcamaney@mail.com',    'misuperpassword1'),
  (2,  'Mauricio Garcés Elú',   'mgarces@mail.com',     'misuperpassword2'),
  (3,  'Lupita González',       'lgonzalez@mail.com',   'pwd3'),
  (4,  'Carlos Méndez',         'cmendez@mail.com',     'pwd4'),
  (5,  'Ana Rodríguez',         'arodriguez@mail.com',  'pwd5'),
  (6,  'Pedro Hernández',       'phernandez@mail.com',  'pwd6'),
  (7,  'María Fernanda Ruiz',   'mfruiz@mail.com',      'pwd7'),
  (8,  'Jorge Castillo',        'jcastillo@mail.com',   'pwd8'),
  (9,  'Sofía Morales',         'smorales@mail.com',    'pwd9'),
  (10, 'Ricardo Pérez',         'rperez@mail.com',      'pwd10'),
  (11, 'Daniela López',         'dlopez@mail.com',      'pwd11'),
  (12, 'Arturo Sánchez',        'asanchez@mail.com',    'pwd12'),
  (13, 'Paola Jiménez',         'pjimenez@mail.com',    'pwd13'),
  (14, 'Héctor Flores',         'hflores@mail.com',     'pwd14'),
  (15, 'Claudia Navarro',       'cnavarro@mail.com',    'pwd15'),
  (16, 'Diego Torres',          'dtorres@mail.com',     'pwd16'),
  (17, 'Fernanda Salas',        'fsalas@mail.com',      'pwd17'),
  (18, 'Emilio Ramos',          'eramos@mail.com',      'pwd18'),
  (19, 'Ximena Chávez',         'xchavez@mail.com',     'pwd19'),
  (20, 'Rodrigo Martínez',      'rmartinez@mail.com',   'pwd20');

-- =========================================
-- RESEÑAS (20)
-- =========================================
INSERT INTO Resena (id, contenido, calificacion, fecha, libroId, usuarioId)
VALUES
  (1,  'Una obra maestra',                    5, '2025-07-01',  1,  1),
  (2,  'Muy imaginativa',                     5, '2025-07-10',  2,  2),
  (3,  'Hipnótica y entrañable',              4, '2025-07-12',  3,  3),
  (4,  'Brillante colección de cuentos',      5, '2025-07-14',  4,  4),
  (5,  'Cruda y poderosa',                    4, '2025-07-15',  5,  5),
  (6,  'Innovadora estructura narrativa',     5, '2025-07-16',  6,  6),
  (7,  'Profunda y crítica',                  4, '2025-07-18',  7,  7),
  (8,  'Tierna y deliciosa',                  5, '2025-07-19',  8,  8),
  (9,  'Poética y fantasmagórica',            5, '2025-07-21',  9,  9),
  (10, 'Retrato social contundente',          4, '2025-07-22', 10, 10),
  (11, 'Testimonio imprescindible',           5, '2025-07-24', 11, 11),
  (12, 'Ágil y adictiva',                     4, '2025-07-25', 12, 12),
  (13, 'Intrigante y elegante',               4, '2025-07-27', 13, 13),
  (14, 'Atmosférica y emotiva',               5, '2025-07-28', 14, 14),
  (15, 'Clásico eterno',                      5, '2025-07-30', 15, 15),
  (16, 'Trágica y luminosa',                  4, '2025-08-01', 16, 16),
  (17, 'Madura y sensible',                   4, '2025-08-03', 17, 17),
  (18, 'Ensayo imprescindible',               5, '2025-08-05', 18, 18),
  (19, 'Vibrante y audaz',                    5, '2025-08-07', 19, 19),
  (20, 'Breve y poderosa',                    4, '2025-08-10', 20, 20);
