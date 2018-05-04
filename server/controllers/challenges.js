const knex = require('../../db/index.js');

//saves a default challenge to company challenge list
module.exports.saveDefaultChallenge = (title, details, timelimit, companyId) => {
  return knex('all_challenges')
  .where({
    company_id: companyId,
    title: title
  })
  .update({
    title: title
  })
  .then((res) => {
    if (res.length === 0) {
      return knex('all_challenges').insert([
        {title: title},
        {details: details},
        {timelimit: timelimit},
        {initial: false},
        {company_id: companyId} 
      ])
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  })
  .catch((err) => {
    console.log(err);
  })
};

//removes a challenge from company challenge list
module.exports.deleteCompanyChallenge = (title, companyId) => {
  return knex('all_challenges')
  .where({title: title}, {company_id: companyId})
  .del()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  })
};

//get all company challenges
module.exports.getCompanyChallenges = (companyId) => {
  return knex('all_challenges').where('id', companyId);
};

//get all default challenges
module.exports.getDefaultChallenges = () => {
  return knex('all_challenges').where('id', 1);
};


