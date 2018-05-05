import React, { Component } from 'react';
import { connect } from "react-redux";
import CompanyChallenges from './ChallengeListView/CompanyChallenges.jsx';
import DefaultChallenges from './ChallengeListView/DefaultChallenges.jsx';

class ChallengeListView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    console.log(this.props)
  }

  render() {
    return (
      <div>
        <CompanyChallenges allChallenges={this.props.all_challenges} delete={this.props.deleteChallenge}/>
        <DefaultChallenges defaultChallenges={this.props.default_challenges} save={this.props.saveChallenge}/>
      </div>
    )
  }
}

export default ChallengeListView;