/* seguimos un modelo MVC (model view controller) por lo que tenemos el código dividido en 3 carpetas (model, view y controller) en la carpeta de model tenemos este archivo, alimentosModel.js, en el que gestionamos la conexión a la base de datos */



/* primero importamos el módulo mysql para poder interactuar con la base de datos  */
const mysql = require('mysql');

/* creamos la conexión */ 
const connection = mysql.createConnection({
  host: 'localhost', // el host
  user: 'root', // el usuario
  password: 'Roma3319', // la contraseña
  database: 'Comida' // el nombre de la base de datos
});

// nos conectamos
connection.connect((err) => {
  if (err) {
    // manejamos los errores de conexión
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  // muestra por pantalla si la conexión es exitosa
  console.log('Conexión exitosa a la base de datos');
});


/* con esta función obtendremos los datos de una tabla de la base de datos */
function obtenerDatosTabla(tabla, callback) {
  /* con esta consulta seleccionamos todos losregistrosde la tabla */
  connection.query(`SELECT * FROM ${tabla}`, (err, results) => {
    if (err) {
      // aquí manejamos los errores
      console.error(`Error al obtener datos de ${tabla}:`, err);
      callback(err, null); 
      return;
    }
    callback(null, results);
  });
}

/* aquí se exporta la función 'obtenerDatosTabla' para que esté disponible para otros módulos, la vamos a necesitar en server.js (el controlador) */
module.exports = {
  obtenerDatosTabla
};
