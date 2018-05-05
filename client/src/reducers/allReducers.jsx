import { getDefaultChallenges } from '../constants/actionTypes.jsx';

const initialState = {
  challenges: []
}


const challenges = (state = [], action) => {
  switch (action.type) {
    case 'getDefaultChallenges':
      return {
        ...save,
        challenges: action.payload
      }
    default:
    return state;
  }
}

export default challenges;