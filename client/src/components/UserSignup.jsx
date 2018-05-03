import React, { Component } from 'react';

class UserSignup extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <form className='user_signup_form'>
        <input type='text' placeholder='Full Name' />
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <input type='password' placeholder='Confirm Password' />
        <input type='email' placeholder='Email' />
        <input type='text' placeholder='Phone #' />
        <button type='submit'>Register</button>
      </form>
    );
  }
}


export default UserSignup;