import { SAVE_COMPANY, SAVE_CANDIDATE, CHECK_USER, GET_USER } from '../constants/actionTypes';
import { auth, provider } from '../../../firebase/index.js';
import axios from 'axios';
import history from '../components/history.jsx';
import store from '../store.js';


const redirectHomePage = (uid) => (dispatch) => {
  axios.post('/api/login', {token: uid})
  .then(({data}) => {
    localStorage.setItem('userId', data[0]);
    localStorage.setItem('username', data[1].name);
    dispatch({ type: CHECK_USER, payload: data })
    if (data[1].role === 'company') {
      history.push('/admin');
    } else if (data[1].role === 'candidate') {
      history.push('/user');
    }
  })
  .catch((err) => {})
}

export const saveCandidate = (token, fullName,username, phone, github_url, cb) => (dispatch) => {
  axios.post('/api/registerCandidate', { token, fullName, username, phone, github_url })
  .then(() => {
    cb();
  })
  .catch((err) => {})
}

export const saveCompany = (token, companyName, username, phone, logoUrl, information, cb) => (dispatch) => {
  axios.post('/api/registerCompany', { token, companyName, username, phone, logoUrl, information })
  .then(() => {
    cb()
  })
	.catch((err) => {})
}

export const handleLogin = (email, password) => (dispatch) => {
  if (auth.currentUser) {
    localStorage.removeItem('userId', 'username');
    auth.signOut();
  }
  auth.signInWithEmailAndPassword(email, password)
  .then(({user}) => {
    dispatch(redirectHomePage(user.uid));
  })
  .catch((err) => {
    if (err) {
      alert(err.message);
    }
  })
}

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

const validUsername = (username, cb) => {
  axios.get('/api/auth/username', { params: { username } })
  .then(({data}) => {
    let isValid = data.length === 0 ? true : false
    return cb(isValid)
  })
}

export const handleSignUp = (email, username, password, confirmPassword, form, name, phone, logoUrl, githubUrl, companyInfo) => (dispatch) => {
  validUsername(username, (isValid) => {
    if (!matchPassword(password, confirmPassword)) {
      alert('Your password and confirmation password do not match.');
    } else if (!validatePassword(password)) {
      alert('Password must be at least 6 character.');
    } else if (!validateEmail(email)) {
      alert('Invalid email address');
    } else if (!isValid) {
      alert('The username is already in use by another account.')
    } else if ((githubUrl && githubUrl.length > 255) || (logoUrl && logoUrl.length > 255)) {
      alert('The URL is too long.')
    }
    else {
      auth.createUserWithEmailAndPassword(email, password)
      .then(({user}) => {
        if (user.uid) {
          if (form === 'companyForm') {
            dispatch(saveCompany(user.uid, name, username, phone, logoUrl, companyInfo, function() {
              dispatch(redirectHomePage(user.uid))
            }));
          } else if (form === 'candidateForm'){
            dispatch(saveCandidate(user.uid, name, username, phone, githubUrl, function() {
              dispatch(redirectHomePage(user.uid))
            }));
          }
        }
      })
      .catch((error) => {
        if(error) {
          alert(error.message)
        }
      })
    }
  })
}

export const handleLogout = () => (dispatch) => {
  if (auth.currentUser) {
    auth.signOut();
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('companyName');
    localStorage.removeItem('companyId');
  }
  history.push('/');
}



