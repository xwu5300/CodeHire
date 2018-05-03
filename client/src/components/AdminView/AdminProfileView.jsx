import React, { Component } from 'react';
import { connect } from "react-redux";

const mapDispatchToProps = dispatch => {
  return {
    fillme: 'in later'
  }
}

class AdminProfileView extends Component {
  constructor() {
    super();

  }
  render() {
    return (
      <div className='company_profile_container'>
        <h1>Company Profile</h1>
        <div className='company_logo'>
          <img src='http://static1.squarespace.com/static/522a22cbe4b04681b0bff826/t/581cc65fe4fcb5a68ecd940c/1478280803080/hrhq-avatar.png?format=1000w' />
          <input type='text' placeholder='Change Image' />
          <button type='button'>Save Changes</button>
        </div>
        <div className='company_info'>
          <textArea>Current Info will show here</textArea>
          <button type='button'>Save Changes</button>
        </div>
        <div></div>
      </div>
   );
  }
}
//const AdminProfile = connect(null, mapDispatchToProps)(AdminProfile); //can change out dispatch to props if not needed

export default AdminProfileView;