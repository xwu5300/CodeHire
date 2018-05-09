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
      active_users: []
    }

    this.socket = socketClient();

    this.socket.on('active user', (username) => {
      this.setState({ active_users: [...this.state.active_users, username] });
    })

  }

  render() {
    return (
      <div className='live_coding_container'>
        <h1>Live Coding - { this.props.current_live_challenge } </h1>
          <h3>Active Users</h3>
          <div class="ui bottom attached segment pushable">
            <div class="ui visible inverted left vertical sidebar menu">
            {this.state.active_users.map((user) => {
              return (
                <div style={{ color: 'white' }}>{ user }</div>
              );
            })}
            </div>
            <div class="pusher">
              <div class="ui basic segment">
              {this.state.active_users.map((user) => {
                return(
                  <div>
                  <h2> { user } </h2>
                  <Editor />
                  </div>
                );
              })}
              </div>
            </div>
        </div>
      </div>
    )
  }
}


export default LiveCodingView;
