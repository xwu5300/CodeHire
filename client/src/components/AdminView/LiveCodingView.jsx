import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';

import Editor from '../Editor.jsx';


import 'brace/mode/javascript';
import 'brace/theme/monokai';


class LiveCodingView extends Component {
  constructor() {
    super();
    this.state = {
      active_candidates: []
    }

    this.socket = socketClient();

    this.socket.on('active candidates', (activeCandidates) => {
      this.setState({ active_candidates: activeCandidates })
    })
  }

  componentDidMount() {
    this.socket.emit('company enter', this.props.current_company_calendar);
  }

  render() {
    return (
      <div className='live_coding_container'>
        <h1 style={{ color: 'white' }}>Live Coding - { this.props.current_live_challenge } </h1>
          <h3 style={{ color: 'white' }}>Active Users</h3>
          <div class="ui inverted bottom attached segment pushable">
            <div className="ui inverted visible inverted left vertical sidebar menu">
            {this.state.active_candidates ? this.state.active_candidates.map((user) => {
              return (
                <div className='active_users_div'>{ user[0] }</div>
              );
            }) : null}
            </div>
            <div className="pusher">
              <div className="ui inverted basic segment">
                <div className='ui grid'>
              {this.state.active_candidates ? this.state.active_candidates.map((user, index) => {
                return(
                  <div className='six wide column'>
                  <h2> { user[0] } </h2>
                  <Editor userIndex={ user[1]} />
                  </div>
                );
              }) : null}
              </div>
              </div>
            </div>
        </div>
      </div>
    )
  }
}


export default LiveCodingView;
