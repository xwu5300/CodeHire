import React, { Component } from 'react';
import { connect } from "react-redux";
import AceEditor from 'react-ace';
import brace from 'brace';
import socketClient from 'socket.io-client';


import 'brace/mode/javascript';
import 'brace/theme/monokai';

import socketClient from 'socket.io-client';


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
        <h1>Live Coding</h1>
        <div className='active_users'>
          <h3>Active Users</h3>
          {this.state.active_users.map((user) => {
            return (
              <div>{ user }</div>
            );
          })}
          
        </div>
      </div>
    )
  }
}


export default LiveCodingView;
