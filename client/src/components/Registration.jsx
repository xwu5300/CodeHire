import React, { Component } from 'react';


class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formView: 'company'
    };

    this.switchForm = this.switchForm.bind(this);
  }

  switchForm(value) {
    this.setState({ formView: value})
  }


  render() {
    return (
      <div>
        <select className='form_view_select' onChange={ (e) => this.switchForm(e.target.value) }>
          <option value='company'>Company</option>
          <option value='candidate'>Candidate</option>
        </select>

      {this.state.formView === 'company' ?
        <form className='company_signup_form'>
          <input type='text' placeholder='Company Name' />
          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />
          <input type='password' placeholder='Confirm Password' />
          <input type='email' placeholder='Email' />
          <input type='text' placeholder='Phone #' />
          <input type='text' placeholder='Logo URL' />
          <textArea type='text'>Company Information</textArea>
          <button type='submit'>Register</button>
        </form>
        :
        <form className='user_signup_form'>
          <input type='text' placeholder='Full Name' />
          <input type='text' placeholder='Username' />
          <input type='password' placeholder='Password' />
          <input type='password' placeholder='Confirm Password' />
          <input type='email' placeholder='Email' />
          <input type='text' placeholder='Phone #' />
          <button type='submit'>Register</button>
        </form>
      }
      </div>
    );
  }
}


export default Registration;