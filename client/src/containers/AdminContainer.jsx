import React, { Component } from 'react';

import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchDefaultChallenges, fetchAllChallenges, saveChallenge } from '../actions/adminActions'; 


import axios from 'axios';

class AdminContainer extends Component {

  componentDidMount() {
    this.props.fetchDefaultChallenges();
  }


  render() {
    console.log('CHALLENGES', this.props);
    return (
      <Switch>
        <Route exact path='/admin' render={ () => (
          <AdminDashboardView fetchDefaultChallenges={ this.props.fetchDefaultChallenges } />
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

export default connect(mapStateToProps, { fetchDefaultChallenges, fetchAllChallenges })(AdminContainer);

//export default AdminContainer;