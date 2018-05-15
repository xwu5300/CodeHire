import { DELETE_CHALLENGE, GET_ALL_CHALLENGES, GET_DEFAULT_CHALLENGES, SAVE_CHALLENGE, GET_COMPANY_INFO, GET_COMPANY_SCHEDULE, TOGGLE_INITIAL_ON, TOGGLE_INITIAL_OFF, SET_CURRENT_LIVE_CHALLENGE, GET_CHALLENGE_INFO, GET_COMPANY_RESULTS, GET_CANDIDATE_LIST, GET_USER } from '../constants/actionTypes';

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
  axios.get('/api/challenges', {params: { companyId }})
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

export const saveChallenge = (challenge, companyId, cb) => (dispatch) => {
  axios.post('/api/challenges', { challenge, companyId })
  .then(() => {
    dispatch(fetchAllChallenges(companyId));
    console.log('Saved to your challenges')
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {
  	console.log('Error saving challenge', err);
  })
}

export const deleteChallenge = (challenge, companyId) => (dispatch) => {
  axios.delete('/api/challenges', {params: { challenge, companyId }})
  .then(() => {
    dispatch(fetchAllChallenges(companyId));
    dispatch(fetchCompanySchedule(companyId));
    dispatch(fetchInitialChallenge(companyId));
    console.log('Removed from your challenges');
  })
	.catch((err) => {
		console.log('Error deleting challenge', err);
	})
}

export const getChallengeInfo = (challengeId, companyId, cb) => (dispatch) => {
  axios.get('/api/challenge', {params: { challengeId, companyId }})
  .then(({data}) => {
    dispatch({type: GET_CHALLENGE_INFO, payload: data[0]});
    console.log('retrieving challenge info', data[0]);
    if (cb) {
      cb();
    }
  })
  .catch((err) => {
    console.log('Error retrieving challenge info', err);
  })
}

export const addToCompanySchedule = (time, duration, challengeId, companyId, cb) => (dispatch) => {
  axios.post('/api/companyCalendar', { time, duration, challengeId, companyId })
  .then(() => {
    console.log('add to company schedule was called')
    dispatch(fetchCompanySchedule(companyId));
    // console.log('Added to your upcoming challenges')
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
	.catch((err) => {
		console.log('Error updating company calendar', err);
	})
}

export const deleteFromCompanySchedule = (scheduleId, companyId) => (dispatch) => {
  axios.delete('/api/companyCalendar', {params: { scheduleId }})
  .then(() => {
    dispatch(fetchCompanySchedule(companyId));
    console.log('Removed from your upcoming challenges');
  })
  .catch((err) => {
    console.log('Error removing from upcoming challenges', err);
  })
}

export const fetchCompanySchedule = (companyId) => (dispatch) => {
  axios.get('/api/companyCalendar', {params: { companyId }})
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_SCHEDULE, payload: data});
    console.log('Company schedule retrieved');
  })
  .catch((err) => {
    console.log('Error retrieving company schedule')
  })
}


export const fetchCompanyInfo = (userId, callback) => (dispatch) => {
  axios.get('/api/companyInfo', { params: { userId }})
  .then((response) => {
    dispatch({ type: GET_COMPANY_INFO, logo_url: response.data[0].logo_url, information: response.data[0].information })
    callback();
  })
  .catch((err) => {
    console.log(err);
  })
}

export const updateInfo = (userId, logo_url, information) => (dispatch) => {
  axios.patch('/api/companyInfo', { userId, logo_url, information })
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

export const makeInitial = (challengeId, initial, duration, isInitial, companyId, cb) => (dispatch) => {
  axios.patch('/api/initialChallenge', { challengeId, initial, duration, isInitial, companyId })
  .then(() => {
    console.log('make initial function was called')
    dispatch(fetchInitialChallenge(companyId));
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

export const setCurrentLiveChallenge = (title, duration) => (dispatch) => {
  dispatch( { type: SET_CURRENT_LIVE_CHALLENGE, title: title, duration: duration } )
}


export const fetchCompanyResults = (companyId, candidateId) => (dispatch) => {
  axios.get('/api/results', { params: { companyId, candidateId } })
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_RESULTS, payload: data})
    
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateList = (companyId) => (dispatch) => {
  axios.get('/api/results/candidate', {params: { companyId }})
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_LIST, payload: data})
  })
  .catch((err) => {
    console.log(err);
  })
}

export const getUsername = (userId, cb) => (dispatch) => {
  axios.get('/api/username', {params: { userId }})
  .then(({data}) => {
    console.log('username data retrieved', data[0].username)
    dispatch({ type: GET_USER, payload: data[0].username})
    if (cb) {
      cb(data[0].username)
    }
  })
  .catch((err) => {
    console.log(err);
  })
}