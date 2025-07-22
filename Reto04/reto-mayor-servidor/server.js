import http from 'http';
import url from 'url';
import encontrarMayor from './utils/encontrarMayor.js';
import dotenv from "dotenv";
import colors from "colors";

dotenv.config();

const port = process.env.SRV_PORT || 4000;// Default port if not specified by Hosting Provider when deploying the application

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  if (req.method === 'GET' && parsedUrl.pathname === '/mayor') {
    const numerosParam = parsedUrl.query.numeros;

    if (!numerosParam) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Falta el parámetro "numeros".' }));
      return;
    }

    const numerosArray = numerosParam.split(',').map(n => Number(n.trim()));

    if (!numerosArray.every(n => typeof n === 'number' && !isNaN(n))) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Todos los valores deben ser números válidos.' }));
      return;
    }

    const mayor = encontrarMayor(numerosArray);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ numeros: numerosArray, mayor: mayor }));
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Ruta no encontrada.' }));
  }
});

server.listen(port, () => {
  console.log(colors.bgMagenta.magenta.italic.bold(`🚀 NodeJS server is running on http://localhost:${port}`));
});
