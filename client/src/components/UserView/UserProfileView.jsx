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
    this.props.fetchCandidateInfo(this.props.username, () => {
      this.setState({ information: this.props.candidate_information, skills: this.props.candidate_skills })
    });
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
      <h2 className='profile_header'>Skills</h2>
      <div className='ui raised container segment user_skills_div'>{ this.state.skills }</div>
     
      <textarea value= { this.state.skills } onChange={ (e) => this.handleChange(e) } name='skills' className='user_profile_textarea'></textarea>

      <h2 className='profile_header'>About Me</h2>
      <div className='ui raised container segment user_info_div'>{ this.state.information }</div>
      <textarea value= { this.state.information } onChange={ (e) => this.handleChange(e) } name='information' className='user_profile_textarea'></textarea>
      <button onClick={ () => this.handleSubmit() } className='ui button'>Save</button>
      </div>
    )
  }
}

export default UserProfileView;