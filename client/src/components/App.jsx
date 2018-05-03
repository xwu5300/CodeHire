import React, { Component } from 'react';
import Login from './Login.jsx';
import CompanySignup from './CompanySignup.jsx';
import UserSignup from './UserSignup.jsx';

class App extends Component {

  render() {
    return (
      <div>
       <Login />
       <CompanySignup />
       <UserSignup />
      </div>
    );
  }
}

export default App;