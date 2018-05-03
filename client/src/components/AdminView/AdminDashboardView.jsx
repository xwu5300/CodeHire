import React, { Component } from 'react';
import { connect } from "react-redux";

const AdminDashboard = (props) => {

  return (
    <div className='company_dashboard'>
      <div className='initial_challenge'></div>
      <button>Submit Initial Challenge</button>
      <div className='company_calendar'></div>
    </div>
  )
}

const AdminDashboardView = connect(mapStateToProps)(AdminDashboard);
//mapstatetoprops --> pull state from the store

export default AdminDashboardView;