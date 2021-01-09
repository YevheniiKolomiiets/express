const { Client } = require('pg');
const config = require('./config');

const client = new Client({
  user: config.PG_USER,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
  password: config.PG_PASSWORD,
  port: config.PG_PORT,
});

client.connect();

client.query('SELECT * FROM users', (err, res) => {
  console.log(res.rows);
  client.end();
});

module.exports = client;
