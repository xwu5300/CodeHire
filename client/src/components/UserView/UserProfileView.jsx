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
    this.props.saveCandidateInfo(this.props.username, this.state.information, this.state.skills);
  }

  render() {
    return (
      <div>
      <h1>{ this.props.username } Profile</h1>

      <h2>About Me</h2>
      <div className='ui raised container segment'>{this.props.candidate_information}</div>
      <textarea value= { this.state.info } onChange={ (e) => this.handleChange(e) } name='information' className='user_profile_textarea'></textarea>
      <h2>Skills:</h2>
      <div className='ui raised container segment'>{this.props.candidate_skills}</div>
      <input value={ this.state.skills } onChange={ (e) => this.handleChange(e) } name='skills' className='user_profile_input' />
      <button onClick={ () => this.handleSubmit() } className='ui button'>Save</button>
      </div>
    )
  }
}

export default UserProfileView;