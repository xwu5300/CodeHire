const knex = require('../../db/index.js');

module.exports.saveCandidate = (token, name, username, phone, github_url) => {
    return knex('users')
    .insert({ name: name, username: username, phone: phone, github_url: github_url, role: 'candidate', token: token })
    .then((response) => {})
    .catch((err) => {})
  
}

module.exports.saveCompany = (token, name, username, phone, logoUrl, information) => {
    return knex('users')
    .insert({ name: name, username: username, phone: phone, logo_url: logoUrl, information: information, role: 'company', token: token })
    .then((response) => {})
    .catch((err) => {})
}

module.exports.handleLogin = (token,  callback) => {
  return knex('users')
  .where({ token: token })
  .then((user) => {
    if (user.length) {
      callback(user[0].role, user[0].id, user[0].username);
    }
  })
  .catch((err) => {}) 
}

module.exports.getUsername = (userId, username) => {
  let option = {id: userId}
  if (username) {
    option = {username: username}
  }
  return knex('users')
  .select('username')
  .where(option)
  .then((user) => {
    return user;
  })
  .catch((err) => {})
}





