import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { auth } from '../../../firebase/index.js';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      showStatus: false
    };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    this.props.handleLogin(this.state.email, this.state.password);
  }

  handleKeyPress(event) {
    if (event.charCode === 13) {
      this.props.handleLogin(this.state.email, this.state.password);
    }
  }

  render() {
    return ( 
      <div>
      <div className='login_container'>
        <div className='ui centered raised padded container segment' style={{ width: '60%', height: '300px', paddingTop: '70px' }}>
          <div className='ui centered grid'>
            <form className='ui form ten wide column'>
              <div className='field'>
                <input onChange={ (e) => this.handleChange(e) } name='email' type='email' placeholder='Email' required />
              </div>
              <div className='field'>
                <input onChange={ (e) => this.handleChange(e) } name='password' type='password' placeholder='Password' onKeyPress={(e) => {this.handleKeyPress(e)}} required />
              </div>
              <button className='ui orange button login_btn' type='button' onClick={this.handleSubmit}>Login</button>
              <button className='ui orange inverted button login_btn' type='button' onClick={() => {this.props.history.push('/registration')}}>Register</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}


export default withRouter(Login);