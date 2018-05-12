import React, { Component } from 'react';
import { connect } from "react-redux";

class UserProfileView extends Component {
  constructor() {
    super();
    this.state = {
      information: '',
      skills: '',
      github_url: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.fetchCandidateInfo(this.props.user_id, () => {
      this.setState({ information: this.props.candidate_information, skills: this.props.candidate_skills, github_url: this.props.github_url })
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit() {
    this.props.saveCandidateInfo(this.props.username, this.state.information, this.state.skills, this.state.github_url);
  }

  render() {
    return (
      <div>

        <div className="ui orange three item inverted menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div> 
        </div>

      <div className='github_link'><i className="github icon"></i><input name='github_url' value={ this.state.github_url } onChange={ (e) => this.handleChange(e) } type='text' placeholder='github' /></div>
      

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