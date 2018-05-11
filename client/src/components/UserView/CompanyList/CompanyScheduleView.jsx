import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import socketClient from 'socket.io-client';
import CompanyScheduleTableView from './CompanyScheduleTableView.jsx';

class CompanyScheduleView extends Component {
  constructor() {
    super()
    
    this.state = {
      style: {}
    }
    //this.enterChallenge = this.enterChallenge.bind(this);
    this.socket = socketClient();
    this.updateStyle = this.updateStyle.bind(this);
  }

  updateStyle() {
    this.setState({
      style: {'border': '5px solid red'}
    })
  }

  render() {
    if (this.props.initial_challenge[0]) {
      const companyCalendar = this.props.all_company_calendars.filter((schedule) => {
        return schedule.company_id === this.props.initial_challenge[0].company_id
      })
      return (
        <div>
        <button className='ui green button' onClick={() => {this.props.history.push('/user/profile')}}>Edit Profile</button>
        <button className='ui green button' onClick={() => {this.props.history.push('/user')}}>Dash Board</button>
        <button className='ui green button' onClick={() => {this.props.history.push('/user/companylist')}}>Company Challenge list</button> 
        <h1>{this.props.initial_challenge[0].name}</h1> 
        <h2>{this.props.initial_challenge[0].information}</h2> 
        <br/>
        <div className='ui raised very padded container segment' style={this.state.style}>
        <h2>
        Before You Schedule Live Challenge - You Need To Pass Initial Challenge
        </h2>
        <button onClick={() => {this.props.history.push('/user/challenge')}}>
            Take Initial Challenge</button>
          {/* <span className='ui container segment'> </span> */}
        </div>
        <br/>
        {this.props.initial_challenge[0].name}'s Live Challenge:
        <div className='schedule_container'>
        {companyCalendar ?
        <CompanyScheduleTableView updateStyle={this.updateStyle} userId={this.props.user_id} saveCandidateCalendar={this.props.saveCandidateCalendar}companyCalendar={companyCalendar} />
        : <div> {this.props.initial_challenge[0].name} Does Not Have Any Upcoming Live Challenge </div>
      }

        </div> 

        </div>
      )
    } else {
      return (
        <div>
          <button className='ui green button' onClick={() => {this.props.history.push('/user/profile')}}>Edit Profile</button>
          <button className='ui green button' onClick={() => {this.props.history.push('/user')}}>Dash Board</button>
        </div>
      )
    }
  }
}

export default withRouter(CompanyScheduleView);
