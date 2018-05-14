import { SAVE_COMPANY, SAVE_CANDIDATE, CHECK_USER, GET_USER } from '../constants/actionTypes';
import { auth } from '../../../firebase/index.js';
import axios from 'axios';

export const saveCandidate = (token, fullName, phone, github_url) => (dispatch) => {
	axios.post('/api/registerCandidate', { token, fullName, phone, github_url })
	.then((response) => {
		dispatch({ type: SAVE_CANDIDATE, payload: response.data })
	})
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const saveCompany = (token, companyName, phone, logoUrl, companyInfo) => (dispatch) => {
  console.log('calling save company')
  axios.post('/api/registerCompany', { token, companyName, phone, logoUrl, companyInfo })
  .then((response) => {
  	dispatch({ type: SAVE_COMPANY, payload: response.data })
  })
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const handleLogin = (email, password) => (dispatch) => {
  if (auth.currentUser) {
    auth.signOut();
  } else {
    auth.signInWithEmailAndPassword(email, password)
    .then(({user}) => {;
      console.log(user)
      axios.post('/api/login', {token: user.uid})
      .then((response) => {
        console.log('response data', response.data)
        dispatch({ type: CHECK_USER, payload: response.data })
      })
      .catch((err) => {
        console.log('Error checking user', err);
      })
    })
    .catch((err) => {
      if (err) {
        alert(err.message);
      }
    })
  }
}

export const handleSignUp = (email, password, form, name, phone, logoUrl, githuburl, companyInfo, cb) => (dispatch) => {
  auth.createUserWithEmailAndPassword(email, password)
  .then(({user}) => {
    if (form === 'companyForm') {
      dispatch(saveCompany(user.uid, name, phone, logoUrl, companyInfo));
    } else {
      dispatch(saveCandidate(user.uid, name, phone, githubUrl));
    }
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((error) => {
    if(error) {
      console.log('error for signup')
      alert(error.message)
    }
  })
}





