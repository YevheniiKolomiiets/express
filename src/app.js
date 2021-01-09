const express = require('express');
const config = require('./config');
require('./pg-client.js');

const app = express();
const port = config.APP_PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
