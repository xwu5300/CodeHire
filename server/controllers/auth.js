const knex = require('../../db/index.js');
const bcrypt = require('bcrypt');

module.exports.saveCandidate = (token, fullname, phone, github_url, callback) => {
  // bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ token: token, name: fullname, phone: phone, github_url: github_url, role: 'candidate' })
    .then((response) => {
      callback('Candidate Registration Successful!');
    })
    .catch((err) => {
      console.log('Error saving candidate', err);
      callback('Please try again');
    })
  // })
  return knex('users')
  
}

module.exports.saveCompany = (token, companyName, phone, logoUrl, information, callback) => {
  // bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ token: token, name: companyName, phone: phone, logo_url: logoUrl, information: information, role: 'company'})
    .then((response) => {
      callback('Company Registration Successful!');
    })
    .catch((err) => {
      console.log('Error saving company', err);
      callback('Please try again')
    })
  // })
}

module.exports.handleLogin = (token, password, callback) => {
  return knex('users')
  .select('token', 'role', 'id')
  .where({ token: token })
  .then((user) => {
    knex('users').select('password').where({ token: user[0].token })
      .then((hashed) => {
        bcrypt.compare(password, hashed[0].password, (err, response) => {
          if(response === true) {
            console.log('password matched!');
            callback(user[0].role, user[0].id, user[0].token);
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
    console.log('token does not match');
    callback('token Not Found');
  })
}






