import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

class CompanyScheduleView extends Component {
  constructor() {
    super()
  }

  render() {
    if (this.props.initial_challenge[0]) {
      return (
        <div>
        <h2>{this.props.initial_challenge[0].information}</h2> 
        <br/>
        <div className='ui raised very padded container segment'>
          <button onClick={() => {this.props.history.push('/user/challenge')}}>Take Initial Challenge</button>
          <span className='ui container segment'> </span>
        </div>
        <br/>
        Enter Live challenge:
        <div className='schedule_container'>
        <table className='ui inverted table'>
          <thead>
            <tr>
              <th>Challenge</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.all_company_calendars.filter((schedule) => {
              return schedule.company_id === this.props.initial_challenge[0].company_id
            }).map((schedule, i) => {
              return (
              <tr key={i} >
              <td>None</td>
              <td>{schedule.created_at}</td>
              <td>
                <button className='ui orange button' onClick={() => {}}>Add to Schedule
                </button>
                <button className='ui orange button' onClick={() => {this.props.history.push('/user/live')}}>Start
                </button>
              </td>
            </tr>
            )})}
          </tbody>
          <tfoot>
            <tr><th>3 People</th>
            <th></th>
            <th></th>
          </tr></tfoot>
        </table>
        </div>
          
        </div>
      )
    } else {
      return null;
    }
  }
}

export default withRouter(CompanyScheduleView);
