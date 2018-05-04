import { 
    saveDefaultChallenge, 
    deleteCompanyChallenge,
    getCompanyChallenges,
    getDefaultChallenges,
    saveCompanyChallenges
} 
from '../constants/actionTypes';

const initialState = {
  challenges: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case saveDefaultChallenge:
      return { ...state, challenges: [ ...state.challenges, action.payload]}
    default:
      return state;
  }
};

export default rootReducer;

