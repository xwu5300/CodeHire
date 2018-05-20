import React from 'react';
import { GET_INITIAL_CHALLENGE, GET_CANDIDATE_INFO, GET_CANDIDATE_CALENDAR, GET_CANDIDATE_INITIAL_RESULTS, GET_COMPANY_LIST, GET_CANDIDATE_RESULTS, GET_RESUME } from '../constants/actionTypes';

const initialState = {
  initial_challenge: [],
  candidate_calendar: [],
  candidate_skills: [],
  github_url: '',
  current_company_calendar: '',
  pass_initial: false,
  company_list: [],
  candidate_results: [],
  resume_url: '',
  resume_name: ''
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

const candidateResults = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_CANDIDATE_RESULTS':
      return {
        ...state,
        candidate_results: action.payload
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

const candidateResume = (state = initialState, action) => {
  switch(action.type) {
    case 'GET_RESUME':
      return {
        ...state,
        resume_url: action.payload[0].resume_url,
        resume_name: action.payload[0].resume_name
      }
    default:
      return state;
  }
}



export default { initialChallenge, candidateInfo, candidateCalendar, currentCompanySchedule, candidateInitialResults, companyList, candidateResults, candidateResume };

