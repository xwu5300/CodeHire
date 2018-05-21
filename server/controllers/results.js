const knex = require('../../db/index.js');

//saves users result to result
module.exports.saveResults = (companyScheduleId, isPassed, code, score, completedAt, challengeId, companyId, candidateId, initial) => {
  console.log('result.js', companyScheduleId )
  return knex('results').insert({
    user_passed: isPassed,
    code: code,
    score: score,
    completed_at: completedAt,
    challenge_id: challengeId,
    company_id: companyId,
    company_schedule_id: companyScheduleId,
    candidate_id: candidateId,
    is_initial: initial
  })
  .then((data) => {
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
  .innerJoin('users', 'results.candidate_id', 'users.id')
  .innerJoin('all_challenges', 'results.challenge_id', 'all_challenges.id')
  .select('results.*', 'all_challenges.*', 'users.name', 'users.information', 'users.phone', 'users.candidate_skills', 'users.github_url')
  .then((res) => {
    console.log('Retrieve candidate result from result table');
    return res;
  })
  .catch((err) => {
    console.log('error retrieving company results', err);
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
  .where({'company_id': companyId, 'candidate_id': candidateId, 'is_initial': true})
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

module.exports.getCandidateResults = (candidateId, companyScheduleId) => {
  let option = {'candidate_id': candidateId}
  if (companyScheduleId) {
    option = {'candidate_id': candidateId, 'company_schedule_id': companyScheduleId}
  }
  return knex('results')
  .where(option)
  .innerJoin('users', 'users.id', 'results.company_id')
  .innerJoin('all_challenges', 'all_challenges.id', 'results.challenge_id')
  .select('results.*', 'all_challenges.*', 'users.name', 'users.information', 'users.phone', 'users.logo_url')
  .orderBy('results.completed_at', 'desc')
  .then((res) => {
    console.log('Retrieve candidate results')
    return res;
  })
  .catch((err) => {
    console.log(err);
  })
}

module.exports.fetchAllResults = () => {
  return knex('results')
  .innerJoin('all_challenges', 'results.challenge_id', 'all_challenges.id')
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log('Error getting all results', err)
  })
}

module.exports.fetchCompanyData = (companyId) => {
  return knex('results')
  .where({'results.company_id': companyId})
  .innerJoin('all_challenges', 'all_challenges.id', 'results.challenge_id')
  .innerJoin('company_schedule', 'company_schedule.id', 'results.company_schedule_id')
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log('Error fetching challenge results', err);
  })
}

