import React, { Component } from 'react';

import { History } from 'react-router-dom';


class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formView: 'company',
      companyName: '',
      password: '',
      username: '',
      confirmPassword: '',
      email: '',
      phone: '',
      candidateName: '',
      github_url: ''
    };

    this.switchForm = this.switchForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetInput = this.resetInput.bind(this);
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
      this.props.handleSignUp(this.state.email, this.state.username, this.state.password, this.state.confirmPassword, form, this.state.companyName, this.state.phone, this.state.logoUrl, null, this.state.companyInfo);
    } else if(form === 'candidateForm') {
      this.props.handleSignUp(this.state.email, this.state.username, this.state.password, this.state.confirmPassword, form, this.state.candidateName, this.state.phone, null, this.state.github_url, null);
    }
  }

  resetInput() {
    this.setState({
      companyName: '',
      password: '',
      username: '',
      confirmPassword: '',
      email: '',
      phone: '',
      candidateName: '',
      github_url: ''
    })
  }

  render() {
    return (
      <div className='ui centered padded grid'>
        <div className='ui two orange inverted buttons top' >
          <button value='company' className='ui orange button' onClick={ (e) => this.switchForm(e.target.value) } className="ui button">Company</button>
          <button value='candidate' className='ui black button' onClick={ (e) => this.switchForm(e.target.value) } className="ui button">Candidate</button>
        </div>

      {this.state.formView === 'company' ?
      
          <form name='companyForm' className='ui form seven wide column' onSubmit={ (e) => this.handleSubmit(e, e.target.name) } style={{ marginTop: '75px' }} >
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.companyName } name='companyName' type='text' placeholder='Company Name' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.username } name='username' placeholder='Username' required/>
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.password } name='password' type='password' placeholder='Password' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.confirmPassword } name='confirmPassword' type='password' placeholder='Confirm Password' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.email } name='email' type='email' placeholder='Email' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.phone } name='phone' type='text' placeholder='Phone #' />
            </div>

            <div className='register_btn_container'>
              <button className='ui orange button register_btn' type='submit'>Register</button>
              <button className='ui orange inverted button register_btn' onClick={ () => this.props.history.push('/login') }>To Login</button>
            </div>
              
          </form>      
        
        :
         
          <form name='candidateForm' className='ui form seven wide column' onSubmit={ (e) => this.handleSubmit(e, e.target.name) } style={{ marginTop: '75px' }} >
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.candidateName } name='candidateName' type='text' placeholder='Full Name' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.username } name='username' placeholder='Username' required/>
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.password } name='password' type='password' placeholder='Password' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.confirmPassword } name='confirmPassword' type='password' placeholder='Confirm Password' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.email } name='email' type='email' placeholder='Email' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.phone } name='phone' type='text' placeholder='Phone #' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.github_url } name='github_url' type='text' placeholder='github url' />
            </div>

            <div className='register_btn_container'>
              <button className='ui orange button register_btn' type='submit'>Register</button>
              <button className='ui orange inverted button register_btn' onClick={ () => this.props.history.push('/login') } >To Login</button>
            </div>
            
          </form>
      }
    
      </div>
    );
  }
}


export default Registration;