function encontrarMayor(numeros) {
    // Si numeros no es un array o está vacío, lanzar un error    
    if (!Array.isArray(numeros) || numeros.length === 0) {
        throw new Error("El array de números no puede ser un arreglo vacío");
    }

    // Validar que todos los numeros sean validos y no sean nulos
    // El metodo every verifica que todos los elementos del array cumplen con la condición de ser
    // número válido, !isNaN verifica si el valor n no es NaN (Not a Number) 
    

    if (!numeros.every(n => typeof n === 'number' && !isNaN(n))) {
    throw new Error('Todos deben ser números válidos.');
    
    }
    return Math.max(...numeros);
}

export default encontrarMayor;

