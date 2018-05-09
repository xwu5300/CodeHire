import React, { Component } from 'react';
import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';

import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

<<<<<<< HEAD
import { fetchDefaultChallenges, fetchAllChallenges, saveChallenge, deleteChallenge, updateInfo, fetchCompanyInfo, addToCompanySchedule, fetchCompanySchedule, toggleInitialOn, toggleInitialOff, makeInitial, setCurrentLiveChallenge } from '../actions/adminActions'; 
import { fetchInitialChallenge, currentCompanyCalendar } from '../actions/userActions';
=======
import { fetchDefaultChallenges, fetchAllChallenges, saveChallenge, deleteChallenge, updateInfo, fetchCompanyInfo, addToCompanySchedule, fetchCompanySchedule, toggleInitialOn, toggleInitialOff, makeInitial, deleteFromCompanySchedule } from '../actions/adminActions'; 
import { fetchInitialChallenge } from '../actions/userActions';
//import { fetchCompanyInfo } from '../actions/authActions';
>>>>>>> feature2


class AdminContainer extends Component {

  componentDidMount() {
    this.props.fetchAllChallenges();
    this.props.fetchDefaultChallenges();
    this.props.fetchInitialChallenge(2);
  }


  render() {
    return (
      <Switch>
        <Route exact path='/admin' component={ AdminDashboardComponent } />
        <Route exact path='/admin/profile' component={ AdminProfileComponent }/>
        <Route exact path='/admin/challenges' component={ ChallengeListComponent } />
        <Route exact path='/admin/live' component={ LiveCodingComponent }/>
        <Route exact path='/admin/data' component={ AnalyticsComponent }/>
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
   default_challenges: state.default_challenges.default_challenges,
   all_challenges: state.all_challenges.all_challenges,
   username: state.username.username,
   logo_url: state.logo_url.logo_url,
   company_information: state.company_information.company_information,
   company_schedule: state.company_schedule.company_schedule,
   is_initial: state.is_initial.is_initial,
   initial_challenge: state.initial_challenge.initial_challenge,
   current_live_challenge_title: state.current_live_challenge_title.current_live_challenge_title,
   current_live_challenge_duration: state.current_live_challenge_duration.current_live_challenge_duration,
   current_company_calendar: state.current_company_calendar.current_company_calendar,
   user_id: state.user_id.user_id

});



const ChallengeListComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge, addToCompanySchedule, makeInitial })(ChallengeListView);
const AdminDashboardComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge, toggleInitialOn, toggleInitialOff, makeInitial, setCurrentLiveChallenge, currentCompanyCalendar, fetchCompanySchedule, deleteFromCompanySchedule })(AdminDashboardView);
const AnalyticsComponent= connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge })(AnalyticsView);
const LiveCodingComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge })(LiveCodingView);
const AdminProfileComponent = connect(mapStateToProps, { updateInfo, fetchCompanyInfo })(AdminProfileView);

const connectAdminContainer = connect(mapStateToProps, {fetchAllChallenges, fetchDefaultChallenges, fetchCompanyInfo, fetchCompanySchedule, fetchInitialChallenge })(AdminContainer);
export default withRouter(connectAdminContainer);

