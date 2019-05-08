const { Pool } = require('pg');
const databadeConfiguration = require('./secrets/databaseConfiguration');

const pool = new Pool(databadeConfiguration);

module.exports = pool;