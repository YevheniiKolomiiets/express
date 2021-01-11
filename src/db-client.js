const { Pool } = require('pg');
const config = require('./config');

const dbConfig = {
  user: config.PG_USER,
  host: config.PG_HOST,
  database: config.PG_DATABASE,
  password: config.PG_PASSWORD,
  port: config.PG_PORT,
};

const pool = new Pool(dbConfig);

module.exports = pool;
