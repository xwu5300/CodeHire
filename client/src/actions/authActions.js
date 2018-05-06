import { SAVE_COMPANY, SAVE_CANDIDATE, CHECK_USER, GET_USER } from '../constants/actionTypes';

import axios from 'axios';

export const saveCandidate = (fullName, username, password, email, phone) => (dispatch) => {
	axios.post('/api/registerCandidate', { fullName: fullName, username: username, password: password, email: email, phone: phone })
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const saveCompany = (companyName, username, password, email, phone, logoUrl) => (dispatch) => {
  axios.post('/api/registerCompany', { companyName: companyName, username: username, password: password, email: email, phone: phone, logoUrl: logoUrl })
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const handleLogin = (username, password) => (dispatch) => {
	axios.post('/api/login', {username: username, password: password })
	.catch((err) => {
		console.log('Error checking user', err);
	}
 )
}




