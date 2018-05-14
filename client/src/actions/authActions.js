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
  axios.post('/api/registerCompany', { token, companyName, phone, logoUrl, companyInfo })
  .then((response) => {
  	dispatch({ type: SAVE_COMPANY, payload: response.data })
  })
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const handleLogin = (email, password) => (dispatch) => {
// 	axios.post('/api/login', {username: username, password: password })
// 	.then((response) => {
// 		// console.log('HANDLE LOGIN', response);
// 		dispatch({ type: CHECK_USER, payload: response.data })
// 	})
// 	.catch((err) => {
// 		console.log('Error checking user', err);
// 	}
//  )

  if (auth.currentUser) {
    auth.signOut();
  } else {
    auth.signInWithEmailAndPassword(email, password)
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
    user.getIdToken()
      .then((token) => {
        console.log('token',token)
      if (form === 'companyForm') {
        saveCompany(token, name, phone, logoUrl, companyInfo)
      } else {
        saveCandidate(token, name, phone, githubUrl)
      }
    })
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





