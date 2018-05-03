import React, { Component } from 'react';
import { connect } from "react-redux";

const AdminDashboardView = (props) => {

  return (
    <div className='company_dashboard'>
      <button type='button'>Initial Challenge</button>
      <button type='button'>Schedule Challenge</button>
      <div className='company_calendar'></div>
    </div>
  )
}

//const AdminDashboard = connect(mapStateToProps)(AdminDashboard);
//mapstatetoprops --> pull state from the store

export default AdminDashboardView;