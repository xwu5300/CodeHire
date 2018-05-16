import React, { Component } from 'react';

import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import UpdateForm from '../UpdateForm.jsx';
import Modal from 'react-modal';

export const cardSource = {
  beginDrag(props, monitor, component) {
    console.log('RPOOOPS', props);
    return {
      challengeId: props.challengeId,
      companyId: props.challenge.company_id,
      duration: props.challenge.duration,
      time: '1/2/3'
    };
  }
}

export const collect = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}


class ChallengeCard extends Component {
  
  constructor(props) {
    super(props);

    this.state = {
      duration: '',
      invalid: true,
      modalIsOpen: false,
      selected: null
    }

    this.showCalendar = this.showCalendar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.toggleSelectedOn = this.toggleSelectedOn.bind(this);
    this.toggleSelectedOff = this.toggleSelectedOff.bind(this);
  }
  
  componentDidMount() {
    Modal.setAppElement('body');
    console.log(this.props)
  }

  showCalendar() {
    $('#calendar').calendar('popup', 'show');
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

  handleModal(challengeId) {
    this.props.getInfo(challengeId, this.props.userId, this.openModal);
  }

  toggleSelectedOn(idx) {
    this.setState({
      selected: idx
    })
  }

  toggleSelectedOff(idx) {
    this.setState({
      selected: null
    })
  }

  handleClick(challenge, challengeId, companyId, i) {

    let date = $('#date').val()

    if (this.state.duration === '' || !date) {
      this.setState({
        invalid: true
      })
    } else {
      this.setState({
        invalid: false
      }, () => {
        this.props.updateChallengeDate(date, this.state.duration, challengeId, companyId, this.props.close)
      })
    }
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }
 
  render() {
  
  
  const { challenge, index, challengeId, userId, scheduleId, title, instruction, difficulty, deleteChallenge, deleteFromCompanySchedule, connectDragSource, isDragging } = this.props;
  const calendarId = this.state.selected === index ? "calendar" : "inactive";
  return connectDragSource (
    <div className="ui fluid orange card">
      <div className='content challenge_content'>
        <div><b>Title:</b> {title}</div>
        <div><b>Description:</b> {instruction}</div>
        <div><b>Difficulty:</b> {difficulty}</div>

        {this.props.scheduled ?
         <div> 
        <div className="ui calendar" id={calendarId} onMouseEnter={() => {this.toggleSelectedOn(index)}} onMouseLeave={() => {this.toggleSelectedOff(index)}}>
          <div className="ui input left icon" onClick={this.showCalendar}>
            <i className="calendar icon"></i>
            <input name="date" type="text" placeholder="Date/Time" id="date"/>
          </div>
          <button type='button' onClick={ () => this.handleClick(challenge, challengeId, userId) }>Set Date</button>
        </div>

        <select className="ui dropdown" name="duration" value={this.state.duration} onChange={(e) => this.handleDurationChange(e) }>
          <option value="">Duration (minutes)</option>
          <option value="15">15</option>
          <option value="30">30</option>
          <option value="60">60</option>
          <option value="90">90</option>
        </select>
        </div>
         : null }





        <div className='saved_challenges_btns'>

         {!this.props.scheduled ?
          <button className="ui icon button" onClick={() => deleteChallenge(challenge, userId) }>
            <i className="minus icon"></i>
          </button>
          :
          <button className="ui icon button" onClick={() => deleteFromCompanySchedule(scheduleId, userId) }>
            <i className="minus icon"></i>
          </button>
        }
          {!this.props.challengeInfo ? null :
          <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
            <UpdateForm challengeInfo={this.props.challengeInfo} save={this.props.save} close={this.closeModal} userId={this.props.userId}/>
          </Modal>}

          {!this.props.scheduled ? 
          <button className="ui icon button" onClick={() => this.handleModal(challengeId) }>
            <i className="edit icon"></i>
          </button>
          :
          null }

        </div>
      </div>
    </div>
  )
}
}

export default DragSource(ItemTypes.Card, cardSource, collect)(ChallengeCard);