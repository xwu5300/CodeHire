import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js';

import SearchCompanySchedule from './SearchCompanySchedule.jsx';
import CompanyChallengeTableView from './CompanyChallengeTableView.jsx';
import UserNavBar from '../UserNavBar.jsx';
import Image from './Image.jsx';
import Time from './Time.jsx';

class AllChallengeListView extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchAllCompanyCalendars('')
  }

  render () {
    if (this.props.all_company_calendars.length) {
      let rows = this.props.all_company_calendars.map((company) => {
        let url = company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png';
        return {
        info: {companyId: company.company_id, companyName: company.name, companyInformation: company.information, url: url},
        name: company.name,
        time: company.time,
        duration: company.duration
        }
      })
      let columns = [
        {accessor: 'info', label: '', priorityLevel: 1, position: 1, sortable: false, CustomComponent: Image },
        {accessor: 'name', label: 'Company', priorityLevel: 2, position: 2},
        {accessor: 'time', label: 'Time', priorityLevel: 3, position: 3, CustomComponent: Time, sortType: 'date'},
        {accessor: 'duration', label: 'Duration', priorityLevel: 4, position: 4},
      ]

      return (
        <div> 
          <UserNavBar getUsername={ this.props.getUsername} username={ this.props.username } handleLogout={ this.props.handleLogout }/>
        <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
        <SearchCompanySchedule updateCompanyCalendar={this.props.fetchAllCompanyCalendars}/>
      </div>
        <CompanyChallengeTableView rows={rows} columns={columns} updateCompanyCalendar={this.props.fetchAllCompanyCalendars} fetchCompanyInfo={this.props.fetchCompanyInfo} fetchCandidateInitialResults={this.props.fetchCandidateInitialResults}
        />
        </div>
      )
    } else {
      return (
        <div>
          <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } handleLogout={ this.props.handleLogout } />
          <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <SearchCompanySchedule updateCompanyCalendar={this.props.fetchAllCompanyCalendars}/>
          </div>
          <div style={{color: 'white', textAlign: 'center', fontSize: '18px'}}>Sorry, we weren't able to find any results.</div>
        </div>
      )
    }
  }
}

export default withRouter(AllChallengeListView);
