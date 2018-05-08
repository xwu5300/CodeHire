import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
import moment from 'moment';

class AdminDashboardView extends Component {
  constructor(props) {
    super(props);
    
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    console.log('admin dash1', this.props)
  }

  handleClick() {
    this.props.toggleInitial();
    this.props.history.push('/admin/challenges');
  }

  render() {
    return (
      <div className='admin_dashboard'>
        <div className='ui raised padded centered container segment'>
          <div className='ui grid'>
            <button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/profile')}}>Edit Profile</button>
            <button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/data')}}>View Analytics</button>
            <div className='row centered challenge_btns'>
              <button className='ui button' type='button' onClick={this.handleClick}>Choose Initial Challenge</button>
              <button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/challenges')}}>Choose Scheduled Challenges</button>   
            </div>
            <table className='ui inverted table company_calendar'>
              <thead>
                <tr>
                  <th>Challenge</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                {this.props.initial_challenge.length === 0 ? null : <td>{this.props.initial_challenge[0].title}</td>}
                </tr>
              </tbody>
            </table>
            <br/>
            <table className='ui inverted table company_calendar'>
              <thead>
                <tr>
                  <th>Challenge</th>
                  <th>Time</th>
                  <th>Duration</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
              {this.props.company_schedule.map((item) => {
                return (
                  <tr>
                    <td>{item.title}</td>
                    <td>{moment(item.time).format('MMMM Do YYYY, h:mm A')}</td>
                    <td>{item.duration}</td>
                    <td><button className='ui button' type='button' onClick={() => {this.props.history.push('/admin/live')}}>view challenge</button></td>
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
