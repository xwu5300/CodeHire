
import { GET_INITIAL_CHALLENGE, GET_CANDIDATE_CALENDAR, GET_CANDIDATE_INFO, DELETE_CANDIDATE_SKILL, GET_CURRENT_COMPANY_CALENDAR, GET_CANDIDATE_INITIAL_RESULTS, GET_COMPANY_LIST, GET_CANDIDATE_RESULTS, GET_RESUME } from '../constants/actionTypes';

import axios from 'axios';
import swal from 'sweetalert2';

export const fetchAllCompanyCalendars =(cb) => (dispatch) => {
  axios.get('/api/companyCalendars')
  .then(({data}) => {
    dispatch({ type: GET_ALL_COMPANY_CALENDARS, payload: data })
    cb()
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCompanyList = (companyName) => (dispatch) => {
  axios.get('/api/companyList', { params: { companyName } })
  .then(({data}) => {
    dispatch({ type: GET_COMPANY_LIST, payload: data});
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateCalendar = (candidateId) => (dispatch) => {
  axios.get('/api/candidateCalendar', { params: { candidateId } })
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_CALENDAR, payload: data });
  })
  .catch((err) => {
    console.log(err);
  })
}

export const saveCandidateCalendar = (candidateId, companyScheduleId) => (dispatch) => {
  axios.post('/api/candidateCalendar', { candidateId, companyScheduleId })
  .then(({data}) => {
    if (data) {
      swal({
        text: "Scheduled a Live Challenge.",
        // width: '350px'
      })
    } else {
      swal({

        text: "You've already scheduled this live challenge.",
        // width: '350px'
      })
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

export const deleteCandidateSchedule = (candidateScheduleId, candidateId) => (dispatch) => {
  axios.delete('/api/cancelCandidateSchedule', { params: { candidateScheduleId, candidateId } })
  .then(() => {
    dispatch(fetchCandidateCalendar(candidateId));
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchInitialChallenge = (company_id) => (dispatch) => {
  axios.get('/api/initialChallenge', { params: { company_id } })
  .then(({data}) => {
    dispatch({ type: GET_INITIAL_CHALLENGE, payload: data });
  })
  .catch((err) => {
    console.log(err);
  })
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
    cb();
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateResults = (candidateId, companyScheduleId, cb) => (dispatch) => {
  axios.get('/api/results/candidate', { params: { candidateId, companyScheduleId } })
  .then(({data}) => {
    dispatch({ type: GET_CANDIDATE_RESULTS, payload: data });
    cb(data)
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateInitialResults = (companyId, candidateId, cb) => (dispatch) => {
  axios.get('/api/results/candidate/initial', { params: { companyId, candidateId } })
  .then(({data}) => {
    if (data[0] && data[0].user_passed) {
      dispatch({ type: GET_CANDIDATE_INITIAL_RESULTS, payload: data });
    }
    cb(data)
  })
  .catch((err) => {
    console.log(err);
  })
}


/* ----------- User Profile ------------ */

export const updateCandidateSkills = (userId, skills, callback) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId, skills })
  .then(() => {
    if (callback) {
      callback();
    }
  })
  .catch((err) => {
    console.log(err);
  })
}

export const updateCandidatePhoto = (userId, photo) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId, photo })
  .then(() => {
    dispatch(fetchCandidateInfo(userId))
    console.log('profile photo successfully uploaded');
  })
  .catch((err) => {
    console.log('unable to upload profile photo', err);
  })
}

export const deleteCandidateSkill = (candidateId, skill, callback) => (dispatch) => {
  axios.delete('/api/candidateInfo', { params: { candidateId, skill } })
  .then((response) => {
    console.log('response', response);
    if(callback) {
      callback(response)
    }
  })
  .catch((err) => {
    console.log(err);
  })
}


export const updateCandidateGithub = (userId, github_url) => (dispatch) => {
  axios.patch('/api/candidateInfo', { userId, github_url })
  .then(() => {
    dispatch(fetchCandidateInfo(userId))
  })
  .catch((err) => {
    console.log(err);
  })
}

export const fetchCandidateInfo = (candidateId, username, callback) => (dispatch) => {
  axios.get('/api/candidateInfo', { params: { candidateId, username }})
    .then((info) => {
      console.log('infooooo', info);
      dispatch({ type: GET_CANDIDATE_INFO, skills: info.data[0].candidate_skills, github_url: info.data[0].github_url, photo: info.data[0].profile_photo })
        if(callback) {
          callback();
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

export const saveResume = (resumeUrl, resumeName, userId) => (dispatch) => {
  axios.post('/api/resume', { resumeUrl, resumeName, userId })
  .then(() => {
    dispatch(getResume(userId));
    console.log('saved resume');
  })
  .catch((err) => {
    console.log('unable to save resume', err);
  })
}

export const removeResume = (userId) => (dispatch) => {
  axios.delete('/api/resume', {params: { userId }})
  .then(() => {
    dispatch(getResume(userId));
    console.log('removed resume');
  })
  .catch((err) => {
    console.log('unable to remove resume', err);
  })
}

export const getResume = (userId) => (dispatch) => {
  axios.get('/api/resume', {params: {userId }})
  .then(({data}) => {
    dispatch({type: 'GET_RESUME', payload: data})
    console.log('successfully retrieved resume');
  })
  .catch((err) => {
    console.log('unable to retrieve resume from db', err);
  })
}