//Importa el módulo nativo http de Node.js.

import http from 'http';

//Importa el módulo nativo url de Node.js.
//Este módulo sirve para analizar (parsear) URLs y extraer sus partes, como la ruta y
//los parámetros de consulta.
import url from 'url';
//Importa una función o módulo llamado encontrarMayor desde el archivo 
//utils/encontrarMayor.js
import encontrarMayor from './utils/encontrarMayor.js';

// Usa el modulo URL para analizar la URL de la solicitud y extraer los 
// parámetros
//Url.parse nos permite analizar una URL y extraer sus componentes, como el pathname
//y los parámetros de consulta.
// req.url es la url de la solicitud que el cliente envía al servidor y la analiza
const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // GET /mayor?numeros=5,3,9,1
  // Responde con el número mayor de la lista de números proporcionada
  // parsedUrl.pathname nos da la ruta de la URL (osea /mayor)
  // parseUrl.query nos da un objeto con los parámetros de la URL (osea { numeros: '5,3,9,1' })
  if (req.method === 'GET' && parsedUrl.pathname === '/mayor') {
    const numerosParam = parsedUrl.query.numeros;

  //Verifica si el parámetro numeros no está presente en la URL de la solicitud.
  //Si numerosParam es undefined, null o una cadena vacia se cumple la condición   
    if (!numerosParam) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Falta el parámetro "numeros".' }));
      return;
    }

    // numerosParam. split toma la cadena numerosParam y la divide en partes usando la coma como separador
    // el resultado es un array ['5', '3', '9', '1']
    // map convierte cada elemento del arreglo a número usando Number()
    const numerosArray = numerosParam.split(',').map(n => Number(n.trim()));

    if (!numerosArray.every(n => typeof n === 'number' && !isNaN(n))) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Todos los valores deben ser números válidos.' }));
      return;
    }

    // Llama a la función encontrarMayor y le pasa el arreglo de números numerosArray.
    // La función devuelve el número más grande del arreglo y lo guarda en la variable

    const mayor = encontrarMayor(numerosArray);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ numeros: numerosArray, mayor: mayor }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada.' }));
  }
});

server.listen(3002, () => {
  console.log('Servidor escuchando en http://localhost:3002');
});


