CREATE database biblioteca;

USE biblioteca;

CREATE TABLE Autor (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  nacionalidad VARCHAR(255) NOT NULL,
  fechaNacimiento DATE
);

CREATE TABLE Usuario (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE Libro (
  id INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  genero VARCHAR(100),
  fechaPublicacion DATE,
  autorId INT NOT NULL,
  FOREIGN KEY (autorId) REFERENCES Autor(id) ON DELETE CASCADE
);

CREATE TABLE Resena (
  id INT PRIMARY KEY AUTO_INCREMENT,
  contenido TEXT NOT NULL,
  calificacion INT CHECK (calificacion >= 1 AND calificacion <= 5),
  fecha DATE,
  libroId INT NOT NULL,
  usuarioId INT NOT NULL,
  FOREIGN KEY (libroId) REFERENCES Libro(id) ON DELETE CASCADE,
  FOREIGN KEY (usuarioId) REFERENCES Usuario(id) ON DELETE CASCADE
);