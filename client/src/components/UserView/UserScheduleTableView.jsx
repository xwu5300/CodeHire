import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';

class UserScheduleTableView extends Component {
  constructor() {
    super();
  }

  render() {
    return (
    <table className='ui inverted table'>
    <thead>
        <tr>
        <th>Company</th>
        <th>Time</th>
        <th>Duration</th>
        </tr>
    </thead>
    <tbody>
        {this.props.candidateCalendar.map((schedule, i) => {
        return (
        <tr key={i} >
        <td>{schedule.name}</td>
        <td>{schedule.time}</td>
        <td>{schedule.duration}</td>
        <td>
            <button className='ui orange button' 
            onClick={() => {this.props.history.push({
                pathname: '/user/live',
                challenge: schedule
                })}}>Start
            </button>
            <button className='ui orange button' onClick={() => {}}>Cancel
            </button>
        </td>
        </tr>
        )})
        }
    </tbody>
    <tfoot>
        <tr>
        <th></th>
        <th></th>
    </tr></tfoot>
    </table>
    )
  }
}

export default withRouter(UserScheduleTableView);