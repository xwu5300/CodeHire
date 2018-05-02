
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : '',
    password : '',
    database : 'codeHire'
  }
});

module.exports = { knex };