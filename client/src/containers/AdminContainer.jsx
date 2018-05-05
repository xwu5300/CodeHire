import React, { Component } from 'react';

import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';

import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import { fetchChallenges } from '../actions/adminActions.jsx'; 
import { getDefaultChallenges } from '../constants/actionTypes.jsx';

import axios from 'axios';

class AdminContainer extends Component {

  constructor(props) {
    super(props);
    //this.fetchChallenges = this.fetchChallenges.bind(this);
  }

  componentDidMount() {
    this.props.fetchChallenges();
  }

  // fetchChallenges(props) {
  //   this.props.fetchChallenges();
  // }

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
   challenges: state.challenges
};

export default connect(mapStateToProps, { fetchChallenges })(AdminContainer);

//export default AdminContainer;