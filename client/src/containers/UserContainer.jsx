import React, { Component } from 'react';

import UserInitialChallengeView from '../components/UserView/UserChallenge/UserInitialChallengeView.jsx';
import UserLiveCodingView from '../components/UserView/UserChallenge/UserLiveCodingView.jsx';
import UserProfileView from '../components/UserView/UserInformation/UserProfileView.jsx';
import AllChallengeListView from '../components/UserView/CompanyList/AllChallengeListView.jsx';
import CompanyScheduleView from '../components/UserView/CompanyList/CompanyScheduleView.jsx';
import UserDashBoard from '../components/UserView/UserInformation/UserDashBoard.jsx';
import CompanyListView from '../components/UserView/CompanyList/CompanyListView.jsx';
import PastChallengeListView from '../components/UserView/UserInformation/PastChallengeListView.jsx';
import PrivateRoute from '../components/PrivateRoute.jsx';

import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { viewCompanyProfile, fetchCandidateCalendar, fetchInitialChallenge, fetchCandidateInfo, updateCandidateSkills, deleteCandidateSkill, updateCandidateGithub, saveCandidateCalendar, deleteCandidateSchedule, saveResults, currentCompanyCalendar, fetchCandidateInitialResults, fetchCompanyList, fetchCandidateResults, getResume, saveResume, removeResume, updateCandidatePhoto, fetchAllCompanyCalendars, checkCandidateReschedule } from '../actions/userActions';
import { fetchCompanyResults, getUsername, fetchCompanyInfo } from '../actions/adminActions' ;
import { handleLogout } from '../actions/authActions';

import axios from 'axios';

class UserContainer extends Component {
  
  render() {
    return (
      <div>
        <Switch>
          <PrivateRoute exact path='/user' component={UserDashBoardComponent}/>
          <PrivateRoute exact path='/user/challengelist' component={AllChallengeListViewComponent}/>
          <PrivateRoute exact path='/user/schedule' component={CompanyScheduleViewComponent}/>
          <PrivateRoute exact path='/user/challenge' component={UserInitialChallengeViewComponent}/>
          <PrivateRoute exact path='/user/live' component={UserLiveCodingViewComponent}/>
          <PrivateRoute exact path='/user/profile' component={UserProfileViewComponent}/>
          <PrivateRoute exact path='/user/companylist' component={CompanyListViewComponent}/>
          <PrivateRoute exact path='/user/pastchallenge' component={PastChallengeListViewComponent}/>
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = function(state) {

  return {
    initial_challenge: state.initial_challenge.initial_challenge,
    name: state.name.name,
    username: state.username.username,
    candidate_information: state.candidate_information.candidate_information,
    candidate_skills: state.candidate_skills.candidate_skills,
    github_url: state.github_url.github_url,
    photo: state.photo.photo,
    candidate_calendar: state.candidate_calendar.candidate_calendar,
    company_schedule: state.company_schedule.company_schedule,
    current_company_calendar: state.current_company_calendar.current_company_calendar,
    candidate_results: state.candidate_results.candidate_results,
    pass_initial: state.pass_initial.pass_initial,
    company_list: state.company_list.company_list,
    resume_name: state.resume_name.resume_name,
    resume_url: state.resume_url.resume_url,
    all_company_calendars: state.all_company_calendars.all_company_calendars,
    company_name: state.company_name.company_name,
    logo_url: state.logo_url.logo_url,
    company_information: state.company_information.company_information,
    website_url: state.website_url.website_url
}};

const mapDispatchToProps = {
   fetchCandidateCalendar, fetchInitialChallenge, fetchCandidateInfo, updateCandidateSkills, 
   deleteCandidateSkill, updateCandidateGithub, saveCandidateCalendar, deleteCandidateSchedule, 
   saveResults, currentCompanyCalendar, fetchCandidateInitialResults, fetchCompanyList, fetchCompanyResults, fetchCandidateResults, getResume, saveResume, removeResume, updateCandidatePhoto, getUsername,
   viewCompanyProfile, fetchAllCompanyCalendars, handleLogout, fetchCompanyInfo, checkCandidateReschedule
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(UserContainer);
const UserDashBoardComponent = connect(mapStateToProps, mapDispatchToProps)(UserDashBoard);
const AllChallengeListViewComponent = connect(mapStateToProps, mapDispatchToProps)(AllChallengeListView);
const CompanyScheduleViewComponent = connect(mapStateToProps, mapDispatchToProps)(CompanyScheduleView);
const UserInitialChallengeViewComponent = connect(mapStateToProps, mapDispatchToProps)(UserInitialChallengeView);
const UserLiveCodingViewComponent = connect(mapStateToProps, mapDispatchToProps)(UserLiveCodingView);
const UserProfileViewComponent = connect(mapStateToProps, mapDispatchToProps)(UserProfileView);
const CompanyListViewComponent = connect(mapStateToProps, mapDispatchToProps)(CompanyListView);
const PastChallengeListViewComponent = connect(mapStateToProps, mapDispatchToProps)(PastChallengeListView);
const routeUserComponent = withRouter(connectComponent);
export default routeUserComponent;
