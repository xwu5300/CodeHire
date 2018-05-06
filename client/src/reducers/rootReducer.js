import { combineReducers } from 'redux';
import challengeReducers from './allReducers';



export default combineReducers({
  default_challenges: challengeReducers.defaultChallenges,
  all_challenges: challengeReducers.allChallenges,
  login_status: challengeReducers.loginStatus,
  username: challengeReducers.loginStatus,
  signup_status: challengeReducers.signupStatus,
  logo_url: challengeReducers.companyInfo,
  information: challengeReducers.companyInfo
})





