import React, { Component } from 'react';

class CompanyChallenges extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showForm: this.props.allChallenges.map((item) => false),
      duration: 0
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount() {
    console.log(this.props)
  }

  handleDurationChange(event) {
    this.setState({
      duration: event.target.value
    })
  }

  handleClick(challengeId, i) {
    if (this.props.isInitial) {
      this.props.makeInitial(challengeId)
    } else {
      this.props.addToSchedule($('#date').val(), this.state.duration, challengeId);
    }
    this.toggleForm(i);
  }

  toggleForm(i) {
    let newShowForm = [...this.state.showForm];
    newShowForm[i] = !this.state.showForm[i];
    this.setState({
      showForm: newShowForm
    })
  }

  showCalendar() {
    $('#calendar').calendar('popup', 'show');
  }

  render() {
    return (
      <div className='ui segment'>
        <h1>Your Saved Challenges</h1>
        {this.props.allChallenges.map((challenge, i) => {
          return (
            <div className="challenges" key={challenge.id}>
              <div>{challenge.title}</div>
              <div>{challenge.instruction}</div>
              <button className="ui button" onClick={() => {this.toggleForm(i)}}>Schedule Challenge</button>
              <button className="ui icon button">
                <i className="minus icon" onClick={() => {this.props.delete(challenge)}}></i>
              </button>
              <br/>
              {!this.state.showForm[i] ? null : 
                <div className="calendar-container">
                {!this.props.isInitial ? 
                  <div>
                    <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
                      <div className="ui input left icon">
                        <i className="calendar icon"></i>
                        <input name="date" type="text" placeholder="Date/Time" id="date"/>
                      </div>
                    </div>
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
                </div> :
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
                }
                  <button onClick={() => {this.handleClick(challenge.id, i)}}>Add to Schedule</button>
                </div>
              }
            </div>
          )
        })}
      </div>
    )
  }
}



export default CompanyChallenges;
