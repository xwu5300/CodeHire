import React, { Component } from 'react';
import { connect } from "react-redux";

class UserProfileView extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
      <h4>User Profile</h4>
      Name:
      Skills: none
      </div>
    )
  }
}

export default UserProfileView;