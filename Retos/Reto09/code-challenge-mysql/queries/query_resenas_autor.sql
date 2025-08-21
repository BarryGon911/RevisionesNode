SELECT 
    a.nombre        AS autor,
    l.titulo        AS libro,
    r.contenido     AS reseña,
    r.calificacion,
    u.nombre        AS usuario,
    r.fecha
FROM Autor a
JOIN Libro l   ON l.autorId = a.id
JOIN Resena r  ON r.libroId = l.id
JOIN Usuario u ON r.usuarioId = u.id
WHERE a.nombre = 'Gabriel García Márquez'
ORDER BY r.fecha DESC;
