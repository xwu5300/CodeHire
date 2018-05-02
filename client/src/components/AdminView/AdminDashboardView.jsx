import React, { Component } from 'react';
import { connect } from "react-redux";

const AdminDashboard = (props) => {

  return (
    <div></div>
  )
}

const AdminDashBoardView = connect(mapStateToProps)(AdminDashboard);
//mapstatetoprops --> pull state from the store

export default AdminDashBoardView;