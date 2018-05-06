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
    
    if(this.props.user_role.user_role === 'company') {
      this.props.history.push('/admin');
    } else if(this.props.user_role.user_role === 'candidate') {
      this.props.history.push('/user');
    }
    this.props.handleLogin(this.state.username, this.state.password);
  }


  render() {
    return (
      <div className='ui centered grid'>
        <form className='ui form six wide column' onSubmit={ (e) => this.handleSubmit(e) }>
          <div className='field'>
            <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' />
          </div>
          <div className='field'>
            <input onChange={ (e) => this.handleChange(e) }name='password' type='password' placeholder='Password' />
          </div>
         
          <button className='ui button' type='submit'>Login</button>
          <button className='ui button three column row' type='button' onClick={() => {this.props.history.push('/registration')}}>Register</button>
         
        </form>
      </div>

    );
  }
}


export default withRouter(Login);