-- AUTORES
INSERT INTO Autor (id, nombre, nacionalidad, fechaNacimiento)
VALUES 
  (1, 'Gabriel García Márquez', 'Colombiana', '1927-03-06'),
  (2, 'Isabel Allende', 'Chilena', '1942-08-02');

-- USUARIOS
INSERT INTO Usuario (id, nombre, email, password)
VALUES
  (1, 'Juan Camaney Shingón', 'jcamaney@mail.com', 'misuperpassword1'),
  (2, 'Mauricio Garcés Elú', 'mgarces@mail.com', 'misuperpassword2');

-- LIBROS
INSERT INTO Libro (id, titulo, genero, fechaPublicacion, autorId)
VALUES 
  (1, 'Cien Años de Soledad', 'Realismo Mágico', '1967', 1),
  (2, 'El Amor en los Tiempos del Cólera', 1985, 'Romance', 2);

-- RESEÑAS
INSERT INTO Resena (id, contenido, calificacion, fecha, libroId, usuarioId)
VALUES 
  (1, 'Una obra maestra', 5, '2025-07-01', 1, 1),
  (2, 'Muy imaginativa', 5, '2025-07-10', 2, 2);