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
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  render() {
    return (
      <form className='login_form'>
        <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' />
        <input onChange={ (e) => this.handleChange(e) } name='password' type='password' placeholder='Password' />
        <button type='submit' onClick={() => {this.props.history.push('/admin')}}>Login</button>
        <button type='button' onClick={() => {this.props.history.push('/registration')}}>Register</button>
      </form>
    );
  }
}


export default withRouter(Login);