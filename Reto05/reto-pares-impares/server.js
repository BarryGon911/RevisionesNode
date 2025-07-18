import express from "express";
import {
  separarParesImpares,
  validarNumeros,
  convertirANumeros,
} from "./utils/separarParesImpares.js";

const app = express();
const PORT = 3000;

app.get("/filtrar", (req, res) => {
  try {
    // Validar que el parámetro existe
    const { numeros } = req.query;
    
    if (!numeros) {
      return res.status(400).json({
        error: "El parámetro 'numeros' es requerido",
        ejemplo: "?numeros=1,2,3,4,5"
      });
    }

    // Convertir a string antes de usar split
    let numerosString;
    if (Array.isArray(numeros)) {
      numerosString = numeros[0];
    } else {
      numerosString = String(numeros);
    }

    // Convertir string a array
    const elementosArray = numerosString.split(',');

    // Validar que todos sean números
    if (!validarNumeros(elementosArray)) {
      return res.status(400).json({
        error: "Todos los valores deben ser números válidos",
        ejemplo: "?numeros=1,2,3,4,5"
      });
    }

    // Convertir a números
    const numerosArray = convertirANumeros(elementosArray);

    // Separar pares e impares
    const { pares, impares } = separarParesImpares(numerosArray);

    // Respuesta exitosa
    res.json({
      original: numerosArray,
      pares,
      impares
    });

  } catch (error) {
    res.status(500).json({
      error: "Error interno del servidor",
      mensaje: error.message
    });
  }
});

// Ruta adicional para la página principal
app.get("/", (req, res) => {
  res.json({
    mensaje: "🔢 Servidor de Filtrado de Números",
    uso: "GET /filtrar?numeros=1,2,3,4,5",
    ejemplo: "http://localhost:3000/filtrar?numeros=1,2,3,4,5,6"
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${PORT}`);
  console.log(`📖 Prueba: http://localhost:${PORT}/filtrar?numeros=1,2,3,4,5,6`);
});