
import { GET_INITIAL_CHALLENGE, GET_CANDIDATE_CALENDAR, GET_CANDIDATE_INFO, DELETE_CANDIDATE_SKILL, GET_CURRENT_COMPANY_CALENDAR, GET_CANDIDATE_INITIAL_RESULTS, GET_COMPANY_LIST, GET_CANDIDATE_RESULTS, GET_RESUME, GET_COMPANY_NAME, GET_ALL_COMPANY_CALENDARS } from '../constants/actionTypes';


import axios from 'axios';
import swal from 'sweetalert2';

export const fetchAllCompanyCalendars =(companyName, companyId, cb) => (dispatch) => {
  axios.get('/api/companyCalendars', {params: { companyName, companyId }})
  .then(({data}) => {
    dispatch({ type: GET_ALL_COMPANY_CALENDARS, payload: data })
    if(cb) {
      cb()
    }
  })
  .catch((err) => {})
}

export const fetchCompanyList = (companyName) => (dispatch) => {
  axios.get('/api/companyList', { params: { companyName } })
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_LIST, payload: data});
  })
  .catch((err) => {})
}

export const fetchCandidateCalendar = (candidateId) => (dispatch) => {
  axios.get('/api/candidateCalendar', { params: { candidateId } })
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_CALENDAR, payload: data });
  })
  .catch((err) => {})
}

export const saveCandidateCalendar = (candidateId, companyScheduleId) => (dispatch) => {
  axios.post('/api/candidateCalendar', { candidateId, companyScheduleId })
  .then(({data}) => {
    dispatch(fetchCandidateCalendar(candidateId))
  })
  .catch((err) => {})
}

export const deleteCandidateSchedule = (candidateScheduleId, candidateId) => (dispatch) => {
  axios.delete('/api/cancelCandidateSchedule', { params: { candidateScheduleId, candidateId } })
  .then(() => {
    dispatch(fetchCandidateCalendar(candidateId));
  })
  .catch((err) => {})
}

export const checkCandidateReschedule = (candidateId, companyId, time, cb) => (dispatch) => {
  axios.get('/api/candidateCalendar/reschedule', { params: { candidateId, companyId, time } })
  .then(({data}) => {
    cb(data)
  })
  .catch((err) => {})
}

export const fetchInitialChallenge = (company_id) => (dispatch) => {
  axios.get('/api/initialChallenge', { params: { company_id } })
  .then(({data}) => {
    dispatch({ type: GET_INITIAL_CHALLENGE, payload: data });
  })
  .catch((err) => {})
}

export const currentCompanyCalendar = (companyId, callback) => (dispatch) => {
  dispatch( { type: GET_CURRENT_COMPANY_CALENDAR, company_id: companyId });
  if(callback) {
    callback();
 }
}

export const saveResults = (companyScheduleId, isPassed, code, score, completedAt, challengeId, companyId, candidateId, initial, candidateScheduleId, cb) => (dispatch) => {
  axios.post('/api/results', { companyScheduleId, isPassed, code, score, completedAt, challengeId, companyId, candidateId, initial })
  .then(() => {
    dispatch(deleteCandidateSchedule(candidateScheduleId, candidateId));
    dispatch(fetchCandidateResults(candidateId))
  })
  .then(() => {
    if (cb) {
      cb();
    }
  })
  .catch((err) => {})
}

export const fetchCandidateResults = (candidateId, companyScheduleId, cb) => (dispatch) => {
  axios.get('/api/results/candidate', { params: { candidateId, companyScheduleId } })
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_RESULTS, payload: data });
    if (cb) {
      cb(data);
    }
  })
  .catch((err) => {})
}

export const fetchCandidateInitialResults = (companyId, candidateId, cb) => (dispatch) => {
  axios.get('/api/results/candidate/initial', { params: { companyId, candidateId } })
  .then(({data}) => {
    if (data[0] && data[0].user_passed) {
      dispatch({ type: GET_CANDIDATE_INITIAL_RESULTS, payload: data[0].user_passed });
    } else {
      dispatch({ type: GET_CANDIDATE_INITIAL_RESULTS, payload: false});
    }
    cb(data)
  })
  .catch((err) => {})
}


/* ----------- User Profile ------------ */

export const updateCandidateSkills = (userId, skills, callback) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId, skills })
  .then(() => {
    if (callback) {
      callback();
    }
  })
  .catch((err) => {})
}

export const updateCandidatePhoto = (userId, photo) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId, photo })
  .then(() => {
    dispatch(fetchCandidateInfo(userId))
  })
  .catch((err) => {})
}

export const deleteCandidateSkill = (candidateId, skill, callback) => (dispatch) => {
  axios.delete('/api/candidateInfo', { params: { candidateId, skill } })
  .then((response) => {
    if(callback) {
      callback(response)
    }
  })
  .catch((err) => {})
}


export const updateCandidateGithub = (userId, github_url) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId, github_url })
  .then(() => {
    dispatch(fetchCandidateInfo(userId))
  })
  .catch((err) => {})
}

export const fetchCandidateInfo = (candidateId, username, callback) => (dispatch) => {
  axios.get('/api/candidateInfo', { params: { candidateId, username }})
  .then((info) => {
    dispatch({ type: GET_CANDIDATE_INFO, skills: info.data[0].candidate_skills, github_url: info.data[0].github_url, photo: info.data[0].profile_photo })
      if(callback) {
        callback();
      }
    })
    .catch((err) => {})
  }


export const viewCompanyProfile = (name) => (dispatch) => {
  dispatch({ type: GET_COMPANY_NAME, name: name })
}

export const saveResume = (resumeUrl, resumeName, userId) => (dispatch) => {
  axios.post('/api/resume', { resumeUrl, resumeName, userId })
  .then(() => {
    dispatch(getResume(userId));
  })
  .catch((err) => {})
}

export const removeResume = (userId) => (dispatch) => {
  axios.delete('/api/resume', {params: { userId }})
  .then(() => {
    dispatch(getResume(userId));
  })
  .catch((err) => {})
}

export const getResume = (userId) => (dispatch) => {
  axios.get('/api/resume', {params: {userId }})
  .then(({data}) => {
    dispatch({type: 'GET_RESUME', payload: data})
  })
  .catch((err) => {})
}