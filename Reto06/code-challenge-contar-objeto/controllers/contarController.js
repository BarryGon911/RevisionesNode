export function contarPropiedades(req, res) {
const objeto = req.body;
 
if(!objeto || typeof objeto !=='object' || Array.isArray(objeto)) {
    return res.status(400).json({ error: "El Body debe de ser un Objeto válido" });
}

const claves = Object.keys(objeto);
const cantidad = claves.length;

if(req.query.detallado === 'true') {
    return res.json({propiedades: cantidad, detalles: claves});
}
res.json({propiedades: cantidad});
}
