
import { GET_INITIAL_CHALLENGE, GET_ALL_COMPANY_CALENDARS, GET_CANDIDATE_CALENDAR, GET_CANDIDATE_INFO, GET_CURRENT_COMPANY_CALENDAR  } from '../constants/actionTypes';

import axios from 'axios';

export const fetchAllCompanyCalendars =(cb) => (dispatch) => {
  axios.get('/api/companyCalendars')
  .then(({data}) => {
    dispatch({ type: GET_ALL_COMPANY_CALENDARS, payload: data })
    cb()
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateCalendar = (candidateId) => (dispatch) => {
  axios.get('/api/candidateCalendar', {params: {candidateId}})
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_CALENDAR, payload: data })
  })
  .catch((err) => {
    console.log(err);
  })
}

export const saveCandidateCalendar = (candidateId, companyScheduleId) => (dispatch) => {
  axios.post('/api/candidateCalendar', {candidateId, companyScheduleId})
  .then(({data}) => {
    if (data) {
      window.alert('Scheduled Live Challenge.')
    } else {
      window.alert('You have already scheduled this live challenge.')
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

export const deleteCandidateSchedule = (candidateScheduleId, candidateId) => (dispatch) => {
  axios.post('/api/cancelCandidateSchedule', {candidateScheduleId, candidateId})
  .then(() => {
    dispatch(fetchCandidateCalendar(candidateId))
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchInitialChallenge = (company_id) => (dispatch) => {
  axios.get('/api/initialChallenge', {params: {company_id}})
  .then(({data}) => {
    dispatch({ type: GET_INITIAL_CHALLENGE, payload: data })
  })
  .catch((err) => {
    console.log(err);
  })
}

 export const fetchCandidateInfo = (username, callback) => (dispatch) => {
   axios.get('/api/candidateInfo', { params: { username: username }})
    .then((info) => {
        dispatch({ type: GET_CANDIDATE_INFO, information: info.data[0].information, skills: info.data[0].candidate_skills })
        callback();
      })
      .catch((err) => {
        console.log(err);
      })
  }

export const saveCandidateInfo = (username, information, skills) => (dispatch) => {
	axios.patch('/api/candidateInfo/:username', { username: username, information: information, skills: skills })
	.catch((err) => {
		console.log(err);
	})
}

export const currentCompanyCalendar = (companyId, callback) => (dispatch) => {
  dispatch( { type: GET_CURRENT_COMPANY_CALENDAR, company_id: companyId })
  callback();
}

