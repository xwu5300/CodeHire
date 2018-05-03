import React, { Component } from 'react';

import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import CompanySignup from './CompanySignup.jsx';
import UserSignup from './UserSignup.jsx';

import AdminDashboardView from './AdminView/AdminDashboardView.jsx';
import ChallengeListView from './AdminView/ChallengeListView.jsx';


class App extends Component {
  render() {
    return (
      <div>
       <Navbar />
       <Login />
       <CompanySignup />
       <UserSignup />
       <AdminDashboardView />  
       <ChallengeListView />
      </div>
    );
  }
}

export default App;