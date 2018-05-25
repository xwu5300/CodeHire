import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import moment from 'moment';
import swal from 'sweetalert2';

class UserScheduleTableView extends Component {
  constructor() {
    super();

    this.getCalendar = this.getCalendar.bind(this);
    this.cancelSubmit = this.cancelSubmit.bind(this);
  }

  getCalendar(schedule, companyId, duration) {
    this.props.currentCompanyCalendar(companyId, () => {
      this.props.history.push({ pathname: '/user/live', challenge: schedule, duration: duration });
    });
    console.log('user schedule table schedule', schedule)
  }

  cancelSubmit(id) {
    swal({
      text: "Delete Schedule?",
      showCancelButton: true,
      width: '300px',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((clickResult) => {
      if (clickResult.value) {
        this.props.cancelSchedule(id, localStorage.getItem('userId'))
      }
    })
  }
  
  render() {
    return ( 
    <table className='ui inverted table'>
    <thead>
        <tr>
        <th>Company</th>
        <th>Time</th>
        <th>Duration</th>
        <th></th>
        </tr>
    </thead>
    <tbody>
        {this.props.candidateCalendar.map((schedule, i) => {
        return (
        <tr key={i} >
        <td>{schedule.name}</td>
        <td>{moment(schedule.time).format('MMMM Do YYYY dddd, h:mm A')}</td>
        <td>{schedule.duration} Minutes</td>
        <td>
        <button className='ui orange button user_sched_btn' 
            onClick={() => { this.getCalendar(schedule, schedule.company_id, schedule.duration) }}>Start
            </button>
            <button className='ui red inverted button user_sched_btn' 
            onClick={() => {
              this.cancelSubmit(schedule.id)
            }}>Delete
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
        <th></th>
        <th></th>
    </tr></tfoot>
    </table>
    
    )
  }
}

export default withRouter(UserScheduleTableView);