console.log('El servidor está iniciando...');

const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());  // Usar cors middleware antes de definir rutas
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para validar la cédula
app.post('/validar-cedula', (req, res) => {
    const cedula = req.body.cedula;

    if (validaCedula(cedula)) {
        res.json({ resultado: 'Cédula válida' });
    } else {
        res.json({ resultado: 'Cédula no válida' });
    }
});

// Función para validar una cédula dominicana
function validaCedula(ced) {
    ced = ced.replace(/-/g, '');

    if (ced.length !== 11) {
        return false;
    }

    var cedula = ced.substr(0, 10);
    var verificador = ced.substr(10, 1);
    var suma = 0;

    for (var i = 0; i < cedula.length; i++) {
        var mod = (i % 2 === 0) ? 1 : 2;
        var res = cedula[i] * mod;

        if (res > 9) {
            res = res.toString();
            var uno = parseInt(res[0]);
            var dos = parseInt(res[1]);
            res = uno + dos;
        }

        suma += parseInt(res);
    }

    var elNumero = (10 - (suma % 10)) % 10;

    return elNumero === parseInt(verificador) && cedula.substr(0, 3) !== "000";
}

app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
