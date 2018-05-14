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
    return knex('users')
    .insert({ token: token, name: companyName, phone: phone, logo_url: logoUrl, information: information, role: 'company'})
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
    callback(user[0].role, user[0].id, user[0].name);
  })
  .catch((err) => {
    console.log('Error matching password', err);
  }) 
}






