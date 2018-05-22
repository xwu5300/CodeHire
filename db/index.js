const { dbConfig } = require('../config.js');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : dbConfig.host,
    port: dbConfig.port,
    user : dbConfig.user,
    password : dbConfig.password,
    database : dbConfig.database
  }
});

module.exports = knex;
