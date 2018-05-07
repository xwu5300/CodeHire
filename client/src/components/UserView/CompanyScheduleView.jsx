import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

class CompanyScheduleView extends Component {
  constructor() {
    super()
  }

  render() {
    console.log('Users Company Schedule View props', this.props)
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
    } else {
      return null;
    }
  }
}

export default withRouter(CompanyScheduleView);
