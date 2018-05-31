import React, { Component } from 'react';
import swal from 'sweetalert2';
import { ItemTypes } from './Constants';
import { DropTarget } from 'react-dnd';
import ChallengeCard from './ChallengeCard.jsx';

const target = {

  drop(props, monitor) {
    let challenge = monitor.getItem();
    props.save(challenge.challenge, localStorage.getItem('userId'), () => {
    })
  }
}

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

@DropTarget(ItemTypes.Card, target, collect)

class SavedChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.props.activeChallenges.map((item) => false),
      duration: 0,
      challenge_id: null
    }

    this.showCalendar = this.showCalendar.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this)
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }

  handleClick(challenge, i) {
    this.props.addToCompanySchedule($('#date').val(), this.state.duration, challenge.id, this.props.userId, false);
    this.toggleForm(i);
  }

  toggleForm(i) {
    let newShowForm = [...this.state.showForm];
    newShowForm[i] = !this.state.showForm[i];
    this.setState({
      showForm: newShowForm
    })
  }

  confirmDelete(challenge, id) {
    swal({
      title: 'Are you sure you want to delete challenge?',
      text: "It will be gone forever",
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Delete',
    }).then((clickResult) => {
      if (clickResult.value) {
        this.props.delete(challenge, id)
      }
    })
  }

  showCalendar() {
    $('#calendar').calendar('popup', 'show');
  }

  render() {
    const { connectDropTarget } = this.props;
    return connectDropTarget(
      <div className='ui segment drag_segment'>
        <h1 className='drag_column_title'>Your Challenges</h1>
          {this.props.activeChallenges.length === 0 ? 
            <div>Create a new challenge or drag one from the default list to get started.</div> :
            this.props.activeChallenges.map((challenge, i) => {
            return (
              <ChallengeCard 
              key={challenge.id}
              challenge={ challenge } 
              title={ challenge.title } 
              challengeId={ challenge.id } 
              instruction={ challenge.instruction } 
              challengeInfo={ this.props.challengeInfo }
              difficulty={ challenge.difficulty } 
              userId={ this.props.userId } 
              deleteChallenge={ this.props.delete } 
              save={ this.props.save }
              getInfo={ this.props.getInfo }
              scheduled={ false } />
            )
          })}
      </div>  
      
    )
  }
}

export default SavedChallenges;

