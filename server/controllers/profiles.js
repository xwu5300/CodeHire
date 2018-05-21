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


module.exports.getCandidateInfo = (candidateId, username, callback) => {
  if(candidateId) {
  return knex('users')
  .select('candidate_skills', 'github_url', 'profile_photo')
  .where({ id: candidateId })
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    console.log('Error retrieving candidate info', err);
  })
} else if(username) {
  return knex('users')
  .select('candidate_skills', 'github_url')
  .where({ username: username })
  .then((data) => {
    callback(data);
  })
  .catch((err) => {
    console.log('Error retrieivng candidate info by username', err);
  })
}
}


// Insert skill or github_url into 'users' table

module.exports.updateCandidateInfo = (candidateId, skill, github_url, photo) => {
  
  if(skill) {
    return knex('users')
        .where({ id: candidateId })
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
    if (photo) {
      return knex('users')
      .where({ id: candidateId })
      .update({ profile_photo: photo })
      .then(() => {
        console.log('updated profile photo');
      })
      .catch((err) => {
        console.log('unable to upload profile photo', err);
      })
    }
  }

module.exports.deleteCandidateSkill = (candidateId, skill, callback) => {
  return knex('users')
    .where({ id: candidateId })
    .update({
      candidate_skills: knex.raw('array_remove(candidate_skills, ?)', skill)
    })
    .then(() => {
      knex('users').select('candidate_skills').where({ id: candidateId })
      .then((data) => {
        callback(data[0].candidate_skills);
      }) 
    })
    .catch((err) => {
      console.log('Error deleting candidate skill', err);
    })
  }

module.exports.saveToFavorites = (companyId, candidateId) => {
  return knex('company_user')
  .where({company_id: companyId, user_id: candidateId})
  .update({
    user_id: candidateId
  })
  .then((res) => {
    if (res === 0) {
      return knex('company_user')
      .insert({company_id: companyId, user_id: candidateId})
      .then(() => {
        console.log('successfully saved to favorites in db');
      })
      .catch((err) => {
        console.log('Error saving candidate to favorites in db', err);
      })
    } else {
      console.log('Already saved to database');
    }
  })
  .catch((err) => {
    console.log('Error saving candidate to favorites in db', err);
  })
}

module.exports.removeFromFavorites = (companyId, candidateId) => {
  return knex('company_user')
  .where({company_id: companyId, user_id: candidateId})
  .del()
  .then(() => {
    console.log('successfully removed candidate from favorites in db');
  })
  .catch((err) => {
    console.log('Error removing canddate from favorites in db', err);
  })
}

module.exports.getFavorites = (companyId) => {
  return knex('company_user')
  .where({company_id: companyId})
  .innerJoin('users', 'users.id', 'company_user.user_id')
  .then((res) => {
    console.log('Successfully retrieved saved users from db');
    return res;
  })
  .catch((err) => {
    console.log('Could not retrieve saved users from db', err);
  })
}

module.exports.searchUsers = (query) => {
  return knex('users')
  .where({role: 'candidate'})
  .andWhere(knex.raw(`array[candidate_skills] && ARRAY['${query}']`))
  .orWhere({username: query})
  .then((res) => {
    console.log('Successfully fetching users from db');
    return res;
  })
  .catch((err) => {
    console.log('Error fetching users from db', err);
  })
}

module.exports.saveResume = (url, name, userId) => {
  return knex('users')
  .where({id: userId})
  .update({resume_url: url, resume_name: name})
  .then(() => {
    console.log('Successfully saved resume to db');
  })
  .catch((err) => {
    console.log('Unable to save resume to db', err);
  })
}

module.exports.removeResume = (userId) => {
  return knex('users')
  .where({id: userId})
  .update({resume_url: null, resume_name: null})
  .then(() => {
    console.log('Successfully removed resume from db');
  })
  .catch((err) => {
    console.log('Unable to remove resume from db', err);
  })
}

module.exports.getResume = (userId) => {
  return knex('users')
  .where({id: userId})
  .select('resume_url', 'resume_name')
  .then((res) => {
    console.log('Successfully retrieved resume from db');
    return res;
  })
  .catch((err) => {
    console.log('Unable to retrieve resume from db', err);
  })
}