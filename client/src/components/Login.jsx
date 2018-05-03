import React, { Component } from 'react';


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
        <button type='submit'>Login</button>
        <button type='button'>Register</button>
      </form>
    );
  }
}


export default Login;