import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import socketClient from 'socket.io-client';
import swal from 'sweetalert2';
import moment from 'moment';

import CompanyScheduleTableView from './CompanyScheduleTableView.jsx';
import UserNavBar from '../UserNavBar.jsx';
// import { checkCandidateReschedule } from '../../../actions/userActions';

class CompanyScheduleView extends Component {
  constructor() {
    super()
    
    this.state = {
      style: {},
      challenges: []
    }
    //this.enterChallenge = this.enterChallenge.bind(this);
    this.socket = socketClient();
    this.updateStyle = this.updateStyle.bind(this);
    this.getTimeOut = this.getTimeOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isTaken = this.isTaken.bind(this);
  }

  componentDidMount() {e
    this.props.fetchInitialChallenge(localStorage.getItem('companyId'))
    this.props.fetchAllCompanyCalendars(null, localStorage.getItem('companyId'),() => {
      this.setState({
        challenges: this.props.all_company_calendars
      })
    })
    this.props.fetchCandidateResults(localStorage.getItem('userId'));
    this.props.fetchCandidateInitialResults(localStorage.getItem('companyId'), localStorage.getItem('userId'), (data) => {})

    const time = 'May'
  }

  getTimeOut(results) {
    let currTime = moment(Date.now())
    let timeCompleted = moment(results[0].completed_at)
    let days = currTime.diff(timeCompleted, 'days')
    return days;
  }

  handleClick(results) {
    let daysLeft = 0
    if (results.length) {
      let days = this.getTimeOut(results)
      daysLeft = 7 - days;
    }
    if (results[0] && results[0].user_passed) {
      swal(
        "You've Passed the Initial Challenge!",
        "Please Schedule A Live Challenge When You Are Ready!"
      )
    } else if (daysLeft > 0) {
      swal({
        text: `You've Taken This Challenge, Please Retake After ${daysLeft} Days`
      })
    } else {
      this.props.history.push('/user/challenge')
    }
  }

  isTaken() {
    this.props.fetchCandidateInitialResults(localStorage.getItem('companyId'), localStorage.getItem('userId'), (results) => {
      this.handleClick(results)
    })
  }

  updateStyle() {
    this.setState({
      style: {'border': '5px solid red'}
    })
  }

  render() { 
    return (
      <div>
        <i onClick={() => this.props.history.push('/user/companylist') } className="arrow alternate circle left icon"></i>
          <div className='schedule_container'>
            <div className='ui top attached segment' style={this.state.style}>
              {this.props.logo_url ? <img className='company_profile_logo' src={ this.props.logo_url }/> : null }
              <h1 style={{textAlign: 'center'}}>{ localStorage.getItem('companyName') }</h1> 
              <h2 style={{textAlign: 'center'}}>{ this.props.company_information }</h2> 
                {this.props.website_url && <h2>Click <a href={ this.props.website_url } target='_blank'>here</a> for more information.</h2> }
                <hr />
          {this.props.initial_challenge.length ?
        <div className='initial_challenge'>
        <h2>
        To schedule a live challenge, you must pass the Initial Challenge!
        </h2>
        <button className='ui orange inverted button' onClick={() => {
          this.isTaken()
          }}>
            Take Initial Challenge</button>
        </div>
        :  <h4> {localStorage.getItem('companyName')} does not have an initial challenge at this time.  </h4>    
      }
      </div>


            <div>
              {this.state.challenges.length ?
                <CompanyScheduleTableView updateStyle={this.updateStyle} 
                saveCandidateCalendar={this.props.saveCandidateCalendar} 
                companyCalendar={this.props.all_company_calendars} 
                passInitial={this.props.pass_initial} 
                fetchCompanyResults={this.props.fetchCompanyResults} 
                candidateCalendar={this.props.candidate_calendar} 
                checkCandidateReschedule={this.props.checkCandidateReschedule} 
                results={this.props.results} />
              : <div className="ui attached segment"><h4> {localStorage.getItem('companyName')} does not have any upcoming challenges. Check back later. </h4></div> }
            </div>
        </div>
      </div>
    );
  }
}
  

export default withRouter(CompanyScheduleView);
