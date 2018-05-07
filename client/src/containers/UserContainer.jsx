import React, { Component } from 'react';

import UserInitialChallengeView from '../components/UserView/UserInitialChallengeView.jsx';
import UserLiveCodingView from '../components/UserView/UserLiveCodingView.jsx';
import UserProfileView from '../components/UserView/UserProfileView.jsx';
import CompanyListView from '../components/UserView/CompanyListView.jsx';
import CompanyScheduleView from '../components/UserView/CompanyScheduleView.jsx';

import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchAllCompanyCalendars, fetchInitialChallenge, fetchCandidateInfo, saveCandidateInfo } from '../actions/userActions';

import axios from 'axios';



class UserContainer extends Component {

  componentDidMount() {
    console.log(this.props);
    this.props.fetchAllCompanyCalendars();
  }

  render() {
    return (
      <Switch>
        <Route exact path='/user' component={CompanyListViewComponent}/>
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
    username: state.username.username,
    candidate_information: state.candidate_information.candidate_information,
    candidate_skills: state.candidate_skills.candidate_skills
}};

const connectComponent = connect(mapStateToProps, { fetchAllCompanyCalendars, fetchInitialChallenge })(UserContainer);
const CompanyListViewComponent = connect(mapStateToProps, { fetchAllCompanyCalendars, fetchInitialChallenge })(CompanyListView);
const CompanyScheduleViewComponent = connect(mapStateToProps, { fetchAllCompanyCalendars, fetchInitialChallenge })(CompanyScheduleView);
const UserInitialChallengeViewComponent = connect(mapStateToProps, { fetchAllCompanyCalendars, fetchInitialChallenge })(UserInitialChallengeView);
const UserLiveCodingViewComponent = connect(mapStateToProps, {})(UserLiveCodingView);
const UserProfileViewComponent = connect(mapStateToProps, { fetchCandidateInfo, saveCandidateInfo })(UserProfileView);

const routeUserComponent = withRouter(connectComponent);
export default routeUserComponent;

