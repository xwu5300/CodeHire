import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';

import { saveCompany, saveCandidate, handleLogin } from '../actions/authActions';

import {BrowserRouter as Router, Route, Link, Switch, History, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

class AuthContainer extends Component {
  render() {
    console.log('USERROLE', this.props.user_role);
    return (
      <Switch>
        <Route exact path='/' component={ LoginComponent }/>
        <Route exact path='/registration' component={ RegistrationComponent } />
      </Switch>
    )
  }
}

const mapStateToProps = (state) => ({
  user_role: state.user_role
})

const connectComponent = connect(mapStateToProps, {})(AuthContainer);
const RegistrationComponent = connect(null, { saveCompany, saveCandidate })(Registration);
const LoginComponent = connect(mapStateToProps, { handleLogin })(Login);
//const routeComponent = withRouter(connectComponent);

export default connectComponent;
