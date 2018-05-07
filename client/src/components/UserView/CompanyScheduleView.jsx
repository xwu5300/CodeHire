import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

const CompanyScheduleView = (props) => {
  return (
    <div>
    <h4>Welcome to our company page. We are like google but less good, less googly, and more likely to hire you.</h4> 
    <br/>
    <div className='ui raised very padded container segment'>
      <button onClick={() => {props.history.push('/user/challenge')}}>Take Initial Challenge</button>
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
        <tr>
          <td>Quick Sort</td>
          <td>2/4/18 9:30am</td>
          <td><button className='ui orange button' onClick={() => {props.history.push('/user/live')}}>Add to Schedule</button></td>
        </tr>
        <tr>
          <td>Three Sum</td>
          <td>1/3/18 12:35pm</td>
          <td><button className='ui orange button' onClick={() => {props.history.push('/user/live')}}>Add to Schedule</button></td>
        </tr>
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
}

export default withRouter(CompanyScheduleView);
