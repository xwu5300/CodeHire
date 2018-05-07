import React, { Component } from 'react';
import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';

import { Switch, Route, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';

import { fetchDefaultChallenges, fetchAllChallenges, saveChallenge, deleteChallenge, updateInfo } from '../actions/adminActions'; 
import { fetchCompanyInfo } from '../actions/authActions';


class AdminContainer extends Component {

  componentDidMount() {
    this.props.fetchAllChallenges();
    this.props.fetchDefaultChallenges();
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
   information: state.information.information
});



const ChallengeListComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge })(ChallengeListView);
const AdminDashboardComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge })(AdminDashboardView);
const AnalyticsComponent= connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge })(AnalyticsView);
const LiveCodingComponent = connect(mapStateToProps, { fetchAllChallenges, fetchDefaultChallenges, saveChallenge, deleteChallenge })(LiveCodingView);
const AdminProfileComponent = connect(mapStateToProps, { updateInfo, fetchCompanyInfo })(AdminProfileView);

const connectAdminContainer = connect(mapStateToProps, {fetchAllChallenges, fetchDefaultChallenges, fetchCompanyInfo })(AdminContainer);
export default withRouter(connectAdminContainer);

