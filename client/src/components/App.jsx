import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';

import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import CompanySignup from './CompanySignup.jsx';
import UserSignup from './UserSignup.jsx';
import AdminDashboardView from './AdminView/AdminDashboardView.jsx';
import AdminProfileView from './AdminView/AdminProfileView.jsx';
import AnalyticsView from './AdminView/AnalyticsView.jsx';
import ChallengeListView from './AdminView/ChallengeListView.jsx';
import LiveCodingView from './AdminView/LiveCodingView.jsx';
import CompanyListView from './UserView/CompanyListView.jsx';
import CompanyScheduleView from './UserView/CompanyScheduleView.jsx';
import UserInitialChallengeView from './UserView/UserInitialChallengeView.jsx';
import UserLiveCodingView from './UserView/UserLiveCodingView.jsx';
import UserProfileView from './UserView/UserProfileView.jsx';




class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Login}/>
          <Route exact path='/registration' component={CompanySignup}/>
          <Route exact path='/admin' component={AdminDashboardView}/>
          <Route exact path='/admin/profile' component={AdminProfileView}/>
          <Route exact path='/admin/challenges' component={ChallengeListView}/>
          <Route exact path='/admin/live' component={LiveCodingView}/>
          <Route exact path='/admin/data' component={AnalyticsView}/>
          <Route exact path='/user' component={CompanyListView}/>
          <Route exact path='/user/schedule' component={CompanyScheduleView}/>
          <Route exact path='/user/challenge' component={UserInitialChallengeView}/>
          <Route exact path='/user/live' component={UserLiveCodingView}/>
          <Route exact path='/user/profile' component={UserProfileView}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
