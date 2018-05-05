import { saveDefaultChallenge, deleteCompanyChallenge, getCompanyChallenges, getDefaultChallenges, saveCompanyChallenges } from '../constants/actionTypes.jsx';
import axios from 'axios';
// export const saveDefaultChallenge = (challenge) => ({
//   type: 'saveDefaultChallenge', payload: challenge
// })

// export const deleteCompanyChallenge = (challenge) => ({
//     type: 'deleteCompanyChallenge', payload: challenge
// })

// export const getCompanyChallenges = (challenge) => ({
//     type: 'getCompanyChallenges', payload: challenge
// })

export const fetchChallenges = () => (dispatch) => {
  axios.get('/api/defaultChallenges')
  .then((challenges) => {
    console.log(challenges);
    dispatch({ type: getDefaultChallenges, payload: challenges })
  })
  .catch((err) => {
    console.log(err);
  })
}



// export const saveCompanyChallenges = (challenge) => ({
//     type: 'saveCompanyChallenges', payload: challenge
// })