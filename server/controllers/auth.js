const knex = require('../../db/index.js');

module.exports.saveCandidate = (fullname, username, password, email, phone) => {
  return knex('users')
  .insert({ name: fullname, username: username, password: password, email: email, phone: phone, role: 'candidate' })
  .catch((err) => {
  	console.log('Error saving candidate', err);
  })
}

module.exports.saveCompany = (companyName, username, password, email, phone, logoUrl) => {
  return knex('users')
  .insert({ name: companyName, username: username, password: password, email: email, phone: phone, logo_url: logoUrl, role: 'company'})
  .catch((err) => {
  	console.log('Error saving company', err);
  })

}






