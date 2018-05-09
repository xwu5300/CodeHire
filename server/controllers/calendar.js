const knex = require('../../db/index.js');

//get all companies' calendars
module.exports.getAllCompanyCalendars = () => {
  return knex.from('users')
    .innerJoin('company_schedule', 'users.id', 'company_schedule.company_id')
    .orderBy('time', 'asc')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('Could not retrieve companies schedules from db:', err);
    })
  }

//save challenge to company schedule
module.exports.addToCompanySchedule = (time, duration, challengeId, companyId) => {
  return knex('company_schedule').insert({
    time: time,
    duration: duration,
    challenge_id: challengeId,
    company_id: companyId
  })
  .then(() => {
    console.log('Event added to company schedule');
  })
  .catch((err) => {
    console.log('Error adding to company schedule', err);
  })
}

  //get single company's schedule
module.exports.getCompanySchedule = (companyId) => {
  return knex.from('all_challenges')
  .innerJoin('company_schedule', 'all_challenges.id', 'company_schedule.challenge_id')
  .where({'company_schedule.company_id': companyId})
  .orderBy('time', 'asc')
  .then((res) => {
    console.log('Successfully retrieved schedule from db');
    console.log(res);
    return res;
  })
  .catch((err) => {
    console.log('Could not retrieve schedule from db', err);
  })
}

module.exports.getCandidateCalendar = (candidateId) => {
  return knex.from('user_schedule')
    .innerJoin('company_schedule', 'user_schedule.company_schedule_id', 'company_schedule.id')
    .innerJoin('all_challenges', 'company_schedule.challenge_id', 'all_challenges.id')
    .innerJoin('users', 'company_schedule.company_id', 'users.id')
    .where({'user_schedule.candidate_id': candidateId})
    .orderBy('time', 'asc')
    .then((res) => {
      console.log('Candidate schedule successfully received from db', res);
      return res;
    })
    .catch((err) => {
      console.log('Could not retrieve candidate schedule from db:', err);
    })
}

module.exports.saveCandidateCalendar = (candidateId, companyScheduleId) => {
  return knex('user_schedule').insert({
    candidate_id: candidateId,
    company_schedule_id: companyScheduleId
  })
  .then(() => {
    console.log('Event added to user schedule');
  })
  .catch((err) => {
    console.log('Error adding to user schedule', err);
  })
}
