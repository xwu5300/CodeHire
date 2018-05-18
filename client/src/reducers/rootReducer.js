import { combineReducers } from 'redux';
import adminReducers from './adminReducers';
import authReducers from './authReducers';
import userReducers from './userReducers';


export default combineReducers({
  default_challenges: adminReducers.defaultChallenges,
  all_challenges: adminReducers.allChallenges,
  login_status: authReducers.loginStatus,
  name: authReducers.loginStatus,
  username: authReducers.loginStatus,
  isLoggedIn: authReducers.loginStatus,
  signup_status: authReducers.signupStatus,
  logo_url: adminReducers.companyInfo,
  information: adminReducers.companyInfo,
  company_schedule: adminReducers.companySchedule,
  is_initial: adminReducers.isInitial,
  favorites: adminReducers.favorites,
  initial_challenge: userReducers.initialChallenge, 
  company_information: adminReducers.companyInfo,
  candidate_information: userReducers.candidateInfo,
  candidate_skills: userReducers.candidateInfo,
  github_url: userReducers.candidateInfo,
  candidate_calendar: userReducers.candidateCalendar,
  current_live_challenge_title: adminReducers.currentLiveChallenge,
  current_live_challenge_duration: adminReducers.currentLiveChallenge,
  current_company_calendar: userReducers.currentCompanySchedule,
  challenge_info: adminReducers.challengeInfo,
  results: adminReducers.results,
  candidate_list: adminReducers.candidateList,
  pass_initial: userReducers.candidateInitialResults,
  company_list: userReducers.companyList,
  candidate_results: userReducers.candidateResults,
  users: adminReducers.users
})





