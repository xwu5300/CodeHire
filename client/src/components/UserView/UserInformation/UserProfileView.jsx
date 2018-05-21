import React, { Component } from 'react';
import { connect } from "react-redux";
import PastChallengeListView from './PastChallengeListView.jsx';
import Dropbox from '../Dropbox.jsx';

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
    console.log('updating')
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
        <div className="ui orange four item menu">
          <div className='ui active item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>

        <div className='main_profile_container'>
          <div className='ui padded grid'>
            <div className='ui raised container segment'>
            <div className="profile_photo_container">
              <div className="ui small image" >
              {!this.props.photo ? 
                <img src="https://bit.ly/2pguvGq" alt="Empty profile photo"/> :
                <img src={this.props.photo} className="responsive" style={{width: '150px', height: '150px'}}/>}
              </div>
              <br/>
              <div>
                <Dropbox savePhoto={this.props.updateCandidatePhoto} photo={true}/>
              </div>
            </div>
            <div className='row'>
              <div >
                <div className='github_link'>
                  <i style={{ fontSize: '22px' }} className="github icon"></i>
                  <input name='github_url' value={ this.state.github_url } onChange={ (e) => this.handleChange(e) } type='text' placeholder='github' onKeyPress={(e)=>{this.handleKeyPress(e, this.updateGithub)}} />
                  <button style={{ height: '35px', width:'15%', marginLeft:'5px' }} className='ui orange basic button' onClick={ () => this.updateGithub() }>save</button>
                </div>
                <div style={{float: 'right', marginTop: '30px'}}><b>Resume:</b>
                <br/>
                {this.props.resume_name ? 
                <div>
                <a href={this.props.resume_url} target="_blank">{this.props.resume_name}</a> 
                <br/>
                <button className="ui button" onClick={() => {this.props.removeResume(localStorage.getItem('userId'))}}>Remove</button>
                </div>
                :  "Upload your resume"}
                </div>
                <Dropbox saveResume={this.props.saveResume} getResume={this.props.getResume} photo={false}/>
              </div>
            </div>


            <div className='row user_skills_container'>
              <div style={{ height: '300px' }}>
              <h2>Skills</h2>
                <div className='row' className="ui right labeled left icon input user_skills_input">
                  <i className="tags icon"></i>
                  <input name='skill' type='text' placeholder="Add your skills..." value={ this.state.skill } onKeyPress={(e)=>{this.handleKeyPress(e, ()=>{this.addSkill(this.state.skill)})}} onChange={ (e) => this.handleChange(e) } />
                  <a onClick={ () => this.addSkill(this.state.skill) } className="ui tag label"></a>
                </div>

                <div className='row'>
                  
                  <div className='ui small horizontal list'>
                  {this.state.all_skills ? this.state.all_skills.map((skill, i) => {
                    return (
                      <div key={ i } className='item'>
                        <i onClick={ () => this.deleteSkill(skill) } className="remove icon orange"></i>
                        <div className='ui tag label'> { skill } </div>
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
