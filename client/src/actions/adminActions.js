import { DELETE_CHALLENGE, GET_ALL_CHALLENGES, GET_DEFAULT_CHALLENGES, SAVE_CHALLENGE, GET_COMPANY_INFO, GET_COMPANY_SCHEDULE, TOGGLE_INITIAL_ON, TOGGLE_INITIAL_OFF, SET_CURRENT_LIVE_CHALLENGE, GET_CHALLENGE_INFO, GET_COMPANY_RESULTS, GET_CANDIDATE_LIST, GET_USER, GET_FAVORITES, GET_ALL_RESULTS, SEARCH_USERS, GET_COMPANY_DATA, GET_PAST_CHALLENGES, GET_PAST_RESULTS, GET_CHALLENGE_DATA, GET_ACTIVE_CHALLENGES } from '../constants/actionTypes';

import axios from 'axios';
import { fetchInitialChallenge } from './userActions.js';


export const fetchDefaultChallenges = () => (dispatch) => {
  axios.get('/api/defaultChallenges')
  .then(({data}) => {
    dispatch({ type: GET_DEFAULT_CHALLENGES, payload: data })
  })
  .catch((err) => {})
}

export const fetchAllChallenges = (companyId) => (dispatch) => {
  axios.get('/api/challenges', {params: { companyId }})
	.then(({data}) => {
    data.sort((a, b) => {
      return a.id - b.id;
    })
    dispatch({ type: GET_ALL_CHALLENGES, payload: data })
	})
	.catch((err) => {})
}

export const fetchActiveChallenges = (companyId) => (dispatch) => {
  axios.get('/api/challenges/active', {params: { companyId }})
	.then(({data}) => {
    dispatch({ type: GET_ACTIVE_CHALLENGES, payload: data })
	})
	.catch((err) => {})
}

export const fetchChallengeData = (challengeId, cb) => (dispatch) => {
  axios.get('/api/challengeData', {params: { challengeId }})
  .then(({data}) => {
    dispatch({ type: GET_CHALLENGE_DATA, payload: data})
    if(cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const fetchAllResults = () => (dispatch) => {
  axios.get('/api/allResults')
  .then(({data}) => {
    dispatch({ type: GET_ALL_RESULTS, payload: data})
  })
  .catch((err) => {})
}


export const saveChallenge = (challenge, companyId, cb) => (dispatch) => {
  axios.post('/api/challenges', { challenge, companyId, scheduled: false})
  .then(() => {
    dispatch(fetchAllChallenges(companyId));
    dispatch(fetchActiveChallenges(companyId));
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const deleteChallenge = (challenge, companyId, cb) => (dispatch) => {
  axios.delete('/api/challenges', {params: { challenge, companyId }})
  .then(() => {
    dispatch(fetchActiveChallenges(companyId));
    dispatch(fetchCompanySchedule(companyId));
    dispatch(fetchInitialChallenge(companyId));
  })
  .then(() => {
    if (cb) {
      cb()
    }
  })
	.catch((err) => {})
}

export const getChallengeInfo = (challengeId, companyId, cb) => (dispatch) => {
  axios.get('/api/challenge', {params: { challengeId, companyId }})
  .then(({data}) => {
    dispatch({type: GET_CHALLENGE_INFO, payload: data[0]});
    if (cb) {
      cb(data[0]);
    }
  })
  .catch((err) => {})
}

export const addToCompanySchedule = (time, duration, challengeId, companyId, cb) => (dispatch) => {
  axios.post('/api/companyCalendar', { time, duration, challengeId, companyId })
  .then(() => {
    dispatch(fetchCompanySchedule(companyId));
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
	.catch((err) => {})
}


export const updateChallengeDate = (time, duration, scheduleId, companyId) => (dispatch) => {
  axios.patch('/api/companyCalendar', { time, duration, scheduleId })
  .then(() => {
    dispatch(fetchCompanySchedule(companyId));
  })
  .catch((err) => {})
}


export const deleteFromCompanySchedule = (scheduleId, companyId) => (dispatch) => {
  axios.delete('/api/companyCalendar', {params: { scheduleId }})
  .then(() => {
    dispatch(fetchCompanySchedule(companyId));
  })
  .catch((err) => {})
}

export const fetchCompanySchedule = (companyId) => (dispatch) => {
  axios.get('/api/companyCalendar', {params: { companyId }})
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_SCHEDULE, payload: data});
  })
  .catch((err) => {})
}


export const fetchCompanyInfo = (userId, cb) => (dispatch) => {
  axios.get('/api/companyInfo', { params: { userId }})
  .then((response) => {
    dispatch({ type: GET_COMPANY_INFO, logo_url: response.data[0].logo_url, information: response.data[0].information, website_url: response.data[0].website_url })
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const updateInfo = (userId, logo_url, information, website_url, cb) => (dispatch) => {
  axios.patch('/api/companyInfo', { userId, logo_url, information, website_url })
  .then(() => {
    dispatch(fetchCompanyInfo(userId, cb));
  })
  .catch((err) => {})
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
    dispatch(fetchInitialChallenge(companyId));
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const setCurrentLiveChallenge = (title, duration) => (dispatch) => {
  dispatch( { type: SET_CURRENT_LIVE_CHALLENGE, title: title, duration: duration } )
}


export const fetchCompanyResults = (companyId, candidateId, time, cb) => (dispatch) => {
  axios.get('/api/results', { params: { companyId, candidateId, time } })
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_RESULTS, payload: data})
    if(cb) {
      cb(data);
    }
  })
  .catch((err) => {})
}

export const fetchCandidateList = (companyId) => (dispatch) => {
  axios.get('/api/results/candidateList', {params: { companyId }})
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_LIST, payload: data})
  })
  .catch((err) => {})
}

export const getUsername = (userId, cb) => (dispatch) => {
  axios.get('/api/username', {params: { userId }})
  .then(({data}) => {
    if (data.length) {
      dispatch({ type: GET_USER, payload: data[0].username })
      if (cb) {
        cb(data[0].username)
      }
    }
  })
  .catch((err) => {})
}

export const getFavorites = (companyId) => (dispatch) => {
  axios.get('/api/favorites', {params: { companyId }})
  .then(({data}) => {
    dispatch({ type: GET_FAVORITES, payload: data })
  })
  .catch((err) => {
  })
}

export const saveToFavorites = (companyId, candidateId, cb) => (dispatch) => {
  axios.post('/api/favorites', { companyId, candidateId })
  .then(() => {
    dispatch(getFavorites(companyId))
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const removeFromFavorites = (companyId, candidateId) => (dispatch) => {
  axios.delete('/api/favorites', {params: { companyId, candidateId }})
  .then(() => {
    dispatch(getFavorites(companyId))
  })
  .catch((err) => {})
}

export const searchUsers = (query, cb) => (dispatch) => {
  axios.get('/api/searchUsers', {params: { query }})
  .then(({data}) => {
    dispatch({ type: SEARCH_USERS, payload: data})
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const getCompanyData = (companyId) => (dispatch) => {
  axios.get('/api/companyData', {params: { companyId }})
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_DATA, payload: data })
  })
  .catch((err) => {})
}

export const fetchPastSchedule = (companyId) => (dispatch) => {
  axios.get('/api/pastChallenges', {params: { companyId }})
  .then(({data}) => {
    dispatch({ type: GET_PAST_CHALLENGES, payload: data})
  })
  .catch((err) => {})
}

export const fetchPastResults = (scheduleId, cb) => (dispatch) => {
  axios.get('/api/pastResults', {params: { scheduleId }})
  .then(({data}) => {
    dispatch({ type: GET_PAST_RESULTS, payload: data })
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const contact = (favoriteId, companyId, contacted) => (dispatch) => {
  axios.patch('/api/favorites', { favoriteId, contacted })
  .then(() => {
    dispatch(getFavorites(companyId))
  })
  .catch((err) => {})
}