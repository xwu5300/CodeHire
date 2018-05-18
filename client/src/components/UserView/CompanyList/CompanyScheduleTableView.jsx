import React, { Component } from 'react';
import moment from 'moment';

class CompanyScheduleTableView extends Component {
  constructor(props) {
    super(props);
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
            console.log('schedule', schedule)
            return (
            <tr key={i} >
            <td>{moment(schedule.time).format('MMMM Do YYYY dddd, h:mm A')}</td>
            <td>{schedule.duration} Minutes</td>
            <td>
              <button className='ui orange button' onClick={() =>{
                if (this.props.passInitial) {
                  this.props.saveCandidateCalendar(localStorage.getItem('userId'), schedule.id)
                } else {
                  this.props.updateStyle()
                }
              }}>Add to Schedule
              </button>
            </td>
          </tr>
          )})}
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