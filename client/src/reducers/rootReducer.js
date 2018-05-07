import { combineReducers } from 'redux';
import adminReducers from './adminReducers';
import authReducers from './authReducers';



export default combineReducers({
  default_challenges: adminReducers.defaultChallenges,
  all_challenges: adminReducers.allChallenges,
  login_status: authReducers.loginStatus,
  username: authReducers.loginStatus,
  signup_status: authReducers.signupStatus,
  logo_url: adminReducers.companyInfo,
  information: adminReducers.companyInfo
})





