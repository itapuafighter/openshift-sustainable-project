Now do the same for the model file. Click "Add file" then "Create new file", type this as the filename:

`model/alimentosModel.js`

But this time paste this updated version instead of the original — it uses environment variables for the database connection instead of hardcoded credentials:

```javascript
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'Comida'
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos');
});

function obtenerDatosTabla(tabla, callback) {
  connection.query(`SELECT * FROM ${tabla}`, (err, results) => {
    if (err) {
      console.error(`Error al obtener datos de ${tabla}:`, err);
      callback(err, null);
      return;
    }
    callback(null, results);
  });
}

module.exports = {
  obtenerDatosTabla
};
```

Commit it to main. Tell me when done.
