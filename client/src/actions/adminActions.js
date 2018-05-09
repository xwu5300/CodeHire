import { DELETE_CHALLENGE, GET_ALL_CHALLENGES, GET_DEFAULT_CHALLENGES, SAVE_CHALLENGE, GET_COMPANY_INFO, GET_COMPANY_SCHEDULE, TOGGLE_INITIAL_ON, TOGGLE_INITIAL_OFF } from '../constants/actionTypes';
import axios from 'axios';
import { fetchInitialChallenge } from './userActions.js';


export const fetchDefaultChallenges = () => (dispatch) => {
  axios.get('/api/defaultChallenges')
  .then(({data}) => {
    dispatch({ type: GET_DEFAULT_CHALLENGES, payload: data })
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchAllChallenges = (companyId) => (dispatch) => {
	axios.get('/api/challenges', {params: {companyId}})
	.then(({data}) => {
    data.sort((a, b) => {
      return a.id - b.id;
    })
    dispatch({ type: GET_ALL_CHALLENGES, payload: data })
	})
	.catch((err) => {
		console.log(err);
	})
}

export const saveChallenge = (challenge, cb) => (dispatch) => {
  axios.post('/api/challenges', {challenge: challenge})
  .then(() => {
    dispatch(fetchAllChallenges());
    console.log('Saved to your challenges')
    if (cb) {
      cb();
    }
  })
  .catch((err) => {
  	console.log('Error saving challenge', err);
  })
}

export const deleteChallenge = (challenge) => (dispatch) => {
  axios.delete('/api/challenges', {params: {challenge: challenge}})
  .then(() => {
    dispatch(fetchAllChallenges());
    dispatch(fetchCompanySchedule());
    dispatch(fetchInitialChallenge(2));
    console.log('Removed from your challenges')
  })
	.catch((err) => {
		console.log('Error deleting challenge', err);
	})
}

export const addToCompanySchedule = (time, duration, challengeId) => (dispatch) => {
  axios.post('/api/companyCalendar', {time: time, duration: duration, challengeId: challengeId})
  .then(() => {
    dispatch(fetchCompanySchedule());
    console.log('Added to your upcoming challenges')
  })
	.catch((err) => {
		console.log('Error updating company calendar', err);
	})
}

export const deleteFromCompanySchedule = (scheduleId) => (dispatch) => {
  axios.delete('/api/companyCalendar', {params: {scheduleId: scheduleId}})
  .then(() => {
    dispatch(fetchCompanySchedule());
    console.log('Removed from your upcoming challenges');
  })
  .catch((err) => {
    console.log('Error removing from upcoming challenges', err);
  })
}

export const fetchCompanySchedule = (companyId) => (dispatch) => {
  axios.get('/api/companyCalendar', {params: {companyId: companyId}})
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_SCHEDULE, payload: data});
    console.log('Company schedule retrieved');
  })
  .catch((err) => {
    console.log('Error retrieving company schedule')
  })
}


export const fetchCompanyInfo = (username, callback) => (dispatch) => {
  axios.get('/api/companyInfo', { params: { username: username }})
  .then((response) => {
    dispatch({ type: GET_COMPANY_INFO, logo_url: response.data[0].logo_url, information: response.data[0].information })
    callback();
  })
  .catch((err) => {
    console.log(err);
  })
}

export const updateInfo = (username, logoUrl, information) => (dispatch) => {
  axios.patch('/api/companyInfo/:username', { username: username, logo_url: logoUrl, information: information })
  .then((response) => {
    console.log(reponse);
  })
  .catch((err) => {
    console.log(err);
  })
}

export const toggleInitialOn = () => (dispatch) => {
  dispatch( {type: TOGGLE_INITIAL_ON, payload: true })
}

export const toggleInitialOff = () => (dispatch) => {
  dispatch( {type: TOGGLE_INITIAL_OFF, payload: false })
}

export const makeInitial = (challengeId, initial) => (dispatch) => {
  axios.patch('/api/initialChallenge', {challengeId: challengeId, initial: initial})
  .then(() => {
    dispatch(fetchInitialChallenge(2));
    console.log('Initial challenge set');
  })
  .catch((err) => {
    console.log(err);
  })
}




