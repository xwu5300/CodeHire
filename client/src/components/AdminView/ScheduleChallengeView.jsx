import React, { Component } from 'react';


class ScheduleChallengeView extends Component {
  constructor(props){
    super(props);
    this.state = {
      duration: '',
      showForm: this.props.challenges.map((item) => true),
      invalid: this.props.challenges.map((item) => true)
    }

    this.handleClick = this.handleClick.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.toggleValid = this.toggleValid.bind(this);
  }

  componentDidMount() {
    console.log(this.props);
  }

  handleClick(challenge, i) {
    console.log(this.state)
    let date = $('#date').val()
    if (this.props.isInitial) {
      if (this.state.duration === '') {
        this.toggleValid(i);
      } else {
        this.props.makeInitial(challenge.id, challenge.initial, this.state.duration, this.props.isInitial, this.props.userId, this.props.close);
      }
    } else {
      if (this.state.duration === '' || !date) {
        this.toggleValid(i);
      } else {
        this.props.addToSchedule(date, this.state.duration, challenge.id, this.props.userId, this.props.close);
      }
    }
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }

  showCalendar() {
    $('#calendar').calendar('popup', 'show');
  }

  

  toggleValid(i) {
    let newValidity = [...this.state.invalid];
    newValidity[i] = true;
    this.setState({
      invalid: newValidity
    })
  }

  render() {
    return (
      <div>
      <h4>Select from your saved challenges:</h4>
      <div className='ui two column grid'>
      {this.props.challenges.length === 0 ? 'No saved challenges to choose from' : this.props.challenges.map((item, i) => {
        return (
          <div key={item.id}>
            <div className="title">{item.title}</div>
            <div className="calendar-button">
            </div>
            {!this.state.showForm[i] ? null : 
              <div className="calendar-container">
              {!this.props.isInitial ? 
                  <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
                    <div className="ui input left icon">
                      <i className="calendar icon"></i>
                      <input name="date" type="text" placeholder="Date/Time" id="date"/>
                    </div>
                  </div> : null}
                <div className="field dropdown">
                <label>Duration (minutes)</label>
                  <select className="ui dropdown" name="duration" value={this.state.duration} onChange={this.handleDurationChange}>
                    <option value="">Select</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                  </select>
                </div> 
              </div>
            }
            <button className="ui button select" onClick={() => {this.handleClick(item, i)}}>Select</button>
            {this.state.invalid[i] ? <div style={{color: 'red'}}>Please enter all values and try again</div> : null}
            <div className="clear"></div>
            <br/>
          </div>
        )
      })}
      </div>
        <div className="close-button">
          <button className="ui icon button" onClick={this.props.close}><i className="x icon"></i></button>
        </div>
      </div>
    )
  }
}



export default ScheduleChallengeView;
