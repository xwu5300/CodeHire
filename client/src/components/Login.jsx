import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

//stateful
class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    this.props.history.push('/admin');
    this.props.handleLogin(this.state.username, this.state.password);
  }


  render() {
    return (
      <form className='login_form' onSubmit={ (e) => this.handleSubmit(e) }>
        <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' />
        <input onChange={ (e) => this.handleChange(e) }name='password' type='password' placeholder='Password' />
        <button type='submit'>Login</button>
        <button type='button' onClick={() => {this.props.history.push('/registration')}}>Register</button>
      </form>
    );
  }
}


export default withRouter(Login);