SELECT 
    u.id,
    u.nombre       AS usuario,
    COUNT(r.id)    AS total_resenas,
    ROUND(AVG(r.calificacion), 2) AS promedio_calificacion_dada
FROM Usuario u
LEFT JOIN Resena r ON r.usuarioId = u.id
GROUP BY u.id, u.nombre
ORDER BY total_resenas DESC, promedio_calificacion_dada DESC;
