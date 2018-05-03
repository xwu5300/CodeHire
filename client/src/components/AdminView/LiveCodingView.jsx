import React, { Component } from 'react';
import { connect } from "react-redux";


class LiveCodingView extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div className='live_coding_container'>
        <h1>Live Coding</h1>
        <div className='active_users'>
          <h3>Active Users</h3>
        </div>
      </div>
    )
  }
}


export default LiveCodingView;