import { GET_INITIAL_CHALLENGE, GET_ALL_COMPANY_CALENDARS, GET_CANDIDATE_CALENDAR, SAVE_CANDIDATE_CALENDAR, GET_CANDIDATE_INFO } from '../constants/actionTypes';
import axios from 'axios';

export const fetchAllCompanyCalendars =() => (dispatch) => {
  axios.get('/api/companyCalendars')
  .then(({data}) => {
    dispatch({ type: GET_ALL_COMPANY_CALENDARS, payload: data })
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

export const saveCandidateCalendar = (candidate_id) => {
  axios.get('api/')
}

export const fetchInitialChallenge = (company_id) => (dispatch) => {
  axios.get('/api/initialChallenge', {params: {company_id}})
  .then(({data}) => {
    console.log(data)
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

