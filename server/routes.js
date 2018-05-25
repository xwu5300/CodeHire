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
  profileControllers.updateCompanyInfo(userId, req.body.logo_url, req.body.information, req.body.website_url)
  .then(() => {
    res.send();
  })
  .catch((err) => {
    console.log(err);
  })
})

// Update Candidate Info, including skills and github URL
router.patch('/api/candidateInfo', (req, res) => {
  let candidateId = jwt.decode(req.body.userId, secret).id;
  profileControllers.updateCandidateInfo(candidateId, req.body.skills, req.body.github_url, req.body.photo)
  .then(() => {
    res.send();
  })
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
  if(req.query.candidateId) {
    var candidateId = jwt.decode(req.query.candidateId, secret).id;
  } else {
    var username = req.query.username;
  }

  profileControllers.getCandidateInfo(candidateId, username, (data) => {
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
    res.send();
  })
})

router.get('/api/username', (req, res) => {
  let userId = jwt.decode(req.query.userId, secret).id;
  authControllers.getUsername(userId)
  .then((data) => {
    res.send(data);
  })
})

router.get('/api/auth/username', (req, res) => {
  let username = req.query.username;
  authControllers.getUsername(null, username)
  .then((data) => {
    res.send(data);
  })
})

router.post('/api/resume', (req, res) => {
  let userId = jwt.decode(req.body.userId, secret).id;
  profileControllers.saveResume(req.body.resumeUrl, req.body.resumeName, userId)
  .then(() => {
    console.log('succesfully saved item to db');
    res.send();
  })
  .catch((err) => {
    console.log('Unable to save item to db', err);
  })
})

router.get('/api/resume', (req, res) => {
  let userId = jwt.decode(req.query.userId, secret).id;
  profileControllers.getResume(userId)
  .then((data) => {
    console.log('successfully retrieved item from db. sending to client');
    res.send(data);
  })
  .catch((err) => {
    console.log('unable to retrieve item from db for client', err);
  })
})

router.delete('/api/resume', (req, res) => {
  let userId = jwt.decode(req.query.userId, secret).id;
  profileControllers.removeResume(userId)
  .then(() => {
    console.log('successfully removed item from db');
    res.send();
  })
  .catch((err) => {
    console.log('unable to remove item from db', err);
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
  console.log(req.body.challenge)
  if (req.body.challenge.testCases) {
    var testCases = [[],[]];
    req.body.challenge.testCases.forEach((item) => {
      testCases[0].push(item.input);
      testCases[1].push(item.output);
    })
    testCases = JSON.stringify(testCases);
  } else {
   var testCases = req.body.challenge.test_cases
  }

  if (req.body.challenge.exampleCases) {
    var examples = [[],[]];
    req.body.challenge.exampleCases.forEach((item) => {
      examples[0].push(item.input);
      examples[1].push(item.output);
    })
    examples = JSON.stringify(examples);
  } else {
   var examples = req.body.challenge.examples
  }
  
  let title = req.body.challenge.title;
  let category = req.body.challenge.category;
  let instruction = req.body.challenge.instruction;
  let functionName = req.body.challenge.function_name;
  let params = req.body.challenge.parameters;
  let difficulty = req.body.challenge.difficulty || null;
  let companyId = jwt.decode(req.body.companyId, secret).id;
  challengeControllers.saveChallenge(title, instruction, functionName, params, testCases, examples, difficulty, category, companyId)
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
    data.map((item) => {
      let arr = [];
      JSON.parse(item.test_cases)[0].forEach((input, i) => {
        JSON.parse(item.test_cases)[1].forEach((output, j) => {
          if (i === j) {
            arr.push({input: input, output: output})
          }
        })
      })
      item.test_cases = arr;
      let arr2 = [];
      JSON.parse(item.examples)[0].forEach((input, i) => {
        JSON.parse(item.examples)[1].forEach((output, j) => {
          if (i === j) {
            arr2.push({input: input, output: output})
          }
        })
      })
      item.examples = arr2;
    })
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

// check user reschedule
router.get('/api/candidateCalendar/reschedule', (req, res) => {
  let candidateId = jwt.decode(req.query.candidateId, secret).id;
  let companyId = jwt.decode(req.query.companyId, secret).id;
  let time = req.query.time;
  calendarControllers.checkCandidateReschedule(candidateId, companyId, time)
  .then((data) => {
    console.log('checked candidate reschedule')
    res.send(data)
  })
  .catch((err) => {
    console.log('Could not check candidate reschedule', err)
  })
})

// get all company schedule
router.get('/api/companyCalendars', (req, res) => {
  let companyName = req.query.companyName;
  calendarControllers.getAllCompanyCalendars(companyName)
  .then((data) => {
    console.log('routes getAllCompanyCalendars data')
    res.send(data);
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

  console.log('COMPANY ID', companyId);
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
  .then(() => {
    res.send();
  })
  .catch((err) => {
    console.log(err);
  })
})

//get past challenges
router.get('/api/pastChallenges', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  calendarControllers.fetchPastSchedule(companyId)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log(err);
  })
})


/* ------- Results Routes -------- */

// get results data from 'results' table
router.get('/api/results', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  let candidateId = jwt.decode(req.query.candidateId, secret).id;
  resultsControllers.getCompanyResults(companyId, candidateId)
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
  let candidateId = req.query.candidateId;
  if (!parseInt(req.query.candidateId)) {
    candidateId = jwt.decode(req.query.candidateId, secret).id;
  }
  console.log('routes fetchCandidateResults candidateid', candidateId)
  let companyScheduleId = req.query.companyScheduleId;
  resultsControllers.getCandidateResults(candidateId, companyScheduleId)
  .then((data) => {
    console.log('Retrieve candidate results from db')
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
  console.log('routes company id, candidate id', companyId, candidateId)
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
  let companyId = jwt.decode(req.body.companyId, secret).id;
  let candidateId = jwt.decode(req.body.candidateId, secret).id;

  resultsControllers.saveResults(req.body.companyScheduleId, req.body.isPassed, req.body.code, req.body.score, req.body.completedAt, req.body.challengeId, companyId, candidateId, req.body.initial)
  .then(() => {
    console.log('Results saved to results table');
    res.send();
  })
  .catch((err) => {
    console.log('Could not save results to db');
  })
})

router.get('/api/allResults', (req, res) => {
  resultsControllers.fetchAllResults()
  .then((data) => {
    console.log('all results', data.length)
    res.send(data);
  })
  .catch((err) => {
    console.log('Error sending back all results', err);
  })
})

router.get('/api/companyData', (req, res) => {
  let companyId = jwt.decode(req.query.companyId, secret).id;
  resultsControllers.fetchCompanyData(companyId)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('Error sending company results', err);
  })
})

router.get('/api/challengeData', (req, res) => {
  let challengeId = req.query.challengeId
  resultsControllers.fetchChallengeData(challengeId)
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    console.log('Error getting challenge data', err);
  })
})

router.get('/api/pastResults', (req, res) => {
  resultsControllers.fetchPastResults(req.query.scheduleId)
  .then((data) => {
    console.log(data);
    res.send(data);
  })
  .catch((err) => {
    console.log('Error sending past results', err);
  })
})

/* ------- Favorites Routes -------- */
/* ------- Search Users/Favorites Routes -------- */

router.get('/api/searchUsers', (req, res) => {
  profileControllers.searchUsers(req.query.query)
  .then((data) => {
    data.map((user) => {
      user.candidate_skills = user.candidate_skills === null ? null : user.candidate_skills.join(', ');
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
    data.map((user) => {
      user.candidate_skills = user.candidate_skills === null ? null : user.candidate_skills.join(', ');
    })
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

router.patch('/api/favorites', (req, res) => {
  profileControllers.markContacted(req.body.favoriteId, req.body.contacted)
  .then(() => {
    res.send();
  })
  .catch(() => {
    console.log('error marking contacted', err);
  })
})

module.exports = router;
