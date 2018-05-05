import { combineReducers } from 'redux';
import challengeReducers from './allReducers';




export default combineReducers({
  default_challenges: challengeReducers.defaultChallenges,
  all_challenges: challengeReducers.allChallenges
})





