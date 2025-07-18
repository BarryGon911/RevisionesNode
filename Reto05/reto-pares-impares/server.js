import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import
{
  separarParesImpares,
  validarNumeros,
  convertirANumeros,
}
from "./utils/separarParesImpares.js";

dotenv.config();

const port = process.env.PORT || 4000;// Default port if not specified by Hosting Provider when deploying the application

const app = express();

app.get("/filtrar", (req, res) => {
  try {
    const { numeros } = req.query;
    
    if (!numeros) {
      return res.status(400).json({
        error: "El parámetro 'numeros' es requerido",
        ejemplo: "?numeros=1,2,3,4,5"
      });
    }
    let numerosString;
    
    if (Array.isArray(numeros)) {
      numerosString = numeros[0];
    }
    else {
      numerosString = String(numeros);
    }
    
    const elementosArray = numerosString.split(',');

    if (!validarNumeros(elementosArray)) {
      return res.status(400).json({
        error: "Todos los valores deben ser números válidos",
        ejemplo: "?numeros=1,2,3,4,5"
      });
    }
    
    const numerosArray = convertirANumeros(elementosArray);

    const { pares, impares } = separarParesImpares(numerosArray);

    res.json({
      original: numerosArray,
      pares,
      impares
    });

  }
  catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      mensaje: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    mensaje: "🔢 Servidor de Filtrado de Números",
    uso: "GET /filtrar?numeros=1,2,3,4,5",
    ejemplo: "http://localhost:3000/filtrar?numeros=1,2,3,4,5,6"
  });
});

app.listen(port, () => {
  console.log(colors.bgMagenta.magenta.italic.bold(`NodeJS server is running on http://localhost:${port}`));
  console.log(`📖 Prueba: http://localhost:${port}/filtrar?numeros=1,2,3,4,5,6`);
});
