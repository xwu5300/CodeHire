import React, { Component } from 'react';


class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formView: 'company',
      companyName: '',
      username: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      logoUrl: '',
      fullName: ''
    };

    this.switchForm = this.switchForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  switchForm(value) {
    this.setState({ formView: value})
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit(e, form) {
    e.preventDefault();
    if(form === 'companyForm') {
      this.props.saveCompany(this.state.formView, this.state.companyName, this.state.username, this.state.password, this.state.email, this.state.phone, this.state.logoUrl);
    } else if(form === 'candidateForm') {
      this.props.saveCandidate(this.state.fullName, this.state.username, this.state.password, this.state.email, this.state.phone);
    }
  }


  render() {
    return (
      <div>
        <select className='form_view_select' onChange={ (e) => this.switchForm(e.target.value) }>
          <option value='company'>Company</option>
          <option value='candidate'>Candidate</option>
        </select>

      {this.state.formView === 'company' ?
        <form name='companyForm' className='company_signup_form' onSubmit={ (e) => this.handleSubmit(e, e.target.name) }>
          <input onChange={ (e) => this.handleChange(e) } name='companyName' type='text' placeholder='Company Name' />
          <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' />
          <input onChange={ (e) => this.handleChange(e) } name='password' type='password' placeholder='Password' />
          <input onChange={ (e) => this.handleChange(e) } name='confirmPassword' type='password' placeholder='Confirm Password' />
          <input onChange={ (e) => this.handleChange(e) } name='email' type='email' placeholder='Email' />
          <input onChange={ (e) => this.handleChange(e) } name='phone' type='text' placeholder='Phone #' />
          <input onChange={ (e) => this.handleChange(e) } name='logoUrl' type='text' placeholder='Logo URL' />
          <textArea type='text'>Company Information</textArea>
          <button type='submit'>Register</button>
        </form>
        :
        <form name='candidateForm' className='user_signup_form' onSubmit={ (e) => this.handleSubmit(e, e.target.name) }>
          <input onChange={ (e) => this.handleChange(e) } name='fullName' type='text' placeholder='Full Name' />
          <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' />
          <input onChange={ (e) => this.handleChange(e) } name='password' type='password' placeholder='Password' />
          <input onChange={ (e) => this.handleChange(e) } name='confirmPassword' type='password' placeholder='Confirm Password' />
          <input onChange={ (e) => this.handleChange(e) } name='email' type='email' placeholder='Email' />
          <input onChange={ (e) => this.handleChange(e) } name='phone' type='text' placeholder='Phone #' />
          <button type='submit'>Register</button>
        </form>
      }
      </div>
    );
  }
}


export default Registration;