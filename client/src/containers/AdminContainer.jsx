import React, { Component } from 'react';

import AdminDashboardView from '../components/AdminView/AdminDashboardView.jsx';
import AdminProfileView from '../components/AdminView/AdminProfileView.jsx';
import AnalyticsView from '../components/AdminView/AnalyticsView.jsx';
import ChallengeListView from '../components/AdminView/ChallengeListView.jsx';
import LiveCodingView from '../components/AdminView/LiveCodingView.jsx';

import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';

class AdminContainer extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/admin' component={AdminDashboardView}/>
        <Route exact path='/admin/profile' component={AdminProfileView}/>
        <Route exact path='/admin/challenges' component={ChallengeListView}/>
        <Route exact path='/admin/live' component={LiveCodingView}/>
        <Route exact path='/admin/data' component={AnalyticsView}/>
      </Switch>
    );
  }
}

export default AdminContainer;