const router = require('express').Router();


const challengeControllers = require('./controllers/challenges');
const authControllers = require('./controllers/auth');

/* ------- User Routes --------- */

// get active users and registered companies
router.get('/api/users', (req, res) => {
	
})

// update company profile information in 'users' table
router.patch('/api/users', (req, res) => {

})

// authentication route for logging in, check 'users' table for credentials
router.post('/api/login', (req, res) => {

})


// post candidate register info to 'users' table
router.post('/api/registerCandidate', (req, res) => {

  authControllers.saveCandidate(req.body.fullName, req.body.username, req.body.password, req.body.email, req.body.phone)
  .catch((err) => {
    console.log(err);
  })
})

// post company register information into 'users' table
router.post('/api/registerCompany', (req, res) => {
  authControllers.saveCompany(req.body.companyName, req.body.username, req.body.password, req.body.email, req.body.phone, req.body.logoUrl)
  .catch((err) => {
    console.log(err);
  })
})


/* ---------- Challenge Routes --------- */

// get all challenges from 'all_challenges' table
router.get('/api/challenges', (req, res) => {
  let companyId = 2;
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
  let title = "Three Sum";
  let instruction = 'these are details';
  let testCases = null;
  let timelimit = null;
  let difficulty = null;
  let companyId = 2;
  challengeControllers.saveDefaultChallenge(title, instruction, testCases, timelimit, difficulty, companyId)
  .then(() => {
    res.send('Successfully saved challenge');
  })
})

// delete company challenge from 'all_challenges' table
router.delete('/api/challenges', (req, res) => {
  let title = 'Three Sum';
  let companyId = 2;
  challengeControllers.deleteCompanyChallenge(title, companyId)
  .then(() => {
    res.send('Successfully deleted challenge');
  })
})

// post initial challenge info into 'intiial_challenges table'
router.post('/api/initialChallenge', (req, res) => {

})

// update initial challenge from 'intitial_challenges table'
router.patch('/api/initialChallenge/:challengeid', (req, res) => {

})

// get initial challenge for company
router.get('/api/initialChallenge', (req, res) => {


})

// delete company challenge from 'all_challenges' table
router.delete('./api/challenges/:challengeid', (req, res) => {

})

<<<<<<< HEAD
<<<<<<< HEAD
=======
// delete company challenge from 'all_challenges' table
router.delete('./api/challenges/:challengeid', (req, res) => {

})

>>>>>>> server can retrieve company and default challenges
=======
>>>>>>> server can save and remove challenges from db
/* ---------- Schedule Routes -------- */

// get user schedule
router.get('/api/userCalendar', (req, res) => {

})

// update user calendar
router.post('/api/userCalendar', (req, res) => {

})

// update user Calendar
router.patch('/api/userCalendar:date', (req, res) => {

})

// get company schedule
router.get('/api/companyCalendar', (req, res) => {


})
// update company Calendar
router.post('/api/companyCalendar', (req, res) => {

})


// update company calendar
router.patch('/api/companyCalendar:date', (req, res) => {


})


/* ------- Results Routes -------- */

// get results data from 'results' table
router.get('/api/results', (req, res) => {
  
})

// post results to 'results' table
router.post('/api/results', (req, res) => {

})












module.exports = router;

