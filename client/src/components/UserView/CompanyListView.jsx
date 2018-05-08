import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

class CompanyListView extends Component {
  constructor() {
    super();
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
      <table className='ui inverted table'>
          <thead>
            <tr>
              <th>Company</th>
              <th>Time</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody>
            {this.props.all_company_calendars.map((schedule, i) => {
              return (
              <tr key={i} >
              <td>None</td>
              <td>{schedule.created_at}</td>
              <td></td>
              <td>
                <button className='ui orange button' onClick={() => {props.history.push('/user/live')}}>Start
                </button>
                <button className='ui orange button' onClick={() => {}}>Cancel
                </button>
              </td>
            </tr>
            )})
            }
          </tbody>
          <tfoot>
            <tr><th>3 People</th>
            <th></th>
            <th></th>
          </tr></tfoot>
        </table>
      </div>
      </div>
    )
  }
}

export default withRouter(CompanyListView);