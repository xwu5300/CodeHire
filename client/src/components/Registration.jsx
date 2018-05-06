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
      <div className='ui centered grid'>
        <div className='ui two buttons'>
          <button value='company' onClick={ (e) => this.switchForm(e.target.value) } className="ui active button">Company</button>
          <button value='candidate' onClick={ (e) => this.switchForm(e.target.value) } className="ui button">Candidate</button>
        </div>

      {this.state.formView === 'company' ?
          <form name='companyForm' className='ui form seven wide column' onSubmit={ (e) => this.handleSubmit(e, e.target.name) }>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='companyName' type='text' placeholder='Company Name' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='password' type='password' placeholder='Password' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='confirmPassword' type='password' placeholder='Confirm Password' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='email' type='email' placeholder='Email' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='phone' type='text' placeholder='Phone #' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='logoUrl' type='text' placeholder='Logo URL' />
            </div>
            <textArea type='text'>Company Information</textArea>
            <button className='ui button' type='submit'>Register</button>
          </form>
        
        :
          <form name='candidateForm' className='ui form seven wide column' onSubmit={ (e) => this.handleSubmit(e, e.target.name) }>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='fullName' type='text' placeholder='Full Name' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='password' type='password' placeholder='Password' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='confirmPassword' type='password' placeholder='Confirm Password' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='email' type='email' placeholder='Email' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } name='phone' type='text' placeholder='Phone #' />
            </div>
            <button className='ui button' type='submit'>Register</button>
          </form>
      }
      </div>
    );
  }
}


export default Registration;