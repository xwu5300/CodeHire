import React, { Component } from 'react';
import moment from 'moment';
import swal from 'sweetalert2';
import ReactCollapsingTable from 'react-collapsing-table';

class CompanyScheduleTableView extends Component {
  constructor(props) {
    super(props);
    
    this.isTaken = this.isTaken.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(scheduleId, scheduleTime, results) {
    this.props.checkCandidateReschedule(localStorage.getItem('userId'), localStorage.getItem('companyId'), scheduleTime, (data) => {
      console.log('company schedule result.length', results)
      console.log('company schedule data.length', data)
      if (!this.props.passInitial) {
        this.props.updateStyle()
      } else if (results.length) {
        swal({
          text: `You've Taken A Live Challenge With In 30 Days`
        })
      } else if (data.length) {
        swal({
          text: `You've Already Schedule A Live Challenge With In 30 Days`
        })     
      } else {
        this.props.saveCandidateCalendar(localStorage.getItem('userId'), scheduleId)
        swal({
          text: "Scheduled a Live Challenge."
        })
      }
    })
  }

  isTaken(scheduleId, scheduleTime) {
    this.props.fetchCompanyResults(localStorage.getItem('companyId'), localStorage.getItem('userId'), scheduleTime, (results) => {
      this.handleClick(scheduleId, scheduleTime, results)
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
            console.log('company schduel table schedule', schedule)
            return (
            <tr key={i} >
            <td>{moment(schedule.time).format('MMMM Do YYYY dddd, h:mm A')}</td>
            <td>{schedule.duration} Minutes</td>
            <td>
              <button className='ui orange button' onClick={() =>{
                this.isTaken(schedule.id, schedule.time)
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