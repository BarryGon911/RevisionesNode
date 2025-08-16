-- AUTOR
INSERT INTO Autors (id, nombre, nacionalidad, fechaNacimiento, createdAt, updatedAt)
VALUES 
  (1, 'Gabriel García Márquez', 'Colombiana', '1927-03-06', NOW(), NOW()),
  (2, 'Isabel Allende', 'Chilena', '1942-08-02', NOW(), NOW());

-- LIBROS
INSERT INTO Libros (id, titulo, anio, genero, autorId, createdAt, updatedAt)
VALUES 
  (1, 'Cien Años de Soledad', 1967, 'Realismo Mágico', 1, NOW(), NOW()),
  (2, 'El Amor en los Tiempos del Cólera', 1985, 'Romance', 1, NOW(), NOW()),
  (3, 'La Casa de los Espíritus', 1982, 'Ficción', 2, NOW(), NOW());

-- RESEÑAS
INSERT INTO Resenas (id, comentario, puntuacion, fecha, libroId, createdAt, updatedAt)
VALUES 
  (1, 'Una obra maestra', 5, '2025-07-01', 1, NOW(), NOW()),
  (2, 'Emotiva y profunda', 4, '2025-07-05', 2, NOW(), NOW()),
  (3, 'Muy imaginativa', 5, '2025-07-10', 3, NOW(), NOW());
