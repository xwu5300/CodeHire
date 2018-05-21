import React, { Component } from 'react';

/* ------- Drag N Drop ------ */
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

import ScheduledChallengeCard from './ScheduledChallengeCard.jsx';



const target = {

  drop(props, monitor) {
    let challenge = monitor.getItem();
    props.addToCompanySchedule(null, challenge.duration, challenge.challengeId, localStorage.getItem('userId'), () => {
      console.log('SUCCESS');
    })
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}


@DropTarget(ItemTypes.Card, target, collect)

class ScheduleChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      challenges: this.props.scheduledChallenges.map((item) => false),
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    console.log('scheduled, challenge', this.props.scheduledChallenges);
    return connectDropTarget (
      <div className='ui segment drag_segment'>
        <h1> Scheduled Challenges </h1>
        { this.props.scheduledChallenges ? this.props.scheduledChallenges.slice().sort((a, b) => b.id - a.id).map((challenge, i) => {
          if (!challenge.time || challenge.duration === 0)
            return (
              <ScheduledChallengeCard 
               key={i}
               index={i}
               challenge={ challenge } 
               title={ challenge.title } 
               challengeId={ challenge.challenge_id } 
               instruction={ challenge.instruction } 
               difficulty={ challenge.difficulty } 
               userId={ this.props.userId } 
               scheduleId={ challenge.id }
               deleteChallenge={ this.props.delete } 
               deleteFromCompanySchedule={ this.props.deleteFromCompanySchedule }
               updateChallengeDate = { this.props.updateChallengeDate }
               handleModal={ this.handleModal } 
               scheduled={ true }
               getSchedule={this.props.getSchedule}
               />
            )
        }) : null }
        <div></div>
        { this.props.scheduledChallenges ? this.props.scheduledChallenges.map((challenge, i) => {
          if (challenge.time && challenge.duration !== 0)
            return (
              <ScheduledChallengeCard 
               key={i}
               index={i}
               challenge={ challenge } 
               title={ challenge.title } 
               challengeId={ challenge.challenge_id } 
               instruction={ challenge.instruction } 
               difficulty={ challenge.difficulty } 
               userId={ this.props.userId } 
               scheduleId={ challenge.id }
               deleteChallenge={ this.props.delete } 
               deleteFromCompanySchedule={ this.props.deleteFromCompanySchedule }
               updateChallengeDate = { this.props.updateChallengeDate }
               handleModal={ this.handleModal } 
               scheduled={ true }
               getSchedule={this.props.getSchedule}
               />
            )
        }) : null }
      </div>
    )
  }
}

export default ScheduleChallenges;
