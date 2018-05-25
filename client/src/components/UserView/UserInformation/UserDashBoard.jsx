import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

import UserScheduleTableView from '../UserChallenge/UserScheduleTableView.jsx';
import UserNavBar from '../UserNavBar.jsx';

class UserDashBoard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCandidateCalendar(localStorage.getItem('userId'));
    // this.props.fetchCandidateResults(localStorage.getItem('userId'), null, ()=>{});
    this.props.fetchCandidateResults(localStorage.getItem('userId'));
  }

  render() {

    return(
      <div>
        <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } handleLogout={ this.props.handleLogout } />
        <div className='ui container segment' style={{ marginTop: '100px', paddingTop: '50px'}}>

        <h2 className='welcome'>Welcome, {this.props.username}!</h2>

        {this.props.candidate_calendar.length > 0 ?
        <div className="welcome-message-alt">You have scheduled <span style={{color: '#f2711c'}}><b>{this.props.candidate_calendar.length}</b></span> challenges.</div> :
        <div className="welcome-message">It looks like you don't have any challenges scheduled yet. Head over to "live challenges" to search companies and get started.</div>}

          <div className='candidate_calendar inverted ui raised container segment'>
            {this.props.candidate_calendar.length ?
              <UserScheduleTableView currentCompanyCalendar={ this.props.currentCompanyCalendar } candidateCalendar={this.props.candidate_calendar} cancelSchedule={this.props.deleteCandidateSchedule}/>
              : <div>You Do Not Have Any Scheduled Challenges</div>}
        </div>
      </div>
      </div>
    )
  }
}

export default withRouter(UserDashBoard);
