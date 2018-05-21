import React, { Component } from 'react';
import { connect } from "react-redux";
import Dropbox from '../Dropbox.jsx';

import PastChallengeListView from './PastChallengeListView.jsx';

class UserProfileView extends Component {
  constructor() {
    super();
    this.state = {
      information: '',
      skill: '',
      all_skills: [],
      github_url: ''
    }

    this.handleChange = this.handleChange.bind(this);

    this.addSkill = this.addSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.updateGithub = this.updateGithub.bind(this);
  }

  componentDidMount() {
    this.props.fetchCandidateInfo(localStorage.getItem('userId'), () => {
      if(!this.props.candidate_skills) {
        this.setState({ all_skills: [], github_url: ''})
      } else {
        this.setState({ all_skills: this.props.candidate_skills, github_url: this.props.github_url })
      }
    });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  addSkill(new_skill) {
    if(new_skill !== '' && !this.state.all_skills.includes(new_skill)) {
      if(this.state.all_skills) {
        this.setState({ all_skills: [...this.state.all_skills, new_skill] })
      } else {
        this.setState({ all_skills: [new_skill] })
      }
      
      this.props.updateCandidateSkills(localStorage.getItem('userId'), this.state.skill, () => {
        this.setState({ skill: '' })
      });
      
    }
  }

  deleteSkill(skill) {
    this.props.deleteCandidateSkill(localStorage.getItem('userId'), skill, (response) => {
      this.setState({ all_skills: response.data })
    });
  
  }

  updateGithub() {
    this.props.updateCandidateGithub(localStorage.getItem('userId'), this.state.github_url);
  }


  render() {
    return (
      <div>
        <div className="ui orange four item menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>
        <div className='main_profile_container'>
          <div className='ui padded grid'>
            <div className='ui raised container segment'>

            <div className='row'>
              <div className='ui padded raised container segment'>
                <div className='github_link'>
                  <i style={{ fontSize: '22px' }} className="github icon"></i>
                  <input name='github_url' value={ this.state.github_url } onChange={ (e) => this.handleChange(e) } type='text' placeholder='github' />
                  <button style={{ height: '35px', width:'15%', marginLeft:'5px' }} className='ui orange basic button' onClick={ () => this.updateGithub() }>save</button>
                </div>
                <Dropbox />
              </div>
            </div>

            <div className='row user_skills_container'>
              <div className='ui padded raised container segment' style={{ height: '300px' }}>

                <div className='row' className='user_skills_input'>
                  <input name='skill' type='text' value={ this.state.skill } onChange={ (e) => this.handleChange(e) } />
                  <i onClick={ () => this.addSkill(this.state.skill) } className="pencil alternate icon"></i>
                </div>

                <div className='row'>
                  <h2>Skills</h2>
                  <div className='ui small horizontal list'>
                  {this.state.all_skills ? this.state.all_skills.map((skill, i) => {
                    return (
                      <div key={ i } className='item'>
                        <i onClick={ () => this.deleteSkill(skill) } className="remove icon orange"></i>
                        <div className='content skill_div'> { skill } </div>
                      </div>
                    )
                  }) : null }
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button onClick={() => {this.props.history.push('/user/pastchallenge')}} >Past Challenges
          </button>
        </div>

      </div>
    )
  }
}

export default UserProfileView;
