const knex = require('../../db/index.js');
const pg = require('pg');

/* ------------ Candidate/Company Profiles ---------- */
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
  })
  .catch((err) => {
    console.log('Error retrieving company info', err);
  })
}


module.exports.getCandidateInfo = (user_id, callback) => {
  return knex('users')
  .select('username', 'candidate_skills', 'github_url')
  .where({ id: user_id })
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    console.log('Error retrieving candidate info', err);
  })
}


// Insert skill or github_url into 'users' table
module.exports.updateCandidateInfo = (username, skill, github_url) => {
  if(skill) {
    return knex('users')
        .update({
            candidate_skills: knex.raw('array_append(candidate_skills, ?)', [skill])
        })
  } if(github_url === '' || github_url) {
      return knex('users')
      .where({ username: username })
      .update({ github_url: github_url })
      .catch((err) => {
        console.log(err);
      })
    }
  }
