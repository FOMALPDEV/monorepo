const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Inserisci la tua password se necessario
  database: 'users'
});

connection.connect((err) => {
  if (err) {
    console.error('Errore di connessione:', err.stack);
    return;
  }
  console.log('Connesso al database MySQL!');
});

module.exports = connection;
