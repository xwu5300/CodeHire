import React from 'react';
import { GET_ALL_COMPANY_CALENDARS, GET_INITIAL_CHALLENGE, GET_CANDIDATE_INFO, GET_CANDIDATE_CALENDAR, GET_CANDIDATE_INITIAL_RESULTS, GET_COMPANY_LIST } from '../constants/actionTypes';

const initialState = {
  all_company_calendars: [],
  initial_challenge: [],
  candidate_calendar: [],
  candidate_skills: [],
  github_url: '',
  current_company_calendar: '',
  pass_initial: false,
  company_list: []
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

const companyList = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_COMPANY_LIST':
      return {
        ...state,
        company_list: action.payload
      }
    default:
      return state;
  }
}

const candidateCalendar = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CANDIDATE_CALENDAR':
      return {
        ...state,
        candidate_calendar: action.payload
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

  const candidateInfo = (state = initialState, action) => {
    switch(action.type) {
      case 'GET_CANDIDATE_INFO':
        return {
          ...state,
          candidate_skills: action.skills,
          github_url: action.github_url
        }
      default:
        return state;
  }
}


const currentCompanySchedule = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CURRENT_COMPANY_CALENDAR':
      return {
        ...state,
        current_company_calendar: action.company_id
      }
      default: 
        return state;
  }
}

const candidateInitialResults = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CANDIDATE_INITIAL_RESULTS':
      return {
        ...state,
        pass_initial: action.payload
      }
      default:
        return state;
  }
}



export default { allCompanyCalendars, initialChallenge, candidateInfo, candidateCalendar, currentCompanySchedule, candidateInitialResults, companyList };

