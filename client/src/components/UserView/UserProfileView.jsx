import React, { Component } from 'react';
import { connect } from "react-redux";

class UserProfileView extends Component {
  constructor() {
    super();
    this.state = {
      information: '',
      skills: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCandidateInfo(this.props.username);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {

  }

  render() {
    return (
      <div>
      <h1>{ this.props.username } Profile</h1>

      <h2>About Me</h2>
      <div className='ui raised container segment'></div>
      <textarea value= { this.state.info } onChange={ (e) => this.handleChange(e) } className='user_profile_textarea'></textarea>
      <button onClick={ (this.handleSubmit() )} className='ui button'>Save</button>
      <h2>Skills:</h2>
      <div className='ui raised container segment'></div>
      <input value={ this.state.skills } onChange={ (e) => this.handleChange(e) } className='user_profile_input' />
      <button onClick={ () => this.handleSubmit() } className='ui button'>Save</button>
      </div>
    )
  }
}

export default UserProfileView;