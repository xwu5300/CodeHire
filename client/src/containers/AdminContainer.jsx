import React, { Component } from 'react';

import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';

import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchDefaultChallenges, fetchAllChallenges, saveChallenge } from '../actions/adminActions'; 


import axios from 'axios';

class AdminContainer extends Component {

  componentDidMount() {
    this.props.fetchDefaultChallenges();
  }


  render() {
    return (
      <Switch>
        <Route exact path='/admin' render={ () => (
          <AdminDashboardView />
        )} />
        <Route exact path='/admin/profile' component={AdminProfileView}/>
        <Route exact path='/admin/challenges' component={ChallengeListView}/>
        <Route exact path='/admin/live' component={LiveCodingView}/>
        <Route exact path='/admin/data' component={AnalyticsView}/>
      </Switch>
    );
  }
}


const mapStateToProps = (state) => {
  console.log('STATE', state);
   default_challenges: state.default_challenges
   all_challenges: state.all_challenges
};


const connectComponent = connect(mapStateToProps, { fetchDefaultChallenges, fetchAllChallenges })(AdminContainer);
const routeComponent = withRouter(connectComponent);
export default routeComponent;

