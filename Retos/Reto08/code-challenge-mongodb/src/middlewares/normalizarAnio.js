export function normalizarAnio(req, res, next) {
    
    if (req.body && Object.prototype.hasOwnProperty.call(req.body, 'año')) {
        req.body.anio = Number(req.body['año']);
        delete req.body['año'];
    }
    
    if (req.query && Object.prototype.hasOwnProperty.call(req.query, 'año')) {
        req.query.anio = req.query['año'];
        delete req.query['año'];
    }
    
    next();
}