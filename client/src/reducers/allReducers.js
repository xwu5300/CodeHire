import React from 'react';
import { GET_DEFAULT_CHALLENGES, GET_ALL_CHALLENGES, CHECK_USER } from '../constants/actionTypes';

const initialState = {
  default_challenges: [],
  all_challenges: [],
  user_role: 'candidate'
}


const defaultChallenges = (state = [], action) => {
  switch (action.type) {
    case 'GET_DEFAULT_CHALLENGES':
      return {
        ...state,
        default_challenges: action.payload
      }
    default:
    return state;
  }
}

const allChallenges = (state = [], action) => {
  switch(action.type) {
    case 'GET_ALL_CHALLENGES':
      return {
        ...state,
        all_challenges: action.payload
      }
      default:
        return state;
  }
}

const getUserRole = (state = 'candidate', action) => {
  console.log('paylog', action.payload);
  switch(action.type) {
    case 'CHECK_USER':
      return {
        user_role: action.payload
      }
    default:
      return state;  
    }
}



export default { defaultChallenges, allChallenges, getUserRole };


