import React, { Component } from 'react';


class DefaultChallenges extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className='challenge_list_container'>
      <h1>Default Challenges</h1>
      <ul>
      {this.props.defaultChallenges.map((challenge) => {
        return (
          <div className="challenges">
            <div key={challenge.id}>{challenge.title}</div>
            <div>{challenge.description}</div>
            <button onClick={() => {this.props.save(challenge)}}>Add to your challenges</button>
          </div>
        )
      })}
      </ul>
    </div>
    )
  }
}






export default DefaultChallenges;