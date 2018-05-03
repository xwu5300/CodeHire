import React, { Component } from 'react';


class CompanySignup extends Component {

  constructor(props) {
    super(props);

    this.state = {};
  }


  render() {
    return (
      <form className='company_signup_form'>
        <input type='text' placeholder='Company Name' />
        <input type='text' placeholder='Username' />
        <input type='password' placeholder='Password' />
        <input type='password' placeholder='Confirm Password' />
        <input type='email' placeholder='Email' />
        <input type='text' placeholder='Phone #' />
        <input type='text' placeholder='Logo URL' />
        <textArea type='text'> Company Information </textArea>
        <button type='submit'>Register</button>
      </form>
    );
  }
}


export default CompanySignup;