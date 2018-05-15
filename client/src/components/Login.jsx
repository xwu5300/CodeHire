import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


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
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit() {
    this.props.handleLogin(this.state.email, this.state.password);
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
                <input onChange={ (e) => this.handleChange(e) } name='password' type='password' placeholder='Password' required />
              </div>
              <button className='ui green button login_btn' type='button' onClick={this.handleSubmit}>Login</button>
              <button className='ui yellow button login_btn' type='button' onClick={() => {this.props.history.push('/registration')}}>Register</button>
            </form>
          </div>
        </div>
      </div>
      </div>
    )
  }
}


export default withRouter(Login);