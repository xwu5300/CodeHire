import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';

import { saveCompany, saveCandidate, handleLogin } from '../actions/authActions';

import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import { connect } from 'react-redux';

class AuthContainer extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ LoginComponent }/>
        <Route exact path='/registration' component={ RegistrationComponent } />
      </Switch>
    )
  }
}

const RegistrationComponent = connect(null, { saveCompany, saveCandidate })(Registration);
const LoginComponent = connect(null, { handleLogin })(Login);

export default AuthContainer;
