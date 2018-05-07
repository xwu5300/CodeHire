const knex = require('../../db/index.js');

//get all companies' calendars
module.exports.getAllCompanyCalendars = () => {
    return knex.from('users')
    .innerJoin('company_schedule', 'users.id', 'company_schedule.company_id')
    .orderBy('time', 'asc')
    .then((res) => {
      console.log('All companies schedules successfully received from db');
      return res;
    })
    .catch((err) => {
      console.log('Could not retrieve companies schedules from db:', err);
    })
  }