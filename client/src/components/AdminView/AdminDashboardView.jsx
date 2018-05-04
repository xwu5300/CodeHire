import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
// import AnalyticsView from './AnalyticsView.jsx';
// import ChallengeListView from './ChallengeListView.jsx';
// import AdminProfileView from './AdminProfileView.jsx';
// import LiveCodingView from './LiveCodingView.jsx';

const AdminDashboardView = (props) => {

  return (
    <div>
      <div className='company_dashboard'>
        <button className='view_profile_btn' type='button' onClick={() => {props.history.push('/admin/profile')}}>Edit Profile</button>
        <button className='view_profile_btn' type='button' onClick={() => {props.history.push('/admin/data')}}>View Analytics</button>
        <button className='view_profile_btn' type='button' onClick={() => {props.history.push('/admin/live')}}>Live Coding</button>
        <button className='company_challenge_btn' type='button' onClick={() => {props.history.push('/admin/challenges')}}>Initial Challenge</button>
        <button className='company_challenge_btn' type='button' onClick={() => {props.history.push('/admin/challenges')}}>Schedule Challenge</button>
        <div className='company_calendar'></div>
      </div>
    </div>
  )
}

//const AdminDashboard = connect(mapStateToProps)(AdminDashboard);
//mapstatetoprops --> pull state from the store

export default withRouter(AdminDashboardView);