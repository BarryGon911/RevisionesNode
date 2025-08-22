SELECT 
    r.id              AS reseña_id,
    r.contenido       AS reseña,
    r.calificacion,
    r.fecha           AS fecha_resena,
    u.nombre          AS usuario,
    l.titulo          AS libro,
    l.genero,
    a.nombre          AS autor,
    a.nacionalidad
FROM Resena r
JOIN Usuario u ON r.usuarioId = u.id
JOIN Libro l   ON r.libroId   = l.id
JOIN Autor a   ON l.autorId   = a.id
ORDER BY r.fecha ASC;