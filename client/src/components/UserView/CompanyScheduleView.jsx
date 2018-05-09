import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import socketClient from 'socket.io-client';
import CompanyScheduleTableView from './CompanyScheduleTableView.jsx';

class CompanyScheduleView extends Component {
  constructor() {
    super()
    this.enterChallenge = this.enterChallenge.bind(this);
    this.socket = socketClient();
  }

  enterChallenge() {
    this.props.history.push('/user/live');
    this.socket.emit('enter challenge', this.props.username);
  }

  render() {
    if (this.props.initial_challenge[0]) {
      const companyCalendar = this.props.all_company_calendars.filter((schedule) => {
        return schedule.company_id === this.props.initial_challenge[0].company_id
      })
      return (
        <div>
        <h1>{this.props.initial_challenge[0].name}</h1> 
        <h2>{this.props.initial_challenge[0].information}</h2> 
        <br/>
        <div className='ui raised very padded container segment'>
        <button onClick={() => {this.props.history.push('/user/challenge')}}>
            Take Initial Challenge</button>
          <span className='ui container segment'> </span>
        </div>
        <br/>
        {this.props.initial_challenge[0].name}'s Live Challenge:
        <div className='schedule_container'>
        {companyCalendar ? 
        <CompanyScheduleTableView userId={this.props.user_id} saveCandidateCalendar={this.props.saveCandidateCalendar}companyCalendar={companyCalendar} /> 
        : <div> {this.props.initial_challenge[0].name} Does Not Have Any Upcoming Live Challenge </div>
      }
        </div> 
        </div>
      )
    } else {
      return null;
    }
  }
}

export default withRouter(CompanyScheduleView);
