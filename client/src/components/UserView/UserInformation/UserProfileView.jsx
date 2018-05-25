import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import Dropbox from '../Dropbox.jsx';

import PastChallengeListView from './PastChallengeListView.jsx';
import UserNavBar from '../UserNavBar.jsx';

class UserProfileView extends Component {
  constructor() {
    super();
    this.state = {
      information: '',
      skill: '',
      all_skills: [],
      github_url: '',
      showHistory: false
    }

    this.handleChange = this.handleChange.bind(this);
    this.addSkill = this.addSkill.bind(this);
    this.deleteSkill = this.deleteSkill.bind(this);
    this.updateGithub = this.updateGithub.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.props.fetchCandidateInfo(localStorage.getItem('userId'), null, () => {
      if(!this.props.candidate_skills) {
        this.setState({ all_skills: [], github_url: ''})
      } else {
        this.setState({ all_skills: this.props.candidate_skills, github_url: this.props.github_url })
      }
    });
    this.props.getResume(localStorage.getItem('userId'));
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

  handleKeyPress(event, cb) {
    if (event.charCode === 13) {
      cb();
    }
  }

  render() {
    return (
      <div>
        <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } handleLogout={ this.props.handleLogout } />
        <div className='main_profile_container'>
        {!this.state.showHistory ?
          <div className="ui top attached tabular menu">
            <div className="active item cursor" onClick={() => this.setState({ showHistory: true })}>Past Challenges</div>
          </div>
        :
          <div className="ui top attached tabular menu">
            <div className="active item cursor" onClick={() => this.setState({ showHistory: false })}>Edit Profile</div>
          </div>
        }
        
            <div className='ui container segment' style={{ marginTop: '-3px' }}>
              {this.state.showHistory ? 
                <PastChallengeListView candidate_results={ this.props.candidate_results } fetchCandidateResults={ this.props.fetchCandidateResults } />
                :
                 <Fragment>

                 <div className='ui container'>
                   <div className="profile_pic_container">
                     {!this.props.photo ? 
                       <img src="profilePic.jpg" alt="Empty profile photo" style={{ width: '200px', height: '200px' }} /> :
                       <img src={this.props.photo} className="responsive" style={{ width: '200px', height: '200px' }}/> }
                       <Dropbox savePhoto={this.props.updateCandidatePhoto} photo={true}/>
                    </div>

                    <div className='github_link'>
                     <i style={{ fontSize: '22px' }} className="github icon"></i>
                     <div className="ui input">
                      <input name='github_url' value={ this.state.github_url } onChange={ (e) => this.handleChange(e) } type='text' placeholder='github' onKeyPress={(e)=>{this.handleKeyPress(e, this.updateGithub)}} placeholder="Github handle" />
                     </div>
                     <button style={{ height: '35px', width:'20%', marginLeft:'5px' }} className='ui orange button' onClick={ () => this.updateGithub() }>save</button>
                   </div>
                   
                  
                  </div>
            
                  <div className='ui segment'>
                  <div className='user_skills_container'>
                    <div style={{ height: '300px', padding: '10px' }}>
                    <h2>Skills</h2>
                      <div className='row' className="ui right labeled left icon input user_skills_input">
                        <i className="tags icon"></i>
                        <input name='skill' type='text' placeholder="Add your skills..." value={ this.state.skill } onKeyPress={(e)=>{this.handleKeyPress(e, ()=>{this.addSkill(this.state.skill)})}} onChange={ (e) => this.handleChange(e) } />
                        <a onClick={ () => this.addSkill(this.state.skill) } className="ui tag label"></a>

                      </div>
                        
                        <div className='ui small horizontal list'>
                        {this.state.all_skills ? this.state.all_skills.map((skill, i) => {
                          return (
                            <div key={ i } className='item'>
                              <i onClick={ () => this.deleteSkill(skill) } className="remove icon orange cursor"></i>
                              <div className='ui tag label'> { skill } </div>
                            </div>
                          )
                        }) : null }
                        </div>

                    </div>
                    </div>

                    <Dropbox removeResume={ this.props.removeResume } resume_url={ this.props.resume_url } resume_name={ this.props.resume_name } saveResume={this.props.saveResume} getResume={this.props.getResume} photo={false} />
                  </div>
                  </Fragment>

              }

            
            </div>
          
        </div>

      </div>
    )
  }
}

export default UserProfileView;
