import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import AdminEditorViews from '../AdminEditorViews.jsx';
import UserProfile from './UserProfile.jsx';


import 'brace/mode/javascript';
import 'brace/theme/monokai';


class LiveCodingView extends Component {
  constructor() {
    super();
    this.state = {
      active_candidates: [],
      time_running: false,
      seconds: 0,
      minutes: '',
      active_user_id: ''
    }

    this.getProfile = this.getProfile.bind(this);
    this.startChallenge = this.startChallenge.bind(this);
    this.onTick = this.onTick.bind(this);

    this.socket = socketClient();

    this.socket.on('active candidates', (activeCandidates) => {
      this.setState({ active_candidates: activeCandidates })
    })

  }

  componentDidMount() {
    this.socket.emit('company enter', this.props.current_company_calendar);

    this.setState({ minutes: this.props.current_live_challenge_duration });

  }


  startChallenge() {
    this.setState({ time_running: true })
    this.onTickCount = setInterval(this.onTick, 125);
  }


  onTick() {

    this.socket.emit('send time_limit', this.state.minutes, this.state.seconds);

    if(this.state.time_running) {
      this.setState({ seconds: this.state.seconds - 1 });
    }

    if(this.state.seconds === -1){
      this.setState({
        seconds: 60,
        minutes: this.state.minutes - 1,
      });
  }
}


  onReset() {
    clearInterval(this.onTick);
    this.setState({ minutes: this.props.current_live_challenge_duration, seconds: 0, time_running: false })
  }

  componentWillUnmount() {
    clearInterval(this.onTickCount);
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
            <div className='live_coding_clock'> TIME: { this.state.minutes } : { this.state.seconds } </div>
            <button className='time_limit_btn' type='button' onClick={ () => this.startChallenge() }> Start Challenge </button>
            <button className='time_limit_btn' type='button' onClick={ () => this.onReset() }>Reset Clock</button>
          </div>
        </div>
        
      <div className='three column row'>
        <div>
          <div className='six colum wide'>
            <div>
              {this.state.active_candidates ? this.state.active_candidates.map((candidate) => {
                return (
                     <AdminEditorViews activeUserId={ this.state.active_user_id} userIndex={ candidate[1] } /> 
                   );
              }) : null}    
            </div>
          </div>
          {this.state.active_user_id ? <UserProfile skills={ this.props.candidate_skills } about={ this.props.candidate_information } /> : null }
         </div> 

        
        <div className='right floated column'>
          <div className="ui vertical menu active_user_menu">
            <h2>Active Users</h2>
            <ul className='active_user_list'>
              {this.state.active_candidates ? this.state.active_candidates.map((user) => {
                console.log('ACTIVE YO', this.state.active_candidates);
                return (
                  <li onClick={ () => this.getProfile(user[1]) }><i class="circle green icon"></i>{user[0]}</li>
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
