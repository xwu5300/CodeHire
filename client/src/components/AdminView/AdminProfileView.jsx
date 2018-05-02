import React, { Component } from 'react';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    fillme: 'in later'
  }
}

class AdminProfile extends Component {
  constructor() {
    props();

  }
  render() {
    <div></div>
  }
}
const AdminProfileView = connect(null, mapDispatchToProps)(AdminProfile); //can change out dispatch to props if not needed

export default AdminProfileView;