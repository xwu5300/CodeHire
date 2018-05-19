const router = require('express').Router();

const jwt = require('jwt-simple');
const { secret } = require('../config.js').secret;
const challengeControllers = require('./controllers/challenges');
const authControllers = require('./controllers/auth');
const calendarControllers = require('./controllers/calendar');
const resultsControllers = require('./controllers/results');
const profileControllers = require('./controllers/profiles');

/* ------- User Routes --------- */

// get company Information
router.get('/api/companyInfo', (req, res) => {
  let userId = jwt.decode(req.query.userId, secret).id;
  profileControllers.getCompanyInfo(userId, (data) => {
    res.status(200).send(data);
  })
})


// update company profile information in 'users' table
router.patch('/api/companyInfo', (req, res) => {
  let userId = jwt.decode(req.body.userId, secret).id;
  profileControllers.updateCompanyInfo(userId, req.body.logo_url, req.body.information)
  .catch((err) => {
    console.log(err);
  })
})

// Update Candidate Info, including skills and github URL
router.patch('/api/candidateInfo', (req, res) => {
  let candidateId = jwt.decode(req.body.username, secret).id;

  console.log('skills', req.body.skills);

  profileControllers.updateCandidateInfo(candidateId, req.body.skills, req.body.github_url)
  .catch((err) => {
    console.log(err);
  })
})

router.delete('/api/candidateInfo', (req, res) => {

  let candidateId = jwt.decode(req.query.candidateId, secret).id;

  profileControllers.deleteCandidateSkill(candidateId, req.query.skill, (data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})


router.get('/api/candidateInfo', (req, res) => {
  let candidateId = jwt.decode(req.query.candidateId, secret).id;
  profileControllers.getCandidateInfo(candidateId, (data) => {
    res.status(200).send(data);
  })
})


// authentication route for logging in, check 'users' table for credentials
router.post('/api/login', (req, res) => {
  authControllers.handleLogin(req.body.token, (role, id, name) => {
    let userId = {id: id};
    let info = {role: role, name: name};
    let idToken = jwt.encode(userId, secret);
    res.status(201).send([idToken, info]);
  })
  .catch((err) => {
    console.log(err);
  })
})


// post candidate register info to 'users' table
router.post('/api/registerCandidate', (req, res) => {
  authControllers.saveCandidate(req.body.token, req.body.fullName, req.body.username, req.body.phone, req.body.github_url)
  .then(() => {
    res.send()
  })
  .catch((err) => {
    console.log(err);
  })
})

// post company register information into 'users' table
router.post('/api/registerCompany', (req, res) => {
  // console.log(req.body.token, req.body.companyName, req.body.username, req.body.phone, req.body.logoUrl, req.body.information);
  console.log('saving company')
  authControllers.saveCompany(req.body.token, req.body.companyName, req.body.username, req.body.phone, req.body.logoUrl, req.body.information)
  .then(() => {
    res.send()
  })
})

router.get('/api/username', (req, res) => {
  let userId = jwt.decode(req.query.userId, secret).id;
  authControllers.getUsername(userId)
  .then((data) => {
    res.send(data)
  })
})


/* ---------- Challenge Routes --------- */

// get all challenges from 'all_challenges' table
router.get('/api/challenges', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
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
  let category = req.body.challenge.category;
  let instruction = req.body.challenge.instruction;
  let functionName = req.body.challenge.function_name;
  let params = req.body.challenge.parameters;
  let testCases = req.body.test_cases || `[[${req.body.challenge.testInput}], [${req.body.challenge.testOutput}]]`;
  let examples = req.body.examples || `[[${req.body.challenge.exampleInput}], [${req.body.challenge.exampleOutput}]]` || null;
  let difficulty = req.body.challenge.difficulty || null;
  let companyId = jwt.decode(req.body.companyId, secret).id;
  let scheduled = req.body.scheduled;
  challengeControllers.saveChallenge(title, instruction, functionName, params, testCases, examples, difficulty, category, companyId, scheduled)
  .then(() => {
    res.send('Successfully saved challenge');
  })
})

// delete company challenge from 'all_challenges' table
router.delete('/api/challenges', (req, res) => {
  let query = JSON.parse(req.query.challenge)
  let title = query.title;
  let companyId = jwt.decode(req.query.companyId, secret).id;
  challengeControllers.deleteCompanyChallenge(title, companyId)
  .then(() => {
    res.send('Successfully deleted challenge');
  })
})


// update initial challenge from 'intitial_challenges table'
router.patch('/api/initialChallenge', (req, res) => {
  let companyId = jwt.decode(req.body.companyId, secret).id;
  if (req.body.initial === false || req.body.isInitial === true) {
    challengeControllers.setInitialChallenge(companyId, req.body.challengeId, req.body.duration)
    .then(() => {
      res.send('Updated initial challenge');
    })
    .catch((err) => {
      console.log('Could not update initial challenge', err);
    })
  } else {
    challengeControllers.removeInitialChallenge(companyId, req.body.challengeId)
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
  let companyId = jwt.decode(req.query.company_id, secret).id;
  challengeControllers.getInitialChallenge(companyId)
  .then((data) => {
    res.send(data);
  })
})

//get selected challenge info for company
router.get('/api/challenge', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  challengeControllers.getChallengeInfo(req.query.challengeId, companyId)
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
  let candidateId = jwt.decode(req.query.candidateId, secret).id;
  calendarControllers.getCandidateCalendar(candidateId)
  .then((data) => {
    res.send(data)
  })
})

// save user calendar
router.post('/api/candidateCalendar', (req, res) => {
  let candidateId = jwt.decode(req.body.candidateId, secret).id;
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
router.delete('/api/cancelCandidateSchedule', (req, res) => {
  let candidateScheduleId = req.query.candidateScheduleId;
  let candidateId = jwt.decode(req.query.candidateId, secret).id;
  calendarControllers.deleteCandidateSchedule(candidateScheduleId, candidateId)
  .then(() => {
    res.send('Successfully delete candidate schedule');
  })
  .catch((err) => {
    console.log('Could not delete candidate schedule', err);
  })
})

//get company list
router.get('/api/companyList', (req, res) => {
  let companyName = req.query.companyName;
  calendarControllers.getCompanyList(companyName)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('Could not retrieve company list', err);
  })
})

// add to company Calendar
router.post('/api/companyCalendar', (req, res) => {
  let time = req.body.time;
  let duration = Number(req.body.duration);
  let challengeId = req.body.challengeId;
  if (req.body.companyId === 1) {
    let companyId = 1;
  } else {
    companyId = jwt.decode(req.body.companyId, secret).id;
  }
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
  let companyId = req.query.companyId;
  let companyName = req.query.companyName;
  if (req.query.companyId) {
    companyId = jwt.decode(req.query.companyId, secret).id;
  }
  calendarControllers.getCompanySchedule(companyId, companyName)
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
router.patch('/api/companyCalendar', (req, res) => {
  calendarControllers.updateChallengeDate(req.body.time, req.body.duration, req.body.scheduleId)
  .catch((err) => {
    console.log(err);
  })
})


/* ------- Results Routes -------- */

// get results data from 'results' table
router.get('/api/results', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  resultsControllers.getCompanyResults(companyId, req.query.candidateId)
  .then((data) => {
    console.log('Retrieve candidate result from db')
    res.send(data)
  })
  .catch((err) => {
    console.log('Could not retrieve result from db', err);
  })
})

//get candidate list from results table
router.get('/api/results/candidateList', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  resultsControllers.getCandidateList(companyId)
  .then((data) => {
    console.log('Retrieve candidate list from db')
    res.send(data)
  })
  .catch((err) => {
    console.log('Could not retrieve candidate list from db', err);
  })
})

//ge candidate results
router.get('/api/results/candidate', (req, res) => {
  let candidateId = jwt.decode(req.query.candidateId, secret).id;
  let companyScheduleId = req.query.companyScheduleId;
  resultsControllers.getCandidateResults(candidateId, companyScheduleId)
  .then((data) => {
    console.log('Retrieve candidate results form db')
    res.send(data)
  })
  .catch((err) => {
    console.log('Could not retrieve candidate results from db', err)
  })
})

//get candidate initial challenge's results
router.get('/api/results/candidate/initial', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  let candidateId = jwt.decode(req.query.candidateId, secret).id;
  resultsControllers.getCandidateInitialResults(companyId, candidateId)
  .then((data) => {
    console.log('Retrieve candidate initial result from db')
    res.send(data)
  })
  .catch((err) => {
    console.log('Could not retrieve candidate initial result from db', err);
  })
})

// post results to 'results' table
router.post('/api/results', (req, res) => {
  let companyId = req.body.companyId;
  let candidateId = jwt.decode(req.body.candidateId, secret).id;
  resultsControllers.saveResults(req.body.companyScheduleId, req.body.isPassed, req.body.code, req.body.score, req.body.completedAt, req.body.challengeId, companyId, candidateId, req.body.initial)
  .then(() => {
    console.log('Results saved to results table');
    res.send();
  })
  .catch((err) => {
    console.log('Could not save results to db');``
  })
})

/* ------- Search Users/Favorites Routes -------- */

router.get('/api/searchUsers', (req, res) => {
  profileControllers.searchUsers(req.query.query)
  .then((data) => {
    data.map((user) => {
      user.candidate_skills = user.candidate_skills.join(', ');
    })
    console.log('Successfully fetching users from db and sending to client', data);
    res.send(data);
  })
  .catch((err) => {
    console.log('Error sending users from db to client', err);
  })
})


router.get('/api/favorites', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  profileControllers.getFavorites(companyId)
  .then((data) => {
    console.log('Favorites retrieved. Sending favorites to client');
    res.send(data);
  })
  .catch((err) => {
    console.log('Error sending favorites to client', err);
  })
})

router.post('/api/favorites', (req, res) => {
  let companyId = jwt.decode(req.body.companyId, secret).id;
  profileControllers.saveToFavorites(companyId, req.body.candidateId)
  .then(() => {
    console.log('User sent to favorites in db');
    res.send();
  })
  .catch((err) => {
    console.log('Error sending favorites to db', err);
  })
})

router.delete('/api/favorites', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  profileControllers.removeFromFavorites(companyId, req.query.candidateId)
  .then(() => {
    console.log('Successfully sending user to db for removal from favorites');
    res.send();
  })
  .catch((err) => {
    console.log('Error sending user to db for removal from favorites', err);
  })
})



module.exports = router;
