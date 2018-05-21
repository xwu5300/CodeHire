import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import socketClient from 'socket.io-client';
import swal from 'sweetalert2';
import moment from 'moment';

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
    this.getTimeOut = this.getTimeOut.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isTaken = this.isTaken.bind(this);
  }

  componentDidMount() {
    this.props.fetchInitialChallenge(localStorage.getItem('companyId'))
    this.props.fetchCompanySchedule(localStorage.getItem('companyId'))
    this.props.fetchCandidateResults(localStorage.getItem('userId'), null, ()=>{});
    this.props.fetchCandidateInitialResults(localStorage.getItem('companyId'), localStorage.getItem('userId'), () => {})
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
      console.log("company schedule viewinitial_challenge", results)
      this.handleClick(results)
    })
  }

  updateStyle() {
    this.setState({
      style: {'border': '5px solid red'}
    })
  }

  render() {
    // console.log('company schedue view props',this.props)
    if (this.props.initial_challenge.length) {
      return (
        <div>
          <div className="ui orange four item menu">
          <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
          <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
        </div>
        <h1>{this.props.initial_challenge[0].name}</h1> 
        <h2>{this.props.initial_challenge[0].information}</h2> 
        <br/>
        <div className='ui raised very padded container segment' style={this.state.style}>
        <h2>
        Before You Schedule Live Challenge - You Need To Pass Initial Challenge
        </h2>
        <button onClick={() => {
          this.isTaken()
          }}>
            Take Initial Challenge</button>
        </div>
        <br/>
        <div className='schedule_container'>
        {this.props.company_schedule.length ?
   
        <CompanyScheduleTableView updateStyle={this.updateStyle} saveCandidateCalendar={this.props.saveCandidateCalendar} companyCalendar={this.props.company_schedule} passInitial={this.props.pass_initial} fetchCandidateResults={this.props.fetchCandidateResults}/>
        : <div> {this.props.initial_challenge[0].name} Does Not Have Any Upcoming Live Challenge </div>
      }

        </div> 

        </div>
      )
    } else {
      return(
        <div className="ui orange four item menu">
        <div className='ui item' onClick={ () => { this.props.history.push('/user/profile') } }><i className="user circle icon"></i>{ this.props.username }</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user')}}>Calendar</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user/challengelist')}}>Live Challenges</div>
        <div className='ui item' onClick={() => {this.props.history.push('/user/companylist')}}>Company List</div>
      </div>
      );
    }
  }
}

export default withRouter(CompanyScheduleView);
