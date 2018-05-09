import React, { Component } from 'react';

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
            return (
            <tr key={i} >
            <td>{schedule.time}</td>
            <td>{schedule.duration} Minutes</td>
            <td>
              <button className='ui orange button' onClick={() =>{ 
                this.props.saveCandidateCalendar(this.props.userId, schedule.id)
              }}>Add to Schedule
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
    )
  }
}

export default CompanyScheduleTableView;