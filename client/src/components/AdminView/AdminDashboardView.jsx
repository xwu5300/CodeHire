import React, { Component } from 'react';
import { connect } from "react-redux";

import AnalyticsView from './AnalyticsView.jsx';
import ChallengeListView from './ChallengeListView.jsx';
import AdminProfile from './AdminProfile.jsx';
import LiveCodingView from './LiveCodingView.jsx';

const AdminDashboardView = (props) => {

  return (
    <div>
    <div className='company_dashboard'>
      <button className='view_profile_btn' type='button'>Edit Profile</button>
      <button className='view_profile_btn' type='button'>View Analytics</button>
      <button className='view_profile_btn' type='button'>Live Coding</button>
      <button className='company_challenge_btn' type='button'>Initial Challenge</button>
      <button className='company_challenge_btn' type='button'>Schedule Challenge</button>
      <div className='company_calendar'></div>
    </div>
       <AdminProfile />
       <ChallengeListView />
       <AnalyticsView />
       <LiveCodingView />
    </div>
  )
}

//const AdminDashboard = connect(mapStateToProps)(AdminDashboard);
//mapstatetoprops --> pull state from the store

export default AdminDashboardView;