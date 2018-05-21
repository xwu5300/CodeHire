import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import UserNavBar from '../UserNavBar.jsx';
import UserScheduleTableView from '../UserChallenge/UserScheduleTableView.jsx';

class UserDashBoard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCandidateCalendar(localStorage.getItem('userId'));
    this.props.fetchCandidateResults(localStorage.getItem('userId'), null, ()=>{});
  }

  render() {
    console.log('user dash board props', this.props)
    return(
      <div>
        <UserNavBar/>
        <h2 style={{ marginTop: '100px', textAlign: 'center' }}>Your Calendar</h2>
        <div className='candidate_calendar inverted ui raised container segment'>
        {this.props.candidate_calendar.length ?
        <UserScheduleTableView currentCompanyCalendar={ this.props.currentCompanyCalendar } candidateCalendar={this.props.candidate_calendar} cancelSchedule={this.props.deleteCandidateSchedule}/>

        : <div>You Do Not Have Any Scheduled Challenges</div>}
        </div>
      </div>
    )
  }
}

export default withRouter(UserDashBoard);
