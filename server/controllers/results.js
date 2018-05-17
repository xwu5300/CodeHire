const knex = require('../../db/index.js');

//saves users result to result
module.exports.saveResults = (isPassed, code, score, completedAt, challengeId, companyId, candidateId, initial) => {
  return knex('results').insert({
    user_passed: isPassed,
    code: code,
    score: score,
    completed_at: completedAt,
    challenge_id: challengeId,
    company_id: companyId,
    candidate_id: candidateId,
    initial: initial
  })
  .then(() => {
    console.log('Results added to results table');
  })
  .catch((err) => {
    console.log('Error adding results to results table', err);
  })
}

//get company live challenge results from results table
module.exports.getCompanyResults = (companyId, candidateId) => {
  return knex('results')
  .where({'results.company_id': companyId, 'results.candidate_id' : candidateId})
  .leftJoin('users', 'results.candidate_id', 'users.id')
  .leftJoin('all_challenges', 'results.challenge_id', 'all_challenges.id')
  .select('results.*', 'all_challenges.*', 'users.name', 'users.information', 'users.phone', 'users.candidate_skills', 'users.github_url')
  .then((res) => {
    console.log('Retrieve candidate result from result table');
    return res;
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.getCandidateList = (companyId) => {
  return knex('results')
  .where('results.company_id', companyId)
  .innerJoin('users', 'results.candidate_id', 'users.id')
  .distinct('users.name', 'users.id')
  .select('users.name', 'users.id')
  .orderBy('users.name', 'acs')
  .then((res) => {
    console.log('Retrieve candidate list from result table');
    return res;
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.getCandidateInitialResults = (companyId, candidateId) => {
  return knex('results')
  .where({'company_id': companyId, 'candidate_id': candidateId, 'initial': true})
  .orderBy('completed_at', 'desc')
  .limit(1)
  .select('user_passed')
  .then((res) => {
    console.log('Retrieve candidate initial challenge result')
    return res;
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.getCandidateResults = (candidateId) => {
  return knex('results')
  .where('candidate_id', candidateId)
  .then((res) => {
    console.log('Retrieve candidate results')
    return res;
  })
  .catch((err) => {
    console.log(err);
  })
}
