import React, { Component } from 'react';

import Navbar from './Navbar.jsx';
import Login from './Login.jsx';
import CompanySignup from './CompanySignup.jsx';
import UserSignup from './UserSignup.jsx';


class App extends Component {

  render() {
    return (
      <div>
       <Navbar />
       <Login />
       <CompanySignup />
       <UserSignup />
       
      </div>
    );
  }
}

export default App;