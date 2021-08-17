const { Pool } = require("pg");

const pool = new Pool({
  host: 'localhost',
  database: 'biomed',
  password: 'root',
  user: 'postgres',
  port: 5432,
});

module.exports = pool;
