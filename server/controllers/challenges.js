const knex = require('../../db/index.js');

//saves a default challenge to company challenge list
module.exports.saveChallenge = (title, instruction, functionName, params, testCases, examples, difficulty, category, companyId, scheduled) => {
  return knex('all_challenges')
  .where({
    company_id: companyId,
    title: title
  })
  .update({
    title: title,
    instruction: instruction,
    function_name: functionName,
    parameters: params,
    test_cases: testCases,
    examples: examples,
    difficulty: difficulty,
    category: category
  })
  .then((res) => {
    if (res === 0) {
      return knex('all_challenges').insert({
        title: title,
        instruction: instruction,
        function_name: functionName,
        parameters: params,
        test_cases: testCases,
        examples: examples,
        difficulty: difficulty,
        category: category,
        initial: false,
        duration: null,
        company_id: companyId
      })
      .then((res) => {
        console.log('Saved challenge to db');
      })
      .catch((err) => {
        console.log('Unable to save challenge to db', err);
      })
    } else {
      console.log('Updated challenge')
    }
  })
  .catch((err) => {
    console.log(err);
  })
};

//removes a challenge from company challenge list
module.exports.deleteCompanyChallenge = (title, companyId) => {
  return knex('all_challenges')
  .where({title: title, company_id: companyId})
  .del()
  .then((res) => {
    console.log('Deleted challenge from database');
  })
  .catch((err) => {
    console.log('Unable to delete challenge from db', err);
  })
};

//get all company challenges
module.exports.getCompanyChallenges = (companyId) => {
  return knex('all_challenges').where('company_id', companyId)
  .then((res) => {
    console.log('Company challenges successfully received from db');
    return res;
  })
  .catch((err) => {
    console.log('Could not retrieve company challenges from db:', err);
  })
};

//get all default challenges
module.exports.getDefaultChallenges = () => {
  return knex('all_challenges').where('company_id', 1)
  .then((res) => {
    console.log('Default challenges successfully received from db');
    return res;
  })
  .catch((err) => {
    console.log('Could not retrieve default challenges from db:', err);
  })
};

//get a initial challenge from company
module.exports.getInitialChallenge = (companyId) => {
  // console.log('challenge company id', companyId)
  return knex.from('all_challenges')
  .where({'all_challenges.company_id': companyId, 'all_challenges.initial': true})
  .innerJoin('users', 'users.id', 'all_challenges.company_id')
  .select('*', 'all_challenges.id')
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log('Could not retrieve initial challenges from db:', err);
  })
};

//set initial challenge
module.exports.setInitialChallenge = (companyId, challengeId, duration) => {
  console.log('SET INITIAL CHALLENGE', companyId, challengeId, duration);

  return knex('all_challenges')
  .where({
    company_id: companyId,
  })
  .orWhere({
    company_id: 1
  })
  .update({
    initial: false,
  })
  .then(() => {
    return knex('all_challenges')
    .where({
      company_id: companyId,
      id: challengeId
    })
    .orWhere({
      company_id: 1,
      id: challengeId
    })
    .update({
      initial: true,
      duration: duration,
    })
    .then(() => {
      console.log('Updated initial challenge in db');
    })
    .catch((err) => {
      console.log('Unable to update initial challenge', err);
    })
  })
  .catch((err) => {
    console.log('Unable to update initial challenge', err);
  })
}


module.exports.removeInitialChallenge = (companyId, challengeId) => {
  return knex('all_challenges')
  .where({
    company_id: companyId,
    id: challengeId
  })
  .update({
    initial: false
  })
  .then(() => {
    console.log('Removed initial challenge from db');
  })
  .catch((err) => {
    console.log('Unable to remove initial challenge from db', err);
  })
}

module.exports.getChallengeInfo = (challengeId, companyId) => {
  return knex('all_challenges')
  .where({
    company_id: companyId,
    id: challengeId
  })
  .then((res) => {
    console.log('Retrieving previously saved data from db');
    return res;
  })
  .catch((err) => {
    console.log('Unable to retrieve previously saved data', err);
  })
}