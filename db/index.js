const knex = require('knex')({
  client: 'pg',
  connection: {
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'codeHire'
  }
});



module.exports = { knex };