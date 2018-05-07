
import { CHECK_USER, SAVE_CANDIDATE, SAVE_COMPANY } from '../constants/actionTypes';

const initialState = {
  username: '',
  login_status: '',
  signup_status: ''
}


const loginStatus = (state = 'company', action) => {
  switch(action.type) {
    case 'CHECK_USER':
      return {
        login_status: action.payload,
        username: action.username
      }
    default:
      return state;  
    }
}

const signupStatus = (state = '', action) => {
  switch(action.type) {
    case 'SAVE_COMPANY':
      return {
        signup_status: action.payload
      }
    case 'SAVE_CANDIDATE':
      return {
        signup_status: action.payload
      }
    default:
      return state;
  }
}

export default { loginStatus, signupStatus };