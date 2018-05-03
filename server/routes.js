const router = require('express').Router();


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


// post user information into 'users' table
router.post('/api/register', (req, res) => {

})


/* ---------- Challenge Routes --------- */

// get challenges from 'all_challenges' table
router.get('/api/challenges', (req, res) => {

})

// post initial challenge info into 'intiial_challenges table'
router.post('/api/initialChallenge', (req, res) => {

})

// updare initial challenge from 'intitial_challenges table'
router.patch('/api/initialChallenge:challengeid', (req, res) => {

})

// get initial challenge for company
router.get('/api/initialChallenge', (req, res) => {


})

// delete company challenge from 'all_challenges' table
router.delete('./api/challenges:challengeid', (req, res) => {

})

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


}
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
