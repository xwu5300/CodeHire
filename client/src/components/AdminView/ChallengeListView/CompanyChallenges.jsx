import React, { Component } from 'react';

class CompanyChallenges extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className='ui segment'>
        <h1>Your Saved Challenges</h1>
        {this.props.allChallenges.map((challenge) => {
          return (
            <div className="challenges" key={challenge.id}>
              <div>{challenge.title}</div>
              <div>{challenge.instruction}</div>
              <button onClick={() => {this.props.delete(challenge)}}>Remove from challenges</button>
            </div>
          )
        })}
      </div>
    )
  }
}



export default CompanyChallenges;