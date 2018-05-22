import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js';

import SearchCompanySchedule from './SearchCompanySchedule.jsx';
import CompanyChallengeTableView from './CompanyChallengeTableView.jsx';
import ViewCompanyPage from './ViewCompanyPage.jsx';
import UserNavBar from '../UserNavBar.jsx';
import Image from './Image.jsx';

class AllChallengeListView extends Component {
  constructor(props) {
    super(props);
    this.encodeCompanyId = this.encodeCompanyId.bind(this);
  }

  componentDidMount() {
    this.props.fetchCompanySchedule(null, '')
  }

  encodeCompanyId(id) {
    let companyId = {id: id};
    let idToken = jwt.encode(companyId, secret.secret);
    localStorage.setItem('companyId', idToken)
  }

  render () {
    if (this.props.company_schedule.length) {
      let rows = this.props.company_schedule.map((company) => {
        let url = company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png';
        return {
        id: company.company_id,
        logo: url,
        name: company.name,
        time: moment(company.time).format('MMMM Do YYYY dddd, h:mm A'),
        duration: company.duration
        }
      })
      let columns = [
        {accessor: 'logo', label: '', priorityLevel: 1, position: 1, sortable: false, CustomComponent: Image},
        {accessor: 'name', label: 'Company', priorityLevel: 2, position: 2, sortable: true},
        {accessor: 'time', label: 'Time', priorityLevel: 3, position: 3, sortable: true},
        {accessor: 'duration', label: 'Duration', priorityLevel: 4, position: 4, sortable: true},
        {accessor: 'id', label: '', priorityLevel: 5, position: 5, CustomComponent: ViewCompanyPage}
      ]

      return (
        <div> 
        <UserNavBar getUsername={ this.props.getUsername } username={ this.props.username } />
        <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
        <SearchCompanySchedule updateCompanyCalendar={this.props.fetchCompanySchedule}/>
      </div>
        <CompanyChallengeTableView viewCompanyProfile={ this.props.viewCompanyProfile } rows={rows} columns={columns} />
        </div>
      )
    } else {
      return (
        <div>
         <UserNavBar getUsername={ this.props.getUsername} username={ this.props.username } />
          <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <SearchCompanySchedule updateCompanyCalendar={this.props.fetchCompanySchedule}/>
          </div>
          <div>Sorry, we weren't able to find any results</div>
        </div>
      )
    }
  }
}

export default withRouter(AllChallengeListView);
