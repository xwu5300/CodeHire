const pg = require('pg');
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'root',
    port: '3000',
    password : '',
    database : 'code_hire'
  }
});

module.exports = { knex };