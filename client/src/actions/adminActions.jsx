import { saveDefaultChallenge, deleteCompanyChallenge, getCompanyChallenges, getDefaultChallenges, saveCompanyChallenges } from '../constants/actionTypes';

export const saveDefaultChallenge = (challenge) => ({
  type: 'saveDefaultChallenge', payload: challenge
})

export const deleteCompanyChallenge = (challenge) => ({
    type: 'deleteCompanyChallenge', payload: challenge
})

export const getCompanyChallenges = (challenge) => ({
    type: 'getCompanyChallenges', payload: challenge
})

export const getDefaultChallenges = (challenge) => ({
    type: 'getDefaultChallenges', payload: challenge
})

export const saveCompanyChallenges = (challenge) => ({
    type: 'saveCompanyChallenges', payload: challenge
})