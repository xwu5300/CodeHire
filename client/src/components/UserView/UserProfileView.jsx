import React, { Component } from 'react';
import { connect } from "react-redux";

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
      this.setState({ all_skills: this.props.candidate_skills, github_url: this.props.github_url })
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
      
      this.props.updateCandidateSkills(localStorage.getItem('userId'), this.state.skill);
    }
  }

  deleteSkill(skill) {
    this.props.deleteCandidateSkill(this.props.username, skill, (response) => {
      this.setState({ all_skills: response.data })
    });
  
  }

  updateGithub() {
    this.props.updateCandidateGithub(localStorage.getItem('userId'), this.state.github_url);
  }


  render() {
    return (
      <div>
        <div className="ui orange three item inverted menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.name }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div>
        </div>

        <div className='main_profile_container'>
          <div className='ui padded grid'>
            <div className='ui raised container segment'>

            <div className='row'>
              <div className='github_link'>
                <i className="github icon"></i>
                <input name='github_url' value={ this.state.github_url } onChange={ (e) => this.handleChange(e) } type='text' placeholder='github' />
                <button onClick={ () => this.updateGithub() }>save</button>
              </div>
            </div>

            <div className='row user_skills_container'>
              <div className='ui padded raised container segment' style={{ height: '300px' }}>

                <div className='row' className='user_skills_input'>
                  <input name='skill' type='text' value={ this.state.skill } onChange={ (e) => this.handleChange(e) } />
                  <i onClick={ () => this.addSkill(this.state.skill) } className="pencil alternate icon"></i>
                </div>

                <div className='row'>
                  <div className='ui small horizontal list'>
                  {this.state.all_skills ? this.state.all_skills.map((skill, i) => {
                    return (
                      <div key={ i } className='item'>
                        <i onClick={ () => this.deleteSkill(skill) } className="times circle icon orange"></i>
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
      </div>
    )
  }
}

export default UserProfileView;
