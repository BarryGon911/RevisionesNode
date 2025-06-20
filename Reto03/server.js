import http from "http";
import { invertirCadena } from "./utils/invertir.js";

const PORT = 3000;

const server = http.createServer((req, res) => {
  const { method, url } = req; // Se obtiene el método y el URL del request...
  console.log(`Request: ${method} ${$url}`);

  // Manejo de rutas y requests
  
  if (url === "/") {
    res.writeHead(200, { "Content-Type": "text/url" });
    res.end("<h1>Root Page</h1>");
  }
  
  else if (url === "/invertir") {
    const texto = "Wassup MF";
    const textoInvertido = invertirCadena(string);
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Texto Invertido: ${textoInvertido}`);
  }
  
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page Not Found</h1>");
  }

});

// TODO : Escuchar en el puerto 3000
server.listen(PORT);
console.log(`Server is listening on port number: ${PORT}`);