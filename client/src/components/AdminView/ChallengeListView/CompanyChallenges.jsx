import React, { Component } from 'react';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

class CompanyChallenges extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    }
    this.toggleForm = this.toggleForm.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
  }

  toggleForm() {
    this.setState({
      showForm: !this.state.showForm
    })
  }

  showCalendar() {
    $('#calendar').calendar('show');
  }


  render() {
    return (
      <div className='ui segment'>
        <h1>Your Saved Challenges</h1>
        {this.props.allChallenges.map((challenge) => {
          return (
            <div className="challenges" key={challenge.id}>
              <div>{challenge.title}</div>
              <div>{challenge.instruction}</div>
              <button onClick={() => {this.props.delete(challenge)}}>Remove from challenges</button>
              <button onClick={this.toggleForm}>Schedule Challenge</button>
              <br/>
              {!this.state.showForm ? null : 
                <div className="calendar-container">
                  <div className="ui calendar" id="calendar" onClick={this.showCalendar}>
                    <div className="ui input left icon">
                      <i className="calendar icon"></i>
                      <input type="text" placeholder="Date/Time"/>
                    </div>
                  </div>
                  <div className="field dropdown">
                  <label>Duration (minutes)</label>
                  <select className="ui dropdown" name="duration">
                    <option value="">Select</option>
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="60">60</option>
                    <option value="90">90</option>
                  </select>
                </div>
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