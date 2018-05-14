const { dbConfig } = require('../config.js');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : dbConfig.name || 'Kevin',
    password : dbConfig.password || 'password',
    database : 'code_hire'
  }
});



module.exports = knex;
