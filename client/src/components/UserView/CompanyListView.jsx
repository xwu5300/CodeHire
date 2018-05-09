import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import UserScheduleTableView from './UserScheduleTableView.jsx';

class CompanyListView extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    this.props.fetchCandidateCalendar(this.props.user_id);
  }

  render () {
    return (
      <div>
      <button className='ui green button' onClick={() => {this.props.history.push('/user/profile')}}>Edit Profile</button>
      <h2 style={{ textAlign: 'center' }}>Companies</h2>
      <div className='ui centered grid'>
      {this.props.all_company_calendars.map((company, i) => {
        return (
          <div key={i}>
            <div className='five wide column'> 
              <img className='company-logo' src={`${company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png'}`} />
              {company.name}
              <div>
                <p>Coming Live Challenge: {company.time}</p>
                <p>Duration: {company.duration} Minutes</p>
              </div>
              <button onClick={() => {
                this.props.fetchInitialChallenge(company.company_id)
                this.props.history.push('/user/schedule');
              }}>View Company Page
              </button>
            </div>
          </div>
        )})}
      </div>
      <h2 style={{ marginTop: '100px', textAlign: 'center' }}>Your Calendar</h2>
      <div className='candidate_calendar inverted ui raised container segment'>
      {this.props.candidate_calendar ? 
      <UserScheduleTableView candidateCalendar={this.props.candidate_calendar}/>
      : <div>You Do Not Have Any Scheduled Challenges</div>}
      </div>
      </div>
    )
  }
}

export default withRouter(CompanyListView);