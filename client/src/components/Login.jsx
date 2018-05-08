import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
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

  handleSubmit(e) {
    e.preventDefault();
    
    if(this.props.login_status === 'company') {
      this.props.history.push('/admin');
    } else if(this.props.login_status === 'candidate') {
      this.props.history.push('/user');
    } else {
      this.setState({ showStatus: !this.state.showStatus });
    }
    this.props.handleLogin(this.state.username, this.state.password);
  }


  render() {
    return ( 
      <div>
      {this.state.showStatus ?
      <div className='login_status'>{ this.props.login_status }</div>
      : null }

      <div className='login_container'>
        <div className='ui centered raised padded container segment' style={{ width: '60%', height: '300px', paddingTop: '70px' }}>
          <div className='ui centered grid'>
            <form className='ui form ten wide column' onSubmit={ (e) => this.handleSubmit(e) }>
              <div className='field'>
                <input onChange={ (e) => this.handleChange(e) } name='username' type='text' placeholder='Username' required />
              </div>
              <div className='field'>
                <input onChange={ (e) => this.handleChange(e) }name='password' type='password' placeholder='Password' required />
              </div>
         
              <button className='ui green button login_btn' type='submit'>Login</button>
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