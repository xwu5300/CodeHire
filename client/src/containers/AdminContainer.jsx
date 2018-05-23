import React, { Component } from 'react';
import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import HireView from '../components/AdminView/HireView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';
import UserResults from '../components/AdminView/UserResults.jsx';

import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PrivateRoute from '../components/PrivateRoute.jsx';

import { fetchDefaultChallenges, fetchAllChallenges, saveChallenge, deleteChallenge, updateInfo, fetchCompanyInfo, addToCompanySchedule, fetchCompanySchedule, toggleInitialOn, toggleInitialOff, makeInitial, setCurrentLiveChallenge, deleteFromCompanySchedule, fetchCompanyResults, fetchCandidateList, getChallengeInfo, updateChallengeDate, getUsername, searchUsers, saveToFavorites, getFavorites, removeFromFavorites, fetchAllResults, getCompanyData, fetchPastSchedule, fetchPastResults } from '../actions/adminActions';
import { fetchInitialChallenge, currentCompanyCalendar, fetchCandidateInfo } from '../actions/userActions';

class AdminContainer extends Component {

  render() {
    return (
      <Switch>
        <PrivateRoute exact path='/admin' component={ AdminDashboardComponent } />
        <PrivateRoute exact path='/admin/profile' component={ AdminProfileComponent }/>
        <PrivateRoute exact path='/admin/challenges' component={ ChallengeListComponent } />
        <PrivateRoute exact path='/admin/live' component={ LiveCodingComponent }/>
        <PrivateRoute exact path='/admin/data' component={ AnalyticsComponent }/>
        <PrivateRoute exact path='/admin/hire' component={ HireComponent } />
        <PrivateRoute exact path='/admin/data/results' component={ UserResultsComponent }/>
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
   name: state.name.name,
   username: state.username.username,
   users: state.users.users,
   challenge_info: state.challenge_info.challenge_info,
   candidate_information: state.candidate_information.candidate_information,  
   candidate_skills: state.candidate_skills.candidate_skills,
   github_url: state.github_url.github_url,
   results: state.results.results,
   candidate_list: state.candidate_list.candidate_list,
   favorites: state.favorites.favorites,
   all_results: state.all_results.all_results,
   company_data: state.company_data.company_data,
   past_challenges: state.past_challenges.past_challenges,
   past_results: state.past_results.past_results
});

const mapDispatchToProps = {
  fetchInitialChallenge, currentCompanyCalendar, fetchCandidateInfo,
  fetchDefaultChallenges, fetchAllChallenges, saveChallenge, deleteChallenge,
  updateInfo, fetchCompanyInfo, addToCompanySchedule, fetchCompanySchedule, toggleInitialOn,
  toggleInitialOff, makeInitial, setCurrentLiveChallenge, deleteFromCompanySchedule,
  fetchCompanyResults, fetchCandidateList, getChallengeInfo, getUsername, updateChallengeDate, searchUsers,
  saveToFavorites, getFavorites, removeFromFavorites, fetchAllResults, getCompanyData, fetchPastSchedule,
  fetchPastResults
}

const ChallengeListComponent = connect(mapStateToProps, mapDispatchToProps)(ChallengeListView);
const AdminDashboardComponent = connect(mapStateToProps, mapDispatchToProps)(AdminDashboardView);
const AnalyticsComponent= connect(mapStateToProps, mapDispatchToProps)(AnalyticsView);
const LiveCodingComponent = connect(mapStateToProps, mapDispatchToProps)(LiveCodingView);
const AdminProfileComponent = connect(mapStateToProps, mapDispatchToProps)(AdminProfileView);
const UserResultsComponent = connect(mapStateToProps, mapDispatchToProps)(UserResults)
const HireComponent = connect(mapStateToProps, mapDispatchToProps)(HireView);

const connectAdminContainer = connect(mapStateToProps, mapDispatchToProps)(AdminContainer);

export default withRouter(connectAdminContainer);
