import React, { Component } from 'react';
import { connect } from "react-redux";

class UserInitialChallengeView extends Component {
  constructor() {
    super();
  }

  render() {
    console.log('userinitial challenge props', this.props)
    return (
      <div>
      <h1>{this.props.initial_challenge[0].name  }</h1>
      <h2>Initial Challenge</h2>
      <h3>{this.props.initial_challenge[0].title}</h3>  
      <div> difficulty: {this.props.initial_challenge[0].difficulty}</div>
      <div>
        instruction: {this.props.initial_challenge[0].instruction}
      </div>
      <div>
      test case: {this.props.initial_challenge[0].test_cases}
      </div>
      <div>
        timelimit:  {this.props.initial_challenge[0].timelimit}
      </div>
      </div>
    )
  }
}


export default UserInitialChallengeView;