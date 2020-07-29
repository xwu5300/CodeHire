import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';
import LandingPage from '../components/LandingPage.jsx';

import { saveCompany, saveCandidate, handleLogin, handleSignUp } from '../actions/authActions';

import {BrowserRouter as Router, Route, Link, Switch, History, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthContainer extends Component {

  render() {
    return (
      <Switch>
        <Route exact path='/' component={ LandingPageComponent }/>
        <Route exact path='/login' component={ LoginComponent }/>
        <Route exact path='/registration' component={ RegistrationComponent } />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  login_status: state.login_status.login_status,
  signup_status: state.signup_status.signup_status
})


const mapDispatchToProps = {
  saveCompany, saveCandidate, handleLogin, handleSignUp
}

const connectAuthContainer = connect(mapStateToProps, {})(AuthContainer);
const RegistrationComponent = connect(mapStateToProps, mapDispatchToProps)(Registration);
const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);
const LandingPageComponent = connect(mapStateToProps, mapDispatchToProps)(LandingPage);


export default withRouter(connectAuthContainer);
