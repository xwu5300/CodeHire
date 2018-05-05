import React from 'react';
import { GET_DEFAULT_CHALLENGES, GET_ALL_CHALLENGES } from '../constants/actionTypes';

const initialState = {
  default_challenges: [],
  all_challenges: []
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



export default { defaultChallenges, allChallenges };


