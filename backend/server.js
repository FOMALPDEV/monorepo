const express = require('express');
const config = require('./config');

const app = express();

app.use('/api', require('./routes'));

app.listen(config.port, () => {
  console.log(`Server avviato su http://localhost:${config.port}`);
});

app.get('/', (req, res) => {
  res.send('Benvenuto nel backend!');
});
