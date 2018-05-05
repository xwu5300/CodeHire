import { combineReducers } from 'redux';
import getDefaultChallenges from './allReducers.jsx';


export default combineReducers({
  challenges: getDefaultChallenges
})




// import { 
//     saveDefaultChallenge, 
//     deleteCompanyChallenge,
//     getCompanyChallenges,
//     getDefaultChallenges,
//     saveCompanyChallenges
// } 
// from '../constants/actionTypes.jsx';

// const initialState = {
//   challenges: []
// };

// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case saveDefaultChallenge:
//       return { ...state, challenges: [ ...state.challenges, action.payload]}
//     default:
//       return state;
//   }
// };

// export default rootReducer;

