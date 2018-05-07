
import { GET_ALL_COMPANY_CALENDARS, GET_INITIAL_CHALLENGE, GET_CANDIDATE_INFO } from '../constants/actionTypes';
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

export const fetchInitialChallenge = (company_id) => (dispatch) => {
  axios.get('/api/initialChallenge', {params: {company_id}})
  .then(({data}) => {
    dispatch({ type: GET_INITIAL_CHALLENGE, payload: data })
  })
  .catch((err) => {
    console.log(err);
  })
}

 export const fetchCandidateInfo = (username) => (dispatch) => {
   axios.get('/api/candidateInfo', { params: { username: username }})
    .then((info) => {
        dispatch({ type: GET_CANDIDATE_INFO, information: info.data[0].information, skills: info.data[0].candidate_skills })
      })
      .catch((err) => {
        console.log(err);
      })
  }