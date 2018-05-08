import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

class CompanyListView extends Component {
  constructor() {
    super();
  }

  render () {
    console.log(this.props);
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
              {company.time}
              </div>
              <p> </p>
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
      <div className='candidate_calendar inverted ui raised container segment'></div>
      </div>
    )
  }
}

//if you import mapstate to props, be sure to use connect


export default withRouter(CompanyListView);