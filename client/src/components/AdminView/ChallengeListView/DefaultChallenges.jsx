import React, { Component } from 'react';


class DefaultChallenges extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className='ui segment'>
      <h1>Default Challenges</h1>
      <ul>
      {this.props.defaultChallenges.map((challenge) => {
        return (
          <div className="ui fluid card" key={challenge.id}>
            <div className='content challenge_content'>
              <div>Title: {challenge.title}</div>
              <div>Description: {challenge.description}</div>
              <div>Difficulty: {challenge.difficulty}</div>
              <button className="ui icon button" onClick={() => {this.props.save(challenge, this.props.userId)}}>Save to Challenges</button>
            </div>
          </div>
        )
      })}
      </ul>
    </div>
    )
  }
}






export default DefaultChallenges;