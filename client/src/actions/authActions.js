import { SAVE_USER, CHECK_USER, GET_USER } from '../constants/actionTypes';

import axios from 'axios';

export const saveUser = () => (dispatch) => {
	axios.post('/api/register')
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const checkUser = () => (dispatch) => {
	axios.post('/api/login')
	.catch((err) => {
		console.log('Error checking user', err);
	}
 )
}


