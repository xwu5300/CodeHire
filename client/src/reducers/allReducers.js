import React from 'react';
import { GET_DEFAULT_CHALLENGES, GET_ALL_CHALLENGES, CHECK_USER, SAVE_CANDIDATE, SAVE_COMPANY } from '../constants/actionTypes';

const initialState = {
  default_challenges: [],
  all_challenges: [],
  username: '',
  logo_url: 'http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w',
  information: '',
  user_role: 'company',
  login_status: '',
  signup_status: ''
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

const loginStatus = (state = 'company', action) => {
  switch(action.type) {
    case 'CHECK_USER':
      return {
        login_status: action.payload,
        username: action.username
      }
    default:
      return state;  
    }
}

const signupStatus = (state = '', action) => {
  switch(action.type) {
    case 'SAVE_COMPANY':
      return {
        signup_status: action.payload
      }
    case 'SAVE_CANDIDATE':
      return {
        signup_status: action.payload
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



export default { defaultChallenges, allChallenges, loginStatus, signupStatus, companyInfo };


