import React, { Component } from 'react';

/* ------- Drag N Drop ------ */
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

import ChallengeCard from './ChallengeCard.jsx';



const target = {

  canDrop(props, monitor) {
    const challenge = monitor.getItem();
   
    for(let i = 0; i < props.scheduledChallenges.length; i++) {
      if(challenge.challengeId === props.scheduledChallenges[i].challenge_id) {
        return false;
      }
    }
    
    return true;
  },


  drop(props, monitor) {
    let challenge = monitor.getItem();

    props.addToCompanySchedule(challenge.time, challenge.duration, challenge.challengeId, localStorage.getItem('userId'), () => {
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
    return connectDropTarget (
      <div className='ui segment drag_segment'>
        <h1> Scheduled Challenges </h1>
        { this.props.scheduledChallenges ? this.props.scheduledChallenges.map((challenge, i) => {
            return (
              <ChallengeCard 
               key={i}
               index={i}
               challenge={ challenge } 
               title={ challenge.title } 
               challengeId={ challenge.challenge_id } 
               instruction={ challenge.instruction } 
               difficulty={ challenge.difficulty } 
               userId={ challenge.company_id } 
               scheduleId={ challenge.id }
               deleteChallenge={ this.props.delete } 
               deleteFromCompanySchedule={ this.props.deleteFromCompanySchedule }
               updateChallengeDate = { this.props.updateChallengeDate }
               handleModal={ this.handleModal } 
               scheduled={ true }
               />
            )
        }) : null }
      </div>
    )
  }
}

export default ScheduleChallenges;
