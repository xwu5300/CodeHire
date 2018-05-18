import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserScheduleTableView from '../UserChallenge/UserScheduleTableView.jsx';

class UserDashBoard extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCandidateCalendar(localStorage.getItem('userId'));
    this.props.fetchCandidateResults(localStorage.getItem('userId'));
  }

  render() {
    console.log('user dash board props', this.props)
    return(
      <div>
        <div className="ui orange four item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.name }</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
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
