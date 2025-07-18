

export function separarParesImpares(numeros) {
    const pares = numeros.filter(n => n % 2 === 0);
    const impares = numeros.filter(n => n % 2 !== 0);
    return { pares, impares };
}


 
// Valida que todos los elementos del array sean números válidos
//@param {string[]} arrayStrings - Array de strings a validar
export function validarNumeros(elementos) {
  return elementos.every(elemento => {
    const numero = parseFloat(elemento.trim());
    return !isNaN(numero) && elemento.trim() !== '';
  });
}

//
export function convertirANumeros(elementos) {
  return elementos.map(elemento => Number(elemento.trim()));
}