import { combineReducers } from 'redux';
import challengeReducers from './allReducers';


console.log(challengeReducers.getUserRole);

export default combineReducers({
  default_challenges: challengeReducers.defaultChallenges,
  all_challenges: challengeReducers.allChallenges,
  user_role: challengeReducers.getUserRole
})





