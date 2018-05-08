import { SAVE_COMPANY, SAVE_CANDIDATE, CHECK_USER, GET_USER } from '../constants/actionTypes';

import axios from 'axios';

export const saveCandidate = (fullName, username, password, email, phone) => (dispatch) => {
	axios.post('/api/registerCandidate', { fullName: fullName, username: username, password: password, email: email, phone: phone })
	.then((response) => {
		dispatch({ type: SAVE_CANDIDATE, payload: response.data })
	})
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const saveCompany = (companyName, username, password, email, phone, logoUrl, companyInfo) => (dispatch) => {
  axios.post('/api/registerCompany', { companyName: companyName, username: username, password: password, email: email, phone: phone, logoUrl: logoUrl, information: companyInfo })
  .then((response) => {
  	dispatch({ type: SAVE_COMPANY, payload: response.data })
  })
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const handleLogin = (username, password) => (dispatch) => {
	axios.post('/api/login', {username: username, password: password })
	.then((response) => {
		dispatch({ type: CHECK_USER, payload: response.data, username })
	})
	.catch((err) => {
		console.log('Error checking user', err);
	}
 )
}





