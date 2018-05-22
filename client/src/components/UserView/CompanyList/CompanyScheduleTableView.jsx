import React, { Component } from 'react';
import moment from 'moment';
import swal from 'sweetalert2';
import ReactCollapsingTable from 'react-collapsing-table';

class CompanyScheduleTableView extends Component {
  constructor(props) {
    super(props);

    this.getTimeOut = this.getTimeOut.bind(this);
    this.isTaken = this.isTaken.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  // change function name later
  getTimeOut(results) {
    let currTime = moment(Date.now())
    let timeCompleted = moment(results[0].completed_at)
    let days = currTime.diff(timeCompleted, 'days')
    return days;
  }

  handleClick(scheduleId, results) {
    let daysLeft = 0
    if (results.length) {
      let days = this.getTimeOut(results)
      daysLeft = 30 - days;
    }
    if (!this.props.passInitial) {
      this.props.updateStyle()
    } else if (results.length && (daysLeft > 0 )) {
      swal({
        text: `You've Taken This Challenge, Please Retake After ${daysLeft} Days`
      })
    } else {
      this.props.saveCandidateCalendar(localStorage.getItem('userId'), scheduleId)
    }
  }

  isTaken(scheduleId) {
    this.props.fetchCandidateResults(localStorage.getItem('userId'), scheduleId, (results) => {
      this.handleClick(scheduleId, results)
    })
  }


  render() {  
    return(
      <table className='ui inverted table'>
        <thead>
          <tr>
            <th>Time</th>
            <th>Duration</th>
          </tr>
        </thead>
        <tbody>
          {this.props.companyCalendar.map((schedule, i) => {
            return (
            <tr key={i} >
            <td>{moment(schedule.time).format('MMMM Do YYYY dddd, h:mm A')}</td>
            <td>{schedule.duration} Minutes</td>
            <td>
              <button className='ui orange button' onClick={() =>{
                this.isTaken(schedule.id)
              }}>Add to Schedule
              </button>
            </td>
          </tr>
          )
          })}
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

export default CompanyScheduleTableView;