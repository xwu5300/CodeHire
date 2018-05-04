import React, { Component } from 'react';
import { connect } from "react-redux";
import CompanyChallenges from './ChallengeListView/CompanyChallenges.jsx';
import DefaultChallenges from './ChallengeListView/DefaultChallenges.jsx';

class ChallengeListView extends Component {
  constructor() {
    super();
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <h1>Select a Challenge:</h1>
        <CompanyChallenges/>
        <DefaultChallenges/>
      </div>
    )
  }
}

export default ChallengeListView;