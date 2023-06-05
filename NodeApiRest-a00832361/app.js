// Elaborado por Eduardo Antonio Maldonado Guzman A00832631

const express = require('express');
const{ dirname } = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;
//Importante para el pase de datos entre los modulos
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

/*Generamos la conexión a la base de datos */
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/biblio',
{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>console.log('Base de datos de MongoDB conectada correctamente')).catch(e=>console.log(e));


app.use('/libros', require('./router/Libros'));

app.listen(port, ()=>{
    console.log('El servidor está escuchando por el puerto: ', port);
    //console.log('La dirección del servidor es: ',__dirname);
});