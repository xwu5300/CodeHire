import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

const CompanyScheduleView = (props) => {
  return (
    <div>
    <h4>Welcome to our company page. We are like google but less good, less googly, and more likely to hire you.</h4> 
    <br/>
    Take our initial challenge:
    <button onClick={() => {props.history.push('/user/challenge')}}>Take Challenge</button>
    <br/>
    Enter Live challenge:
    <button onClick={() => {props.history.push('/user/live')}}>This will be on a calendar</button>
    </div>
  )
}

export default withRouter(CompanyScheduleView);
