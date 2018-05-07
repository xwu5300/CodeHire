import React from 'react';
import { GET_ALL_COMPANY_CALENDARS, GET_INITIAL_CHALLENGE, GET_CANDIDATE_INFO } from '../constants/actionTypes';

const initialState = {
    all_company_calendars: [],
    initial_challenge: [],
    candidate_information: '',
    candidate_skills: ''
  }
  
const allCompanyCalendars = (state = initialState, action) => {
    switch(action.type) {
      case 'GET_ALL_COMPANY_CALENDARS':
        return {
          ...state,
          all_company_calendars: action.payload
        }
        default:
        return state;
    }
  }
  
  const initialChallenge = (state = initialState, action) => {
    switch(action.type) {
      case 'GET_INITIAL_CHALLENGE':
        return {
          ...state,
          initial_challenge: action.payload
        }
        default:
        return state;
    }
  }

  const candidateInfo = (state = '', action) => {
    switch(action.type) {
      case 'GET_CANDIDATE_INFO':
        return {
          candidate_information: action.information,
          candidate_skills: action.skills
        }
      default:
        return state;
  }
}

export default { allCompanyCalendars, initialChallenge, candidateInfo };

