import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';

import { saveCompany, saveCandidate } from '../actions/authActions';

import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import { connect } from 'react-redux';

class AuthContainer extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ Login }/>
        <Route exact path='/registration' render={ () => <Registration saveCompany={ this.props.saveCompany } saveCandidate={ this.props.saveCandidate } /> } />
      </Switch>
    )
  }
}



export default connect(null, { saveCompany, saveCandidate })(AuthContainer);
