require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.APP_PORT;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

const { Client } = require('pg');

const config = {
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
};

const client = new Client(config);

client.connect();

client.query('SELECT * FROM users', (err, res) => {
  console.log(res.rows);
  client.end();
});
