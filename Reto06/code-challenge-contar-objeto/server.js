const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

const { contarPropiedades } = require('./controllers/contarController.js');

app.post('/contar', contarPropiedades);

app.get('/', (req, res) => {
    res.send('Servidor funcionando');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});