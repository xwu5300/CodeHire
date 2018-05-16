import React, { Component } from 'react';

/* ------- Drag N Drop ------ */
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';

import ChallengeCard from './ChallengeCard.jsx';

const target = {
  drop: (props, monitor) => {
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
      challenges: this.props.scheduledChallenges.map((item) => false)
    }
  }

  componentDidMount() {
    console.log('mounting', this.props)
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget (
      <div className='ui segment drag_segment'>
        <h2> Scheduled Challenges </h2>
        { this.props.scheduledChallenges ? this.props.scheduledChallenges.map((challenge, i) => {
            return (
              <ChallengeCard 
               key={challenge.id}
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
               />
            )
          
        }) : null }
        
      </div>
    )
  }
}

export default ScheduleChallenges;



/*
  {!this.props.isInitial ? 
                  <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
                    <div className="ui input left icon">
                      <i className="calendar icon"></i>
                      <input name="date" type="text" placeholder="Date/Time" id="date"/>
                    </div>
                  </div> : null}



                  showCalendar() {
                    $('#calendar').calendar('popup', 'show');
                  }


                  handleClick(challenge, i) {
                    let date = $('#date').val()
                    if (this.props.isInitial) {
                      if (this.state.duration === '') {
                        this.setState({
                          invalid: true
                        }) 
                      } else {
                        this.setState({
                          invalid: false
                        }, () => {
                          this.props.makeInitial(challenge.id, challenge.initial, this.state.duration, this.props.isInitial, this.props.userId, this.props.close)
                        })
                      }
                    } else {
                      if (this.state.duration === '' || !date) {
                        this.setState({
                          invalid: true
                        })
                      } else {
                        this.setState({
                          invalid: false
                        }, () => {
                          this.props.addToSchedule(date, this.state.duration, challenge.id, this.props.userId, this.props.close)
                        })
                      }
                    }
                  }




                  */