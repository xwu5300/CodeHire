import React, { Component } from 'react';
import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';
import UserResults from '../components/AdminView/UserResults.jsx';

import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchDefaultChallenges, fetchAllChallenges, saveChallenge, deleteChallenge, updateInfo, fetchCompanyInfo, addToCompanySchedule, fetchCompanySchedule, toggleInitialOn, toggleInitialOff, makeInitial, setCurrentLiveChallenge, deleteFromCompanySchedule, fetchCompanyResults, fetchCandidateList, getChallengeInfo } from '../actions/adminActions'; 
import { fetchInitialChallenge, currentCompanyCalendar, fetchCandidateInfo } from '../actions/userActions';


class AdminContainer extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/admin' component={ AdminDashboardComponent } />
        <Route exact path='/admin/profile' component={ AdminProfileComponent }/>
        <Route exact path='/admin/challenges' component={ ChallengeListComponent } />
        <Route exact path='/admin/live' component={ LiveCodingComponent }/>
        <Route exact path='/admin/data' component={ AnalyticsComponent }/>
        <Route exact path='/admin/data/results' component={ UserResultsComponent }/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
   default_challenges: state.default_challenges.default_challenges,
   all_challenges: state.all_challenges.all_challenges,
   logo_url: state.logo_url.logo_url,
   company_information: state.company_information.company_information,
   company_schedule: state.company_schedule.company_schedule,
   is_initial: state.is_initial.is_initial,
   initial_challenge: state.initial_challenge.initial_challenge,
   current_live_challenge_title: state.current_live_challenge_title.current_live_challenge_title,
   current_live_challenge_duration: state.current_live_challenge_duration.current_live_challenge_duration,
   current_company_calendar: state.current_company_calendar.current_company_calendar,
   user_id: state.user_id.user_id,
   name: state.name.name,
   username: state.username.username,
   challenge_info: state.challenge_info.challenge_info,
   candidate_information: state.candidate_information.candidate_information,
   candidate_skills: state.candidate_skills.candidate_skills,
   github_url: state.github_url.github_url,
   results: state.results.results,
   candidate_list: state.candidate_list.candidate_list
});




const ChallengeListComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge, addToCompanySchedule, makeInitial, getChallengeInfo })(ChallengeListView);
const AdminDashboardComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge, toggleInitialOn, toggleInitialOff, makeInitial, setCurrentLiveChallenge, currentCompanyCalendar, fetchCompanySchedule, deleteFromCompanySchedule, fetchCandidateList, addToCompanySchedule, fetchInitialChallenge })(AdminDashboardView);
const AnalyticsComponent= connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge, fetchCompanyResults })(AnalyticsView);
const LiveCodingComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge, fetchCandidateInfo })(LiveCodingView);
const AdminProfileComponent = connect(mapStateToProps, { updateInfo, fetchCompanyInfo })(AdminProfileView);
const UserResultsComponent = connect(mapStateToProps)(UserResults)

const connectAdminContainer = connect(mapStateToProps)(AdminContainer);
export default withRouter(connectAdminContainer);

