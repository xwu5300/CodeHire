import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import UserScheduleTableView from './UserScheduleTableView.jsx';
import UserSearchView from './UserSearchView.jsx';

class CompanyListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCalendar: []
    }

    this.updateCompanyCalendar = this.updateCompanyCalendar.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllCompanyCalendars(() => {
      this.setState({
        companyCalendar: this.props.all_company_calendars
      })
    })
    this.props.fetchCandidateCalendar(this.props.user_id);
  }

  updateCompanyCalendar(companyName) {
    var newList = this.props.all_company_calendars.filter((schedule) => {
      return schedule.name === companyName;
    })
    this.setState({
      companyCalendar: newList
    })
  }

  render () {
    return (
      <div>
      <button className='ui green button' onClick={() => {this.props.history.push('/user/profile')}}>Edit Profile</button>
      <button className='ui green button' onClick={() => {this.props.history.push('/user')}}>Dash Board</button>
      <UserSearchView updateCompanyCalendar={this.updateCompanyCalendar}/>
      <h2 style={{ textAlign: 'center' }}>Companies</h2>
      <div className='ui centered grid'>
      {this.state.companyCalendar.length ?
      this.state.companyCalendar.map((company, i) => {
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
        )})
      : <div>Sorry, we weren't able to find any results</div>
      }
      
      </div>
      <h2 style={{ marginTop: '100px', textAlign: 'center' }}>Your Calendar</h2>
      <div className='candidate_calendar inverted ui raised container segment'>
      {this.props.candidate_calendar.length ? 
      <UserScheduleTableView candidateCalendar={this.props.candidate_calendar} cancelSchedule={this.props.deleteCandidateSchedule}/>
      : <div>You Do Not Have Any Scheduled Challenges</div>}
      </div>
      </div>
    )
  }
}

export default withRouter(CompanyListView);