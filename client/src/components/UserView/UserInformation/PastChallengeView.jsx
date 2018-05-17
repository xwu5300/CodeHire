import React, { Component } from 'react';
import moment from 'moment';

class PastChallengeView extends Component {
  constructor() {
    super()

    this.isInitial = this.isInitial.bind(this);
    this.isPassed = this.isPassed.bind(this);
  }
  
  isPassed(userPassed) {
    return userPassed ? 'Passed' : 'Failed';
  }

  isInitial(initial) {
    return initial ? 'Initial Challenge' : ''
  }

  render() {
    return (
      <div>
        <div> Challenges:
        {this.props.challenges.map((challenge, i) => {
        return (
        <div key={i}>
        <div>Company: {challenge.name}</div>
        <div>Title: {challenge.title}    Difficulty: {challenge.difficulty}</div>
        <div>{this.isInitial(challenge.initial)}, 
        {this.isPassed(challenge.user_passed)}, 
        {challenge.score}
        </div>

        <div>Instruction: {challenge.instruction}</div>
        <div>Completed At: {moment(challenge.completed_at).format('MMMM Do YYYY dddd, h:mm A')}</div>
        <div>{challenge.code}</div>
        <br/>
        <br/>
        </div>)
        })}
        </div>

      </div>
    )
  }
}

export default PastChallengeView;