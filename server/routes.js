const router = require('express').Router();

const challengeControllers = require('./controllers/challenges');
const authControllers = require('./controllers/auth');
const calendarControllers = require('./controllers/calendar');
const resultsControllers = require('./controllers/results');
const profileControllers = require('./controllers/profiles');

/* ------- User Routes --------- */

// get company Information
router.get('/api/companyInfo', (req, res) => {
  console.log(req.query.userId)
  profileControllers.getCompanyInfo(req.query.userId, (data) => {
    res.status(200).send(data);
  })
})

router.get('/api/candidateInfo', (req, res) => {
  profileControllers.getCandidateInfo(req.query.userId, (data) => {
    res.status(200).send(data);
  })
})


// update company profile information in 'users' table
router.patch('/api/companyInfo', (req, res) => {
  profileControllers.updateCompanyInfo(req.body.userId, req.body.logo_url, req.body.information)
  .catch((err) => {
    console.log(err);
  })
})

// Update Candidate Info, including skills and github URL
router.patch('/api/candidateInfo', (req, res) => {
  profileControllers.updateCandidateInfo(req.body.userId, req.body.skills, req.body.github_url)
  .catch((err) => {
    console.log(err);
  })
})


// authentication route for logging in, check 'users' table for credentials
router.post('/api/login', (req, res) => {
  authControllers.handleLogin(req.body.token, (role, id, name) => {
    res.status(201).send([role, id, name]);
  })
  .catch((err) => {
    console.log(err);
  })
})


// post candidate register info to 'users' table
router.post('/api/registerCandidate', (req, res) => {
  authControllers.saveCandidate(req.body.token, req.body.fullName, req.body.phone, req.body.github_url, (status) => {
    res.status(201).send(status);
  })
  .catch((err) => {
    console.log(err);
  })
})

// post company register information into 'users' table
router.post('/api/registerCompany', (req, res) => {
  console.log('saving company')
  authControllers.saveCompany(req.body.token, req.body.companyName, req.body.phone, req.body.logoUrl, req.body.information, (status) => {
    res.status(201).send(status);
  })
})


/* ---------- Challenge Routes --------- */

// get all challenges from 'all_challenges' table
router.get('/api/challenges', (req, res) => {
  let companyId = req.query.companyId;
  challengeControllers.getCompanyChallenges(companyId)
  .then((data) => {
    res.send(data);
  })
})

// get default challenges from 'all_challenges' table
router.get('/api/defaultChallenges', (req, res) => {
  challengeControllers.getDefaultChallenges()
  .then((data) => {
    res.send(data);
  })
})

router.post('/api/challenges', (req, res) => {
  let title = req.body.challenge.title;
  let instruction = req.body.challenge.instruction;
  let functionName = req.body.challenge.function_name;
  let params = req.body.challenge.parameters;
  let testCases = req.body.test_cases || `[[${req.body.challenge.testInput}], [${req.body.challenge.testOutput}]]`;
  let examples = req.body.examples || `[[${req.body.challenge.exampleInput}], [${req.body.challenge.exampleOutput}]]` || null;
  let difficulty = req.body.challenge.difficulty || null;
  let companyId = req.body.companyId;
  challengeControllers.saveChallenge(title, instruction, functionName, params, testCases, examples, difficulty, companyId)
  .then(() => {
    res.send('Successfully saved challenge');
  })
})

// delete company challenge from 'all_challenges' table
router.delete('/api/challenges', (req, res) => {
  let query = JSON.parse(req.query.challenge)
  let title = query.title;
  let companyId = req.query.companyId;
  challengeControllers.deleteCompanyChallenge(title, companyId)
  .then(() => {
    res.send('Successfully deleted challenge');
  })
})

// post initial challenge info into 'intiial_challenges table'
router.post('/api/initialChallenge', (req, res) => {

})

// update initial challenge from 'intitial_challenges table'
router.patch('/api/initialChallenge', (req, res) => {
  console.log('server route', req.body.challengeId);
  if (req.body.initial === false || req.body.isInitial === true) {
    challengeControllers.setInitialChallenge(req.body.companyId, req.body.challengeId, req.body.duration)
    .then(() => {
      res.send('Updated initial challenge');
    })
    .catch((err) => {
      console.log('Could not update initial challenge', err);
    })
  } else {
    challengeControllers.removeInitialChallenge(req.body.companyId, req.body.challengeId)
    .then(() => {
      res.send('Removed initial challenge');
    })
    .catch((err) => {
      console.log('Could not remove initial challenge', err);
    })
  }
})

// get initial challenge for company
router.get('/api/initialChallenge', (req, res) => {
  let companyId = req.query.company_id;
  challengeControllers.getInitialChallenge(companyId)
  .then((data) => {
    res.send(data);
  })
})

//get selected challenge info for company
router.get('/api/challenge', (req, res) => {
  challengeControllers.getChallengeInfo(req.query.challengeId, req.query.companyId)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('Could not receive data on this challenge', err);
  })
})


/* ---------- Schedule Routes -------- */

// get user schedule
router.get('/api/candidateCalendar', (req, res) => {
  let candidateId = req.query.candidateId;
  calendarControllers.getCandidateCalendar(candidateId)
  .then((data) => {
    res.send(data)
  })
})

// save user calendar
router.post('/api/candidateCalendar', (req, res) => {
  let candidateId = req.body.candidateId;
  let companyScheduleId = req.body.companyScheduleId;
  let isExist = calendarControllers.saveCandidateCalendar(candidateId, companyScheduleId)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('Could not save challenge to user schedule', err);
  })
})

// cancel user schedule
router.post('/api/cancelCandidateSchedule', (req, res) => {
  let candidateScheduleId = req.body.candidateScheduleId;
  calendarControllers.deleteCandidateSchedule(candidateScheduleId)
  .then(() => {
    res.send('Successfully delete candidate schedule');
  })
  .catch((err) => {
    console.log('Could not delete candidate schedule', err);
  })
})

// get company schedule
router.get('/api/companyCalendars', (req, res) => {
  calendarControllers.getAllCompanyCalendars()
  .then((data) => {
    res.send(data);
  })
})
// add to company Calendar
router.post('/api/companyCalendar', (req, res) => {
  let time = req.body.time;
  let duration = Number(req.body.duration);
  let challengeId = req.body.challengeId;
  let companyId = req.body.companyId;
  calendarControllers.addToCompanySchedule(time, duration, challengeId, companyId)
  .then(() => {
    console.log('Successfully saved challenge to schedule');
    res.send();
  })
  .catch((err) => {
    console.log('Could not save to company schedule', err);
  })
})

//fetch single company's schedule
router.get('/api/companyCalendar', (req, res) => {
  calendarControllers.getCompanySchedule(req.query.companyId)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})

//delete item from company schedule
router.delete('/api/companyCalendar', (req, res) => {
  calendarControllers.deleteFromCompanySchedule(req.query.scheduleId)
  .then(() => {
    console.log('Scheduled challenge removed from list');
    res.send();
  })
  .catch((err) => {
    console.log('Could not remove scheduled challenge from list', err);
  })
})

// update company calendar
router.patch('/api/companyCalendar:date', (req, res) => {


})


/* ------- Results Routes -------- */

// get results data from 'results' table
router.get('/api/results', (req, res) => {
  resultsControllers.getCompanyResults(req.query.companyId, req.query.candidateId)
  .then((data) => {
    console.log('Retrieve candidate result from db')
    res.send(data)
  })
  .catch((err) => {
    console.log('Could not retrieve result from db', err);
  })
})

//get candidate list from results table
router.get('/api/results/candidate', (req, res) => {
  resultsControllers.getCandidateList(req.query.companyId)
  .then((data) => {
    console.log('Retrieve candidate list from db')
    res.send(data)
  })
  .catch((err) => {
    console.log('Could not retrieve candidate list from db', err);
  })
})

router.get('/api/results/candidate/initial', (req, res) => {
  resultsControllers.getCandidateInitialResults(req.query.companyId, req.query.candidateId)
  .then((data) => {
    console.log('Retrieve candidate initial result from db')
    if (!data.length) {
      res.send(false)
    } else {
      res.send(data[0].user_passed)
    }
  })
  .catch((err) => {
    console.log('Could not retrieve candidate initial result from db', err);
  })
})

// post results to 'results' table
router.post('/api/results', (req, res) => {
  resultsControllers.saveResults(req.body.isPassed, req.body.code, req.body.score, req.body.completedAt, req.body.challengeId, req.body.companyId, req.body.candidateId, req.body.initial)
  .then(() => {
    console.log('Results saved to results table');
    res.send();
  })
  .catch((err) => {
    console.log('Could not save results to db');
  })
})


module.exports = router;
