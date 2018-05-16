import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';

import { saveCompany, saveCandidate, handleLogin, handleSignUp, googleLogin } from '../actions/authActions';

import {BrowserRouter as Router, Route, Link, Switch, History, withRouter } from 'react-router-dom';
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

const mapStateToProps = (state) => ({
  login_status: state.login_status.login_status,
  signup_status: state.signup_status.signup_status
})


const mapDispatchToProps = {
  saveCompany, saveCandidate, handleLogin, googleLogin, handleSignUp
}

const connectAuthContainer = connect(mapStateToProps, {})(AuthContainer);
const RegistrationComponent = connect(mapStateToProps, mapDispatchToProps)(Registration);
const LoginComponent = connect(mapStateToProps, mapDispatchToProps)(Login);


export default withRouter(connectAuthContainer);
