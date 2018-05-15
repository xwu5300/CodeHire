import React, { Component } from 'react';

class ScheduleChallenges extends Component {

  constructor(props) {
    super(props);

    this.state = {}
  }

  render() {
    return (
      <div className='ui segment drag_segment'>
        <h2> Scheduled Challenges </h2>
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