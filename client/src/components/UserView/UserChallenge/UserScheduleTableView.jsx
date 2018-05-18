import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';

class UserScheduleTableView extends Component {
  constructor() {
    super();

    this.getCalendar = this.getCalendar.bind(this);
  }

getCalendar(schedule, companyId, duration) {
    this.props.currentCompanyCalendar(companyId, () => {
      this.props.history.push({ pathname: '/user/live', challenge: schedule, duration: duration });
    });
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
          console.log('user duration', schedule)
        return (
        <tr key={i} >
        <td>{schedule.name}</td>
        <td>{moment(schedule.time).format('MMMM Do YYYY dddd, h:mm A')}</td>
        <td>{schedule.duration} Minutes</td>
        <td>
        <button className='ui orange button' 
            onClick={() => { this.getCalendar(schedule, schedule.company_id, schedule.duration) }}>Start
            </button>
            <button className='ui orange button' 
            onClick={() => {
              this.props.cancelSchedule(schedule.id, localStorage.getItem('userId'))
            }}>Cancel
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