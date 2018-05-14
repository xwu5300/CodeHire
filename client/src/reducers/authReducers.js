
import { CHECK_USER, SAVE_CANDIDATE, SAVE_COMPANY } from '../constants/actionTypes';

const initialState = {
  user_id: '',
  name: '',
  username: '',
  login_status: '',
  signup_status: ''
}


const loginStatus = (state = initialState, action) => {
  switch(action.type) {
    case 'CHECK_USER':
      return {
        login_status: action.payload[0],
        user_id: action.payload[1],
        name: action.payload[2],
        username: action.payload[3]
      }
    default:
      return state;  
    }
}

const signupStatus = (state = initialState, action) => {
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