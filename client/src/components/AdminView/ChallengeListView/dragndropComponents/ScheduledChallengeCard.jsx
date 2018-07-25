import React, { Component } from 'react';
import moment from 'moment';

class ScheduledChallengeCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      duration: '',
      invalid: false,
      selected: null,
      isExpanded: false,
      initial: true
    }

    this.showCalendar = this.showCalendar.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.toggleSelectedOn = this.toggleSelectedOn.bind(this);
    this.toggleSelectedOff = this.toggleSelectedOff.bind(this);
    this.expandCard = this.expandCard.bind(this);
  }

  showCalendar() {
    $('#calendar').calendar('popup', 'show');
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

  handleClick(challenge, scheduleId) {
    let date = $('#date').val()
    let scheduleTime = moment($('#date').val())
    let currTime = moment(Date.now())
    let diff = currTime.diff(scheduleTime, 'minutes')

    if (this.props.initialChallenge.length === 0) {
      this.setState({
        initial: false
      })
    } else if (this.state.duration === '' || !(diff < 0) ) {
      this.setState({
        invalid: true 
      })
    } else {
      this.setState({
        invalid: false
      }, () => {
        this.props.updateChallengeDate(date, this.state.duration, scheduleId, localStorage.getItem('userId'));
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
      overflow: 'hidden'
    }

  
    const calendarId = this.state.selected === this.props.index ? "calendar" : "inactive";
    const dateId = this.state.selected === this.props.index ? "date" : "inactive";
    return (
      <div className='ui fluid black card challenge_card' style={this.state.isExpanded ? null : tab}>
        <div className='content challenge_content'>
          
          <i onClick={ () => this.expandCard() } className="angle down icon expand_icon cursor"></i>
        
        { this.state.isExpanded ? 
          <div className='expanded_details'>
            <div><b>Title:</b> {this.props.title}</div>  
            <div><b>Description:</b> {this.props.instruction}</div>
            <div><b>Difficulty:</b> {this.props.difficulty}</div>
          </div>
        :
        <div>
          <span style={{ fontSize: '20px', position: 'relative', bottom: '5px' }}> { this.props.title } </span>
          <span style={{position:'relative', bottom: '5px', float: 'right', marginRight: '50px'}}>
          {!this.props.challenge.time || this.props.challenge.duration === 0 ? <span><b>Status: </b><span style={{color: 'red'}}>Not Scheduled</span></span> : <span style={{color: 'green'}}>{moment(this.props.challenge.time).format('MMMM Do YYYY, h:mm A')}</span>}
          </span>
        </div>
      }
          <div className='schedule_time_container'> 
              <select className="ui dropdown" name="duration" value={this.state.duration} onChange={(e) => this.handleDurationChange(e) }>
                <option value="">Duration (minutes)</option>
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="60">60</option>
                <option value="90">90</option>
              </select>
              <div className="ui calendar" id={calendarId} onMouseEnter={() => {this.toggleSelectedOn(this.props.index)}} onMouseLeave={() => {this.toggleSelectedOff(this.props.index)}}>
                <div className="ui input left icon" onClick={this.showCalendar}>
                  <i className="calendar icon"></i>
                  <input name="date" type="text" placeholder="Date/Time" id={dateId}/>
                </div>
                <button className="ui button" type='button' onClick={ () => this.handleClick(this.props.challenge, this.props.scheduleId) }>Set Date</button>
              </div>
          </div>

          {!this.state.initial ? 
          <div style={{color: 'red'}}>You must have an initial challenge set in order to schedule a challenge.</div> : null}
          {this.state.invalid ?
            <div style={{color: 'red', position: 'absolute', bottom: '0'}}>Please check date and duration, and try again.</div> : null} }
    
          <div className='saved_challenges_btns'>

          <button className="ui red icon button" onClick={() => this.props.deleteFromCompanySchedule(this.props.scheduleId, this.props.userId) }>
            <i className="trash icon"></i>
          </button>
          </div>
        </div>
      </div>
    )
  }
}

export default ScheduledChallengeCard;