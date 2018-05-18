import { SAVE_COMPANY, SAVE_CANDIDATE, CHECK_USER, GET_USER } from '../constants/actionTypes';
import { auth, provider } from '../../../firebase/index.js';
import axios from 'axios';
import history from '../components/history.jsx';
import store from '../store.js';


const redirectHomePage = (uid) => (dispatch) => {
  axios.post('/api/login', {token: uid})
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
}

export const saveCandidate = (token, fullName,username, phone, github_url) => (dispatch) => {
  console.log('auth actions save candidate')
	axios.post('/api/registerCandidate', { token, fullName, username, phone, github_url })
}

export const saveCompany = (token, companyName, username, phone, logoUrl, information) => (dispatch) => {
  axios.post('/api/registerCompany', { token, companyName, username, phone, logoUrl, information })
  .then((response) => {
  	dispatch({ type: SAVE_COMPANY, payload: response.data })
  })
	.catch((err) => {
		console.log('Error saving user', err);
	})
}

export const handleLogin = (email, password) => (dispatch) => {
  if (auth.currentUser) {
    localStorage.removeItem('userId');
    auth.signOut();
  }
  auth.signInWithEmailAndPassword(email, password)
  .then(({user}) => {
    redirectHomePage(user.uid);
    // axios.post('/api/login', {token: user.uid})
    // .then(({data}) => {
    //   localStorage.setItem('userId', data[0]);
    //   dispatch({ type: CHECK_USER, payload: data })
    //   if (data[1].role === 'company') {
    //     history.push('/admin');
    //   } else if (data[1].role === 'candidate') {
    //     history.push('/user');
    //   }
    // })
    // .catch((err) => {
    //   console.log('Error checking user', err);
    // })
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
const validateEmail = (email) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
  return password.length >= 6;
}

const matchPassword = (password, confirmPassword) => {
  return password === confirmPassword;
}

export const handleSignUp = (email, username, password, confirmPassword, form, name, phone, logoUrl, githubUrl, companyInfo) => (dispatch) => {
  if (!matchPassword(password, confirmPassword)) {
    alert('Your password and confirmation password do not match.');
  } else if (!validatePassword(password)) {
    alert('Password must be at least 6 character.');
  } else if (!validateEmail(email)) {
    alert('Invalid email address');
  } else {
    auth.createUserWithEmailAndPassword(email, password)
    .then(({user}) => {
      if (form === 'companyForm') {
        dispatch(saveCompany(user.uid, name, username, phone, logoUrl, companyInfo));
      } else {
        dispatch(saveCandidate(user.uid, name, username, phone, githubUrl));
      }
      return user.uid
    })
    .then((uid) => {
      redirectHomePage(uid)
    })
    .catch((error) => {
      if(error) {
        console.log('error for signup', error)
        alert(error.message)
      }
    })
  }
}

export const handleLogout = () => (dispatch) => {
  if (auth.currentUser) {
    auth.signOut();
    localStorage.removeItem('userId');
  }
  history.push('/login');
}






