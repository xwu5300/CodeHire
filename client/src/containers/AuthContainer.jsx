import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import CompanySignup from '../components/CompanySignup.jsx';

import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import { connect } from 'react-redux';

class AuthContainer extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/registration' component={CompanySignup}/>
      </Switch>
    )
  }
}


// const mapDispatchToProps = (dispatch) => {
//    return {
      
//    }
// };

// const mapStateToProps = (state) => {
//    return {
       
//    };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(AuthContainer);
export default AuthContainer;
