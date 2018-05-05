import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

//stateful
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return (
      <form className='login_form'>
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <button type='submit' onClick={() => {this.props.history.push('/user')}}>Login</button>
        <button type='button' onClick={() => {this.props.history.push('/registration')}}>Register</button>
      </form>
    );
  }
}


export default withRouter(Login);