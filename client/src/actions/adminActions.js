import { DELETE_CHALLENGE, GET_ALL_CHALLENGES, GET_DEFAULT_CHALLENGES, SAVE_CHALLENGE } from '../constants/actionTypes';
import axios from 'axios';


export const fetchDefaultChallenges = () => (dispatch) => {
  axios.get('/api/defaultChallenges')
  .then((challenges) => {
    dispatch({ type: GET_DEFAULT_CHALLENGES, payload: challenges })
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchAllChallenges = () => (dispatch) => {
	axios.get('/api/challenges')
	.then((challenges) => {
		console.log(challenges);
    dispatch({ type: GET_ALL_CHALLENGES, payload: challenges })
	})
	.catch((err) => {
		console.log(err);
	})
}

export const saveChallenge = () => (dispatch) => {
  axios.post('/api/challenges')
  .catch((err) => {
  	console.log('Error saving challenge', err);
  })
}

export const deleteChallenge = () => (dispatch) => {
	axios.delete('/api/challenges')
	.catch((err) => {
		console.log('Error deleting challenge', err);
	})
}

export const updateCalendar = () => (dispatch) => {
	axios.post('/api/companyCalendar')
	.catch((err) => {
		console.log('Error updating company calendar', err);
	})
}




