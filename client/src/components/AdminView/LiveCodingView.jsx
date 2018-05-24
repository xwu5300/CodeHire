import React, { Component, Fragment } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import { history, withRouter } from 'react-router-dom';

import AdminEditorViews from './AdminEditorViews.jsx';
import UserProfile from './UserProfile.jsx';
import ChallengeClock from '../ChallengeClock.jsx';

import 'brace/mode/javascript';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/theme/twilight';
import 'brace/theme/solarized_dark';
import 'brace/theme/terminal';

class LiveCodingView extends Component {
  constructor() {
    super();
    this.state = {
      active_candidates: [],
      active_user: null,
      candidate_skills: [],
      candidate_results: []
    }

    this.getProfile = this.getProfile.bind(this);
    this.onUnload = this.onUnload.bind(this);

    this.socket = socketClient();

    this.socket.on('active candidates', (activeCandidate) => {
      this.setState({ active_candidates: activeCandidate })
    })

    this.socket.on('show result', (username, result) => {
      this.setState({ candidate_results: [...this.state.candidate_results, [username, result]] });
    })

    this.socket.on('reset active user', (username) => {
      if(this.state.active_user === username) {
        this.setState({ active_user: this.state.active_candidates[0] })
      }
    })

  }

  componentDidMount() {
    this.socket.emit('company enter', this.props.current_company_calendar);
    // window.addEventListener('beforeunload', this.onUnload);
  }

  // componentWillUnmount() {
  //   window.removeEventListener('beforeunload', this.onUnload);
   
  // }

  onUnload() {
    this.props.history.push('/admin');
  }


  getProfile(username) {
   this.props.fetchCandidateInfo(null, username, () => {
    this.setState({ active_user: username, candidate_skills: this.props.candidate_skills });
   })

   this.socket.emit('current user view', this.props.current_company_calendar, username);
  }


  render() {

    if(!this.state.active_user) {
      var containerStyle = {
        width: '40%',
        minHeight: '300px',
        overflow: 'scroll',
      }
    } else {
      containerStyle = {
        width: ''
      }
    }

 
    return (
      <div>
        <i onClick={ () => this.props.history.push('/admin') } className="arrow alternate circle left icon"></i>

        <div className='live_coding_title'>{ this.props.current_live_challenge_title }</div>
     
        <div className='live_coding_results'>  
          { this.state.candidate_results ? this.state.candidate_results.map((result) => {
            return (
              <div style={ result[1] ? { color: 'green' } : { color: 'red' } }>{ result[0] }{ result[1] ? ' passed challenge' : ' failed challenge' } </div>
            )
          }) : null }
        </div>
     
     
        <div className='ui grid padded centered'>
          <div className='five column centered row' style={{ marginTop: '30px' }}>
            <h1 className='4 columns wide'>Live Coding Challenge</h1>
              <div style={{ marginTop: '30px' }}>
                <ChallengeClock duration={ this.props.current_live_challenge_duration } />
              </div>
            </div>
          </div>

     
       
        <div className={ this.state.active_user ? 'ui container horizontal segments' : 'ui container segment' } style={ containerStyle }>
          {this.state.active_candidates ? this.state.active_candidates.map((candidate) => {
            return (
              <Fragment>
                { this.state.active_user === candidate ?
                  <Fragment>
                    <AdminEditorViews github={ this.props.github_url } username={ candidate } active_user={ this.state.active_user }/>
                    <UserProfile getProfile={ this.getProfile } activeUser={ this.state.active_user } activeCandidates={ this.state.active_candidates } skills={this.state.candidate_skills} about={ this.props.candidate_information } username={ candidate } />
                  </Fragment>
                : null }
              </Fragment>
            );
          }) : null}

          { !this.state.active_user && this.state.active_candidates ? this.state.active_candidates.map((user, i) => {
            return (
              <div key={ i } className='active_user_div' onClick={ () => this.getProfile(user) }><i className="circle green icon"></i>{user}</div>
            );
          }) : null}

          { !this.state.active_candidates || this.state.active_candidates.length === 0 ? <div>No Active Users</div> : null }
        </div>
      </div>
    )
  }
}


export default LiveCodingView;
