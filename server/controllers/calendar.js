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

module.exports.deleteFromCompanySchedule = (scheduleId) => {
  return knex('company_schedule')
  .where({
    id: scheduleId
  })
  .del()
  .then(() => {
    console.log('Scheduled challenge removed from db');
  })
  .catch((err) => {
    console.log('Error removing challenge from db', err);
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
    return res;
  })
  .catch((err) => {
    console.log('Error retrieving schedule from db', err);
  })
}

module.exports.getCandidateCalendar = (candidateId) => {
  return knex.from('user_schedule')
    .innerJoin('company_schedule', 'user_schedule.company_schedule_id', 'company_schedule.id')
    .innerJoin('all_challenges', 'company_schedule.challenge_id', 'all_challenges.id')
    .innerJoin('users', 'company_schedule.company_id', 'users.id')
    .select('*', 'user_schedule.id')
    .where({'user_schedule.candidate_id': candidateId})
    .orderBy('time', 'asc')
    .then((res) => {
      console.log('Candidate schedule successfully received from db');
      return res;
    })
    .catch((err) => {
      console.log('Could not retrieve candidate schedule from db:', err);
    })
}

module.exports.saveCandidateCalendar = (candidateId, companyScheduleId) => {
  return knex.select('*')
  .from('user_schedule')
  .where({
    'company_schedule_id': companyScheduleId, 
    'candidate_id': candidateId
  })
  .then((res) => {
    if (!res.length) {
      return knex('user_schedule')
      .insert({
        candidate_id: candidateId,
        company_schedule_id: companyScheduleId
      })
      .then((res) => {
        return res;
        console.log('Event added to user schedule');
      })
      .catch((err) => {
        console.log('Error adding to user schedule', err);
      })
    }
    else {
      return false
    }
  })
  .catch((err) => {
    console.log('Error adding to user schedule', err);
  })
}

module.exports.deleteCandidateSchedule = (candidateScheduleId) => {
  return knex('user_schedule')
  .where({'id': candidateScheduleId})
  .del()
  .then(() => {
    console.log('Challenge deleted from user schedule');
  })
  .catch((err) => {
    console.log('Error deleting from user schedule', err);
  })
}
