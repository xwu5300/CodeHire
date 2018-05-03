const router = require('express').Router();


/* ------- User Routes --------- */

// get active users and registered companies
router.get('/api/users', (req, res) => {
	
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
router.post('/api/initial-challenge', (req, res) => {

})

// get initial challenge for company
router.get('/api/initial-challenge', (req, res) => {


})

/* ---------- Schedule Routes -------- */

// get user schedule
router.get('/api/userCalendar', (req, res) => {

})

// update user calendar
router.post('/api/userCalendar', (req, res) => {

})

// get company schedule
router.get('/api/companyCalendar', (req, res) => {


}
// update company Calendar
router.post('/api/companyCalendar', (req, res) => {

})



/* ------- Results Routes -------- */

// get results data from 'results' table
router.get('/api/results', (req, res) => {
  
})

// post results to 'results' table
router.post('/api/results', (req, res) => {

})















module.exports = router;

