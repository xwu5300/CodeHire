import React, { Component } from 'react';

import UserInitialChallengeView from '../components/UserView/UserChallenge/UserInitialChallengeView.jsx';
import UserLiveCodingView from '../components/UserView/UserChallenge/UserLiveCodingView.jsx';
import UserProfileView from '../components/UserView/UserProfileView.jsx';
import CompanyListView from '../components/UserView/CompanyList/CompanyListView.jsx';
import CompanyScheduleView from '../components/UserView/CompanyList/CompanyScheduleView.jsx';
import UserDashBoard from '../components/UserView/UserDashBoard.jsx';

import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllCompanyCalendars, fetchCandidateCalendar, fetchInitialChallenge, fetchCandidateInfo, updateCandidateSkills, updateCandidateGithub, saveCandidateCalendar, deleteCandidateSchedule, saveResults, currentCompanyCalendar, fetchCandidateInitialResults } from '../actions/userActions';
import { fetchCompanySchedule, fetchCompanyResults } from '../actions/adminActions' ;

import axios from 'axios';

class UserContainer extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/user' component={UserDashBoardComponent}/>
        <Route exact path='/user/companylist' component={CompanyListViewComponent}/>
        <Route exact path='/user/schedule' component={CompanyScheduleViewComponent}/>
        <Route exact path='/user/challenge' component={UserInitialChallengeViewComponent}/>
        <Route exact path='/user/live' component={UserLiveCodingViewComponent}/>
        <Route exact path='/user/profile' component={UserProfileViewComponent}/>
      </Switch>
    );
  }
}

const mapStateToProps = function(state) {
  return {
    all_company_calendars: state.all_company_calendars.all_company_calendars,
    initial_challenge: state.initial_challenge.initial_challenge,
    name: state.name.name,
    user_id: state.user_id.user_id,
    username: state.username.username,
    candidate_information: state.candidate_information.candidate_information,
    candidate_skills: state.candidate_skills.candidate_skills,
    github_url: state.github_url.github_url,
    candidate_calendar: state.candidate_calendar.candidate_calendar,
    company_schedule: state.company_schedule.company_schedule,
    current_company_calendar: state.current_company_calendar.current_company_calendar,
    results: state.results.results,
    pass_initial: state.pass_initial.pass_initial
}};

const connectComponent = connect(mapStateToProps)(UserContainer); //code cleaned
const UserDashBoardComponent = connect(mapStateToProps, { fetchCandidateCalendar, deleteCandidateSchedule, currentCompanyCalendar })(UserDashBoard);
const CompanyListViewComponent = connect(mapStateToProps, { fetchInitialChallenge,   fetchAllCompanyCalendars, fetchCompanyResults, fetchCandidateInitialResults, fetchCompanySchedule })(CompanyListView); //code cleaned
const CompanyScheduleViewComponent = connect(mapStateToProps, { saveCandidateCalendar })(CompanyScheduleView);
const UserInitialChallengeViewComponent = connect(mapStateToProps, { saveResults, fetchCandidateInitialResults })(UserInitialChallengeView);
const UserLiveCodingViewComponent = connect(mapStateToProps, { saveResults })(UserLiveCodingView);
const UserProfileViewComponent = connect(mapStateToProps, { fetchCandidateInfo, updateCandidateSkills, updateCandidateGithub })(UserProfileView);


const routeUserComponent = withRouter(connectComponent);
export default routeUserComponent;
