import React from 'react';
import { GET_DEFAULT_CHALLENGES, GET_ALL_CHALLENGES, GET_INFO } from '../constants/actionTypes';


const initialState = {
  default_challenges: [],
  all_challenges: [],
  logo_url: 'http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w',
  information: '',
}


const defaultChallenges = (state = initialState, action) => {
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

const allChallenges = (state = initialState, action) => {
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

const companyInfo = (state = '', action) => {
  switch(action.type) {
    case 'GET_INFO':
      return {
        logo_url: action.logo_url,
        information: action.information
      }
    default:
      return state;
  }
}

export default { defaultChallenges, allChallenges, companyInfo };