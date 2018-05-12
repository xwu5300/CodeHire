const knex = require('../../db/index.js');
const bcrypt = require('bcrypt');

module.exports.saveCandidate = (fullname, username, password, email, phone, github_url, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: fullname, username: username, password: hash, email: email, phone: phone, github_url: github_url, role: 'candidate' })
    .then((response) => {
      callback('Candidate Registration Successful!');
    })
    .catch((err) => {
      console.log('Error saving candidate', err);
      callback('Please try again');
    })
  })
  return knex('users')
  
}

module.exports.saveCompany = (companyName, username, password, email, phone, logoUrl, information, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: companyName, username: username, password: hash, email: email, phone: phone, logo_url: logoUrl, information: information, role: 'company'})
    .then((response) => {
      callback('Company Registration Successful!');
    })
    .catch((err) => {
      console.log('Error saving company', err);
      callback('Please try again')
    })
  })
}

module.exports.handleLogin = (username, password, callback) => {
  return knex('users')
  .select('username', 'role', 'id')
  .where({ username: username })
  .then((user) => {
    knex('users').select('password').where({ username: user[0].username })
      .then((hashed) => {
        bcrypt.compare(password, hashed[0].password, (err, response) => {
          if(response === true) {
            console.log('password matched!');
            callback(user[0].role, user[0].id, user[0].username);
          } else {
            console.log('Wrong password');
            callback('Wrong Password');
          }
        })
      })
      .catch((err) => {
        console.log('Error matching password', err);
      }) 
  })
  .catch((err) => {
    console.log('Username does not match');
    callback('Username Not Found');
  })
}






