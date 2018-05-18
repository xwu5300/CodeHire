import { SAVE_COMPANY, SAVE_CANDIDATE, CHECK_USER, GET_USER } from '../constants/actionTypes';
import { auth, provider } from '../../../firebase/index.js';
import axios from 'axios';
import history from '../components/history.jsx';


export const saveCandidate = (token, fullName,username, phone, github_url) => (dispatch) => {
  console.log('auth actions save candidate')
	axios.post('/api/registerCandidate', { token, fullName, username, phone, github_url })
}


export const saveCompany = (token, companyName, username, password, email, phone, logoUrl, information) => (dispatch) => {
  axios.post('/api/registerCompany', { token, companyName, username, password, email, phone, logoUrl, information })
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
  }
  auth.signInWithEmailAndPassword(email, password)
  .then(({user}) => {
    axios.post('/api/login', {token: user.uid})
    .then(({data}) => {
      localStorage.setItem('userId', data[0]);
      dispatch({ type: CHECK_USER, payload: data })
      if (data[1].role === 'company') {
        history.push('/admin');
      } else if (data[1].role === 'candidate') {
        history.push('/user');
      }
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

// export const googleLogin = () => (dispatch) => {
//   auth.signInWithPopup(provider)
//   .then(({user}) => {
//     axios.post('/api/login', {token: user.uid})
//     .then((response) => {
//       console.log(response.data)
//       dispatch({ type: CHECK_USER, payload: response.data })
//     })
//     .catch((err) => {
//       console.log('Error checking user', err);
//     })
//   })
//   .catch((err) => {
//     if (err) {
//       alert(err.message);
//     }
//   })
// }


export const handleSignUp = (email, username, password, form, name, phone, logoUrl, githubUrl, companyInfo, cb) => (dispatch) => {
  auth.createUserWithEmailAndPassword(email, password)
  .then(({user}) => {
    if (form === 'companyForm') {
      dispatch(saveCompany(user.uid, name, username, phone, logoUrl, companyInfo));
    } else {
      dispatch(saveCandidate(user.uid, name, username, phone, githubUrl));
    }
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((error) => {
    if(error) {
      console.log('error for signup', error)
      alert(error.message)
    }
  })
}

export const handleLogout = () => (dispatch) => {
  if (auth.currentUser) {
    auth.signOut();
    localStorage.removeItem('userId');
  }
  history.push('/login');
}






