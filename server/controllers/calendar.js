const knex = require('../../db/index.js');
const moment = require('moment');

//get all companies' list
module.exports.getCompanyList = (companyName) => {
  let option = `%${companyName}%`;
  return knex.from('users')
  .where({'role': 'company'})
  .where('name', 'like', option)
  .select('id', 'name','phone', 'information', 'logo_url')
  .orderBy('name', 'asc')
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log('Could no retrieve company list from db', err);
  })
}

//save challenge to company schedule
module.exports.addToCompanySchedule = (time, duration, challengeId, companyId) => {
  return knex('company_schedule').insert({
    time: time,
    duration: duration,
    challenge_id: challengeId,
    company_id: companyId,
  })
  .then(() => {
    console.log('Event added to company schedule');
  })
  .catch((err) => {
    console.log('Error adding to company schedule', err);
  })
}

module.exports.updateChallengeDate = (time, duration, scheduleId) => {
  return knex('company_schedule')
  .where({ id: scheduleId })
  .update({
    time: time,
    duration: duration
  })
  .catch((err) => {
    console.log('Error updating challenge date', err);
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
<<<<<<< HEAD
module.exports.getCompanySchedule = (companyId) => {
  let currTime = Date.now();
  return knex('company_schedule')
  .select('duration')
  .then((res) => {
    let duration = res[0].duration
    let pastTime = moment(currTime).add(duration, 'minutes')
    return knex.from('company_schedule')
    .innerJoin('all_challenges', 'all_challenges.id', 'company_schedule.challenge_id')
    .innerJoin('users', 'users.id', 'company_schedule.company_id')
    .select('*')
    .whereNull('company_schedule.time')
    .andWhere({'company_schedule.company_id': companyId})
    .orWhere('company_schedule.time', '>', pastTime)
    .andWhere({'company_schedule.company_id': companyId})
    .select('*', 'company_schedule.id', 'company_schedule.duration', 'company_schedule.company_id')
    .orderBy('time', 'asc')
=======
  module.exports.getCompanySchedule = (companyId) => {
    let currTime = Date.now();
    return knex('company_schedule')
    .select('duration')
>>>>>>> style updates
    .then((res) => {
      let duration = res[0].duration
      let pastTime = moment(currTime).add(duration, 'minutes')
      return knex.from('company_schedule')
      .innerJoin('all_challenges', 'all_challenges.id', 'company_schedule.challenge_id')
      .innerJoin('users', 'users.id', 'company_schedule.company_id')
      .select('*')
      .whereNull('company_schedule.time')
      .andWhere({'company_schedule.company_id': companyId})
      .orWhere('company_schedule.time', '>', pastTime)
      .andWhere({'company_schedule.company_id': companyId})
      .select('*', 'company_schedule.id', 'company_schedule.duration', 'company_schedule.company_id')
      .orderBy('time', 'asc')
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.log('Error retrieving schedule from db', err);
      })
    })
    .catch((err) => {
      console.log('Error retrieving schedule from db', err);
    })
  }

module.exports.getCandidateCalendar = (candidateId) => {
  return knex.from('user_schedule')
    .where({'user_schedule.candidate_id': candidateId})
    .innerJoin('company_schedule', 'user_schedule.company_schedule_id', 'company_schedule.id')
    .innerJoin('all_challenges', 'company_schedule.challenge_id', 'all_challenges.id')
    .innerJoin('users', 'company_schedule.company_id', 'users.id')
    .select('*', 'company_schedule.duration', 'user_schedule.id', 'company_schedule.company_id')
    .orderBy('time', 'asc')
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log('Could not retrieve candidate schedule from db:', err);
    })
}

module.exports.saveCandidateCalendar = (candidateId, companyScheduleId) => {
  // console.log('calendar saveCandidateCalendar', candidateId, companyScheduleId)
  return knex.select('*')
  .from('user_schedule')
  .where({
    'company_schedule_id': companyScheduleId, 
    'candidate_id': candidateId
  })
  .then((res) => {
    console.log('calendar saveCandidateCalendar', res)
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

module.exports.checkCandidateReschedule = (candidateId, companyId, time) => {
  let earlyTime = moment(time).subtract(30, 'days')
  let lateTime = moment(time).add(30, 'days')
  return knex('user_schedule')
  .where('candidate_id', candidateId)
  .innerJoin('company_schedule', 'company_schedule.id', 'user_schedule.company_schedule_id')
  .where('company_id', companyId)
  .andWhere('time', '>', earlyTime)
  .andWhere('time', '<', lateTime)
  .then((res) => {
    // console.log('calendar.js check candidate reschedule', res)
    return res;
  })
  .catch((err) => {
    console.log('Could not check candidate reschedule from db', err);
  })
}

module.exports.getAllCompanyCalendars = (companyName, companyId) => {
  console.log('calendar company Id', companyId)
  let currTime = new Date();
  if (!companyId) {
    let option = `%${companyName}%`;
    return knex('company_schedule')
    .innerJoin('users', 'users.id', 'company_schedule.company_id')
    .where('name', 'like', option)
    .where('time', '>', currTime)
    .select('*', 'company_schedule.id')
    .orderBy('time', 'asc')
    .then((res) => {
      console.log('res from calendar')
      return res;
    })
    .catch((err) => {
      console.log('Could not retrieve companies schedules from db:', err);
    })
  } else {
    return knex('company_schedule')
    .innerJoin('users', 'users.id', 'company_schedule.company_id')
    .where('company_schedule.company_id', companyId)
    .where('time', '>', currTime)
    .select('*', 'company_schedule.id')
    .orderBy('time', 'asc')
    .then((res) => {
      console.log('res from calendar')
      return res;
    })
    .catch((err) => {
      console.log('Could not retrieve companies schedules from db:', err);
    })
  }
}

module.exports.fetchPastSchedule = (companyId) => {
  return knex('company_schedule')
  .where({'company_schedule.company_id': companyId})
  .leftJoin('results', 'results.company_schedule_id', 'company_schedule.id')
  .where({'results.is_initial': false})
  .innerJoin('all_challenges', 'all_challenges.id', 'company_schedule.id')
  .select('all_challenges.*', 'company_schedule.*')
  .orderBy('time', 'desc')
  .distinct('company_schedule.id')
  .then((res) => {
    return res;
  })
  .catch((err) => {
    console.log('error retrieving past challenges', err);
  })
}