const config = require('../config.js');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : config.name || 'Kevin',
    password : config.password || 'password',
    database : 'code_hire'
  }
});



module.exports = knex;
