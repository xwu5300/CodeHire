import React, { Component } from 'react';

import { ItemTypes } from './Constants';
import { DragSource } from 'react-dnd';
import UpdateForm from '../UpdateForm.jsx';
import Modal from 'react-modal';

export const cardSource = {
  beginDrag(props, monitor, component) {
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
      invalid: false,
      modalIsOpen: false,
      selected: null,
      isExpanded: false
    }

    this.showCalendar = this.showCalendar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.toggleSelectedOn = this.toggleSelectedOn.bind(this);
    this.toggleSelectedOff = this.toggleSelectedOff.bind(this);

    this.expandCard = this.expandCard.bind(this);
  }
  
  componentDidMount() {
    Modal.setAppElement('body');
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

  expandCard() {
    this.setState({
      isExpanded: !this.state.isExpanded
    })
  }
 
  render() {

    const tab = {
      height: '35px',
      overflow: 'hidden',
    }
  
  
  const { column, default_challenge, scheduled, challenge, index, challengeId, userId, scheduleId, title, instruction, difficulty, deleteChallenge, deleteFromCompanySchedule, connectDragSource, isDragging } = this.props;
  const calendarId = this.state.selected === index ? "calendar" : "inactive";

  const dateId = this.state.selected === index ? "date" : "inactive";


  if(default_challenge) {
    var cardColor = 'ui fluid orange card challenge_card';
  } else if(scheduled) {
    cardColor = 'ui fluid green card challenge_card';
  } else {
   cardColor = 'ui fluid black card challenge_card';
  }


  return connectDragSource (
    <div className={ cardColor } style={this.state.isExpanded ? null : tab}>
      <div className='content challenge_content'>
        
        <i onClick={ () => this.expandCard() } className="angle down icon expand_icon"></i>
       
      { this.state.isExpanded ? 
        <div>
          <div><b>Title:</b> {title}</div>  
          <div><b>Description:</b> {instruction}</div>
          <div><b>Difficulty:</b> {difficulty}</div>
        </div>
       :
       <div>
         <span style={{fontSize: '20px', position: 'relative', bottom: '5px'}}> { title } </span>
         <span style={{position:'relative', bottom: '5px', float: 'right', marginRight: '50px'}}> <b>difficulty:</b> { difficulty }</span>
       </div>
     }

        { scheduled ?
         <div> 
        <div className="ui calendar" id={calendarId} onMouseEnter={() => {this.toggleSelectedOn(index)}} onMouseLeave={() => {this.toggleSelectedOff(index)}}>
          <div className="ui input left icon" onClick={this.showCalendar}>
            <i className="calendar icon"></i>
            <input name="date" type="text" placeholder="Date/Time" id={dateId}/>
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

          {!this.props.scheduled && !this.props.default_challenge ? 
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