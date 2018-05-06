const knex = require('../../db/index.js');
const bcrypt = require('bcrypt');

module.exports.saveCandidate = (fullname, username, password, email, phone, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: fullname, username: username, password: hash, email: email, phone: phone, role: 'candidate' })
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

module.exports.saveCompany = (companyName, username, password, email, phone, logoUrl, callback) => {
  bcrypt.hash(password, 10, (err, hash) => {
    return knex('users')
    .insert({ name: companyName, username: username, password: hash, email: email, phone: phone, logo_url: logoUrl, role: 'company'})
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
  .select('username', 'role')
  .where({ username: username })
  .then((user) => {
    knex('users').select('password').where({ username: user[0].username })
      .then((hashed) => {
        bcrypt.compare(password, hashed[0].password, (err, response) => {
          if(response === true) {
            console.log('password matched!');
            callback(user[0].role);
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


module.exports.updateCompanyInfo = (username, logoUrl, information) => {
  return knex('users')
  .where({ username: username })
  .update({ logo_url: logoUrl, information: information })
  .then((response) => {
    console.log('Success updating company info');
  })
  .catch((err) => {
    console.log('Error updating company info', err);
  })
}

module.exports.getCompanyInfo = (username, callback) => {
  return knex('users')
  .select('logo_url', 'information')
  .where({ username: username })
  .then((data) => {
    callback(data);
    console.log('LOGOURL', data);
  })
  .catch((err) => {
    console.log('Error retrieving company info', err);
  })
}





