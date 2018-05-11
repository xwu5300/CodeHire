import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserScheduleTableView from './UserChallenge/UserScheduleTableView.jsx';

class UserDashBoard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCandidateCalendar(this.props.user_id);
  }

  render() {
    return(
      <div>
        <div className="ui orange three item inverted menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div>
        </div>


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
