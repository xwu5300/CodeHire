const knex = require('../../db/index.js');
const bcrypt = require('bcrypt');

module.exports.saveCandidate = (fullname, username, password, email, phone) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: fullname, username: username, password: hash, email: email, phone: phone, role: 'candidate' })
    .catch((err) => {
      console.log('Error saving candidate', err);
    })
  })
  return knex('users')
  
}

module.exports.saveCompany = (companyName, username, password, email, phone, logoUrl) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: companyName, username: username, password: hash, email: email, phone: phone, logo_url: logoUrl, role: 'company'})
    .catch((err) => {
      console.log('Error saving company', err);
    })
  })

}






