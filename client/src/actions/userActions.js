import { GET_ALL_COMPANY_CALENDARS, GET_INITIAL_CHALLENGE } from '../constants/actionTypes';
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