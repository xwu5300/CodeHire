import React, { Component } from 'react';
import UpdateForm from '../UpdateForm.jsx';
import Modal from 'react-modal';
import swal from 'sweetalert2';


import ChallengeCard from './ChallengeCard.jsx';

/* ------ Drag N Drop ------- */




class SavedChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.props.allChallenges.map((item) => false),
      duration: 0,
      modalIsOpen: false,
      challenge_id: null
    }

    this.showCalendar = this.showCalendar.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this)
  }

  componentDidMount() {
    Modal.setAppElement('body');
  }

  openModal(challengeId) {
    this.setState({
      modalIsOpen: true
    })
  }

  closeModal() {
    this.setState({
      modalIsOpen: false
    })
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }

  handleModal(challengeId) {
    this.props.getInfo(challengeId, this.props.userId, this.openModal);
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

    return (
      <div className='ui segment drag_segment' style={{ overlow: 'scroll' }}>
        <h1>Saved Challenges</h1>

          {this.props.allChallenges.map((challenge, i) => {
            return (
              <ChallengeCard 
              key={challenge.id}
              challenge={ challenge } 
              title={ challenge.title } 
              challengeId={ challenge.id } 
              instruction={ challenge.instruction } 
              difficulty={ challenge.difficulty } 
              userId={ this.props.userId } 
              deleteChallenge={ this.props.delete } 
              handleModal={ this.handleModal } 
              scheduled={ false } />
            )
          })}

         <button className="input_challenge_btn ui orange basic button" onClick={ this.props.openModal }>Create new challenge</button>
      </div>


      
      
    )
  }
}

export default SavedChallenges;

