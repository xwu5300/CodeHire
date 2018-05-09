import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import AdminEditorViews from '../AdminEditorViews.jsx';


import 'brace/mode/javascript';
import 'brace/theme/monokai';


class LiveCodingView extends Component {
  constructor() {
    super();
    this.state = {
      active_candidates: [],
      time_running: false,
      seconds: 0,
      minutes: ''
    }

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

  render() {
    return (
      <div className='live_coding_container'>
        <h1 style={{ color: 'white' }}>Live Coding - { this.props.current_live_challenge_title } </h1>
        <span style={{ color: 'white' }}> TIME: { this.state.minutes } : { this.state.seconds } </span>
        <button type='button' onClick={ () => this.startChallenge() }> Start Challenge </button>
        <button type='button' onClick={ () => this.onReset() }>Reset Clock</button>
          <div class="ui inverted bottom attached segment pushable">
            <div className="pusher">
              <div className="ui inverted basic segment">
                <div className='ui grid'>
              {this.state.active_candidates ? this.state.active_candidates.map((user, index) => {
                return(
                  <div className='six wide column'>
                  <AdminEditorViews userIndex={ user[1]} />
                  <p style={{ color: 'orange' }}> { user[0] } </p>
                  </div>
                );
              }) : null}
              </div>
              </div>
            </div>
        }
        </div>
      </div>
    )
  }
}


export default LiveCodingView;
