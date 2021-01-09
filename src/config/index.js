require('dotenv').config();

module.exports = {
  APP_PORT: process.env.APP_PORT,
  PG_USER: process.env.PGUSER,
  PG_HOST: process.env.PGHOST,
  PG_DATABASE: process.env.PGDATABASE,
  PG_PASSWORD: process.env.PGPASSWORD,
  PG_PORT: process.env.PGPORT,
};
