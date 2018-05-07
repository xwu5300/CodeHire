import { DELETE_CHALLENGE, GET_ALL_CHALLENGES, GET_DEFAULT_CHALLENGES, SAVE_CHALLENGE } from '../constants/actionTypes';
import axios from 'axios';


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
	axios.get('/api/challenges', {params: {companyId}})
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

export const saveChallenge = (challenge) => (dispatch) => {
  axios.post('/api/challenges', {challenge: challenge})
  .then(() => {
    dispatch(fetchAllChallenges());
    console.log('Saved to your challenges')
  })
  .catch((err) => {
  	console.log('Error saving challenge', err);
  })
}

export const deleteChallenge = (challenge) => (dispatch) => {
  axios.delete('/api/challenges', {params: {challenge: challenge}})
  .then(() => {
    dispatch(fetchAllChallenges());
    console.log('Removed from your challenges')
  })
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

export const updateInfo = (username, logoUrl, information) => (dispatch) => {
  axios.patch('/api/users/:username', { username: username, logo_url: logoUrl, information: information })
  .then((response) => {
    console.log(reponse);
  })
  .catch((err) => {
    console.log(err);
  })
}




