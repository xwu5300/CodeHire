import React from 'react';
import {BrowserRouter as Router, Route, Redirect, Switch, History} from 'react-router-dom';
import store from '../store.js';
import { auth } from '../../../firebase/index.js';

const isLoggedIn = {
  status: function () {
    if (localStorage.getItem('userId')) {
      return true;
    } else {
      return false;
    }
  }
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => 
      isLoggedIn.status() ? (
      <Component {...props}/> ) :
      ( <Redirect to='/' />
      )
    }
  />
)

export default PrivateRoute;
