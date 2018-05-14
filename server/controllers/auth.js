const knex = require('../../db/index.js');
const bcrypt = require('bcrypt');

module.exports.saveCandidate = (token, name, username, phone, github_url, callback) => {
  // bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: name, username: username, phone: phone, github_url: github_url, role: 'candidate', token: token })
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

module.exports.saveCompany = (token, name, username, phone, logoUrl, information, callback) => {
    return knex('users')
    .insert({ name: name, username: username, phone: phone, logo_url: logoUrl, information: information, role: 'company', token: token })
    .then((response) => {
      callback('Company Registration Successful!');
    })
    .catch((err) => {
      console.log('Error saving company', err);
      callback('Please try again')
    })
}

module.exports.handleLogin = (token,  callback) => {
  console.log('db side', token)
  return knex('users')
  .where({ token: token })
  .then((user) => {
    callback(user[0].role, user[0].id, user[0].name, user[0].username);
  })
  .catch((err) => {
    console.log('Error matching password', err);
  }) 
}






