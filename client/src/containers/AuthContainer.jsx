import React, { Component } from 'react';

import Login from '../components/Login.jsx';
import Registration from '../components/Registration.jsx';

import {BrowserRouter as Router, Route, Link, Switch, History} from 'react-router-dom';
import { connect } from 'react-redux';

class AuthContainer extends Component {
  
  render() {
    return (
      <Switch>
        <Route exact path='/' component={ Login }/>
        <Route exact path='/registration' component={ Registration }/>
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
