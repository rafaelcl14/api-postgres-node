const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  user: process.env.DATABASE_USERNAME,
  port: process.env.DATABASE_PORT,
});

module.exports = pool;
