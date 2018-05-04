const config = require('../config.js');

const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : config.name || 'root',
    password : config.password || '',
    database : 'code_hire'
  }
});



module.exports = knex;
