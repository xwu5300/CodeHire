import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import UserSearchView from './UserSearchView.jsx';
import moment from 'moment';
import jwt from'jwt-simple';
import { secret } from'../../../../../config.js'

class CompanyListView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCalendar: []
    }

    this.updateCompanyCalendar = this.updateCompanyCalendar.bind(this);
    this.encodeCompanyId = this.encodeCompanyId.bind(this);
  }

  componentDidMount() {
    this.props.fetchAllCompanyCalendars(() => {
      this.setState({
        companyCalendar: this.props.all_company_calendars
      })
    })
  }

  updateCompanyCalendar(companyName) {
    var newList = this.props.all_company_calendars.filter((schedule) => {
      return schedule.name === companyName;
    })
    this.setState({
      companyCalendar: newList
    })
  }

  encodeCompanyId(id) {
    let companyId = {id: id};
    let idToken = jwt.encode(companyId, secret.secret);
    return idToken;
  }

  render () {

    return (
      <div>
        <div className="ui orange three item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div>
        </div>
        
          <div className='search_company_input' style={{marginTop: '40px', marginBottom: '70px', textAlign: 'center'}} >
            <UserSearchView updateCompanyCalendar={this.updateCompanyCalendar}/>
          </div>
       
       <div className='company_list_items'>
       <div className='ui divided items'>
      {this.state.companyCalendar.length ?
      this.state.companyCalendar.map((company, i) => {
        return (

          <div className='item' key={i}>
            <span className='company_logo'>
              <img className='ui image' src={`${company.logo_url || 'http://dev.jobkhoji.com/assets/images/default_company_icon.png'}`} />
            </span>
              <div className='content'>
                <h2 className='company_item_header'>{company.name}</h2>
                  <div className='description'>
                <p><b>Coming Live Challenge:</b> {moment(company.time).format('MMMM Do YYYY dddd, h:mm A')}</p>
              </div>
              <button className='view_company_btn ui orange button' onClick={() => {
                this.props.fetchInitialChallenge(this.encodeCompanyId(company.company_id))
                this.props.fetchCandidateInitialResults(this.encodeCompanyId(company.company_id), localStorage.getItem('userId'))
                this.props.fetchCompanySchedule(this.encodeCompanyId(company.company_id))
                this.props.history.push('/user/schedule');
              }}>View Company Page
              </button>
              </div>
          </div>
         
        )})


      : <div>Sorry, we weren't able to find any results</div>

      }

      </div>
      </div>
      </div>
    )
  }
}

export default withRouter(CompanyListView);
