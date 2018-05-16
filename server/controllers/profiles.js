const knex = require('../../db/index.js');
const pg = require('pg');

/* ------------ Candidate/Company Profiles ---------- */
module.exports.updateCompanyInfo = (userId, logoUrl, information) => {
  return knex('users')
  .where({ id: userId })
  .update({ logo_url: logoUrl, information: information })
  .then((response) => {
    console.log('Success updating company info');
  })
  .catch((err) => {
    console.log('Error updating company info', err);
  })
}

module.exports.getCompanyInfo = (userId, callback) => {
  return knex('users')
  .select('logo_url', 'information')
  .where({ id: userId })
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    console.log('Error retrieving company info', err);
  })
}


module.exports.getCandidateInfo = (candidateId, callback) => {
  return knex('users')
  .select('candidate_skills', 'github_url')
  .where({ id: candidateId })
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
        .where({ username: username })
        .update({
            candidate_skills: knex.raw('array_append(candidate_skills, ?)', [skill])
        })
  } if(github_url === '' || github_url) {
      return knex('users')
      .where({ id: candidateId })
      .update({ github_url: github_url })
      .catch((err) => {
        console.log(err);
      })
    }
  }

  module.exports.deleteCandidateSkill = (username, skill, callback) => {
    return knex('users')
      .where({ username: username })
      .update({
        candidate_skills: knex.raw('array_remove(candidate_skills, ?)', skill)
      })
      .then(() => {
        knex('users').select('candidate_skills').where({ username: username})
        .then((data) => {
          callback(data[0].candidate_skills);
        }) 
      })
      .catch((err) => {
        console.log('Error deleting candidate skill', err);
      })
  }
