import React, { Component, Fragment } from 'react';
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
      active_user_id: '',
      candidate_skills: []
    }

    this.getProfile = this.getProfile.bind(this);

    this.socket = socketClient();

    this.socket.on('active candidates', (activeCandidate) => {
      this.setState({ active_candidates: activeCandidate })
    })
  }

  componentDidMount() {
    this.socket.emit('company enter', this.props.current_company_calendar);
  }

  getProfile(username) {
   this.props.fetchCandidateInfo(null, username, () => {
    this.setState({ active_user_id: username, candidate_skills: this.props.candidate_skills });
   });
  }

  render() {
    return (
      <div>
        <div style={{fontSize: '22px', marginTop: '10px', marginLeft: '10px'}}>{ this.props.current_live_challenge_title }</div>
      <div className='ui grid padded centered'>

        <div className='five column centered row' style={{ marginTop: '30px' }}>
          <h1 className='4 columns wide'>Live Coding Challenge</h1>
          <div style={{ marginTop: '30px' }}>
            <ChallengeClock duration={ this.props.current_live_challenge_duration } />
          </div>
        </div>
      </div>

      <div className='ui container horizontal segments'>
            {this.state.active_candidates ? this.state.active_candidates.map((candidate) => {
              return (
                <Fragment>
                    <AdminEditorViews github={ this.props.github_url }  username={ candidate } />
                    <UserProfile getProfile={ this.getProfile } activeUserId={ this.state.active_user_id} activeCandidates={ this.state.active_candidates } skills={this.state.candidate_skills} about={ this.props.candidate_information } username={ candidate } />
                </Fragment>
              );
            }) : null}
          </div>
      </div>
  )
}
}


export default LiveCodingView;
