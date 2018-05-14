import React, { Component } from 'react';

import { History } from 'react-router-dom';


class Registration extends Component {

  constructor(props) {
    super(props);

    this.state = {
      formView: 'company',
      companyName: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      logoUrl: '',
      fullName: '',
      companyInfo: '',
      github_url: ''
    };

    this.switchForm = this.switchForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetInput = this.resetInput.bind(this);
  }

  componentDidMount() {
    this.props.handleSignUp('amy12345@uber.com', 'kjsdfhlsdf', 'companyForm', 'amy', '2948', 'url', null, 'info');
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
      this.props.handleSignUp(this.state.email, this.state.password, form, this.state.name, this.state.phone, this.state.logoUrl, null, this.state.companyInfo, this.resetInput);
    } else if(form === 'candidateForm') {
      this.props.handleSignUp(this.state.email, this.state.password, form, this.state.name, this.state.phone, null, this.state.github_url, null, this.resetInput);
    }
  }

  resetInput() {
    this.setState({
      companyName: '',
      password: '',
      confirmPassword: '',
      email: '',
      phone: '',
      logoUrl: '',
      fullName: '',
      companyInfo: '',
      github_url: ''
    })
  }

  // confirmPassword() {

  // }


  render() {
    return (
      <div className='ui centered padded grid'>
        <div className='ui two buttons top' style={{ marginTop: '20px' }} >
          <button value='company' onClick={ (e) => this.switchForm(e.target.value) } className="ui active button">Company</button>
          <button value='candidate' onClick={ (e) => this.switchForm(e.target.value) } className="ui button">Candidate</button>
        </div>

      {this.state.formView === 'company' ?
      
          <form name='companyForm' className='ui form seven wide column' onSubmit={ (e) => this.handleSubmit(e, e.target.name) } style={{ marginTop: '75px' }} >
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.companyName } name='companyName' type='text' placeholder='Company Name' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.password } name='password' type='password' id='password' placeholder='Password' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.confirmPassword } name='confirmPassword' type='password' placeholder='Confirm Password' required />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.email } name='email' type='email' placeholder='Email' id='email' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.phone } name='phone' type='text' placeholder='Phone #' />
            </div>
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.logoUrl } name='logoUrl' type='text' placeholder='Logo URL' />
            </div>
            <textarea type='text' name='companyInfo' onChange={ (e) => this.handleChange(e) } value={ this.state.companyInfo }></textarea>
            <button className='ui yellow button' type='submit'>Register</button>
            <button className='ui green button' onClick={ () => this.props.history.push('/') }>To Login</button>
            <span>{ this.props.signup_status }</span>
          </form>
         
        
        :
         
          <form name='candidateForm' className='ui form seven wide column' onSubmit={ (e) => this.handleSubmit(e, e.target.name) } style={{ marginTop: '75px' }} >
            <div className='field'>
              <input onChange={ (e) => this.handleChange(e) } value={ this.state.fullName } name='fullName' type='text' placeholder='Full Name' required />
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
            <button className='ui yellow button' type='submit'>Register</button>
            <button className='ui green button' onClick={ () => this.props.history.push('/') } >To Login</button>
            <span>{ this.props.signup_status }</span>
          </form>
      }
    
      </div>
    );
  }
}


export default Registration;