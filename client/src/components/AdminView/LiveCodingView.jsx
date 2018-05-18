import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

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
      active_user_id: ''
    }

    this.getProfile = this.getProfile.bind(this);

    this.socket = socketClient();

    this.socket.on('active candidates', (activeCandidates) => {
      console.log('activeCandidates', activeCandidates);
      this.setState({ active_candidates: activeCandidates })
    })
  }

  componentDidMount() {
    this.socket.emit('company enter', this.props.current_company_calendar);
  }

  getProfile(userId) {
   this.props.fetchCandidateInfo(userId, () => {
    this.setState({ active_user_id: userId });
   });
  }

  render() {
    return (
      <div className='ui grid padded live_coding_container'>
        <div className='five column row'>
          <h1 style={{ color: 'white' }} className='4 columns wide'>Live Coding - { this.props.current_live_challenge_title } </h1>
          <div className='right floated column'>
            <ChallengeClock duration={ this.props.current_live_challenge_duration } />
          </div>
        </div>


      <div className='four column row'>
          <div className='one column wide'></div>
          <div>
            {this.state.active_candidates ? this.state.active_candidates.map((candidate) => {
              return (
                <AdminEditorViews github={ this.props.github_url } skills={this.props.candidate_skills} about={ this.props.candidate_information } activeUserId={ this.state.active_user_id} userIndex={ candidate[1] } />
              );
            }) : null}
          </div>



        <div className='right floated column'>
          <div className="ui container segment active_user_menu">
            <h2>Active Users</h2>
            <ul className='active_user_list'>
              {this.state.active_candidates ? this.state.active_candidates.map((user) => {
                return (
                  <li style={{ cursor: 'pointer' }} onClick={ () => this.getProfile(user[1]) }><i className="circle green icon"></i>{user[0]}</li>
                )
              }) : null}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
}


export default LiveCodingView;
