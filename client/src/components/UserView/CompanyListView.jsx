import React, { Component } from 'react';
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';

//import mapstatetoprops or dispatch if needed

const CompanyListView = (props) => {
  return (
    <div>
      <h4>User Homepage/Company List View</h4>
      <button onClick={() => {props.history.push('/user/profile')}}>Edit Profile</button>
      <br/>
      <h4>Company List:</h4>
      <button onClick={() => {props.history.push('/user/schedule')}}>View Company Page</button>
    </div>
  )
}

//if you import mapstate to props, be sure to use connect


export default withRouter(CompanyListView);