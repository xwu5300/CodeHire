
import { CHECK_USER, SAVE_CANDIDATE, SAVE_COMPANY } from '../constants/actionTypes';

const initialState = {
  username: '',
  user_id: '',
  login_status: '',
  signup_status: ''
}


const loginStatus = (state = initialState, action) => {
  console.log('ACTION', action);
  switch(action.type) {
    case 'CHECK_USER':
      return {
        login_status: action.payload[0],
        user_id: action.payload[1],
        username: action.payload[2]
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