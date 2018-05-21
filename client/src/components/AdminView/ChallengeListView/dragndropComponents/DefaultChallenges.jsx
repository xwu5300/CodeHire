import React, { Component } from 'react';
import ChallengeCard from './ChallengeCard.jsx';


class DefaultChallenges extends Component {
  constructor() {
    super();
  }


  render() {
    return (
      <div className='ui segment drag_segment'>
      <h1>Default Challenges</h1>
      <ul>
      {this.props.defaultChallenges.map((challenge) => {
        console.log('defaultChallenges', challenge)
        return (
          <ChallengeCard 
           key={challenge.id}
           challenge={ challenge } 
           title={ challenge.title } 
           challengeId={ challenge.id } 
           instruction={ challenge.instruction } 
           difficulty={ challenge.difficulty } 
           userId={ this.props.userId } 
           scheduleId={ challenge.id }
           deleteChallenge={ this.props.delete } 
           deleteFromCompanySchedule={ this.props.deleteFromCompanySchedule }
           updateChallengeDate = { this.props.updateChallengeDate }
           handleModal={ this.handleModal } 
           scheduled={ false }
           default_challenge={ true }
           />
        )
      })}
      </ul>
    </div>
    )
  }
}






export default DefaultChallenges;