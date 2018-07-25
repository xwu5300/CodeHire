import React, { Component } from 'react';
import { Router, Route, Link, Switch, History} from 'react-router-dom';
import history from './history.jsx';
import AuthContainer from '../containers/AuthContainer.jsx';
import AdminContainer from '../containers/AdminContainer.jsx';
import UserContainer from '../containers/UserContainer.jsx';

import { AdminProfileComponent, AnalyticsComponent, AdminDashboardComponent, LiveCodingComponent, ChallengeListComponent} from '../containers/AdminContainer.jsx';


class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div>
          <AuthContainer />
          <AdminContainer />
          <UserContainer />
        </div>
      </Router>
    );
  }
}

export default App;
