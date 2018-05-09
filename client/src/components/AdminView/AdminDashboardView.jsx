import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import moment from 'moment';

class AdminDashboardView extends Component {
  constructor(props) {
    super(props);
    
    this.handleClickOn = this.handleClickOn.bind(this);
    this.handleClickOff = this.handleClickOff.bind(this);
  }


  componentDidMount() {
    console.log(this.props)
  }
  
  handleClickOn() {
    this.props.toggleInitialOn();
    this.props.history.push('/admin/challenges');
  }

  handleClickOff() {
    this.props.toggleInitialOff();
  }

  viewChallenge(title) {
    this.props.history.push('/admin/live')
    this.props.setCurrentLiveChallenge(title);
  }

  render() {
    return (
      <div className='admin_dashboard'>
        <div className='ui raised padded centered container segment'>
          <div className='ui grid'>
            <button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/profile')}}>Edit Profile</button>
            <button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/data')}}>View Analytics</button>
            <div className='row centered challenge_btns'>
              <button className='ui button' type='button' onClick={this.handleClickOn}>Choose Initial Challenge</button>
              <button className='ui button' type='button' onClick={this.handleClickOff}>Choose Scheduled Challenges</button>   
            </div>
            <table className='ui inverted table company_calendar'>
              <thead>
                <tr>
                  <th>Initial Challenge</th>
                </tr>
              </thead>
              <tbody>
                {this.props.initial_challenge.length === 0 ? null : 
                  <tr>
                    <td>{this.props.initial_challenge[0].title}</td>
                    <td><button className='ui button' type='button' onClick={() => {this.props.makeInitial(this.props.initial_challenge[0].id, this.props.initial_challenge[0].initial)}}><i className='x icon'></i></button></td>
                  </tr>
                }
              </tbody>
            </table>
            <br/>
            <table className='ui inverted table company_calendar'>
              <thead>
                <tr>
                  <th>Scheduled Challenge</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.props.company_schedule.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td>{moment(item.time).format('MMMM Do YYYY, h:mm A')}</td>
                    <td>{item.duration}</td>
                    <td><button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/live')}}>View challenge</button></td>
                    <td><button className='ui button' type='button'><i className='x icon'></i></button></td>
                  </tr>
                )
              })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

}  


export default withRouter(AdminDashboardView);
