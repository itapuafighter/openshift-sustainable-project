
/* seguimos un modelo MVC (model view controller) por lo que tenemos el código dividido en 3 carpetas (model, view y controller) en la carpeta de controller tenemos este archivo, server.js, que será nuestro controlador, aquí manejaremos las rutas para conseguir información de las tablas

/* primero hay que importar el módulo express, express es un framework de node.js que usamos para crear servidores web, es técnicamente posible usar solo node.js pero en la práctica es muy complicado y se utiliza siempre express */

const express = require('express');
/* debemos importar el módulo path (path significa camino en inglés) y con este manejaremos las rutas de archivo y directorio */
const path = require('path');
/* importamos el módulo de alimentos  (este módulo está en la carpeta Model, la parte de modelo de nuestro MVC) */
const alimentosModel = require('../model/alimentosModel');

//creamos la instancia de la aplicación express
const app = express();
//y luego definimos el puerto que escuchará el servidor
const port = 3000;


/* aquí van los middlewares, los utilizamos para acceder a los archivos que tenemos en el view, así como para acceder a las fotos y a los iconos */

app.use(express.static(path.join(__dirname, '..', 'view')));
app.use('/fotos', express.static(path.join(__dirname, '..', 'fotos')));
app.use('/iconos', express.static(path.join(__dirname, '..', 'iconos')));


/* aquí tenemos la ruta para la página principal de nuestra aplicación'/' es la página principal, get es conseguir en inglés (se refiere a las solicitudes GET) req es de require (pedir) y res de response (respuesta), es una función de callback, por lo tanto como respuesta a la petición enviamos nuestro archivo index.html */
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'view', 'index.html'));
});

/* aquí tenemos la rutas para pillar información de nuestras tablas (de la base de datos Comida) */

/* ruta de la tabla 'Alimentos_Calorias', el procedimiento es el mismo en todas las tablas, método get tabla alimentos, la función callback de req (require) y res (response) llamamos al método obtenerDatosTabla que está en el archivo alimentosModel en la carpeta de model, en caso de error salta por pantalla un mensaje que no hemos podido obtener los alimentos y si no, enviamos una respuesta en formato json */

app.get('/alimentos', (req, res) => {
  alimentosModel.obtenerDatosTabla('Alimentos_Calorias', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener datos de alimentos');
      return;
      /* el estatus 500 significa que ha ocurrido un error en el servidor y no se pudo procesar la solicitud */
    }
    res.json(results);
  });
});

// ruta de la tabla 'Alimentos_Macronutrientes'
app.get('/macronutrientes', (req, res) => {
  alimentosModel.obtenerDatosTabla('Alimentos_Macronutrientes', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener datos de macronutrientes');
      return;
    }
    res.json(results);
  });
});

// ruta para obtener datos de la tabla 'Alimentos_Nutricion'
app.get('/nutricion', (req, res) => {
  alimentosModel.obtenerDatosTabla('Alimentos_Nutricion', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener datos de nutrición');
      return;
    }
    res.json(results);
  });
});

// ruta de la tabla 'Alimentos_Sostenibilidad'
app.get('/sostenibilidad', (req, res) => {
  alimentosModel.obtenerDatosTabla('Alimentos_Sostenibilidad', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener datos de sostenibilidad');
      return;
    }
    res.json(results);
  });
});

// ruta de la tabla 'Alimentos_Lugar'
app.get('/lugar', (req, res) => {
  alimentosModel.obtenerDatosTabla('Alimentos_Lugar', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener datos de lugar');
      return;
    }
    res.json(results);
  });
});

// ruta de la tabla 'Alimentos_Mes'
app.get('/mes', (req, res) => {
  alimentosModel.obtenerDatosTabla('Alimentos_Mes', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener datos de mes');
      return;
    }
    res.json(results);
  });
});

// ruta de la tabla 'Alimentos_Info'
app.get('/info', (req, res) => {
  alimentosModel.obtenerDatosTabla('Alimentos_Info', (err, results) => {
    if (err) {
      res.status(500).send('Error al obtener datos de información');
      return;
    }
    res.json(results);
  });
});

/* esta es la ruta para obtener las fotos que aparecen al principio al seleccionar el alimento, una vez que lo hemos seleccionado y hemos metido cuántos gramos vamos a consumir. Seleccionamos la foto mediante el nombre, tenemos una tabla con dos columnas, una el nombre del alimento y otro el nombre de la foto, que es el mismo pero con .jpeg al final, dentro del proyecto tenemos una carpeta llamada fotos en la cual las fotos coinciden con los nombres más .jpeg, por lo que si el usuario escoge 'salmón, en la tabla está asociado 'salmón.jpeg' y se busca 'salmón.jpeg en la carpeta de fotos */

app.get('/foto/:alimento', (req, res) => {
  /* el :alimento, es un valor dinámico que va cambiando según lo que escoja el usuario */
  const { alimento } = req.params;
  /* params es un objeto de express, contiene los parámetros de la url de la solicitud http, cuando usamos una ruta dinámica como esta, express extrae los valores y los hace disponibles a través de params, así podemos ir accediendo a los alimentos que solicita el usuario */
  res.sendFile(path.join(__dirname, '..', 'fotos', `${alimento}.jpeg`));
});



/* iniciamos el servidor según el puerto especificado */
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
