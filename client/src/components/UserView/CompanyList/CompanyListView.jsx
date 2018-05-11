import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
// import UserScheduleTableView from './UserScheduleTableView.jsx';
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
        <div className="ui orange three item inverted menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i class="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui active item' onClick={() => {this.props.history.push('/user/companylist')}}>Companies</div> 
        </div>
        <div className='ui centered grid'>
          <div className='row' style={{marginTop: '40px', marginBottom: '50px'}} >
            <UserSearchView updateCompanyCalendar={this.updateCompanyCalendar}/>
          </div>
       
          
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
                // this.props.fetchCompanySchedule(company.id)
                this.props.history.push('/user/schedule');
              }}>View Company Page
              </button>
            </div>
          </div>
        )})
       

      : <div>Sorry, we weren't able to find any results</div>
        
      }
      
      </div>

      {/* <h2 style={{ marginTop: '100px', textAlign: 'center' }}>Your Calendar</h2>
      <div className='candidate_calendar inverted ui raised container segment'>
      {this.props.candidate_calendar.length ? 
      <UserScheduleTableView currentCompanyCalendar={ this.props.currentCompanyCalendar } candidateCalendar={this.props.candidate_calendar} cancelSchedule={this.props.deleteCandidateSchedule}/>

      : <div>You Do Not Have Any Scheduled Challenges</div>}
      </div> */}
      </div>
    )
  }
}

export default withRouter(CompanyListView);