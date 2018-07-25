
const initialState = {
  name: '',
  login_status: '',
  signup_status: '',
  isLoggedIn: ''
}


const loginStatus = (state = initialState, action) => {
  switch(action.type) {
    case 'CHECK_USER':
      return {
        login_status: action.payload[1].role,
        name: action.payload[1].name,
        isLoggedIn: action.payload[0]
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